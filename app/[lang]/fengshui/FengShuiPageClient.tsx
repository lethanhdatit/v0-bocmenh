"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Home, Calendar, Coins, Heart, Star } from "lucide-react"
import Link from "next/link"

export default function FengShuiPageClient() {
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
      characteristics: "Cứng cáp, sắc bén, tinh khiết",
      goodFor: "Sự nghiệp, quyền lực, danh tiếng"
    },
    {
      name: "Mộc",
      color: "text-green-500",
      bgColor: "bg-green-100",
      description: "Gỗ, cây cối, màu xanh lá",
      direction: "Đông, Đông Nam",
      icon: "🌳",
      characteristics: "Phát triển, sinh trưởng, linh hoạt",
      goodFor: "Sức khỏe, gia đình, học tập"
    },
    {
      name: "Thủy",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      description: "Nước, màu xanh dương, đen",
      direction: "Bắc",
      icon: "💧",
      characteristics: "Chảy động, thích ứng, trí tuệ",
      goodFor: "Tài lộc, trí tuệ, quan hệ"
    },
    {
      name: "Hỏa",
      color: "text-red-500",
      bgColor: "bg-red-100",
      description: "Lửa, màu đỏ, cam",
      direction: "Nam",
      icon: "🔥",
      characteristics: "Năng động, sáng tạo, nhiệt huyết",
      goodFor: "Danh tiếng, nhận biết, sự nổi tiếng"
    },
    {
      name: "Thổ",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: "Đất, màu vàng, nâu",
      direction: "Trung tâm, Tây Nam, Đông Bắc",
      icon: "🏔️",
      characteristics: "Ổn định, nuôi dưỡng, bền vững",
      goodFor: "Hôn nhân, bảo quản, gia đình"
    },
  ]

  const tips = [
    {
      title: "Cửa Chính",
      content: "Cửa chính nên sạch sẽ, thoáng đãng và không bị cản trở. Tránh đặt gương đối diện cửa chính vì sẽ đẩy khí tốt ra ngoài.",
      icon: "🚪",
      category: "Lối Vào"
    },
    {
      title: "Phòng Ngủ",
      content: "Giường nên đặt ở vị trí có thể nhìn thấy cửa nhưng không thẳng hàng với cửa. Tránh gương chiếu vào giường để tránh mất ngủ.",
      icon: "🛏️",
      category: "Nghỉ Ngơi"
    },
    {
      title: "Bếp",
      content: "Bếp không nên đối diện với cửa chính hoặc nhà vệ sinh. Người nấu ăn nên quay lưng về phía tường để có cảm giác an toàn.",
      icon: "🍳",
      category: "Ăn Uống"
    },
    {
      title: "Phòng Làm Việc",
      content: "Bàn làm việc nên đặt ở vị trí 'quyền lực' - lưng tựa tường, mặt hướng ra cửa để kiểm soát được không gian.",
      icon: "💼",
      category: "Sự Nghiệp"
    },
    {
      title: "Cây Xanh",
      content: "Cây xanh mang lại sinh khí tốt và lọc không khí. Tránh cây có gai hoặc lá nhọn trong nhà vì tạo sát khí.",
      icon: "🌱",
      category: "Sinh Khí"
    },
    {
      title: "Ánh Sáng",
      content: "Ánh sáng tự nhiên rất quan trọng cho sức khỏe. Sử dụng đèn để bổ sung ánh sáng cho góc tối và tạo năng lượng tích cực.",
      icon: "💡",
      category: "Năng Lượng"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat bg-center"></div>
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
              Phong Thủy Tổng Hợp
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Khám phá nghệ thuật sắp xếp không gian sống hài hòa với thiên nhiên, mang lại may mắn, thịnh vượng và hạnh
              phúc cho gia đình bạn
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-emerald-200">
              <span className="bg-emerald-800/50 px-3 py-1 rounded-full">✨ Số Quẻ Cá Nhân</span>
              <span className="bg-emerald-800/50 px-3 py-1 rounded-full">🏠 Hướng Nhà Tốt</span>
              <span className="bg-emerald-800/50 px-3 py-1 rounded-full">💰 Góc Tài Lộc</span>
              <span className="bg-emerald-800/50 px-3 py-1 rounded-full">⭐ Cửu Tinh Phi Phủ</span>
            </div>
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
                  <h2 className="text-2xl font-bold text-emerald-400 mb-4">🌟 Phong Thủy Là Gì?</h2>
                  <p className="text-emerald-100 mb-4">
                    Phong Thủy là một hệ thống triết học cổ xưa của Trung Quốc, nghiên cứu về cách sắp xếp không gian
                    sống để tạo ra sự hài hòa giữa con người và môi trường xung quanh.
                  </p>
                  <p className="text-emerald-100 mb-4">
                    Mục tiêu của Phong Thủy là tối ưu hóa dòng chảy năng lượng tích cực (Khí) trong không gian, từ đó
                    mang lại sức khỏe, thịnh vượng và hạnh phúc cho người sống trong đó.
                  </p>
                  <div className="bg-emerald-800/30 p-4 rounded-lg">
                    <p className="text-emerald-200 text-sm">
                      💡 <strong>Lưu ý:</strong> Phong thủy không chỉ là tín ngưỡng mà còn là khoa học về môi trường sống tối ưu.
                    </p>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-4">⚖️ Nguyên Lý Cơ Bản</h2>
                  <ul className="space-y-3 text-emerald-100">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">☯️</span>
                      <span>
                        <strong>Âm Dương:</strong> Cân bằng giữa hai năng lượng đối lập nhưng bổ sung cho nhau
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">🌟</span>
                      <span>
                        <strong>Ngũ Hành:</strong> Kim, Mộc, Thủy, Hỏa, Thổ - 5 yếu tố cơ bản
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">🧭</span>
                      <span>
                        <strong>Bát Quái:</strong> 8 hướng và ý nghĩa phong thủy của chúng
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-400">🌊</span>
                      <span>
                        <strong>Dòng Khí:</strong> Luồng năng lượng sinh khí trong không gian sống
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
                        <div className="mt-4 text-emerald-300 text-sm">
                          Nhấp để sử dụng công cụ →
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "elements" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-emerald-400 mb-4">🌟 Ngũ Hành - Năm Yếu Tố Cơ Bản</h2>
                  <p className="text-emerald-100 max-w-2xl mx-auto">
                    Ngũ hành là nền tảng của phong thủy, đại diện cho 5 năng lượng cơ bản tạo nên vũ trụ và ảnh hưởng đến cuộc sống con người.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {elements.map((element, index) => (
                    <motion.div
                      key={element.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{element.icon}</div>
                        <h3 className={`text-2xl font-bold ${element.color}`}>{element.name}</h3>
                      </div>
                      <div className="space-y-3 text-emerald-100">
                        <p>
                          <strong className="text-emerald-300">Đặc điểm:</strong> {element.description}
                        </p>
                        <p>
                          <strong className="text-emerald-300">Hướng:</strong> {element.direction}
                        </p>
                        <p>
                          <strong className="text-emerald-300">Tính chất:</strong> {element.characteristics}
                        </p>
                        <p>
                          <strong className="text-emerald-300">Tốt cho:</strong> {element.goodFor}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "tips" && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-emerald-400 mb-4">💡 Mẹo Phong Thủy Thực Tế</h2>
                  <p className="text-emerald-100 max-w-2xl mx-auto">
                    Những lời khuyên phong thủy hữu ích để cải thiện năng lượng trong từng khu vực của ngôi nhà.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {tips.map((tip, index) => (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{tip.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-emerald-400">{tip.title}</h3>
                            <span className="text-xs bg-emerald-800/50 text-emerald-200 px-2 py-1 rounded-full">
                              {tip.category}
                            </span>
                          </div>
                          <p className="text-emerald-100">{tip.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">🚀 Bắt Đầu Hành Trình Phong Thủy</h2>
              <p className="text-emerald-100 mb-6">
                Khám phá các công cụ Phong Thủy để tạo ra không gian sống hài hòa và thịnh vượng. 
                Bắt đầu với việc tính số quẻ cá nhân của bạn!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/fengshui/kua-number"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-full hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Compass className="w-5 h-5" />
                  <span>Tính Số Quẻ</span>
                </Link>
                <Link
                  href="/fengshui/house-direction"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  <span>Chọn Hướng Nhà</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
