"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { User, Calculator, Sparkles, Star, Heart, Briefcase, Palette, Calendar } from "lucide-react"

interface NameAnalysisResult {
  fullName: string
  coreNumbers: {
    destinyNumber: number
    personalityNumber: number
    soulUrgeNumber: number
    expressionNumber?: number
    heartDesireNumber?: number
  }
  nameVibration: string
  personalityTraits: string[]
  strengths?: string[]
  challenges?: string[]
  luckyColors: string[]
  luckyDays?: string[]
  careerSuggestions?: string[]
  relationshipCompatibility?: string[]
  cornerstone?: string
  capstone?: string
  firstVowel?: string
  hiddenPassionNumbers?: number[]
  karmicLessons?: number[]
  lifeAdvice?: string
  preview?: string
}

export default function NameAnalysisForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    analysisType: "complete",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, error, isLoading } = useSWR(
    isSubmitted ? ["/name-analysis", formData] : null,
    ([url, data]) => apiClient.post(url, data).then((res) => res.data),
    {
      revalidateOnFocus: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName.trim()) {
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({ fullName: "", analysisType: "complete" })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!isSubmitted ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mystical-card space-y-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">Phân Tích Thần Số Học Tên</h2>
            <p className="text-gray-300">Khám phá bí mật ẩn giấu trong tên của bạn</p>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
              <User className="w-5 h-5" />
              <span>Họ và tên đầy đủ</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
              placeholder="Nhập họ và tên đầy đủ của bạn"
            />
            <p className="text-sm text-gray-400 mt-1">
              Sử dụng tên thật để có kết quả chính xác nhất. Chỉ sử dụng chữ cái và khoảng trắng.
            </p>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
              <Calculator className="w-5 h-5" />
              <span>Loại phân tích</span>
            </label>
            <select
              name="analysisType"
              value={formData.analysisType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
            >
              <option value="complete">Phân tích đầy đủ</option>
              <option value="personality">Tập trung vào tính cách</option>
              <option value="career">Tập trung vào sự nghiệp</option>
              <option value="love">Tập trung vào tình yêu</option>
            </select>
          </div>

          {/* Info boxes */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">📊 Phân tích bao gồm:</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Số định mệnh (Destiny Number)</li>
                <li>• Số cá tính (Personality Number)</li>
                <li>• Số linh hồn (Soul Urge Number)</li>
                <li>• Chữ cái đầu và cuối tên</li>
                <li>• Năng lượng tên và màu sắc may mắn</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">✨ Tính năng Premium:</h3>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Số đam mê ẩn giấu</li>
                <li>• Bài học nghiệp quả</li>
                <li>• Tương hợp tình yêu chi tiết</li>
                <li>• Lời khuyên cá nhân hóa</li>
                <li>• Phân tích chữ cái đặc biệt</li>
              </ul>
            </div>
          </div>

          <button type="submit" className="w-full mystical-button flex items-center justify-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Phân Tích Tên</span>
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
                <Calculator className="absolute inset-0 m-auto w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-yellow-500 text-lg font-medium">Đang phân tích tên của bạn...</p>
              <p className="text-gray-400 text-sm mt-2">Tính toán các con số và năng lượng trong tên</p>
            </div>
          )}

          {error && (
            <div className="mystical-card text-center py-8">
              <p className="text-red-400 mb-4">Có lỗi xảy ra khi phân tích</p>
              <button onClick={resetForm} className="mystical-button">
                Thử lại
              </button>
            </div>
          )}

          {data && data.success && (
            <div className="space-y-6">
              {/* Header */}
              <div className="mystical-card text-center">
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">
                  Kết Quả Phân Tích Tên - {data.data.fullName}
                </h2>
                <p className="text-gray-300">{data.data.nameVibration}</p>
              </div>

              {/* Core Numbers */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-6 flex items-center space-x-2">
                  <Star className="w-6 h-6" />
                  <span>Các Số Cốt Lõi Trong Tên</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{data.data.coreNumbers.destinyNumber}</div>
                    <div className="text-sm text-gray-300">Số Định Mệnh</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {data.data.coreNumbers.personalityNumber}
                    </div>
                    <div className="text-sm text-gray-300">Số Cá Tính</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400 mb-2">{data.data.coreNumbers.soulUrgeNumber}</div>
                    <div className="text-sm text-gray-300">Số Linh Hồn</div>
                  </div>
                </div>
              </div>

              {/* Personality Traits */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                  <User className="w-6 h-6" />
                  <span>Đặc Điểm Tính Cách</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.data.personalityTraits.map((trait: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              {data.data.strengths && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Sparkles className="w-6 h-6" />
                    <span>Điểm Mạnh</span>
                  </h3>
                  <ul className="space-y-2">
                    {data.data.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges */}
              {data.data.challenges && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">⚠️ Thách Thức Cần Khắc Phục</h3>
                  <ul className="space-y-2">
                    {data.data.challenges.map((challenge: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lucky Elements */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Palette className="w-6 h-6" />
                    <span>Màu Sắc May Mắn</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.data.luckyColors.map((color: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm border border-yellow-500/30"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                {data.data.luckyDays && (
                  <div className="mystical-card">
                    <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                      <Calendar className="w-6 h-6" />
                      <span>Ngày May Mắn</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.data.luckyDays.map((day: string, index: number) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Career Suggestions */}
              {data.data.careerSuggestions && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Briefcase className="w-6 h-6" />
                    <span>Nghề Nghiệp Phù Hợp</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.data.careerSuggestions.map((career: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Relationship Compatibility */}
              {data.data.relationshipCompatibility && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Heart className="w-6 h-6" />
                    <span>Tương Hợp Tình Yêu</span>
                  </h3>
                  <ul className="space-y-2">
                    {data.data.relationshipCompatibility.map((compatibility: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span>{compatibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Special Letters */}
              {(data.data.cornerstone || data.data.capstone) && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🔤 Chữ Cái Đặc Biệt</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.data.cornerstone && (
                      <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-indigo-400 mb-2">Chữ cái đầu (Cornerstone):</h4>
                        <div className="text-2xl font-bold text-indigo-300 mb-2">{data.data.cornerstone}</div>
                        <p className="text-sm text-gray-300">Thể hiện cách bạn tiếp cận cuộc sống và thử thách</p>
                      </div>
                    )}
                    {data.data.capstone && (
                      <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-lg p-4">
                        <h4 className="font-semibold text-teal-400 mb-2">Chữ cái cuối (Capstone):</h4>
                        <div className="text-2xl font-bold text-teal-300 mb-2">{data.data.capstone}</div>
                        <p className="text-sm text-gray-300">Thể hiện cách bạn hoàn thành công việc và dự án</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hidden Passion Numbers */}
              {data.data.hiddenPassionNumbers && data.data.hiddenPassionNumbers.length > 0 && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🔥 Số Đam Mê Ẩn Giấu</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.data.hiddenPassionNumbers.map((number: number) => (
                      <div
                        key={number}
                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Những con số xuất hiện nhiều nhất trong tên, thể hiện đam mê và tài năng tự nhiên của bạn.
                  </p>
                </div>
              )}

              {/* Karmic Lessons */}
              {data.data.karmicLessons && data.data.karmicLessons.length > 0 && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">📚 Bài Học Nghiệp Quả</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.data.karmicLessons.map((number: number) => (
                      <div
                        key={number}
                        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Những con số không có trong tên, thể hiện các bài học cần phát triển trong cuộc đời.
                  </p>
                </div>
              )}

              {/* Life Advice */}
              {data.data.lifeAdvice && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">💡 Lời Khuyên Cuộc Đời</h3>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-yellow-400">{data.data.lifeAdvice}</p>
                  </div>
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
                  Phân Tích Tên Khác
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
