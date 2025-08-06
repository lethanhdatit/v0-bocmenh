"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"
import FengShuiCalendarForm from "@/components/forms/FengShuiCalendarForm"
import { eventTypes, type CalendarAnalysis } from "@/lib/fengShuiCalendar"

export default function FengShuiCalendarPage() {
  const [analysis, setAnalysis] = useState<CalendarAnalysis | null>(null)
  const [showForm, setShowForm] = useState(false)

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "bg-green-500"
      case "good":
        return "bg-yellow-500"
      case "fair":
        return "bg-orange-500"
      case "poor":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRatingText = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "Rất Tốt"
      case "good":
        return "Tốt"
      case "fair":
        return "Bình Thường"
      case "poor":
        return "Nên Tránh"
      default:
        return "Không Xác Định"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
            }}
          >
            {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/fengshui"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Phong Thủy</span>
            </Link>
          </div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Lịch Phong Thủy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Chọn ngày tốt cho các sự kiện quan trọng trong cuộc sống dựa trên nguyên lý Thiên Can Địa Chi, 12 Trực và
              28 Sao
            </p>
          </motion.div>

          {!showForm && !analysis && (
            <>
              {/* Event Types Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">12 Loại Sự Kiện Quan Trọng</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {eventTypes.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
                    >
                      <div className="text-3xl mb-2">{event.icon}</div>
                      <h3 className="text-blue-400 font-medium mb-1">{event.name}</h3>
                      <p className="text-blue-200 text-sm">{event.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Cách Thức Hoạt Động</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-blue-400 font-medium mb-2">Chọn Sự Kiện</h3>
                    <p className="text-blue-200 text-sm">Lựa chọn loại sự kiện bạn muốn tổ chức từ 12 loại có sẵn</p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-blue-400 font-medium mb-2">Nhập Thông Tin</h3>
                    <p className="text-blue-200 text-sm">Cung cấp năm sinh, giới tính và tháng cần phân tích</p>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-blue-400 font-medium mb-2">Nhận Kết Quả</h3>
                    <p className="text-blue-200 text-sm">Xem lịch tháng với ngày tốt và lời khuyên chi tiết</p>
                  </div>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
                  <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Lợi Ích Của Việc Chọn Ngày Tốt</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-blue-400 font-medium mb-3">Dựa Trên Khoa Học Cổ Xưa</h3>
                      <ul className="space-y-2 text-blue-200">
                        <li>• Thiên Can Địa Chi - Hệ thống 60 năm âm lịch</li>
                        <li>• 12 Trực - Ảnh hưởng của từng ngày</li>
                        <li>• 28 Sao - Năng lượng vũ trụ</li>
                        <li>• Số Kua cá nhân - Tương thích riêng</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-blue-400 font-medium mb-3">Ứng Dụng Thực Tế</h3>
                      <ul className="space-y-2 text-blue-200">
                        <li>• Tăng khả năng thành công</li>
                        <li>• Tránh được rủi ro không cần thiết</li>
                        <li>• Hài hòa với năng lượng tự nhiên</li>
                        <li>• Mang lại may mắn và thuận lợi</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Bắt Đầu Chọn Ngày Tốt</span>
                </button>
              </motion.div>
            </>
          )}

          {/* Form */}
          {showForm && !analysis && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Quay lại tổng quan</span>
                </button>
              </div>
              <FengShuiCalendarForm onAnalysisComplete={setAnalysis} />
            </motion.div>
          )}

          {/* Results */}
          {analysis && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Back Button */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setAnalysis(null)
                    setShowForm(false)
                  }}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Phân tích mới</span>
                </button>
                <div className="text-blue-400">
                  Số Kua của bạn: <span className="font-bold text-2xl">{analysis.personalKua}</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
                  Lịch Tháng {analysis.month}/{analysis.year} -{" "}
                  {eventTypes.find((e) => e.id === analysis.eventType)?.name}
                </h2>

                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                    <div key={day} className="text-center text-blue-400 font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: new Date(analysis.year, analysis.month - 1, 1).getDay() }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}

                  {/* Month days */}
                  {analysis.days.map((day) => (
                    <div
                      key={day.date}
                      className={`aspect-square rounded-lg border-2 p-2 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${getRatingColor(day.rating)} bg-opacity-20 border-opacity-50`}
                      title={`${day.date}/${analysis.month}: ${getRatingText(day.rating)} (${day.score}%)\nCan Chi: ${day.canChi}\nTrực: ${day.truc}\nSao: ${day.star}`}
                    >
                      <div className="text-white font-bold">{day.date}</div>
                      <div className="text-xs text-white opacity-80">{day.score}%</div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-blue-200 text-sm">Rất Tốt (85-100%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-blue-200 text-sm">Tốt (70-84%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-blue-200 text-sm">Bình Thường (50-69%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-blue-200 text-sm">Nên Tránh (0-49%)</span>
                  </div>
                </div>
              </div>

              {/* Top 5 Best Days */}
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Top 5 Ngày Tốt Nhất
                </h2>
                <div className="space-y-4">
                  {analysis.topDays.map((day, index) => (
                    <div key={day.date} className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getRatingColor(day.rating)}`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-white font-bold">
                              Ngày {day.date}/{analysis.month}/{analysis.year}
                            </div>
                            <div className="text-blue-400 text-sm">{day.lunarDate} Âm lịch</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{day.score}%</div>
                          <div className="text-blue-400 text-sm">{getRatingText(day.rating)}</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-blue-400 font-medium">Can Chi:</div>
                          <div className="text-white">{day.canChi}</div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-medium">Trực:</div>
                          <div className="text-white">{day.truc}</div>
                        </div>
                        <div>
                          <div className="text-blue-400 font-medium">Sao:</div>
                          <div className="text-white">{day.star}</div>
                        </div>
                      </div>

                      {day.reasons.length > 0 && (
                        <div className="mt-3">
                          <div className="text-blue-400 font-medium text-sm mb-1">Lý do tốt:</div>
                          <ul className="text-blue-200 text-sm space-y-1">
                            {day.reasons.map((reason, i) => (
                              <li key={i}>• {reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-3">
                        <div className="text-blue-400 font-medium text-sm mb-1">Khung giờ tốt:</div>
                        <div className="flex space-x-2">
                          {day.bestTimes.map((time, i) => (
                            <span key={i} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Month Analysis */}
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-blue-400 mb-6">
                  Phân Tích Tháng {analysis.month}/{analysis.year}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-blue-400 font-medium mb-3">Thông Tin Cơ Bản</h3>
                    <div className="space-y-2 text-blue-200">
                      <div>
                        <strong>Can Chi tháng:</strong> {analysis.monthAnalysis.canChi}
                      </div>
                      <div>
                        <strong>Ảnh hưởng 12 Trực:</strong> {analysis.monthAnalysis.trucInfluence}
                      </div>
                      <div>
                        <strong>Ảnh hưởng 28 Sao:</strong> {analysis.monthAnalysis.starInfluence}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-blue-400 font-medium mb-3">Lời Khuyên Tổng Quát</h3>
                    <ul className="space-y-2 text-blue-200">
                      {analysis.monthAnalysis.generalAdvice.map((advice, i) => (
                        <li key={i}>• {advice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
