"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, Home, ArrowLeft, Info, Lightbulb, Map } from "lucide-react"
import Link from "next/link"
import HouseDirectionForm from "@/components/forms/HouseDirectionForm"
import { getAllDirections } from "@/lib/houseDirection"

export default function HouseDirectionPage() {
  const [showForm, setShowForm] = useState(false)
  const directions = getAllDirections()

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ))

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat bg-center" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/fengshui"
            className="inline-flex items-center text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Phong Thủy
          </Link>
        </nav>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full mb-6">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Phân Tích Hướng Nhà</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Khám phá mức độ tương hợp giữa hướng nhà và số Kua của bạn để tối ưu hóa năng lượng sống
          </p>
        </motion.div>

        {showForm ? (
          <HouseDirectionForm />
        ) : (
          <div className="space-y-8">
            {/* What is House Direction Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Phân Tích Hướng Nhà Là Gì?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white/80 mb-4">
                    Phân tích hướng nhà là một phương pháp quan trọng trong phong thủy, giúp xác định mức độ tương hợp
                    giữa hướng cửa chính của ngôi nhà với số Kua cá nhân của bạn.
                  </p>
                  <p className="text-white/80 mb-4">
                    Dựa trên nguyên lý Bát Trạch (8 hướng), mỗi người sẽ có những hướng tốt và hướng xấu riêng biệt, ảnh
                    hưởng trực tiếp đến sức khỏe, tài lộc, sự nghiệp và các mối quan hệ.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-4">Lợi Ích Của Phân Tích</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      Tối ưu hóa năng lượng sống trong không gian
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      Cải thiện sức khỏe và tinh thần
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      Tăng cường vận may và cơ hội thành công
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      Hài hòa mối quan hệ gia đình
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 8 Directions Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">8 Hướng Chính</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {directions.map((direction, index) => (
                  <motion.div
                    key={direction.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Compass className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{direction.label}</h3>
                      <p className="text-emerald-400 text-sm">{direction.element}</p>
                    </div>
                    <div className="space-y-1">
                      {direction.characteristics.map((char, i) => (
                        <div key={i} className="text-white/70 text-xs text-center">
                          {char}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How to Use */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Cách Sử Dụng</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Nhập Thông Tin</h3>
                  <p className="text-white/70 text-sm">Cung cấp năm sinh, giới tính và hướng cửa chính của ngôi nhà</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Phân Tích</h3>
                  <p className="text-white/70 text-sm">Hệ thống sẽ tính toán số Kua và phân tích mức độ tương hợp</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Áp Dụng</h3>
                  <p className="text-white/70 text-sm">Thực hiện các khuyến nghị để tối ưu hóa năng lượng không gian</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5 inline mr-2" />
                Bắt Đầu Phân Tích Hướng Nhà
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
