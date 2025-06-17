"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Home, User, Calendar } from "lucide-react"
import { getAllDirections, type HouseDirectionResult } from "@/lib/houseDirection"

interface HouseDirectionFormProps {
  onResult?: (result: HouseDirectionResult) => void
}

export default function HouseDirectionForm({ onResult }: HouseDirectionFormProps) {
  const [formData, setFormData] = useState({
    birthYear: new Date().getFullYear() - 30,
    gender: "",
    houseDirection: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<HouseDirectionResult | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const directions = getAllDirections()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.birthYear || formData.birthYear < 1900 || formData.birthYear > 2100) {
      newErrors.birthYear = "Vui lòng nhập năm sinh hợp lệ (1900-2100)"
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính"
    }

    if (!formData.houseDirection) {
      newErrors.houseDirection = "Vui lòng chọn hướng nhà"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch("/api/fengshui/house-direction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data)
        onResult?.(data.data)
      } else {
        setErrors({ submit: data.error || "Có lỗi xảy ra" })
      }
    } catch (error) {
      setErrors({ submit: "Không thể kết nối đến server" })
    } finally {
      setLoading(false)
    }
  }

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "excellent":
        return "text-green-600"
      case "very-good":
        return "text-green-500"
      case "good":
        return "text-yellow-500"
      case "fair":
        return "text-orange-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getCompatibilityText = (compatibility: string) => {
    switch (compatibility) {
      case "excellent":
        return "Xuất sắc"
      case "very-good":
        return "Rất tốt"
      case "good":
        return "Tốt"
      case "fair":
        return "Khá"
      case "poor":
        return "Cần cải thiện"
      default:
        return "Chưa xác định"
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Phân Tích Hướng Nhà</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Birth Year */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Năm Sinh
              </label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: Number.parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ví dụ: 1990"
              />
              {errors.birthYear && <p className="text-red-400 text-sm mt-1">{errors.birthYear}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Giới Tính
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
              {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* House Direction */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <Home className="w-4 h-4 inline mr-2" />
                Hướng Nhà
              </label>
              <select
                value={formData.houseDirection}
                onChange={(e) => setFormData({ ...formData, houseDirection: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Chọn hướng nhà</option>
                {directions.map((direction) => (
                  <option key={direction.value} value={direction.value}>
                    {direction.label} ({direction.element})
                  </option>
                ))}
              </select>
              {errors.houseDirection && <p className="text-red-400 text-sm mt-1">{errors.houseDirection}</p>}
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang phân tích...
              </div>
            ) : (
              "Phân Tích Hướng Nhà"
            )}
          </button>
        </form>
      </motion.div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Overall Score */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full mb-4">
                <span className="text-4xl font-bold text-white">{result.score}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Độ Tương Hợp:{" "}
                <span className={getCompatibilityColor(result.compatibility)}>
                  {getCompatibilityText(result.compatibility)}
                </span>
              </h3>
              <p className="text-white/80">
                Số Kua: {result.kuaNumber} | Hướng nhà: {result.houseDirection}
              </p>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Phân Tích Chi Tiết</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(result.analysis).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-400 mb-2 capitalize">
                    {key === "overall"
                      ? "Tổng Quan"
                      : key === "wealth"
                        ? "Tài Lộc"
                        : key === "health"
                          ? "Sức Khỏe"
                          : key === "relationships"
                            ? "Mối Quan Hệ"
                            : key === "career"
                              ? "Sự Nghiệp"
                              : key}
                  </h4>
                  <p className="text-white/80 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Khuyến Nghị</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-emerald-400 mb-3">Màu Sắc Phù Hợp</h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendations.colors.map((color, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-400 mb-3">Nguyên Tố</h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendations.elements.map((element, index) => (
                    <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-emerald-400 mb-3">Trang Trí</h4>
              <ul className="space-y-2">
                {result.recommendations.decorations.map((decoration, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {decoration}
                  </li>
                ))}
              </ul>
            </div>

            {result.recommendations.remedies.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-red-400 mb-3">Biện Pháp Hóa Giải</h4>
                <ul className="space-y-2">
                  {result.recommendations.remedies.map((remedy, index) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {remedy}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Room Placement */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Bố Trí Phòng</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-400 mb-3">Nên Đặt</h4>
                {Object.entries(result.bestRooms).map(([room, advice]) => (
                  <div key={room} className="mb-4">
                    <h5 className="font-medium text-white mb-2">{room}</h5>
                    <ul className="space-y-1">
                      {advice.map((item, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-3">Nên Tránh</h4>
                {Object.entries(result.avoidRooms).map(([room, advice]) => (
                  <div key={room} className="mb-4">
                    <h5 className="font-medium text-white mb-2">{room}</h5>
                    <ul className="space-y-1">
                      {advice.map((item, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Advice */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Lời Khuyên Theo Tháng</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.monthlyAdvice).map(([month, advice]) => (
                <div key={month} className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">{month}</h4>
                  <p className="text-white/80 text-sm">{advice}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
