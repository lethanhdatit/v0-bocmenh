"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import LoveCornerForm from "@/components/forms/LoveCornerForm"
import type { LoveAnalysis } from "@/lib/loveCorner"

export default function LoveCornerPage() {
  const [showForm, setShowForm] = useState(false)
  const [analysis, setAnalysis] = useState<LoveAnalysis | null>(null)

  const loveObjects = [
    { name: "Đôi vịt uyên ương", icon: "🦆", description: "Biểu tượng tình yêu vĩnh cửu" },
    { name: "Thạch anh hồng", icon: "💎", description: "Thu hút tình yêu và hòa hợp" },
    { name: "Hoa mẫu đơn", icon: "🌺", description: "Mang lại hạnh phúc trong tình yêu" },
    { name: "Nến thơm", icon: "🕯️", description: "Tạo không gian lãng mạn" },
    { name: "Hoa hồng", icon: "🌹", description: "Biểu tượng tình yêu nồng nàn" },
    { name: "Chim uyên ương", icon: "🐦", description: "Gắn kết mối quan hệ bền vững" },
  ]

  const benefits = [
    "Thu hút tình yêu đích thực và chân thành",
    "Tăng cường sự hòa hợp trong mối quan hệ",
    "Cải thiện giao tiếp và hiểu biết lẫn nhau",
    "Mang lại hạnh phúc và niềm vui trong tình yêu",
    "Tạo không gian lãng mạn và ấm cúng",
    "Bảo vệ mối quan hệ khỏi những tác động tiêu cực",
  ]

  const relationshipTypes = [
    { status: "single", title: "Độc thân", icon: "💝", color: "from-purple-400 to-pink-400" },
    { status: "dating", title: "Hẹn hò", icon: "💕", color: "from-pink-400 to-rose-400" },
    { status: "married", title: "Đã kết hôn", icon: "💍", color: "from-rose-400 to-red-400" },
    { status: "complicated", title: "Phức tạp", icon: "💔", color: "from-gray-400 to-slate-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/fengshui" className="text-pink-600 hover:text-pink-700 transition-colors">
                  ← Quay lại Phong Thủy
                </Link>
                <div className="h-6 w-px bg-pink-300"></div>
                <h1 className="text-2xl font-bold text-gray-800">Góc Tình Yêu</h1>
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
                  💕
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Phân Tích Góc Tình Yêu</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Khám phá và kích hoạt góc tình yêu trong không gian sống để thu hút tình yêu đích thực, tăng cường hòa
                  hợp và mang lại hạnh phúc trong mối quan hệ theo nguyên lý phong thủy.
                </p>
              </div>

              {/* What is Love Corner */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Góc Tình Yêu là gì?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">💖 Định nghĩa</h3>
                    <p className="text-gray-600 mb-4">
                      Góc tình yêu là khu vực đặc biệt trong không gian sống, được xác định dựa trên hướng nhà, số Kua
                      cá nhân và vị trí sao bay, có khả năng thu hút và tăng cường năng lượng tình yêu tích cực.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">🌹 Nguyên lý</h3>
                    <p className="text-gray-600">
                      Theo phong thủy, góc Tây Nam là góc tình yêu truyền thống, nhưng mỗi người còn có hướng tình yêu
                      riêng dựa trên năm sinh. Kết hợp với sao bay để tạo ra phân tích toàn diện nhất.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">💝 Lợi ích</h3>
                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-pink-500 mr-2">💕</span>
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Relationship Types */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Phù Hợp Với Mọi Tình Trạng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relationshipTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-br ${type.color} p-6 rounded-xl text-white text-center hover:shadow-lg transition-shadow`}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                      <p className="text-sm opacity-90">
                        {type.status === "single" && "Tìm kiếm tình yêu đích thực"}
                        {type.status === "dating" && "Tăng cường mối quan hệ"}
                        {type.status === "married" && "Duy trì hạnh phúc gia đình"}
                        {type.status === "complicated" && "Hóa giải khó khăn"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Love Objects */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Vật Phẩm Phong Thủy Tình Yêu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loveObjects.map((object, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200 text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="text-4xl mb-3">{object.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{object.name}</h3>
                      <p className="text-sm text-gray-600">{object.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How it Works */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Cách Thức Hoạt Động</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Nhập thông tin</h3>
                    <p className="text-gray-600">
                      Cung cấp năm sinh, giới tính, hướng nhà và tình trạng mối quan hệ hiện tại
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Phân tích toàn diện</h3>
                    <p className="text-gray-600">
                      Hệ thống tính toán dựa trên số Kua, góc tình yêu truyền thống và sao bay tình yêu
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Nhận hướng dẫn</h3>
                    <p className="text-gray-600">
                      Nhận được phân tích chi tiết và lời khuyên cụ thể để kích hoạt góc tình yêu
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-rose-700 transition-colors shadow-lg"
                >
                  Bắt Đầu Phân Tích Góc Tình Yêu
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Phân Tích Góc Tình Yêu</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Quay lại tổng quan
                  </button>
                </div>
                <LoveCornerForm onAnalysisComplete={setAnalysis} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
