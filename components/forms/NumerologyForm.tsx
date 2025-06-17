"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { Calculator, User, Calendar, Sparkles, Star, TrendingUp, Heart } from "lucide-react"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
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
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">{t("numerology.form.title")}</h2>
            <p className="text-gray-300">{t("numerology.form.description")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
                <User className="w-5 h-5" />
                <span>{t("numerology.form.fullName")}</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
                placeholder={t("numerology.form.fullNamePlaceholder")}
              />
              <p className="text-sm text-gray-400 mt-1">{t("numerology.form.fullNameHint")}</p>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
                <Calendar className="w-5 h-5" />
                <span>{t("numerology.form.birthDate")}</span>
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
              />
              <p className="text-sm text-gray-400 mt-1">{t("numerology.form.birthDateHint")}</p>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
              <Calculator className="w-5 h-5" />
              <span>{t("numerology.form.analysisType")}</span>
            </label>
            <select
              name="analysisType"
              value={formData.analysisType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
            >
              <option value="complete">{t("numerology.form.analysisComplete")}</option>
              <option value="basic">{t("numerology.form.analysisBasic")}</option>
              <option value="love">{t("numerology.form.analysisLove")}</option>
              <option value="career">{t("numerology.form.analysisCareer")}</option>
            </select>
          </div>

          {/* Info boxes */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">📊 {t("destiny.form.infoTitle")}</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• {t("numerology.result.lifePathNumber")}</li>
                <li>• {t("numerology.result.destinyNumber")}</li>
                <li>• {t("numerology.result.soulUrgeNumber")}</li>
                <li>• {t("numerology.result.personalityNumber")}</li>
                <li>• {t("numerology.result.personalCycles")}</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-2">✨ {t("destiny.form.premiumTitle")}</h3>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Phân tích đỉnh cao cuộc đời</li>
                <li>• {t("numerology.result.yearlyForecast")}</li>
                <li>• {t("numerology.result.compatibility")}</li>
                <li>• {t("numerology.result.advice")}</li>
                <li>• Thách thức và cơ hội</li>
              </ul>
            </div>
          </div>

          <button type="submit" className="w-full mystical-button flex items-center justify-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>{t("numerology.form.submitButton")}</span>
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
              <p className="text-yellow-500 text-lg font-medium">{t("numerology.result.loading")}</p>
              <p className="text-gray-400 text-sm mt-2">{t("numerology.result.loadingSubtext")}</p>
            </div>
          )}

          {error && (
            <div className="mystical-card text-center py-8">
              <p className="text-red-400 mb-4">{t("common.error")}</p>
              <button onClick={resetForm} className="mystical-button">
                {t("common.retry")}
              </button>
            </div>
          )}

          {data && data.success && (
            <div className="space-y-6">
              {/* Header */}
              <div className="mystical-card text-center">
                <h2 className="text-2xl font-bold text-yellow-500 mb-2">
                  {t("numerology.result.coreNumbers")} - {formData.fullName}
                </h2>
                <p className="text-gray-300">
                  {t("numerology.form.birthDate")}: {new Date(formData.birthDate).toLocaleDateString("vi-VN")}
                </p>
              </div>

              {/* Core Numbers */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-6 flex items-center space-x-2">
                  <Star className="w-6 h-6" />
                  <span>{t("numerology.result.coreNumbers")}</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {data.data.coreNumbers.lifePathNumber}
                    </div>
                    <div className="text-sm text-gray-300">{t("numerology.result.lifePathNumber")}</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{data.data.coreNumbers.destinyNumber}</div>
                    <div className="text-sm text-gray-300">{t("numerology.result.destinyNumber")}</div>
                  </div>
                  {data.data.coreNumbers.soulUrgeNumber && (
                    <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {data.data.coreNumbers.soulUrgeNumber}
                      </div>
                      <div className="text-sm text-gray-300">{t("numerology.result.soulUrgeNumber")}</div>
                    </div>
                  )}
                  {data.data.coreNumbers.personalityNumber && (
                    <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                      <div className="text-3xl font-bold text-orange-400 mb-2">
                        {data.data.coreNumbers.personalityNumber}
                      </div>
                      <div className="text-sm text-gray-300">{t("numerology.result.personalityNumber")}</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {data.data.coreNumbers.birthdayNumber}
                    </div>
                    <div className="text-sm text-gray-300">{t("numerology.result.birthdayNumber")}</div>
                  </div>
                </div>
              </div>

              {/* Life Path Interpretation */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">
                  🛤️ {t("numerology.result.lifePathNumber")} - {data.data.coreNumbers.lifePathNumber}
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

              {/* Lucky Numbers */}
              <div className="mystical-card">
                <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>{t("numerology.result.luckyNumbers")}</span>
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
                    <span>{t("numerology.result.personalCycles")}</span>
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30">
                      <div className="text-2xl font-bold text-indigo-400 mb-2">
                        {data.data.personalCycles.personalYear}
                      </div>
                      <div className="text-sm text-gray-300">{t("numerology.result.personalYear")}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-500/30">
                      <div className="text-2xl font-bold text-teal-400 mb-2">
                        {data.data.personalCycles.personalMonth}
                      </div>
                      <div className="text-sm text-gray-300">{t("numerology.result.personalMonth")}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-lg border border-pink-500/30">
                      <div className="text-2xl font-bold text-pink-400 mb-2">
                        {data.data.personalCycles.personalDay}
                      </div>
                      <div className="text-sm text-gray-300">{t("numerology.result.personalDay")}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Yearly Forecast */}
              {data.data.yearlyForecast && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">
                    🔮 {t("numerology.result.yearlyForecast")} {new Date().getFullYear()}
                  </h3>
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
                    <span>{t("numerology.result.compatibility")}</span>
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
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🎯 {t("numerology.result.advice")}</h3>
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
                  {t("numerology.result.newAnalysis")}
                </button>
                {data.isLimited && (
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
                    {t("auth.premium.upgrade")}
                  </button>
                )}
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all">
                  {t("common.save")}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
