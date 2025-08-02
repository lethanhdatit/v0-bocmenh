"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles, Users, Star, ArrowRight } from "lucide-react"
import CompatibilityForm from "@/components/forms/CompatibilityForm"

export default function CompatibilityPageClient() {
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
    { name: "Bạch Dương", dates: "21/3 - 19/4", element: "Hỏa", compatibility: "Sư Tử, Nhân Mã" },
    { name: "Kim Ngưu", dates: "20/4 - 20/5", element: "Thổ", compatibility: "Xử Nữ, Ma Kết" },
    { name: "Song Tử", dates: "21/5 - 20/6", element: "Khí", compatibility: "Thiên Bình, Bảo Bình" },
    { name: "Cự Giải", dates: "21/6 - 22/7", element: "Thủy", compatibility: "Bọ Cạp, Song Ngư" },
    { name: "Sư Tử", dates: "23/7 - 22/8", element: "Hỏa", compatibility: "Bạch Dương, Nhân Mã" },
    { name: "Xử Nữ", dates: "23/8 - 22/9", element: "Thổ", compatibility: "Kim Ngưu, Ma Kết" },
    { name: "Thiên Bình", dates: "23/9 - 22/10", element: "Khí", compatibility: "Song Tử, Bảo Bình" },
    { name: "Bọ Cạp", dates: "23/10 - 21/11", element: "Thủy", compatibility: "Cự Giải, Song Ngư" },
    { name: "Nhân Mã", dates: "22/11 - 21/12", element: "Hỏa", compatibility: "Bạch Dương, Sư Tử" },
    { name: "Ma Kết", dates: "22/12 - 19/1", element: "Thổ", compatibility: "Kim Ngưu, Xử Nữ" },
    { name: "Bảo Bình", dates: "20/1 - 18/2", element: "Khí", compatibility: "Song Tử, Thiên Bình" },
    { name: "Song Ngư", dates: "19/2 - 20/3", element: "Thủy", compatibility: "Cự Giải, Bọ Cạp" },
  ]

  const loveStats = [
    { label: "Tỷ lệ tương hợp cao", value: "85%", description: "trong các cặp cùng nguyên tố" },
    { label: "Độ chính xác", value: "92%", description: "khi kết hợp thần số học" },
    { label: "Mối quan hệ bền vững", value: "78%", description: "khi có tương hợp tốt" },
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Khám phá mức độ tương hợp giữa hai người thông qua thần số học và chiêm tinh học. Tìm hiểu về tính cách,
            giao tiếp và tương lai của mối quan hệ.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-pink-800/50 text-pink-200 px-3 py-1 rounded-full">💕 Cung Hoàng Đạo</span>
            <span className="bg-purple-800/50 text-purple-200 px-3 py-1 rounded-full">🔮 Thần Số Học</span>
            <span className="bg-indigo-800/50 text-indigo-200 px-3 py-1 rounded-full">⭐ Tính Cách</span>
            <span className="bg-blue-800/50 text-blue-200 px-3 py-1 rounded-full">💖 Tình Yêu Đích Thực</span>
          </div>
        </motion.div>

        {!showForm ? (
          <>
            {/* Love Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-3 gap-6 mb-16"
            >
              {loveStats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">{stat.value}</div>
                  <div className="text-white font-semibold mb-1">{stat.label}</div>
                  <div className="text-gray-300 text-sm">{stat.description}</div>
                </div>
              ))}
            </motion.div>

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
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center mb-6 mx-auto`}
                  >
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">{type.title}</h3>
                  <p className="text-gray-300 mb-6 text-center">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
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
              <h2 className="text-3xl font-bold text-center text-white mb-8">🌟 12 Cung Hoàng Đạo & Tương Hợp</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {zodiacSigns.map((sign, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <h3 className="font-bold text-white mb-1 text-lg">{sign.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">{sign.dates}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs rounded-full">
                        {sign.element}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong className="text-pink-300">Hợp với:</strong> {sign.compatibility}
                    </div>
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
              <h2 className="text-3xl font-bold text-center text-white mb-8">🎯 Cách Thức Hoạt Động</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nhập Thông Tin</h3>
                  <p className="text-gray-300">Cung cấp tên và ngày sinh của hai người để phân tích</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Phân Tích</h3>
                  <p className="text-gray-300">Hệ thống tính toán các chỉ số thần số học và cung hoàng đạo</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Báo Cáo Chi Tiết</h3>
                  <p className="text-gray-300">Nhận phân tích sâu về mức độ tương hợp và lời khuyên</p>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-md rounded-2xl p-8 border border-pink-300/20 mb-16"
            >
              <h2 className="text-2xl font-bold text-center text-white mb-6">💖 Lợi Ích Của Việc Kiểm Tra Tương Hợp</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-pink-200 mb-1">Hiểu Rõ Bản Thân</h4>
                      <p className="text-gray-300 text-sm">Khám phá tính cách và nhu cầu cảm xúc của mình</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-200 mb-1">Cải Thiện Giao Tiếp</h4>
                      <p className="text-gray-300 text-sm">Học cách giao tiếp hiệu quả với đối phương</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-200 mb-1">Tăng Cường Hạnh Phúc</h4>
                      <p className="text-gray-300 text-sm">Xây dựng mối quan hệ bền vững và hạnh phúc</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-1">Tránh Xung Đột</h4>
                      <p className="text-gray-300 text-sm">Nhận biết và giải quyết mâu thuẫn sớm</p>
                    </div>
                  </div>
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
                🚀 Bắt Đầu Kiểm Tra Tương Hợp Ngay
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
              <p className="text-gray-400 text-sm mt-4">
                Hoàn toàn miễn phí • Kết quả ngay lập tức • Bảo mật thông tin
              </p>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">💕 Kiểm Tra Tương Hợp Tình Yêu</h2>
              <button 
                onClick={() => setShowForm(false)} 
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
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
