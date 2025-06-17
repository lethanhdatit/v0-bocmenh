"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Calendar, Compass, Loader2 } from "lucide-react"

interface FlyingStarsResult {
  year: number
  month?: number
  analysisType: string
  period: {
    number: number
    years: string
    element: string
    description: string
  }
  annualChart: number[][]
  monthlyChart?: number[][]
  stars: Array<{
    number: number
    name: string
    element: string
    nature: string
    description: string
    effects: string
    remedies: string
    enhancements: string
  }>
  bestDirections: string[]
  worstDirections: string[]
  recommendations: string[]
}

export default function FlyingStarsForm() {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    analysisType: "annual",
  })
  const [result, setResult] = useState<FlyingStarsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/fengshui/flying-stars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi phân tích")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  const getDirectionName = (index: number) => {
    const directions = ["Đông Nam", "Nam", "Tây Nam", "Đông", "Trung Tâm", "Tây", "Đông Bắc", "Bắc", "Tây Bắc"]
    return directions[index]
  }

  const getStarColor = (nature: string) => {
    switch (nature) {
      case "auspicious":
        return "text-green-400 bg-green-500/20"
      case "inauspicious":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-yellow-400 bg-yellow-500/20"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 mb-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Analysis Type */}
          <div>
            <label className="block text-purple-300 font-medium mb-3">Loại Phân Tích</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "annual", label: "Phân Tích Năm", icon: Calendar },
                { value: "monthly", label: "Phân Tích Tháng", icon: Star },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, analysisType: type.value })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                    formData.analysisType === type.value
                      ? "border-purple-400 bg-purple-500/20 text-purple-300"
                      : "border-purple-500/30 hover:border-purple-400/50 text-purple-400"
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-purple-300 font-medium mb-2">
              Năm
            </label>
            <input
              type="number"
              id="year"
              min="1900"
              max="2100"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Month (only for monthly analysis) */}
          {formData.analysisType === "monthly" && (
            <div>
              <label htmlFor="month" className="block text-purple-300 font-medium mb-2">
                Tháng
              </label>
              <select
                id="month"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: Number.parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-xl text-white focus:border-purple-400 focus:outline-none transition-colors"
                required
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang phân tích...</span>
              </>
            ) : (
              <>
                <Compass className="w-5 h-5" />
                <span>Phân Tích Cửu Tinh Phi Phủ</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300"
          >
            {error}
          </motion.div>
        )}
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Period Information */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Thông Tin Vận Hạn</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Vận {result.period.number}</h3>
                <p className="text-purple-100 mb-2">{result.period.years}</p>
                <p className="text-purple-200">
                  <strong>Nguyên tố:</strong> {result.period.element}
                </p>
              </div>
              <div>
                <p className="text-purple-100">{result.period.description}</p>
              </div>
            </div>
          </div>

          {/* Flying Stars Chart */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">
              Biểu Đồ Cửu Tinh {formData.analysisType === "monthly" ? `Tháng ${formData.month}/` : ""}
              {formData.year}
            </h2>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {result.annualChart.flat().map((starNumber, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-xl border-2 border-purple-500/30 flex flex-col items-center justify-center p-4 ${getStarColor(
                    result.stars.find((s) => s.number === starNumber)?.nature || "neutral",
                  )}`}
                >
                  <div className="text-2xl font-bold">{starNumber}</div>
                  <div className="text-xs text-center mt-1">{getDirectionName(index)}</div>
                  {result.monthlyChart && (
                    <div className="text-xs opacity-75 mt-1">({result.monthlyChart.flat()[index]})</div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-purple-300 text-sm">
              {result.monthlyChart && "(Số trong ngoặc là sao tháng)"}
            </div>
          </div>

          {/* Star Details */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Chi Tiết Các Sao</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.stars.map((star) => (
                <div key={star.number} className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getStarColor(star.nature)}`}
                    >
                      {star.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-300">{star.name}</h3>
                      <p className="text-sm text-purple-400">{star.element}</p>
                    </div>
                  </div>
                  <p className="text-purple-100 text-sm mb-3">{star.description}</p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-purple-300">Ảnh hưởng:</strong>
                      <p className="text-purple-200">{star.effects}</p>
                    </div>
                    {star.nature === "inauspicious" && star.remedies && (
                      <div>
                        <strong className="text-red-300">Cách hóa giải:</strong>
                        <p className="text-red-200">{star.remedies}</p>
                      </div>
                    )}
                    {star.nature === "auspicious" && star.enhancements && (
                      <div>
                        <strong className="text-green-300">Cách tăng cường:</strong>
                        <p className="text-green-200">{star.enhancements}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Directions Analysis */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Hướng Tốt</h2>
              <div className="space-y-2">
                {result.bestDirections.map((direction, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-200">{direction}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/20">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Hướng Xấu</h2>
              <div className="space-y-2">
                {result.worstDirections.map((direction, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-red-200">{direction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Khuyến Nghị</h2>
            <div className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-purple-100">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
