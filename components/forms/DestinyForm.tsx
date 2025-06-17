"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { apiClient } from "@/lib/api"
import { Stars, Calendar, Clock, User } from "lucide-react"

interface DestinyResult {
  personalityTraits: string[]
  careerPath?: string
  loveLife?: string
  luckyNumbers?: number[]
  luckyColors?: string[]
  challenges?: string
  advice?: string
  preview?: string
}

export default function DestinyForm() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data, error, isLoading } = useSWR(
    isSubmitted ? ["/destiny", formData] : null,
    ([url, data]) => apiClient.post(url, data).then((res) => res.data),
    {
      revalidateOnFocus: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.birthDate) {
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({ name: "", birthDate: "", birthTime: "" })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!isSubmitted ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mystical-card space-y-6"
        >
          <div>
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
              <User className="w-5 h-5" />
              <span>Họ và tên</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
              placeholder="Nhập họ và tên của bạn"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
              <Calendar className="w-5 h-5" />
              <span>Ngày sinh</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-yellow-500 font-medium mb-2">
              <Clock className="w-5 h-5" />
              <span>Giờ sinh (tùy chọn)</span>
            </label>
            <input
              type="time"
              name="birthTime"
              value={formData.birthTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none text-white"
            />
            <p className="text-sm text-gray-400 mt-1">Giờ sinh giúp kết quả chính xác hơn</p>
          </div>

          <button type="submit" className="w-full mystical-button flex items-center justify-center space-x-2">
            <Stars className="w-5 h-5" />
            <span>Bóc Mệnh Ngay</span>
          </button>
        </motion.form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {isLoading && (
            <div className="mystical-card text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-yellow-500">Đang phân tích vận mệnh của bạn...</p>
            </div>
          )}

          {error && (
            <div className="mystical-card text-center py-8">
              <p className="text-red-400 mb-4">Có lỗi xảy ra khi phân tích vận mệnh</p>
              <button onClick={resetForm} className="mystical-button">
                Thử lại
              </button>
            </div>
          )}

          {data && data.success && (
            <div className="space-y-6">
              <div className="mystical-card">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">Kết Quả Bóc Mệnh - {formData.name}</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Tính Cách:</h3>
                    <ul className="space-y-2">
                      {data.data.personalityTraits.map((trait: string, index: number) => (
                        <li key={index} className="text-gray-300 flex items-start space-x-2">
                          <Stars className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {data.data.careerPath && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Sự Nghiệp:</h3>
                      <p className="text-gray-300">{data.data.careerPath}</p>
                    </div>
                  )}

                  {data.data.loveLife && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Tình Yêu:</h3>
                      <p className="text-gray-300">{data.data.loveLife}</p>
                    </div>
                  )}

                  {data.data.luckyNumbers && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Số May Mắn:</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.data.luckyNumbers.map((number: number) => (
                          <span key={number} className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                            {number}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.isLimited && data.data.preview && (
                    <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-lg p-4">
                      <p className="text-yellow-500 font-medium">{data.data.preview}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button onClick={resetForm} className="mystical-button">
                  Bóc Mệnh Lại
                </button>
                {data.isLimited && (
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
                    Nâng Cấp Premium
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
