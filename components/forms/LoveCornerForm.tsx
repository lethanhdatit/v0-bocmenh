"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LoveAnalysis } from "@/lib/loveCorner"

interface LoveCornerFormProps {
  onAnalysisComplete?: (analysis: LoveAnalysis) => void
}

export default function LoveCornerForm({ onAnalysisComplete }: LoveCornerFormProps) {
  const [formData, setFormData] = useState({
    birthYear: new Date().getFullYear() - 30,
    gender: "male" as "male" | "female",
    houseDirection: "north",
    relationshipStatus: "single",
  })
  const [analysis, setAnalysis] = useState<LoveAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const directions = [
    { value: "north", label: "Bắc", element: "Thủy" },
    { value: "northeast", label: "Đông Bắc", element: "Thổ" },
    { value: "east", label: "Đông", element: "Mộc" },
    { value: "southeast", label: "Đông Nam", element: "Mộc" },
    { value: "south", label: "Nam", element: "Hỏa" },
    { value: "southwest", label: "Tây Nam", element: "Thổ" },
    { value: "west", label: "Tây", element: "Kim" },
    { value: "northwest", label: "Tây Bắc", element: "Kim" },
  ]

  const relationshipStatuses = [
    { value: "single", label: "Độc thân", icon: "💝", description: "Đang tìm kiếm tình yêu" },
    { value: "dating", label: "Hẹn hò", icon: "💕", description: "Đang trong mối quan hệ" },
    { value: "married", label: "Đã kết hôn", icon: "💍", description: "Đã có gia đình" },
    { value: "complicated", label: "Phức tạp", icon: "💔", description: "Mối quan hệ khó khăn" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/fengshui/love-corner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Có lỗi xảy ra")
      }

      setAnalysis(result.data)
      onAnalysisComplete?.(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra")
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-pink-600"
    if (score >= 65) return "text-rose-600"
    if (score >= 45) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Tuyệt vời"
    if (score >= 65) return "Tốt"
    if (score >= 45) return "Khá"
    return "Cần cải thiện"
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Birth Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Năm sinh</label>
            <input
              type="number"
              min="1900"
              max="2100"
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                  className="mr-2"
                />
                Nữ
              </label>
            </div>
          </div>
        </div>

        {/* House Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hướng nhà</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {directions.map((direction) => (
              <label
                key={direction.value}
                className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.houseDirection === direction.value
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-300 hover:border-pink-300"
                }`}
              >
                <input
                  type="radio"
                  value={direction.value}
                  checked={formData.houseDirection === direction.value}
                  onChange={(e) => setFormData({ ...formData, houseDirection: e.target.value })}
                  className="sr-only"
                />
                <span className="font-medium">{direction.label}</span>
                <span className="text-sm text-gray-500">{direction.element}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Relationship Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tình trạng mối quan hệ</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {relationshipStatuses.map((status) => (
              <label
                key={status.value}
                className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.relationshipStatus === status.value
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-300 hover:border-pink-300"
                }`}
              >
                <input
                  type="radio"
                  value={status.value}
                  checked={formData.relationshipStatus === status.value}
                  onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })}
                  className="sr-only"
                />
                <span className="text-3xl mb-2">{status.icon}</span>
                <span className="font-medium text-center">{status.label}</span>
                <span className="text-xs text-gray-500 text-center mt-1">{status.description}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-rose-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang phân tích...
            </div>
          ) : (
            "Phân tích góc tình yêu"
          )}
        </button>
      </form>

      {analysis && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysis.overallScore / 100)}`}
                    className="text-pink-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">{analysis.overallScore}%</div>
                    <div className="text-sm text-gray-600">{getScoreLabel(analysis.overallScore)}</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Điểm tổng thể góc tình yêu</h3>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">💕 Hướng cá nhân</h4>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.personalScore)}`}>
                  {analysis.personalScore}%
                </div>
                <div className="text-gray-600">{analysis.personalDirection}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">💖 Góc truyền thống</h4>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.universalScore)}`}>
                  {analysis.universalScore}%
                </div>
                <div className="text-gray-600">{analysis.universalCorner}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">⭐ Sao bay</h4>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.flyingStarsScore)}`}>
                  {analysis.flyingStarsScore}%
                </div>
                <div className="text-gray-600">{analysis.flyingStarsLove}</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">💡 Khuyến nghị</h4>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhancement Objects */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">🌹 Vật phẩm phong thủy</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {analysis.enhancementObjects.map((object, index) => (
                <div key={index} className="bg-pink-50 p-3 rounded-lg text-center">
                  <span className="text-sm text-gray-700">{object}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">🎨 Màu sắc tình yêu</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {analysis.colors.map((color, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-sm text-gray-700">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Relationship Advice */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">💝 Lời khuyên mối quan hệ</h4>
            <div className="space-y-3">
              {analysis.relationshipAdvice.map((advice, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-pink-500 mr-2">💕</span>
                  <p className="text-gray-700">{advice}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility Tips */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">🔮 Bí quyết tương hợp</h4>
            <div className="space-y-3">
              {analysis.compatibilityTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">✨</span>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Advice */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">📅 Lời khuyên theo tháng</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.monthlyAdvice.map((advice, index) => (
                <div key={index} className="bg-pink-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">{advice.month}</h5>
                  <p className="text-sm text-gray-600">{advice.advice}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
