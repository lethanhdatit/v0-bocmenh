"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import HoroscopeForm from "@/components/forms/HoroscopeForm"
import { zodiacSigns } from "@/lib/horoscope"

export default function HoroscopePageClient() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Tổng Quan" },
    { id: "zodiac", label: "Cung Hoàng Đạo" },
    { id: "form", label: "Xem Bát Tự" },
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
          Bát Tự Hàng Ngày
        </motion.h1>

        <motion.p
          className="text-center text-purple-200 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Khám phá dự báo bát tự cá nhân dựa trên cung hoàng đạo của bạn. Nhận thông tin chi tiết về tình yêu, sự nghiệp,
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Bát Tự Là Gì?</h2>
              <div className="grid md:grid-cols-2 gap-6 text-white/90">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-300">Khái Niệm</h3>
                  <p className="mb-4">
                    Bát tự là môn học dự báo vận mệnh dựa trên vị trí các thiên thể tại thời điểm sinh. Trong văn hóa
                    phương Tây, bát tự được gọi là horoscope và dựa trên 12 cung hoàng đạo.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-300">Tác Dụng</h3>
                  <ul className="space-y-2">
                    <li>• Hiểu rõ tính cách và tiềm năng bản thân</li>
                    <li>• Dự báo xu hướng tương lai</li>
                    <li>• Lời khuyên cho các mối quan hệ</li>
                    <li>• Hướng dẫn ra quyết định quan trọng</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl">
                <p className="text-white/80 text-sm">
                  <strong>Lưu ý:</strong> Bát tự chỉ mang tính chất tham khảo và hướng dẫn. Cuộc sống của bạn vẫn do chính
                  bạn quyết định và tạo ra.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "zodiac" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">12 Cung Hoàng Đạo</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {zodiacSigns.map((sign) => (
                  <div
                    key={sign.name}
                    className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="text-center mb-3">
                      <div className="text-3xl mb-2">{sign.symbol}</div>
                      <h3 className="font-semibold text-white">{sign.vietnameseName}</h3>
                      <p className="text-sm text-purple-200">{sign.name}</p>
                      <p className="text-xs text-purple-300">{sign.startDate} - {sign.endDate}</p>
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
                  Xem Bát Tự Của Bạn
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "form" && <HoroscopeForm />}
        </div>

        <div className="text-center text-purple-300/70 text-sm">
          <p>
            Lưu ý: Dự báo bát tự chỉ mang tính chất tham khảo và giải trí. Mọi quyết định trong cuộc sống đều nên dựa
            trên sự cân nhắc kỹ lưỡng của bạn.
          </p>
        </div>
      </div>
    </main>
  )
}
