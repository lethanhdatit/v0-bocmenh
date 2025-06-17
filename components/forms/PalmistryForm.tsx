"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import type { PalmReading } from "@/lib/palmistry"

interface PalmistryFormProps {
  onAnalysis: (analysis: PalmReading) => void
}

export default function PalmistryForm({ onAnalysis }: PalmistryFormProps) {
  const [formData, setFormData] = useState({
    hand: "",
    gender: "",
    age: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.hand) {
      newErrors.hand = "Vui lòng chọn tay để phân tích"
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính"
    }

    if (!formData.age) {
      newErrors.age = "Vui lòng nhập tuổi"
    } else {
      const age = Number.parseInt(formData.age)
      if (isNaN(age) || age < 1 || age > 120) {
        newErrors.age = "Tuổi phải từ 1 đến 120"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("/api/palmistry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hand: formData.hand,
          gender: formData.gender,
          age: Number.parseInt(formData.age),
        }),
      })

      const result = await response.json()

      if (result.success) {
        onAnalysis(result.data)
      } else {
        setErrors({ submit: result.error || "Đã xảy ra lỗi" })
      }
    } catch (error) {
      setErrors({ submit: "Không thể kết nối đến server" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
    >
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Phân Tích Tướng Bàn Tay</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hand Selection */}
        <div>
          <label className="block text-white font-medium mb-3">Chọn bàn tay để phân tích</label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "left", label: "🤚 Tay Trái", desc: "Tiềm năng bẩm sinh" },
              { value: "right", label: "🖐️ Tay Phải", desc: "Thành tựu hiện tại" },
            ].map((option) => (
              <motion.button
                key={option.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, hand: option.value })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.hand === option.value
                    ? "border-purple-400 bg-purple-500/20 text-white"
                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                }`}
              >
                <div className="text-2xl mb-2">{option.label}</div>
                <div className="text-sm">{option.desc}</div>
              </motion.button>
            ))}
          </div>
          {errors.hand && <p className="text-red-400 text-sm mt-2">{errors.hand}</p>}
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-white font-medium mb-3">Giới tính</label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "male", label: "👨 Nam", icon: "♂️" },
              { value: "female", label: "👩 Nữ", icon: "♀️" },
            ].map((option) => (
              <motion.button
                key={option.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, gender: option.value })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.gender === option.value
                    ? "border-pink-400 bg-pink-500/20 text-white"
                    : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div>{option.label}</div>
              </motion.button>
            ))}
          </div>
          {errors.gender && <p className="text-red-400 text-sm mt-2">{errors.gender}</p>}
        </div>

        {/* Age Input */}
        <div>
          <label className="block text-white font-medium mb-3">Tuổi của bạn</label>
          <input
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all"
            placeholder="Nhập tuổi của bạn"
          />
          {errors.age && <p className="text-red-400 text-sm mt-2">{errors.age}</p>}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Đang phân tích tướng...
            </div>
          ) : (
            "🔮 Xem Tướng Bàn Tay"
          )}
        </motion.button>

        {errors.submit && <p className="text-red-400 text-center">{errors.submit}</p>}
      </form>
    </motion.div>
  )
}
