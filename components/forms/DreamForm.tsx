"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { Moon, Calendar, Heart, Sparkles, Eye, MessageCircle } from "lucide-react"

interface DreamSymbol {
  symbol: string
  meaning: string
  significance: string
}

interface DreamAnalysis {
  overallMeaning: string
  symbols: DreamSymbol[]
  emotionalAnalysis: {
    primaryEmotion: string
    emotionalState?: string
    advice?: string
    preview?: string
  }
  predictions?: string[]
  recommendations?: string[]
  luckyElements?: {
    colors: string[]
    numbers: number[]
    direction: string
    timeOfDay: string
  }
  spiritualMessage?: string
  preview?: string
}

const dreamTypes = [
  { value: "nightmare", label: "Ác mộng", icon: "😰" },
  { value: "flying", label: "Bay lượn", icon: "🕊️" },
  { value: "falling", label: "Rơi xuống", icon: "⬇️" },
  { value: "water", label: "Về nước", icon: "🌊" },
  { value: "animals", label: "Động vật", icon: "🐾" },
  { value: "people", label: "Người thân", icon: "👥" },
  { value: "death", label: "Cái chết", icon: "💀" },
  { value: "love", label: "Tình yêu", icon: "💕" },
  { value: "money", label: "Tiền bạc", icon: "💰" },
  { value: "other", label: "Khác", icon: "✨" },
]

const emotions = [
  { value: "happy", label: "Vui vẻ", color: "text-green-400" },
  { value: "scared", label: "Sợ hãi", color: "text-red-400" },
  { value: "confused", label: "Bối rối", color: "text-yellow-400" },
  { value: "peaceful", label: "Bình yên", color: "text-blue-400" },
  { value: "excited", label: "Hồi hộp", color: "text-purple-400" },
  { value: "sad", label: "Buồn bã", color: "text-gray-400" },
  { value: "angry", label: "Tức giận", color: "text-orange-400" },
  { value: "nostalgic", label: "Hoài niệm", color: "text-pink-400" },
]

export default function DreamForm() {
  const [formData, setFormData] = useState({
    dreamDescription: "",
    dreamDate: "",
    emotions: [] as string[],
    dreamType: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, error, isLoading } = useSWR(
    isSubmitted ? ["/dreams", formData] : null,
    ([url, data]) => apiClient.post(url, data).then((res) => res.data),
    {
      revalidateOnFocus: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.dreamDescription.trim()) {
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEmotionToggle = (emotion: string) => {
    setFormData((prev) => ({
      ...prev,
      emotions: prev.emotions.includes(emotion)
        ? prev.emotions.filter((e) => e !== emotion)
        : [...prev.emotions, emotion],
    }))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({ dreamDescription: "", dreamDate: "", emotions: [], dreamType: "" })
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!isSubmitted ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Dream Description */}
          <div className="mystical-card">
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-4">
              <MessageCircle className="w-5 h-5" />
              <span>Mô tả giấc mơ của bạn</span>
            </label>
            <textarea
              name="dreamDescription"
              value={formData.dreamDescription}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white resize-none"
              placeholder="Hãy mô tả chi tiết giấc mơ của bạn... Bạn thấy gì? Làm gì? Cảm thấy thế nào? Càng chi tiết càng tốt để AI có thể phân tích chính xác hơn."
            />
            <p className="text-sm text-gray-400 mt-2">
              💡 Mẹo: Mô tả càng chi tiết càng giúp AI phân tích chính xác hơn
            </p>
          </div>

          {/* Dream Type */}
          <div className="mystical-card">
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-4">
              <Eye className="w-5 h-5" />
              <span>Loại giấc mơ</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {dreamTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, dreamType: type.value }))}
                  className={`p-3 rounded-lg border transition-all text-center ${
                    formData.dreamType === type.value
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                      : "border-gray-600 hover:border-gray-500 text-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Emotions */}
          <div className="mystical-card">
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-4">
              <Heart className="w-5 h-5" />
              <span>Cảm xúc trong mơ</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion.value}
                  type="button"
                  onClick={() => handleEmotionToggle(emotion.value)}
                  className={`p-3 rounded-lg border transition-all text-center ${
                    formData.emotions.includes(emotion.value)
                      ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                      : "border-gray-600 hover:border-gray-500 text-gray-300"
                  }`}
                >
                  <div className={`font-medium ${emotion.color}`}>{emotion.label}</div>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">Có thể chọn nhiều cảm xúc</p>
          </div>

          {/* Dream Date */}
          <div className="mystical-card">
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-4">
              <Calendar className="w-5 h-5" />
              <span>Ngày mơ (tùy chọn)</span>
            </label>
            <input
              type="date"
              name="dreamDate"
              value={formData.dreamDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
            />
            <p className="text-sm text-gray-400 mt-2">
              Ngày mơ giúp AI phân tích theo chu kỳ âm lịch và năng lượng vũ trụ
            </p>
          </div>

          <button
            type="submit"
            className="w-full mystical-button flex items-center justify-center space-x-2 text-lg py-4"
          >
            <Moon className="w-6 h-6" />
            <span>Giải Mơ Ngay</span>
          </button>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {isLoading && (
            <div className="mystical-card text-center py-12">
              <div className="relative mx-auto w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <Moon className="absolute inset-0 m-auto w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-yellow-500 text-lg font-medium">AI đang phân tích giấc mơ của bạn...</p>
              <p className="text-gray-400 text-sm mt-2">Đang giải mã các biểu tượng và thông điệp từ tiềm thức</p>
            </div>
          )}

          {error && (
            <div className="mystical-card text-center py-8">
              <p className="text-red-400 mb-4">Có lỗi xảy ra khi giải mơ</p>
              <button onClick={resetForm} className="mystical-button">
                Thử lại
              </button>
            </div>
          )}

          {data && data.success && (
            <div className="space-y-6">
              {/* Overall Meaning */}
              <div className="mystical-card">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>Ý Nghĩa Tổng Quan</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">{data.data.overallMeaning}</p>
              </div>

              {/* Dream Symbols */}
              {data.data.symbols && data.data.symbols.length > 0 && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Biểu Tượng Trong Mơ</span>
                  </h3>
                  <div className="space-y-4">
                    {data.data.symbols.map((symbol: DreamSymbol, index: number) => (
                      <div key={index} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{symbol.symbol}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              symbol.significance === "Cao"
                                ? "bg-red-500/20 text-red-400"
                                : symbol.significance === "Trung bình"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {symbol.significance}
                          </span>
                        </div>
                        <p className="text-gray-300">{symbol.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotional Analysis */}
              {data.data.emotionalAnalysis && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Phân Tích Cảm Xúc</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Cảm xúc chủ đạo: </span>
                      <span className="text-white font-medium">{data.data.emotionalAnalysis.primaryEmotion}</span>
                    </div>
                    {data.data.emotionalAnalysis.emotionalState && (
                      <div>
                        <span className="text-gray-400">Trạng thái tâm lý: </span>
                        <span className="text-gray-300">{data.data.emotionalAnalysis.emotionalState}</span>
                      </div>
                    )}
                    {data.data.emotionalAnalysis.advice && (
                      <div>
                        <span className="text-gray-400">Lời khuyên: </span>
                        <span className="text-yellow-400">{data.data.emotionalAnalysis.advice}</span>
                      </div>
                    )}
                    {data.data.emotionalAnalysis.preview && (
                      <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-3">
                        <p className="text-yellow-500 font-medium">{data.data.emotionalAnalysis.preview}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Predictions */}
              {data.data.predictions && data.data.predictions.length > 0 && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🔮 Dự Đoán</h3>
                  <ul className="space-y-2">
                    {data.data.predictions.map((prediction: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{prediction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {data.data.recommendations && data.data.recommendations.length > 0 && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">💡 Lời Khuyên</h3>
                  <ul className="space-y-2">
                    {data.data.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-gray-300 flex items-start space-x-2">
                        <span className="text-yellow-500 mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Lucky Elements */}
              {data.data.luckyElements && (
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">🍀 Yếu Tố May Mắn</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Màu sắc:</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.data.luckyElements.colors.map((color: string) => (
                          <span key={color} className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Số may mắn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.data.luckyElements.numbers.map((number: number) => (
                          <span key={number} className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                            {number}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Hướng may mắn:</h4>
                      <span className="text-gray-300">{data.data.luckyElements.direction}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Thời điểm tốt:</h4>
                      <span className="text-gray-300">{data.data.luckyElements.timeOfDay}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Spiritual Message */}
              {data.data.spiritualMessage && (
                <div className="mystical-card bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">✨ Thông Điệp Tâm Linh</h3>
                  <p className="text-gray-300 italic leading-relaxed">{data.data.spiritualMessage}</p>
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
                  Giải Mơ Khác
                </button>
                {data.isLimited && (
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
                    Nâng Cấp Premium
                  </button>
                )}
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all">
                  Lưu Giấc Mơ
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
