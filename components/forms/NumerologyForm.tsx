"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { Calculator, User, Calendar, Sparkles, Star, TrendingUp, Heart } from "lucide-react"

interface NumerologyResult {
  coreNumbers: {
    lifePathNumber: number
    destinyNumber: number
    soulUrgeNumber?: number
    personalityNumber?: number
    birthdayNumber: number
    maturityNumber?: number
  }
  interpretations: {
    lifePath: any
    destiny: any
    soulUrge?: any
    personality?: any
    maturity?: any
  }
  luckyNumbers: number[]
  personalCycles?: {
    personalYear: number
    personalMonth: number
    personalDay: number
  }
  challenges?: any
  pinnacles?: any
  compatibility?: any
  yearlyForecast?: any
  advice?: string[]
  preview?: string
}

export default function NumerologyForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    analysisType: "complete",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, error, isLoading } = useSWR(
    isSubmitted ? ["/numerology", formData] : null,
    ([url, data]) => apiClient.post(url, data).then((res) => res.data),
    {
      revalidateOnFocus: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName.trim() && formData.birthDate) {
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
    setFormData({ fullName: "", birthDate: "", analysisType: "complete" })
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
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">Phân Tích Thần Số Học</h2>
            <p className="text-gray-300">Khám phá bí mật cuộc đời qua con số</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
              <p className="text-sm text-gray-400 mt-1">Sử dụng tên thật để có kết quả chính xác nhất</p>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
                <Calendar className="w-5 h-5" />
                <span>Ngày sinh</span>
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
              />
              <p className="text-sm text-gray-400 mt-1">Ngày sinh theo dương lịch</p>
            </div>
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
              <option value="basic">Phân tích cơ bản</option>
              <option value="love">Tập trung vào tình yêu</option>
              <option value="career">Tập trung vào sự nghiệp</option>
            </select>
          </div>

          {/* Info boxes */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">📊 Phân tích bao gồm:</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Số đường đời (Life Path)</li>
                <li>• Số định mệnh (Destiny)</li>
                <li>• Số linh hồn (Soul Urge)</li>
                <li>• Số cá tính (Personality)</li>
                <li>• Chu kỳ cá nhân hiện tại</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">✨ Tính năng Premium:</h3>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Phân tích đỉnh cao cuộc đời</li>
                <li>• Dự báo năm chi tiết</li>
                <li>• Tương hợp với người khác</li>
                <li>• Lời khuyên cá nhân hóa</li>
                <li>• Thách thức và cơ hội</li>
              </ul>
            </div>
          </div>

          <button type="submit" className="w-full mystical-button flex items-center justify-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Phân Tích Thần Số Học</span>
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
              <p className="text-yellow-500 text-lg font-medium">Đang tính toán thần số học...</p>
              <p className="text-gray-400 text-sm mt-2">Phân tích tên và ngày sinh của bạn</p>
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
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">Kết Quả Thần Số Học - {formData.fullName}</h2>
                <p className="text-gray-300">Ngày sinh: {new Date(formData.birthDate).toLocaleDateString("vi-VN")}</p>
              </div>

              {/* Core Numbers */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-6 flex items-center space-x-2">
                  <Star className="w-6 h-6" />
                  <span>Các Số Cốt Lõi</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {data.data.coreNumbers.lifePathNumber}
                    </div>
                    <div className="text-sm text-gray-300">Số Đường Đời</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{data.data.coreNumbers.destinyNumber}</div>
                    <div className="text-sm text-gray-300">Số Định Mệnh</div>
                  </div>
                  {data.data.coreNumbers.soulUrgeNumber && (
                    <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {data.data.coreNumbers.soulUrgeNumber}
                      </div>
                      <div className="text-sm text-gray-300">Số Linh Hồn</div>
                    </div>
                  )}
                  {data.data.coreNumbers.personalityNumber && (
                    <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                      <div className="text-3xl font-bold text-orange-400 mb-2">
                        {data.data.coreNumbers.personalityNumber}
                      </div>
                      <div className="text-sm text-gray-300">Số Cá Tính</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {data.data.coreNumbers.birthdayNumber}
                    </div>
                    <div className="text-sm text-gray-300">Số Ngày Sinh</div>
                  </div>
                </div>
              </div>

              {/* Life Path Interpretation */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">
                  🛤️ Số Đường Đời - {data.data.coreNumbers.lifePathNumber}
                </h3>
                <div className="space-y-4">
                  <p className="text-lg text-purple-400 font-medium">{data.data.interpretations.lifePath.meaning}</p>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Đặc điểm tính cách:</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.data.interpretations.lifePath.traits?.map((trait: string, index: number) => (
                        <span key={index} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  {data.data.interpretations.lifePath.strengths && (
                    <div>
                      <h4 className="font-semibold text-white mb-2">Điểm mạnh:</h4>
                      <ul className="space-y-1">
                        {data.data.interpretations.lifePath.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-gray-300 flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-400">
                      <strong>💡 Lời khuyên:</strong> {data.data.interpretations.lifePath.advice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Destiny Number */}
              {data.data.interpretations.destiny && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">
                    🎯 Số Định Mệnh - {data.data.coreNumbers.destinyNumber}
                  </h3>
                  <div className="space-y-4">
                    <p className="text-lg text-blue-400 font-medium">{data.data.interpretations.destiny.meaning}</p>

                    <div>
                      <h4 className="font-semibold text-white mb-2">Đặc điểm:</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.data.interpretations.destiny.traits?.map((trait: string, index: number) => (
                          <span key={index} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    {data.data.interpretations.destiny.career && (
                      <div>
                        <h4 className="font-semibold text-white mb-2">Nghề nghiệp phù hợp:</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.data.interpretations.destiny.career.map((career: string, index: number) => (
                            <span key={index} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lucky Numbers */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>Số May Mắn</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.data.luckyNumbers.map((number: number) => (
                    <div
                      key={number}
                      className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-black font-bold text-lg"
                    >
                      {number}
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Sử dụng những con số này trong các quyết định quan trọng, chọn ngày tốt, hoặc làm số điện thoại, địa
                  chỉ.
                </p>
              </div>

              {/* Personal Cycles */}
              {data.data.personalCycles && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6" />
                    <span>Chu Kỳ Cá Nhân Hiện Tại</span>
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30">
                      <div className="text-2xl font-bold text-indigo-400 mb-2">
                        {data.data.personalCycles.personalYear}
                      </div>
                      <div className="text-sm text-gray-300">Năm Cá Nhân</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-500/30">
                      <div className="text-2xl font-bold text-teal-400 mb-2">
                        {data.data.personalCycles.personalMonth}
                      </div>
                      <div className="text-sm text-gray-300">Tháng Cá Nhân</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-lg border border-pink-500/30">
                      <div className="text-2xl font-bold text-pink-400 mb-2">
                        {data.data.personalCycles.personalDay}
                      </div>
                      <div className="text-sm text-gray-300">Ngày Cá Nhân</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Yearly Forecast */}
              {data.data.yearlyForecast && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🔮 Dự Báo Năm {new Date().getFullYear()}</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-400 mb-2">Chủ đề năm:</h4>
                      <p className="text-gray-300">{data.data.yearlyForecast.theme}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">🌟 Cơ hội:</h4>
                        <ul className="space-y-1">
                          {data.data.yearlyForecast.opportunities?.map((opportunity: string, index: number) => (
                            <li key={index} className="text-gray-300 flex items-start space-x-2">
                              <span className="text-green-500 mt-0.5">•</span>
                              <span>{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-orange-400 mb-2">⚠️ Thách thức:</h4>
                        <ul className="space-y-1">
                          {data.data.yearlyForecast.challenges?.map((challenge: string, index: number) => (
                            <li key={index} className="text-gray-300 flex items-start space-x-2">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <p className="text-yellow-400">
                        <strong>💡 Lời khuyên cho năm:</strong> {data.data.yearlyForecast.advice}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Compatibility */}
              {data.data.compatibility && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Heart className="w-6 h-6" />
                    <span>Tương Hợp Số Học</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">💚 Rất tương hợp:</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.data.compatibility.mostCompatible?.map((number: number) => (
                          <span
                            key={number}
                            className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold"
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">💙 Tương hợp:</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.data.compatibility.compatible?.map((number: number) => (
                          <span
                            key={number}
                            className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-semibold"
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">💔 Thách thức:</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.data.compatibility.challenging?.map((number: number) => (
                          <span
                            key={number}
                            className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-semibold"
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Advice */}
              {data.data.advice && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🎯 Lời Khuyên Cá Nhân</h3>
                  <ul className="space-y-3">
                    {data.data.advice.map((advice: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
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
