"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api/apiClient"
import { Heart, Users, Briefcase, User, Calendar, Sparkles, TrendingUp, MessageCircle, Target } from "lucide-react"

interface CompatibilityResult {
  overallScore: number
  overallRating: string
  lifePathCompatibility: any
  destinyCompatibility: any
  soulUrgeCompatibility?: any
  personalityCompatibility?: any
  birthdayCompatibility?: any
  personalYearCompatibility?: any
  strengths: string[]
  challenges: string[]
  relationshipAdvice: string[]
  bestAspects?: string[]
  areasToWorkOn?: string[]
  communicationStyle?: string
  conflictResolution?: string
  longTermPotential?: string
  romanticCompatibility: number
  friendshipCompatibility: number
  businessCompatibility: number
  additionalInsights?: any
  preview?: string
}

const analysisTypes = [
  {
    id: "general",
    name: "Tổng Quan",
    description: "Phân tích tương hợp toàn diện",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "romantic",
    name: "Tình Yêu",
    description: "Tập trung vào mối quan hệ tình cảm",
    icon: Heart,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "friendship",
    name: "Tình Bạn",
    description: "Phân tích tương hợp bạn bè",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "business",
    name: "Kinh Doanh",
    description: "Đánh giá hợp tác công việc",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
  },
]

export default function CompatibilityForm() {
  const [formData, setFormData] = useState({
    person1: { name: "", birthDate: "" },
    person2: { name: "", birthDate: "" },
    analysisType: "general",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, error, isLoading } = useSWR(
    isSubmitted ? ["/numerology/compatibility", formData] : null,
    ([url, data]) => apiClient.post(url, data).then((res) => res.data),
    {
      revalidateOnFocus: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.person1.name.trim() &&
      formData.person1.birthDate &&
      formData.person2.name.trim() &&
      formData.person2.birthDate
    ) {
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.startsWith("person1.")) {
      const field = name.replace("person1.", "")
      setFormData((prev) => ({
        ...prev,
        person1: { ...prev.person1, [field]: value },
      }))
    } else if (name.startsWith("person2.")) {
      const field = name.replace("person2.", "")
      setFormData((prev) => ({
        ...prev,
        person2: { ...prev.person2, [field]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      person1: { name: "", birthDate: "" },
      person2: { name: "", birthDate: "" },
      analysisType: "general",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 65) return "text-yellow-400"
    if (score >= 50) return "text-orange-400"
    return "text-red-400"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "from-green-500/20 to-emerald-500/20 border-green-500/30"
    if (score >= 65) return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
    if (score >= 50) return "from-orange-500/20 to-red-500/20 border-orange-500/30"
    return "from-red-500/20 to-pink-500/20 border-red-500/30"
  }

  return (
    <div className="max-w-6xl mx-auto">
      {!isSubmitted ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Analysis Type Selection */}
          <div className="mystical-card">
            <h2 className="text-xl font-bold text-yellow-500 mb-6 text-center">Chọn Loại Phân Tích</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analysisTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData((prev) => ({ ...prev, analysisType: type.id }))}
                  className={`cursor-pointer p-4 rounded-lg border transition-all ${
                    formData.analysisType === type.id
                      ? "border-yellow-500 bg-yellow-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3 mx-auto`}
                  >
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-center mb-1">{type.name}</h3>
                  <p className="text-gray-400 text-sm text-center">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Person Information */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Person 1 */}
            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Người Thứ Nhất</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Họ và tên đầy đủ</label>
                  <input
                    type="text"
                    name="person1.name"
                    value={formData.person1.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Ngày sinh</span>
                  </label>
                  <input
                    type="date"
                    name="person1.birthDate"
                    value={formData.person1.birthDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>

            {/* Person 2 */}
            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Người Thứ Hai</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Họ và tên đầy đủ</label>
                  <input
                    type="text"
                    name="person2.name"
                    value={formData.person2.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Ngày sinh</span>
                  </label>
                  <input
                    type="date"
                    name="person2.birthDate"
                    value={formData.person2.birthDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">📊 Phân tích bao gồm:</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Điểm tương hợp tổng thể</li>
                <li>• Phân tích từng khía cạnh số học</li>
                <li>• Điểm mạnh và thách thức</li>
                <li>• Lời khuyên cho mối quan hệ</li>
                <li>• Dự báo dài hạn</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">✨ Tính năng Premium:</h3>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Phân tích chi tiết theo từng loại</li>
                <li>• Lời khuyên cá nhân hóa</li>
                <li>• Gợi ý hoạt động chung</li>
                <li>• Phân tích giao tiếp</li>
                <li>• Tiềm năng dài hạn</li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mystical-button flex items-center justify-center space-x-2 text-lg py-4"
          >
            <Heart className="w-6 h-6" />
            <span>Phân Tích Tương Hợp</span>
          </button>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {isLoading && (
            <div className="mystical-card text-center py-12">
              <div className="relative mx-auto w-16 h-16 mb-6">
                <motion.div
                  className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <Heart className="absolute inset-0 m-auto w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-yellow-500 text-lg font-medium">Đang phân tích tương hợp...</p>
              <p className="text-gray-400 text-sm mt-2">Tính toán sự hài hòa giữa hai người</p>
            </div>
          )}

          {error && (
            <div className="mystical-card text-center py-8">
              <p className="text-red-400 mb-4">Có lỗi xảy ra khi phân tích tương hợp</p>
              <button onClick={resetForm} className="mystical-button">
                Thử lại
              </button>
            </div>
          )}

          {data && data.success && (
            <div className="space-y-6">
              {/* Header */}
              <div className="mystical-card text-center">
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">Kết Quả Tương Hợp Thần Số Học</h2>
                <div className="flex items-center justify-center space-x-4 text-gray-300">
                  <span>{formData.person1.name}</span>
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span>{formData.person2.name}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Loại phân tích: {analysisTypes.find((t) => t.id === formData.analysisType)?.name}
                </p>
              </div>

              {/* Overall Score */}
              <div className="mystical-card text-center">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">Điểm Tương Hợp Tổng Thể</h3>
                <div
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getScoreBackground(data.data.overallScore)} border-2 mb-4`}
                >
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(data.data.overallScore)}`}>
                      {data.data.overallScore}
                    </div>
                    <div className="text-sm text-gray-300">/ 100</div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-white mb-2">{data.data.overallRating}</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${
                      data.data.overallScore >= 80
                        ? "from-green-500 to-emerald-500"
                        : data.data.overallScore >= 65
                          ? "from-yellow-500 to-amber-500"
                          : data.data.overallScore >= 50
                            ? "from-orange-500 to-red-500"
                            : "from-red-500 to-pink-500"
                    }`}
                    style={{ width: `${data.data.overallScore}%` }}
                  />
                </div>
              </div>

              {/* Compatibility Types */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="mystical-card text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400 mb-1">{data.data.romanticCompatibility}</div>
                  <div className="text-sm text-gray-300">Tình Yêu</div>
                </div>
                <div className="mystical-card text-center">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400 mb-1">{data.data.friendshipCompatibility}</div>
                  <div className="text-sm text-gray-300">Tình Bạn</div>
                </div>
                <div className="mystical-card text-center">
                  <Briefcase className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400 mb-1">{data.data.businessCompatibility}</div>
                  <div className="text-sm text-gray-300">Kinh Doanh</div>
                </div>
              </div>

              {/* Detailed Compatibility Analysis */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Life Path Compatibility */}
                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Số Đường Đời - {data.data.lifePathCompatibility.score}/100</span>
                  </h3>
                  <div className="space-y-3">
                    <div className={`w-full bg-gray-700 rounded-full h-2`}>
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          data.data.lifePathCompatibility.score >= 80
                            ? "from-green-500 to-emerald-500"
                            : data.data.lifePathCompatibility.score >= 65
                              ? "from-yellow-500 to-amber-500"
                              : data.data.lifePathCompatibility.score >= 50
                                ? "from-orange-500 to-red-500"
                                : "from-red-500 to-pink-500"
                        }`}
                        style={{ width: `${data.data.lifePathCompatibility.score}%` }}
                      />
                    </div>
                    <p className="text-gray-300 text-sm">{data.data.lifePathCompatibility.interpretation}</p>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                      <p className="text-yellow-400 text-sm">
                        <strong>💡 Lời khuyên:</strong> {data.data.lifePathCompatibility.advice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Destiny Compatibility */}
                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Số Định Mệnh - {data.data.destinyCompatibility.score}/100</span>
                  </h3>
                  <div className="space-y-3">
                    <div className={`w-full bg-gray-700 rounded-full h-2`}>
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          data.data.destinyCompatibility.score >= 80
                            ? "from-green-500 to-emerald-500"
                            : data.data.destinyCompatibility.score >= 65
                              ? "from-yellow-500 to-amber-500"
                              : data.data.destinyCompatibility.score >= 50
                                ? "from-orange-500 to-red-500"
                                : "from-red-500 to-pink-500"
                        }`}
                        style={{ width: `${data.data.destinyCompatibility.score}%` }}
                      />
                    </div>
                    <p className="text-gray-300 text-sm">{data.data.destinyCompatibility.interpretation}</p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-400 text-sm">
                        <strong>💡 Lời khuyên:</strong> {data.data.destinyCompatibility.advice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Soul Urge Compatibility */}
                {data.data.soulUrgeCompatibility && (
                  <div className="mystical-card">
                    <h3 className="text-lg font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Số Linh Hồn - {data.data.soulUrgeCompatibility.score}/100</span>
                    </h3>
                    <div className="space-y-3">
                      <div className={`w-full bg-gray-700 rounded-full h-2`}>
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            data.data.soulUrgeCompatibility.score >= 80
                              ? "from-green-500 to-emerald-500"
                              : data.data.soulUrgeCompatibility.score >= 65
                                ? "from-yellow-500 to-amber-500"
                                : data.data.soulUrgeCompatibility.score >= 50
                                  ? "from-orange-500 to-red-500"
                                  : "from-red-500 to-pink-500"
                          }`}
                          style={{ width: `${data.data.soulUrgeCompatibility.score}%` }}
                        />
                      </div>
                      <p className="text-gray-300 text-sm">{data.data.soulUrgeCompatibility.interpretation}</p>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                        <p className="text-purple-400 text-sm">
                          <strong>💡 Lời khuyên:</strong> {data.data.soulUrgeCompatibility.advice}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personality Compatibility */}
                {data.data.personalityCompatibility && (
                  <div className="mystical-card">
                    <h3 className="text-lg font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Số Cá Tính - {data.data.personalityCompatibility.score}/100</span>
                    </h3>
                    <div className="space-y-3">
                      <div className={`w-full bg-gray-700 rounded-full h-2`}>
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            data.data.personalityCompatibility.score >= 80
                              ? "from-green-500 to-emerald-500"
                              : data.data.personalityCompatibility.score >= 65
                                ? "from-yellow-500 to-amber-500"
                                : data.data.personalityCompatibility.score >= 50
                                  ? "from-orange-500 to-red-500"
                                  : "from-red-500 to-pink-500"
                          }`}
                          style={{ width: `${data.data.personalityCompatibility.score}%` }}
                        />
                      </div>
                      <p className="text-gray-300 text-sm">{data.data.personalityCompatibility.interpretation}</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                        <p className="text-cyan-400 text-sm">
                          <strong>💡 Lời khuyên:</strong> {data.data.personalityCompatibility.advice}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Strengths and Challenges */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-green-500 mb-4">🌟 Điểm Mạnh</h3>
                  <ul className="space-y-2">
                    {data.data.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-orange-500 mb-4">⚠️ Thách Thức</h3>
                  <ul className="space-y-2">
                    {data.data.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Communication Style */}
              {data.data.communicationStyle && (
                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Phong Cách Giao Tiếp</span>
                  </h3>
                  <p className="text-gray-300">{data.data.communicationStyle}</p>
                </div>
              )}

              {/* Relationship Advice */}
              {data.data.relationshipAdvice && data.data.relationshipAdvice.length > 0 && (
                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">💝 Lời Khuyên Cho Mối Quan Hệ</h3>
                  <ul className="space-y-3">
                    {data.data.relationshipAdvice.map((advice: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Insights for Premium */}
              {data.data.additionalInsights && (
                <div className="space-y-6">
                  {/* Romantic Insights */}
                  {data.data.additionalInsights.romanticInsights && (
                    <div className="mystical-card">
                      <h3 className="text-lg font-bold text-pink-500 mb-4 flex items-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>Phân Tích Tình Yêu Chi Tiết</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">💕 Mức độ thân mật:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.romanticInsights.intimacyLevel}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">💬 Giao tiếp tình cảm:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.romanticInsights.communicationInLove}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-white mb-2">🌹 Tiềm năng dài hạn:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.romanticInsights.longTermRomance}
                          </p>
                        </div>
                        {data.data.additionalInsights.romanticInsights.dateIdeas && (
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-white mb-2">💡 Gợi ý hẹn hò:</h4>
                            <ul className="space-y-1">
                              {data.data.additionalInsights.romanticInsights.dateIdeas.map(
                                (idea: string, index: number) => (
                                  <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                    <span className="text-pink-500 mt-0.5">•</span>
                                    <span>{idea}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Business Insights */}
                  {data.data.additionalInsights.businessInsights && (
                    <div className="mystical-card">
                      <h3 className="text-lg font-bold text-green-500 mb-4 flex items-center space-x-2">
                        <Briefcase className="w-5 h-5" />
                        <span>Phân Tích Kinh Doanh Chi Tiết</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">🏢 Phong cách làm việc:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.businessInsights.workingStyle}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">👑 Động lực lãnh đạo:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.businessInsights.leadershipDynamic}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-white mb-2">📈 Tiềm năng thành công:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.businessInsights.businessSuccess}
                          </p>
                        </div>
                        {data.data.additionalInsights.businessInsights.recommendedRoles && (
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-white mb-2">🎯 Vai trò được khuyến nghị:</h4>
                            <ul className="space-y-1">
                              {data.data.additionalInsights.businessInsights.recommendedRoles.map(
                                (role: string, index: number) => (
                                  <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                    <span className="text-green-500 mt-0.5">•</span>
                                    <span>{role}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Friendship Insights */}
                  {data.data.additionalInsights.friendshipInsights && (
                    <div className="mystical-card">
                      <h3 className="text-lg font-bold text-blue-500 mb-4 flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Phân Tích Tình Bạn Chi Tiết</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-white mb-2">🎉 Động lực xã hội:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.friendshipInsights.socialDynamic}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-2">⏰ Độ bền tình bạn:</h4>
                          <p className="text-gray-300 text-sm">
                            {data.data.additionalInsights.friendshipInsights.friendshipLongevity}
                          </p>
                        </div>
                        {data.data.additionalInsights.friendshipInsights.sharedInterests && (
                          <div>
                            <h4 className="font-semibold text-white mb-2">🤝 Sở thích chung:</h4>
                            <ul className="space-y-1">
                              {data.data.additionalInsights.friendshipInsights.sharedInterests.map(
                                (interest: string, index: number) => (
                                  <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span>{interest}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                        {data.data.additionalInsights.friendshipInsights.activitySuggestions && (
                          <div>
                            <h4 className="font-semibold text-white mb-2">🎯 Gợi ý hoạt động:</h4>
                            <ul className="space-y-1">
                              {data.data.additionalInsights.friendshipInsights.activitySuggestions.map(
                                (activity: string, index: number) => (
                                  <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                                    <span className="text-blue-500 mt-0.5">•</span>
                                    <span>{activity}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Long Term Potential */}
              {data.data.longTermPotential && (
                <div className="mystical-card">
                  <h3 className="text-lg font-bold text-yellow-500 mb-4">🔮 Tiềm Năng Dài Hạn</h3>
                  <p className="text-gray-300">{data.data.longTermPotential}</p>
                </div>
              )}

              {/* Limited Preview */}
              {data.isLimited && data.data.preview && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-500 font-medium">{data.data.preview}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={resetForm} className="mystical-button">
                  Phân Tích Mới
                </button>
                {data.isLimited && (
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
                    Nâng Cấp Premium
                  </button>
                )}
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all">
                  Lưu Kết Quả
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
