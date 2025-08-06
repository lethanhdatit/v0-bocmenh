"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PalmistryForm from "@/components/forms/PalmistryForm"
import type { PalmReading } from "@/lib/palmistry"

export default function PalmistryPageClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [analysis, setAnalysis] = useState<PalmReading | null>(null)

  const tabs = [
    { id: "overview", label: "Tổng Quan", icon: "🖐️" },
    { id: "lines", label: "Đường Chính", icon: "📏" },
    { id: "types", label: "Dạng Bàn Tay", icon: "✋" },
    { id: "analyze", label: "Phân Tích", icon: "🔮" },
  ]

  const majorLines = [
    {
      name: "Đường Đời",
      icon: "📏",
      description: "Thể hiện sức khỏe, tuổi thọ và năng lượng sống",
      color: "text-green-400",
    },
    {
      name: "Đường Tình",
      icon: "💖",
      description: "Cho biết về tình yêu, cảm xúc và mối quan hệ",
      color: "text-pink-400",
    },
    {
      name: "Đường Trí",
      icon: "🧠",
      description: "Phản ánh trí tuệ, tư duy và cách ra quyết định",
      color: "text-blue-400",
    },
    {
      name: "Đường Vận Mệnh",
      icon: "🌟",
      description: "Liên quan đến sự nghiệp, thành công và định mệnh",
      color: "text-yellow-400",
    },
  ]

  const handTypes = [
    {
      name: "Bàn Tay Đất",
      element: "🌍",
      traits: "Thực tế, ổn định, đáng tin cậy",
      careers: "Xây dựng, nông nghiệp, kỹ thuật",
    },
    {
      name: "Bàn Tay Khí",
      element: "💨",
      traits: "Giao tiếp tốt, sáng tạo, thông minh",
      careers: "Truyền thông, giáo dục, tư vấn",
    },
    {
      name: "Bàn Tay Hỏa",
      element: "🔥",
      traits: "Năng động, nhiệt huyết, lãnh đạo",
      careers: "Kinh doanh, bán hàng, thể thao",
    },
    {
      name: "Bàn Tay Thủy",
      element: "💧",
      traits: "Nhạy cảm, trực giác, nghệ thuật",
      careers: "Nghệ thuật, âm nhạc, tâm lý học",
    },
  ]

  const handleAnalysis = (newAnalysis: PalmReading) => {
    setAnalysis(newAnalysis)
    setActiveTab("analyze")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              rotate: 360,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {["🖐️", "✋", "🤚", "👋", "🙏"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">🖐️ Xem Tướng Bàn Tay</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Khám phá bí mật cuộc đời qua những đường nét trên bàn tay của bạn
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id ? "bg-white text-purple-900" : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Xem Tướng Bàn Tay Là Gì?</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">🔮 Nghệ Thuật Cổ Xưa</h3>
                    <p className="text-white/80 leading-relaxed">
                      Xem tướng bàn tay (Palmistry) là một nghệ thuật cổ xưa, được sử dụng để đọc tính cách, vận mệnh và
                      tương lai của một người thông qua việc phân tích các đường nét, hình dạng và đặc điểm trên bàn
                      tay.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">📚 Lợi Ích</h3>
                    <ul className="text-white/80 space-y-2">
                      <li>• Hiểu rõ hơn về tính cách bản thân</li>
                      <li>• Khám phá tiềm năng và tài năng</li>
                      <li>• Định hướng sự nghiệp phù hợp</li>
                      <li>• Cải thiện mối quan hệ cá nhân</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("analyze")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  🔮 Bắt Đầu Xem Tướng
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === "lines" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">4 Đường Chính Trên Bàn Tay</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {majorLines.map((line, index) => (
                  <motion.div
                    key={line.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{line.icon}</span>
                      <h3 className={`text-xl font-bold ${line.color}`}>{line.name}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">{line.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "types" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">4 Dạng Bàn Tay Cơ Bản</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {handTypes.map((type, index) => (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{type.element}</span>
                      <h3 className="text-xl font-bold text-white">{type.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-purple-300 font-medium">Tính cách: </span>
                        <span className="text-white/80">{type.traits}</span>
                      </div>
                      <div>
                        <span className="text-blue-300 font-medium">Nghề nghiệp: </span>
                        <span className="text-white/80">{type.careers}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analyze" && (
            <div className="max-w-4xl mx-auto">
              {!analysis ? (
                <PalmistryForm onAnalysis={handleAnalysis} />
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  {/* Hand Type */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">🖐️ Dạng Bàn Tay Của Bạn</h3>
                    <div className="text-center mb-6">
                      <h4 className="text-3xl font-bold text-purple-300 mb-2">{analysis.handType.name}</h4>
                      <p className="text-white/80 text-lg">{analysis.handType.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-lg font-semibold text-pink-300 mb-3">Tính Cách</h5>
                        <ul className="text-white/80 space-y-1">
                          {analysis.handType.personality.map((trait, index) => (
                            <li key={index}>• {trait}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold text-blue-300 mb-3">Nghề Nghiệp Phù Hợp</h5>
                        <ul className="text-white/80 space-y-1">
                          {analysis.handType.career.map((career, index) => (
                            <li key={index}>• {career}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Lines Analysis */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">📏 Phân Tích Các Đường Chính</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(analysis.lines).map(([key, line]) => (
                        <div key={key} className="bg-white/5 rounded-xl p-4">
                          <h4 className="text-lg font-semibold text-white mb-2">{line.name}</h4>
                          <p className="text-white/70 text-sm mb-3">{line.description}</p>
                          <p className="text-white/80">
                            <span className="font-medium">Ý nghĩa: </span>
                            {line.meaning}
                          </p>
                          <div className="mt-3">
                            <span className="text-purple-300 font-medium">Đặc điểm: </span>
                            <span className="text-white/80">{line.characteristics.join(", ")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overall Analysis */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">🔮 Tổng Kết Phân Tích</h3>
                    <p className="text-white/80 text-lg leading-relaxed mb-6">{analysis.overall}</p>
                    <div>
                      <h4 className="text-xl font-semibold text-yellow-300 mb-4">💡 Lời Khuyên Cho Bạn</h4>
                      <ul className="text-white/80 space-y-2">
                        {analysis.advice.map((advice, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-yellow-400 mr-2">•</span>
                            {advice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* New Analysis Button */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAnalysis(null)}
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      🔄 Phân Tích Lại
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
