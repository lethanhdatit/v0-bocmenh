"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Calendar, Moon, Sparkles } from "lucide-react"

interface DreamEntry {
  id: string
  date: string
  title: string
  description: string
  emotions: string[]
  interpretation?: string
}

export default function DreamJournal() {
  const [dreams] = useState<DreamEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      title: "Giấc mơ bay lượn trên biển",
      description: "Tôi mơ thấy mình bay lượn trên một vùng biển xanh trong...",
      emotions: ["peaceful", "excited"],
      interpretation: "Khát vọng tự do và sự bình yên trong tâm hồn",
    },
    {
      id: "2",
      date: "2024-01-12",
      title: "Gặp người thân đã mất",
      description: "Trong mơ tôi gặp lại bà ngoại, bà nói chuyện với tôi...",
      emotions: ["nostalgic", "happy"],
      interpretation: "Sự kết nối tâm linh và tình yêu vĩnh cửu",
    },
  ])

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4 flex items-center justify-center space-x-2">
            <BookOpen className="w-8 h-8" />
            <span>Nhật Ký Giấc Mơ</span>
          </h2>
          <p className="text-gray-300">Theo dõi và phân tích các giấc mơ của bạn theo thời gian</p>
        </motion.div>

        <div className="space-y-6">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mystical-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Moon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{dream.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(dream.date).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                </div>
                <button className="text-yellow-500 hover:text-yellow-400 transition-colors">
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-2">{dream.description}</p>

              {dream.emotions.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {dream.emotions.map((emotion) => (
                    <span key={emotion} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {emotion}
                    </span>
                  ))}
                </div>
              )}

              {dream.interpretation && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <p className="text-yellow-400 text-sm font-medium">💡 Giải thích: {dream.interpretation}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="mystical-button">Xem Tất Cả Giấc Mơ</button>
        </div>
      </div>
    </section>
  )
}
