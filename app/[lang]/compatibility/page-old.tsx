"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles, Users, Star, ArrowRight } from "lucide-react"
import CompatibilityForm from "@/components/forms/CompatibilityForm"

export default function LoveCompatibilityPage() {
  const [showForm, setShowForm] = useState(false)

  const compatibilityTypes = [
    {
      icon: Heart,
      title: "Tương Hợp Tình Yêu",
      description: "Phân tích mức độ hòa hợp trong tình yêu và hôn nhân",
      color: "from-pink-500 to-red-500",
      features: ["Tính cách tương hợp", "Giao tiếp tình cảm", "Tương lai lâu dài"],
    },
    {
      icon: Users,
      title: "Tương Hợp Bạn Bè",
      description: "Đánh giá mức độ phù hợp trong tình bạn",
      color: "from-blue-500 to-purple-500",
      features: ["Sở thích chung", "Hỗ trợ lẫn nhau", "Niềm tin tương hỗ"],
    },
    {
      icon: Sparkles,
      title: "Tương Hợp Công Việc",
      description: "Phân tích khả năng làm việc cùng nhau",
      color: "from-green-500 to-teal-500",
      features: ["Phong cách làm việc", "Mục tiêu chung", "Khả năng lãnh đạo"],
    },
  ]

  const zodiacSigns = [
    { name: "Bạch Dương", dates: "21/3 - 19/4", element: "Hỏa" },
    { name: "Kim Ngưu", dates: "20/4 - 20/5", element: "Thổ" },
    { name: "Song Tử", dates: "21/5 - 20/6", element: "Khí" },
    { name: "Cự Giải", dates: "21/6 - 22/7", element: "Thủy" },
    { name: "Sư Tử", dates: "23/7 - 22/8", element: "Hỏa" },
    { name: "Xử Nữ", dates: "23/8 - 22/9", element: "Thổ" },
    { name: "Thiên Bình", dates: "23/9 - 22/10", element: "Khí" },
    { name: "Bọ Cạp", dates: "23/10 - 21/11", element: "Thủy" },
    { name: "Nhân Mã", dates: "22/11 - 21/12", element: "Hỏa" },
    { name: "Ma Kết", dates: "22/12 - 19/1", element: "Thổ" },
    { name: "Bảo Bình", dates: "20/1 - 18/2", element: "Khí" },
    { name: "Song Ngư", dates: "19/2 - 20/3", element: "Thủy" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-pink-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Tương Hợp Tình Yêu
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Khám phá mức độ tương hợp giữa hai người thông qua thần số học và chiêm tinh học. Tìm hiểu về tính cách,
            giao tiếp và tương lai của mối quan hệ.
          </p>
        </motion.div>

        {!showForm ? (
          <>
            {/* Compatibility Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {compatibilityTypes.map((type, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-6`}
                  >
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                  <p className="text-gray-300 mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Zodiac Signs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-8">12 Cung Hoàng Đạo</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {zodiacSigns.map((sign, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center"
                  >
                    <h3 className="font-bold text-white mb-1">{sign.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">{sign.dates}</p>
                    <span className="inline-block px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs rounded-full">
                      {sign.element}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-16"
            >
              <h2 className="text-3xl font-bold text-center text-white mb-8">Cách Thức Hoạt Động</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nhập Thông Tin</h3>
                  <p className="text-gray-300">Cung cấp tên và ngày sinh của hai người</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Phân Tích</h3>
                  <p className="text-gray-300">Hệ thống tính toán các chỉ số thần số học</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Kết Quả</h3>
                  <p className="text-gray-300">Nhận báo cáo chi tiết về mức độ tương hợp</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Bắt Đầu Kiểm Tra Tương Hợp
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Kiểm Tra Tương Hợp</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-300 hover:text-white transition-colors">
                ← Quay lại
              </button>
            </div>
            <CompatibilityForm />
          </motion.div>
        )}
      </div>
    </div>
  )
}
