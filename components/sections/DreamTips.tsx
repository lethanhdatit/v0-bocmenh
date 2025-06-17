"use client"

import { motion } from "framer-motion"
import { Lightbulb, Moon, Brain, Heart, Star, Clock } from "lucide-react"

const tips = [
  {
    icon: Moon,
    title: "Ghi chép ngay khi thức dậy",
    description: "Giấc mơ dễ bị quên sau 5-10 phút thức dậy. Hãy ghi lại ngay lập tức.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Chú ý đến cảm xúc",
    description: "Cảm xúc trong mơ thường quan trọng hơn những gì bạn thấy.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Tìm kiếm mẫu hình lặp lại",
    description: "Những giấc mơ lặp lại thường mang thông điệp quan trọng từ tiềm thức.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Star,
    title: "Kết nối với cuộc sống thực",
    description: "Giấc mơ thường phản ánh những lo lắng, mong muốn trong cuộc sống.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Clock,
    title: "Theo dõi chu kỳ giấc ngủ",
    description: "Giấc mơ rõ ràng nhất thường xảy ra vào giai đoạn REM.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Lightbulb,
    title: "Không áp đặt ý nghĩa",
    description: "Mỗi người có biểu tượng riêng, hãy tin vào trực giác của bản thân.",
    color: "from-indigo-500 to-purple-500",
  },
]

export default function DreamTips() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-900/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">Bí Quyết Ghi Nhớ Giấc Mơ</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Những mẹo hữu ích giúp bạn ghi nhớ và hiểu rõ hơn về giấc mơ của mình
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="mystical-card group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tip.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <tip.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                {tip.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
