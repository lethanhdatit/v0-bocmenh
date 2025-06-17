"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import WealthCornerForm from "@/components/forms/WealthCornerForm"
import type { WealthAnalysis } from "@/lib/wealthCorner"

export default function WealthCornerPage() {
  const [showForm, setShowForm] = useState(false)
  const [analysis, setAnalysis] = useState<WealthAnalysis | null>(null)

  const wealthObjects = [
    { name: "Cây kim tiền", icon: "🌿", description: "Thu hút tài lộc và thịnh vượng" },
    { name: "Rồng vàng", icon: "🐉", description: "Biểu tượng quyền lực và giàu có" },
    { name: "Thuyền buồm", icon: "⛵", description: "Mang lại cơ hội kinh doanh" },
    { name: "Pi Yao", icon: "🦁", description: "Bảo vệ và thu hút tài chính" },
    { name: "Thác nước", icon: "💧", description: "Dòng chảy tài chính liên tục" },
    { name: "Pha lê tím", icon: "💎", description: "Tăng cường năng lượng tài lộc" },
  ]

  const benefits = [
    "Thu hút tài lộc và cơ hội kinh doanh",
    "Tăng cường dòng chảy tài chính",
    "Cải thiện vận may trong đầu tư",
    "Bảo vệ tài sản khỏi thất thoát",
    "Mang lại sự thịnh vượng lâu dài",
    "Tạo năng lượng tích cực cho công việc",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            💰
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/fengshui" className="text-yellow-600 hover:text-yellow-700 transition-colors">
                  ← Quay lại Phong Thủy
                </Link>
                <div className="h-6 w-px bg-yellow-300"></div>
                <h1 className="text-2xl font-bold text-gray-800">Góc Tài Lộc</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!showForm ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Hero Section */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  💰
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Phân Tích Góc Tài Lộc</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Khám phá và kích hoạt góc tài lộc trong không gian sống của bạn để thu hút thịnh vượng và cơ hội kinh
                  doanh theo nguyên lý phong thủy truyền thống.
                </p>
              </div>

              {/* What is Wealth Corner */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-yellow-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Góc Tài Lộc là gì?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🧭 Định nghĩa</h3>
                    <p className="text-gray-600 mb-4">
                      Góc tài lộc là khu vực trong không gian sống được xác định dựa trên hướng nhà, số Kua cá nhân và
                      vị trí sao bay, có khả năng thu hút và tích tụ năng lượng tài chính tích cực.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">⭐ Nguyên lý</h3>
                    <p className="text-gray-600">
                      Theo phong thủy, mỗi người có hướng tài lộc riêng dựa trên năm sinh và giới tính. Kết hợp với góc
                      Đông Nam truyền thống và sao bay hàng năm để tạo ra phân tích toàn diện.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Lợi ích</h3>
                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-yellow-500 mr-2">✓</span>
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Wealth Objects */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-yellow-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Vật Phẩm Phong Thủy Tài Lộc</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wealthObjects.map((object, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200 text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="text-4xl mb-3">{object.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{object.name}</h3>
                      <p className="text-sm text-gray-600">{object.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How it Works */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-yellow-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cách Thức Hoạt Động</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Nhập thông tin</h3>
                    <p className="text-gray-600">Cung cấp năm sinh, giới tính, hướng nhà và loại phòng cần phân tích</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Phân tích toàn diện</h3>
                    <p className="text-gray-600">Hệ thống tính toán dựa trên số Kua, góc truyền thống và sao bay</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Nhận kết quả</h3>
                    <p className="text-gray-600">Nhận được phân tích chi tiết và hướng dẫn kích hoạt góc tài lộc</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-amber-700 transition-colors shadow-lg"
                >
                  Bắt Đầu Phân Tích Góc Tài Lộc
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-yellow-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Phân Tích Góc Tài Lộc</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Quay lại tổng quan
                  </button>
                </div>
                <WealthCornerForm onAnalysisComplete={setAnalysis} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
