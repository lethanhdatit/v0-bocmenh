"use client"

import { motion } from "framer-motion"
import { Star, ArrowLeft, Calendar, Compass } from "lucide-react"
import Link from "next/link"
import FlyingStarsForm from "@/components/forms/FlyingStarsForm"

export default function FlyingStarsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            animate={{
              x: [0, 200, 0],
              y: [0, -200, 0],
              scale: [1, 2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 15 + i * 3,
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
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link
              href="/fengshui"
              className="inline-flex items-center space-x-2 text-purple-300 hover:text-purple-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Phong Thủy</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Star className="w-8 h-8 text-purple-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cửu Tinh Phi Phủ
              </h1>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Phân tích năng lượng hàng năm và hàng tháng theo hệ thống Cửu Tinh Phi Phủ, giúp bạn tối ưu hóa không gian
              sống và làm việc
            </p>
          </motion.div>

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-purple-400">Cửu Tinh Phi Phủ Là Gì?</h2>
                </div>
                <p className="text-purple-100 mb-4">
                  Cửu Tinh Phi Phủ là một hệ thống phong thủy tiên tiến, sử dụng 9 ngôi sao để phân tích năng lượng của
                  không gian theo thời gian.
                </p>
                <p className="text-purple-100">
                  Mỗi năm, các ngôi sao sẽ "bay" đến các vị trí khác nhau trong không gian, mang theo những ảnh hưởng
                  tích cực hoặc tiêu cực.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Compass className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-purple-400">Cách Sử Dụng</h2>
                </div>
                <ul className="space-y-3 text-purple-100">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400">1.</span>
                    <span>Chọn loại phân tích: theo năm hoặc theo tháng</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400">2.</span>
                    <span>Nhập năm (và tháng nếu cần) muốn phân tích</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400">3.</span>
                    <span>Xem biểu đồ và áp dụng khuyến nghị</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 9 Stars Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Chín Ngôi Sao</h2>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
                {[
                  { number: 1, name: "Tham Lang", nature: "auspicious", color: "text-green-400" },
                  { number: 2, name: "Cự Môn", nature: "inauspicious", color: "text-red-400" },
                  { number: 3, name: "Lộc Tồn", nature: "inauspicious", color: "text-red-400" },
                  { number: 4, name: "Văn Khúc", nature: "auspicious", color: "text-green-400" },
                  { number: 5, name: "Liêm Trinh", nature: "inauspicious", color: "text-red-400" },
                  { number: 6, name: "Vũ Khúc", nature: "auspicious", color: "text-green-400" },
                  { number: 7, name: "Phá Quân", nature: "neutral", color: "text-yellow-400" },
                  { number: 8, name: "Tả Phụ", nature: "auspicious", color: "text-green-400" },
                  { number: 9, name: "Hữu Bật", nature: "auspicious", color: "text-green-400" },
                ].map((star) => (
                  <div key={star.number} className="bg-black/30 rounded-xl p-4 border border-purple-500/20 text-center">
                    <div className={`text-2xl font-bold ${star.color} mb-1`}>{star.number}</div>
                    <div className="text-purple-300 text-sm font-medium">{star.name}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-300">Sao Tốt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-300">Sao Xấu</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-300">Sao Trung Tính</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <FlyingStarsForm />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
