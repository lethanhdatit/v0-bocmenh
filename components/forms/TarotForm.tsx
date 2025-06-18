"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api/apiClient"
import { Sparkles, Heart, Briefcase, SnowflakeIcon as Crystal, Shuffle } from "lucide-react"
import TarotCard from "@/components/tarot/TarotCard"

interface TarotReading {
  spread: {
    id: string
    name: string
    description: string
    cardCount: number
  }
  cards: Array<{
    id: number
    name: string
    nameVi: string
    isReversed: boolean
    interpretation: {
      keywords: string[]
      meaning: string
    }
    positionMeaning: string
  }>
  overallReading: string
  advice?: string[]
  luckyPeriod?: {
    period: string
    activities: string[]
  }
  preview?: string
}

const spreadTypes = [
  {
    id: "single",
    name: "Một Lá Bài",
    description: "Câu trả lời nhanh cho câu hỏi của bạn",
    icon: Crystal,
    cardCount: 1,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "three-card",
    name: "Ba Lá Bài",
    description: "Quá khứ - Hiện tại - Tương lai",
    icon: Sparkles,
    cardCount: 3,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "love",
    name: "Tình Yêu",
    description: "Tình hình tình cảm và mối quan hệ",
    icon: Heart,
    cardCount: 3,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "career",
    name: "Sự Nghiệp",
    description: "Con đường sự nghiệp và tài chính",
    icon: Briefcase,
    cardCount: 3,
    color: "from-green-500 to-emerald-500",
  },
]

export default function TarotForm() {
  const [step, setStep] = useState<"question" | "spread" | "cards" | "reading">("question")
  const [formData, setFormData] = useState({
    question: "",
    spreadType: "",
  })
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  const selectedSpread = spreadTypes.find((s) => s.id === formData.spreadType)

  const { data, error, isLoading } = useSWR(
    step === "reading" ? ["/tarot", { ...formData, selectedCards }] : null,
    ([url, data]) => apiClient.post(url, data).then((res) => res.data),
    {
      revalidateOnFocus: false,
    },
  )

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.question.trim()) {
      setStep("spread")
    }
  }

  const handleSpreadSelect = (spreadId: string) => {
    setFormData((prev) => ({ ...prev, spreadType: spreadId }))
    setStep("cards")
  }

  const handleShuffle = () => {
    setIsShuffling(true)
    setSelectedCards([])
    setFlippedCards([])

    setTimeout(() => {
      const cards: number[] = []
      const spread = spreadTypes.find((s) => s.id === formData.spreadType)
      if (spread) {
        while (cards.length < spread.cardCount) {
          const randomCard = Math.floor(Math.random() * 22) + 1 // Major Arcana only
          if (!cards.includes(randomCard)) {
            cards.push(randomCard)
          }
        }
        setSelectedCards(cards)
      }
      setIsShuffling(false)
    }, 2000)
  }

  const handleCardFlip = (index: number) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index])

      // If all cards are flipped, start the reading
      if (flippedCards.length + 1 === selectedCards.length) {
        setTimeout(() => {
          setStep("reading")
        }, 1000)
      }
    }
  }

  const resetReading = () => {
    setStep("question")
    setFormData({ question: "", spreadType: "" })
    setSelectedCards([])
    setFlippedCards([])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: Question */}
        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mystical-card text-center"
          >
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">Đặt Câu Hỏi Cho Tarot</h2>
            <form onSubmit={handleQuestionSubmit} className="space-y-6">
              <div>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData((prev) => ({ ...prev, question: e.target.value }))}
                  placeholder="Hãy đặt câu hỏi cụ thể cho các lá bài Tarot... Ví dụ: 'Tình yêu của tôi sẽ như thế nào trong thời gian tới?' hoặc 'Tôi nên làm gì để phát triển sự nghiệp?'"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white resize-none"
                  required
                />
              </div>
              <button type="submit" className="mystical-button">
                Tiếp Tục
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 2: Spread Selection */}
        {step === "spread" && (
          <motion.div
            key="spread"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">Chọn Cách Bài</h2>
              <p className="text-gray-300">Mỗi cách bài sẽ cho bạn góc nhìn khác nhau về câu hỏi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spreadTypes.map((spread) => (
                <motion.div
                  key={spread.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSpreadSelect(spread.id)}
                  className="mystical-card cursor-pointer group hover:border-yellow-500/50"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${spread.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <spread.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                        {spread.name}
                      </h3>
                      <p className="text-sm text-gray-400">{spread.cardCount} lá bài</p>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{spread.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Card Selection */}
        {step === "cards" && selectedSpread && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-yellow-500 mb-2">Rút Bài Tarot</h2>
              <p className="text-gray-300 mb-4">
                Cách bài: <span className="text-yellow-500 font-semibold">{selectedSpread.name}</span>
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Hãy tập trung vào câu hỏi của bạn và nhấn "Xáo Bài" để bắt đầu
              </p>
            </div>

            {selectedCards.length === 0 ? (
              <div className="text-center">
                <motion.button
                  onClick={handleShuffle}
                  disabled={isShuffling}
                  className="mystical-button text-lg px-8 py-4 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shuffle className="w-6 h-6 mr-2" />
                  {isShuffling ? "Đang xáo bài..." : "Xáo Bài"}
                </motion.button>

                {isShuffling && (
                  <motion.div
                    className="mt-8 flex justify-center space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-20 h-32 bg-gradient-to-br from-purple-900 to-indigo-900 border border-yellow-500/50 rounded-lg"
                        animate={{
                          y: [0, -20, 0],
                          rotateZ: [0, Math.random() * 20 - 10, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-yellow-500 font-medium mb-4">
                    Nhấn vào từng lá bài để lật mở ({flippedCards.length}/{selectedCards.length})
                  </p>
                </div>

                <div className="flex justify-center space-x-6">
                  {selectedCards.map((cardId, index) => (
                    <div key={index} className="text-center">
                      <TarotCard
                        isFlipped={flippedCards.includes(index)}
                        onFlip={() => handleCardFlip(index)}
                        delay={index * 0.2}
                        size="large"
                      />
                      <p className="text-sm text-gray-400 mt-2">
                        {selectedSpread.id === "three-card"
                          ? ["Quá khứ", "Hiện tại", "Tương lai"][index]
                          : selectedSpread.id === "love"
                            ? ["Tình cảm", "Thách thức", "Kết quả"][index]
                            : selectedSpread.id === "career"
                              ? ["Hiện tại", "Cơ hội", "Lời khuyên"][index]
                              : "Câu trả lời"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Reading Results */}
        {step === "reading" && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {isLoading && (
              <div className="mystical-card text-center py-12">
                <div className="relative mx-auto w-16 h-16 mb-6">
                  <motion.div
                    className="absolute inset-0 border-4 border-yellow-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-yellow-500 text-lg font-medium">Đang giải mã các lá bài...</p>
                <p className="text-gray-400 text-sm mt-2">Vũ trụ đang truyền tải thông điệp cho bạn</p>
              </div>
            )}

            {error && (
              <div className="mystical-card text-center py-8">
                <p className="text-red-400 mb-4">Có lỗi xảy ra khi giải bài</p>
                <button onClick={resetReading} className="mystical-button">
                  Thử lại
                </button>
              </div>
            )}

            {data && data.success && (
              <div className="space-y-6">
                {/* Question Recap */}
                <div className="mystical-card">
                  <h2 className="text-xl font-bold text-yellow-500 mb-2">Câu Hỏi Của Bạn</h2>
                  <p className="text-gray-300 italic">"{formData.question}"</p>
                  <p className="text-sm text-gray-400 mt-2">Cách bài: {data.data.spread.name}</p>
                </div>

                {/* Cards Display */}
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-6">Các Lá Bài Của Bạn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.data.cards.map((card: any, index: number) => (
                      <div key={index} className="text-center space-y-4">
                        <div className="flex justify-center">
                          <TarotCard card={card} isFlipped={true} size="medium" showBack={false} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{card.positionMeaning}</h4>
                          <h5 className="text-yellow-500 font-medium mb-2">
                            {card.nameVi} {card.isReversed && "(Ngược)"}
                          </h5>
                          <div className="flex flex-wrap justify-center gap-1 mb-2">
                            {card.interpretation.keywords.map((keyword: string) => (
                              <span
                                key={keyword}
                                className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-300 text-sm">{card.interpretation.meaning}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall Reading */}
                <div className="mystical-card">
                  <h3 className="text-xl font-bold text-yellow-500 mb-4">Tổng Quan</h3>
                  <p className="text-gray-300 leading-relaxed">{data.data.overallReading}</p>
                </div>

                {/* Advice */}
                {data.data.advice && (
                  <div className="mystical-card">
                    <h3 className="text-xl font-bold text-yellow-500 mb-4">Lời Khuyên</h3>
                    <ul className="space-y-2">
                      {data.data.advice.map((advice: string, index: number) => (
                        <li key={index} className="text-gray-300 flex items-start space-x-2">
                          <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{advice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lucky Period */}
                {data.data.luckyPeriod && (
                  <div className="mystical-card">
                    <h3 className="text-xl font-bold text-yellow-500 mb-4">Thời Kỳ May Mắn</h3>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-yellow-500 font-medium">Thời gian:</span> {data.data.luckyPeriod.period}
                      </p>
                      <div>
                        <span className="text-yellow-500 font-medium">Hoạt động thuận lợi:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {data.data.luckyPeriod.activities.map((activity: string) => (
                            <span
                              key={activity}
                              className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
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
                  <button onClick={resetReading} className="mystical-button">
                    Rút Bài Mới
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
      </AnimatePresence>
    </div>
  )
}
