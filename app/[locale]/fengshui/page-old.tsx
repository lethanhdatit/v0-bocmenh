"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Home, Calendar, Coins, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function FengShuiPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const fengShuiTools = [
    {
      id: "kua-number",
      title: "Số Quẻ Cá Nhân",
      description: "Tính toán số quẻ và hướng tốt cho bạn",
      icon: Compass,
      href: "/fengshui/kua-number",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "house-direction",
      title: "Hướng Nhà Tốt",
      description: "Xác định hướng nhà phù hợp với gia chủ",
      icon: Home,
      href: "/fengshui/house-direction",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "flying-stars",
      title: "Cửu Tinh Phi Phủ",
      description: "Phân tích năng lượng theo năm và tháng",
      icon: Star,
      href: "/fengshui/flying-stars",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "wealth-corner",
      title: "Góc Tài Lộc",
      description: "Tìm vị trí đặt vật phẩm thu hút tài lộc",
      icon: Coins,
      href: "/fengshui/wealth-corner",
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: "love-corner",
      title: "Góc Tình Yêu",
      description: "Kích hoạt năng lượng tình yêu và hôn nhân",
      icon: Heart,
      href: "/fengshui/love-corner",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "calendar",
      title: "Lịch Phong Thủy",
      description: "Chọn ngày tốt cho các việc quan trọng",
      icon: Calendar,
      href: "/fengshui/calendar",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const elements = [
    {
      name: "Kim",
      color: "text-gray-300",
      bgColor: "bg-gray-100",
      description: "Kim loại, màu trắng, bạc",
      direction: "Tây, Tây Bắc",
      icon: "⚪",
    },
    {
      name: "Mộc",
      color: "text-green-500",
      bgColor: "bg-green-100",
      description: "Gỗ, cây cối, màu xanh lá",
      direction: "Đông, Đông Nam",
      icon: "🌳",
    },
    {
      name: "Thủy",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      description: "Nước, màu xanh dương, đen",
      direction: "Bắc",
      icon: "💧",
    },
    {
      name: "Hỏa",
      color: "text-red-500",
      bgColor: "bg-red-100",
      description: "Lửa, màu đỏ, cam",
      direction: "Nam",
      icon: "🔥",
    },
    {
      name: "Thổ",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: "Đất, màu vàng, nâu",
      direction: "Trung tâm, Tây Nam, Đông Bắc",
      icon: "🏔️",
    },
  ]

  const tips = [
    {
      title: "Cửa Chính",
      content: "Cửa chính nên sạch sẽ, thoáng đãng và không bị cản trở. Tránh đặt gương đối diện cửa chính.",
      icon: "🚪",
    },
    {
      title: "Phòng Ngủ",
      content:
        "Giường nên đặt ở vị trí có thể nhìn thấy cửa nhưng không thẳng hàng với cửa. Tránh gương chiếu vào giường.",
      icon: "🛏️",
    },
    {
      title: "Bếp",
      content: "Bếp không nên đối diện với cửa chính hoặc nhà vệ sinh. Người nấu ăn nên quay lưng về phía tường.",
      icon: "🍳",
    },
    {
      title: "Phòng Làm Việc",
      content: "Bàn làm việc nên đặt ở vị trí 'quyền lực' - lưng tựa tường, mặt hướng ra cửa.",
      icon: "💼",
    },
    {
      title: "Cây Xanh",
      content: "Cây xanh mang lại sinh khí tốt. Tránh cây có gai hoặc lá nhọn trong nhà.",
      icon: "🌱",
    },
    {
      title: "Ánh Sáng",
      content: "Ánh sáng tự nhiên rất quan trọng. Sử dụng đèn để bổ sung ánh sáng cho góc tối.",
      icon: "💡",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-30"
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

      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Phong Thủy
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Khám phá nghệ thuật sắp xếp không gian sống hài hòa với thiên nhiên, mang lại may mắn, thịnh vượng và hạnh
              phúc cho gia đình bạn
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/20 backdrop-blur-md rounded-full p-1">
              {[
                { id: "overview", label: "Tổng Quan" },
                { id: "tools", label: "Công Cụ" },
                { id: "elements", label: "Ngũ Hành" },
                { id: "tips", label: "Mẹo Hay" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeTab === tab.id ? "bg-emerald-500 text-white shadow-lg" : "text-emerald-200 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-4">Phong Thủy Là Gì?</h2>
                  <p className="text-emerald-100 mb-4">
                    Phong Thủy là một hệ thống triết học cổ xưa của Trung Quốc, nghiên cứu về cách sắp xếp không gian
                    sống để tạo ra sự hài hòa giữa con người và môi trường xung quanh.
                  </p>
                  <p className="text-emerald-100">
                    Mục tiêu của Phong Thủy là tối ưu hóa dòng chảy năng lượng tích cực (Khí) trong không gian, từ đó
                    mang lại sức khỏe, thịnh vượng và hạnh phúc cho người sống trong đó.
                  </p>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-4">Nguyên Lý Cơ Bản</h2>
                  <ul className="space-y-3 text-emerald-100">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>Âm Dương:</strong> Cân bằng giữa hai năng lượng đối lập
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>Ngũ Hành:</strong> Kim, Mộc, Thủy, Hỏa, Thổ
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>Bát Quái:</strong> 8 hướng và ý nghĩa của chúng
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span>
                        <strong>Dòng Khí:</strong> Luồng năng lượng trong không gian
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fengShuiTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={tool.href}>
                      <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">{tool.title}</h3>
                        <p className="text-emerald-100">{tool.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "elements" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elements.map((element, index) => (
                  <motion.div
                    key={element.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{element.icon}</div>
                      <h3 className={`text-2xl font-bold ${element.color}`}>{element.name}</h3>
                    </div>
                    <div className="space-y-2 text-emerald-100">
                      <p>
                        <strong>Đặc điểm:</strong> {element.description}
                      </p>
                      <p>
                        <strong>Hướng:</strong> {element.direction}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "tips" && (
              <div className="grid md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{tip.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">{tip.title}</h3>
                        <p className="text-emerald-100">{tip.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">Bắt Đầu Hành Trình Phong Thủy Của Bạn</h2>
              <p className="text-emerald-100 mb-6">
                Khám phá các công cụ Phong Thủy để tạo ra không gian sống hài hòa và thịnh vượng
              </p>
              <Link
                href="/fengshui/kua-number"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                <Compass className="w-5 h-5" />
                <span>Tính Số Quẻ Của Bạn</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
