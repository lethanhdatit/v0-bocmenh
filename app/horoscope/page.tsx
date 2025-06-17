"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import HoroscopeForm from "@/components/forms/HoroscopeForm"
import { zodiacSigns } from "@/lib/horoscope"

export default function HoroscopePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Tổng Quan" },
    { id: "zodiac", label: "Cung Hoàng Đạo" },
    { id: "form", label: "Xem Tử Vi" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tử Vi Hàng Ngày
        </motion.h1>

        <motion.p
          className="text-center text-purple-200 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Khám phá dự báo tử vi cá nhân dựa trên cung hoàng đạo của bạn. Nhận thông tin chi tiết về tình yêu, sự nghiệp,
          sức khỏe và tài chính.
        </motion.p>

        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Tử Vi Là Gì?</h2>
              <p className="text-purple-100 mb-4">
                Tử vi là một hệ thống dự đoán dựa trên vị trí của các hành tinh và ngôi sao tại thời điểm sinh của một
                người. Mỗi người thuộc về một trong 12 cung hoàng đạo, mỗi cung có những đặc điểm và năng lượng riêng
                biệt.
              </p>
              <p className="text-purple-100 mb-6">
                Dự báo tử vi có thể cung cấp thông tin về tính cách, điểm mạnh, điểm yếu, và xu hướng trong các khía
                cạnh khác nhau của cuộc sống như tình yêu, sự nghiệp, sức khỏe và tài chính.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white">Cách Sử Dụng</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-medium text-white mb-2">Nhập Ngày Sinh</h4>
                  <p className="text-purple-200 text-sm">
                    Nhập ngày, tháng, năm sinh của bạn để xác định cung hoàng đạo chính xác.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-medium text-white mb-2">Chọn Loại Dự Báo</h4>
                  <p className="text-purple-200 text-sm">
                    Lựa chọn dự báo hàng ngày, hàng tuần hoặc hàng tháng tùy theo nhu cầu của bạn.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-medium text-white mb-2">Nhận Dự Báo</h4>
                  <p className="text-purple-200 text-sm">
                    Xem dự báo chi tiết về tình yêu, sự nghiệp, sức khỏe, tài chính và may mắn.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setActiveTab("form")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg"
                >
                  Xem Tử Vi Ngay
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "zodiac" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-white text-center">12 Cung Hoàng Đạo</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {zodiacSigns.map((sign) => (
                  <div key={sign.name} className="bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all">
                    <div className="flex items-center mb-2">
                      <span className="text-3xl mr-2">{sign.symbol}</span>
                      <div>
                        <h3 className="font-medium text-white">{sign.vietnameseName}</h3>
                        <p className="text-xs text-purple-300">
                          {new Date(
                            2000,
                            Number.parseInt(sign.startDate.split("-")[0]) - 1,
                            Number.parseInt(sign.startDate.split("-")[1]),
                          ).toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" })}{" "}
                          -{" "}
                          {new Date(
                            2000,
                            Number.parseInt(sign.endDate.split("-")[0]) - 1,
                            Number.parseInt(sign.endDate.split("-")[1]),
                          ).toLocaleDateString("vi-VN", { day: "numeric", month: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-purple-200 mb-2">
                      <span className="mr-1">Nguyên tố:</span>
                      <span className="font-medium">{sign.vietnameseElement}</span>
                    </div>
                    <div className="text-xs text-purple-200">
                      <span className="block mb-1">Đặc điểm:</span>
                      <div className="flex flex-wrap gap-1">
                        {sign.traits.slice(0, 3).map((trait, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-purple-500/20 rounded-full">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setActiveTab("form")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg"
                >
                  Xem Tử Vi Của Bạn
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "form" && <HoroscopeForm />}
        </div>

        <div className="text-center text-purple-300/70 text-sm">
          <p>
            Lưu ý: Dự báo tử vi chỉ mang tính chất tham khảo và giải trí. Mọi quyết định trong cuộc sống đều nên dựa
            trên sự cân nhắc kỹ lưỡng của bạn.
          </p>
        </div>
      </div>
    </main>
  )
}
