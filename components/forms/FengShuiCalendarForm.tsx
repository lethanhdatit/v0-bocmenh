"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Star, User } from "lucide-react"
import { eventTypes, type CalendarAnalysis } from "@/lib/fengShuiCalendar"

interface FengShuiCalendarFormProps {
  onAnalysisComplete: (analysis: CalendarAnalysis) => void
}

export default function FengShuiCalendarForm({ onAnalysisComplete }: FengShuiCalendarFormProps) {
  const [formData, setFormData] = useState({
    eventType: "",
    birthYear: new Date().getFullYear() - 30,
    gender: "male" as "male" | "female",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.eventType) {
      newErrors.eventType = "Vui lòng chọn loại sự kiện"
    }

    if (formData.birthYear < 1900 || formData.birthYear > 2100) {
      newErrors.birthYear = "Năm sinh phải từ 1900 đến 2100"
    }

    if (formData.month < 1 || formData.month > 12) {
      newErrors.month = "Tháng phải từ 1 đến 12"
    }

    if (formData.year < 2020 || formData.year > 2030) {
      newErrors.year = "Năm phân tích phải từ 2020 đến 2030"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/fengshui/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        onAnalysisComplete(result.data)
      } else {
        setErrors({ general: result.error || "Có lỗi xảy ra" })
      }
    } catch (error) {
      setErrors({ general: "Không thể kết nối đến server" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Type Selection */}
        <div>
          <label className="block text-blue-400 font-medium mb-3">
            <Star className="w-4 h-4 inline mr-2" />
            Loại Sự Kiện
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {eventTypes.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => handleInputChange("eventType", event.id)}
                className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                  formData.eventType === event.id
                    ? "border-blue-400 bg-blue-500/20 text-blue-400"
                    : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-blue-500/50"
                }`}
              >
                <div className="text-2xl mb-1">{event.icon}</div>
                <div className="text-sm font-medium">{event.name}</div>
                <div className="text-xs text-gray-400 mt-1">{event.description}</div>
              </button>
            ))}
          </div>
          {errors.eventType && <p className="text-red-400 text-sm mt-2">{errors.eventType}</p>}
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-blue-400 font-medium mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Năm Sinh
            </label>
            <input
              type="number"
              value={formData.birthYear}
              onChange={(e) => handleInputChange("birthYear", Number.parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
              placeholder="Ví dụ: 1990"
              min="1900"
              max="2100"
            />
            {errors.birthYear && <p className="text-red-400 text-sm mt-1">{errors.birthYear}</p>}
          </div>

          <div>
            <label className="block text-blue-400 font-medium mb-2">Giới Tính</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleInputChange("gender", "male")}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
                  formData.gender === "male"
                    ? "border-blue-400 bg-blue-500/20 text-blue-400"
                    : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-blue-500/50"
                }`}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => handleInputChange("gender", "female")}
                className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
                  formData.gender === "female"
                    ? "border-blue-400 bg-blue-500/20 text-blue-400"
                    : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-blue-500/50"
                }`}
              >
                Nữ
              </button>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-blue-400 font-medium mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Tháng Cần Phân Tích
            </label>
            <select
              value={formData.month}
              onChange={(e) => handleInputChange("month", Number.parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
            {errors.month && <p className="text-red-400 text-sm mt-1">{errors.month}</p>}
          </div>

          <div>
            <label className="block text-blue-400 font-medium mb-2">Năm</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => handleInputChange("year", Number.parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
              placeholder="Ví dụ: 2024"
              min="2020"
              max="2030"
            />
            {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
          </div>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{errors.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang phân tích...</span>
            </>
          ) : (
            <>
              <Clock className="w-5 h-5" />
              <span>Phân Tích Ngày Tốt</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}
