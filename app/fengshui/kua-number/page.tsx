"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Compass, ArrowLeft, Info } from "lucide-react"
import Link from "next/link"

interface KuaResult {
  kuaNumber: number
  element: string
  luckyDirections: string[]
  unluckyDirections: string[]
  luckyColors: string[]
  personality: string
  career: string
  health: string
  relationships: string
}

export default function KuaNumberPage() {
  const [formData, setFormData] = useState({
    name: "",
    birthYear: "",
    gender: "",
  })
  const [result, setResult] = useState<KuaResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateKuaNumber = (year: number, gender: string): KuaResult => {
    // Calculate Kua number based on birth year and gender
    const yearDigits = year.toString().split("").map(Number)
    let sum = yearDigits.reduce((acc, digit) => acc + digit, 0)

    // Reduce to single digit
    while (sum > 9) {
      const digits = sum.toString().split("").map(Number)
      sum = digits.reduce((acc, digit) => acc + digit, 0)
    }

    let kuaNumber: number
    if (gender === "male") {
      kuaNumber = 10 - sum
      if (kuaNumber === 5) kuaNumber = 2
    } else {
      kuaNumber = sum + 5
      if (kuaNumber > 9) kuaNumber -= 9
      if (kuaNumber === 5) kuaNumber = 8
    }

    // Kua number interpretations
    const interpretations: { [key: number]: Omit<KuaResult, "kuaNumber"> } = {
      1: {
        element: "Thủy",
        luckyDirections: ["Bắc", "Đông", "Đông Nam", "Nam"],
        unluckyDirections: ["Tây", "Tây Bắc", "Tây Nam", "Đông Bắc"],
        luckyColors: ["Xanh dương", "Đen", "Xanh lá"],
        personality: "Thông minh, linh hoạt, có khả năng thích nghi cao",
        career: "Phù hợp với nghề liên quan đến nước, giao thông, truyền thông",
        health: "Cần chú ý đến thận và hệ tuần hoàn",
        relationships: "Dễ hòa hợp với người có số quẻ 6, 7",
      },
      2: {
        element: "Thổ",
        luckyDirections: ["Tây Nam", "Tây Bắc", "Tây", "Đông Bắc"],
        unluckyDirections: ["Đông", "Đông Nam", "Bắc", "Nam"],
        luckyColors: ["Vàng", "Nâu", "Cam"],
        personality: "Kiên nhẫn, thực tế, có tinh thần trách nhiệm cao",
        career: "Thích hợp với bất động sản, nông nghiệp, giáo dục",
        health: "Chú ý đến dạ dày và hệ tiêu hóa",
        relationships: "Hợp với người có số quẻ 6, 7, 8",
      },
      3: {
        element: "Mộc",
        luckyDirections: ["Đông", "Đông Nam", "Bắc", "Nam"],
        unluckyDirections: ["Tây", "Tây Bắc", "Tây Nam", "Đông Bắc"],
        luckyColors: ["Xanh lá", "Nâu", "Xanh dương"],
        personality: "Năng động, sáng tạo, có khả năng lãnh đạo",
        career: "Phù hợp với nghề sáng tạo, kinh doanh, công nghệ",
        health: "Cần chú ý đến gan và hệ thần kinh",
        relationships: "Hợp với người có số quẻ 1, 4, 9",
      },
      4: {
        element: "Mộc",
        luckyDirections: ["Đông Nam", "Đông", "Nam", "Bắc"],
        unluckyDirections: ["Tây", "Tây Bắc", "Đông Bắc", "Tây Nam"],
        luckyColors: ["Xanh lá", "Nâu", "Xanh dương"],
        personality: "Nhẹ nhàng, kiên nhẫn, có khả năng giao tiếp tốt",
        career: "Thích hợp với nghề tư vấn, y tế, nghệ thuật",
        health: "Chú ý đến hệ hô hấp và da",
        relationships: "Hợp với người có số quẻ 1, 3, 9",
      },
      6: {
        element: "Kim",
        luckyDirections: ["Tây", "Tây Bắc", "Tây Nam", "Đông Bắc"],
        unluckyDirections: ["Đông", "Đông Nam", "Bắc", "Nam"],
        luckyColors: ["Trắng", "Bạc", "Vàng"],
        personality: "Quyết đoán, có tính lãnh đạo, trách nhiệm cao",
        career: "Phù hợp với quản lý, tài chính, kỹ thuật",
        health: "Chú ý đến phổi và hệ hô hấp",
        relationships: "Hợp với người có số quẻ 2, 7, 8",
      },
      7: {
        element: "Kim",
        luckyDirections: ["Tây Bắc", "Tây", "Đông Bắc", "Tây Nam"],
        unluckyDirections: ["Đông", "Đông Nam", "Nam", "Bắc"],
        luckyColors: ["Trắng", "Bạc", "Vàng"],
        personality: "Hòa đồng, có khả năng thuyết phục, thích giao tiếp",
        career: "Thích hợp với bán hàng, PR, giải trí",
        health: "Cần chú ý đến miệng và hệ tiêu hóa",
        relationships: "Hợp với người có số quẻ 2, 6, 8",
      },
      8: {
        element: "Thổ",
        luckyDirections: ["Đông Bắc", "Tây", "Tây Bắc", "Tây Nam"],
        unluckyDirections: ["Đông", "Đông Nam", "Bắc", "Nam"],
        luckyColors: ["Vàng", "Nâu", "Cam"],
        personality: "Cẩn thận, có tổ chức, khả năng tích lũy tốt",
        career: "Phù hợp với tài chính, bảo hiểm, bất động sản",
        health: "Chú ý đến xương khớp và cột sống",
        relationships: "Hợp với người có số quẻ 2, 6, 7",
      },
      9: {
        element: "Hỏa",
        luckyDirections: ["Nam", "Đông", "Đông Nam", "Bắc"],
        unluckyDirections: ["Tây", "Tây Bắc", "Tây Nam", "Đông Bắc"],
        luckyColors: ["Đỏ", "Cam", "Hồng"],
        personality: "Nhiệt huyết, thông minh, có khả năng truyền cảm hứng",
        career: "Thích hợp với giáo dục, truyền thông, nghệ thuật",
        health: "Cần chú ý đến tim mạch và huyết áp",
        relationships: "Hợp với người có số quẻ 1, 3, 4",
      },
    }

    return {
      kuaNumber,
      ...interpretations[kuaNumber],
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.birthYear || !formData.gender) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const year = Number.parseInt(formData.birthYear)
      const kuaResult = calculateKuaNumber(year, formData.gender)
      setResult(kuaResult)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-40"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 8 + i,
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Link
              href="/fengshui"
              className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Phong Thủy</span>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Tính Số Quẻ Cá Nhân
            </h1>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Khám phá số quẻ của bạn để tìm hiểu hướng tốt, màu sắc may mắn và những đặc điểm tính cách
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20"
            >
              <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center space-x-2">
                <Compass className="w-6 h-6" />
                <span>Thông Tin Cá Nhân</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-emerald-200 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-300 focus:border-emerald-400 focus:outline-none"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-emerald-200 mb-2">Năm sinh</label>
                  <input
                    type="number"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                    className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-300 focus:border-emerald-400 focus:outline-none"
                    placeholder="Ví dụ: 1990"
                    min="1900"
                    max="2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-emerald-200 mb-2">Giới tính</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "male" })}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.gender === "male"
                          ? "bg-emerald-500 border-emerald-400 text-white"
                          : "bg-black/30 border-emerald-500/30 text-emerald-200 hover:border-emerald-400"
                      }`}
                    >
                      Nam
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: "female" })}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.gender === "female"
                          ? "bg-emerald-500 border-emerald-400 text-white"
                          : "bg-black/30 border-emerald-500/30 text-emerald-200 hover:border-emerald-400"
                      }`}
                    >
                      Nữ
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.name || !formData.birthYear || !formData.gender}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Compass className="w-5 h-5" />
                      <span>Tính Số Quẻ</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20"
            >
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">{result.kuaNumber}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-400">Số Quẻ Của Bạn</h3>
                    <p className="text-emerald-200">Ngũ hành: {result.element}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Hướng Tốt:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.luckyDirections.map((direction) => (
                          <span
                            key={direction}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                          >
                            {direction}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Màu Sắc May Mắn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.luckyColors.map((color) => (
                          <span key={color} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Tính Cách:</h4>
                      <p className="text-emerald-100 text-sm">{result.personality}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Sự Nghiệp:</h4>
                      <p className="text-emerald-100 text-sm">{result.career}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Sức Khỏe:</h4>
                      <p className="text-emerald-100 text-sm">{result.health}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-emerald-400 mb-2">Tình Yêu:</h4>
                      <p className="text-emerald-100 text-sm">{result.relationships}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Info className="w-16 h-16 text-emerald-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">Kết Quả Sẽ Hiển Thị Ở Đây</h3>
                  <p className="text-emerald-200">Vui lòng điền thông tin và nhấn "Tính Số Quẻ"</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/20"
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Về Số Quẻ Cá Nhân</h3>
            <p className="text-emerald-100 mb-4">
              Số quẻ cá nhân (Kua Number) là một con số quan trọng trong Phong Thủy, được tính toán dựa trên năm sinh và
              giới tính của bạn. Số này giúp xác định:
            </p>
            <ul className="space-y-2 text-emerald-100">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Các hướng tốt và xấu cho bạn</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Màu sắc và ngũ hành phù hợp</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Đặc điểm tính cách và khuynh hướng nghề nghiệp</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Cách bố trí không gian sống và làm việc</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
