"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { format } from "date-fns"
import type { HoroscopeResult } from "@/lib/horoscope"

type FormData = {
  birthDate: string
  type: "daily" | "weekly" | "monthly"
}

export default function HoroscopeForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<HoroscopeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      birthDate: "",
      type: "daily",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Đã xảy ra lỗi khi tạo dự báo tử vi")
      }

      setResult(result.data)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi")
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500"
    if (score >= 6) return "bg-yellow-500"
    if (score >= 4) return "bg-orange-500"
    return "bg-red-500"
  }

  const getScoreText = (score: number) => {
    if (score >= 8) return "Tuyệt vời"
    if (score >= 6) return "Tốt"
    if (score >= 4) return "Trung bình"
    return "Cần cải thiện"
  }

  const getForecastTypeText = (type: string) => {
    switch (type) {
      case "daily":
        return "Hàng ngày"
      case "weekly":
        return "Hàng tuần"
      case "monthly":
        return "Hàng tháng"
      default:
        return "Hàng ngày"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!result ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Xem Tử Vi Của Bạn</h2>

          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-100">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-white mb-1">
                Ngày sinh của bạn
              </label>
              <input
                type="date"
                id="birthDate"
                {...register("birthDate", { required: "Vui lòng nhập ngày sinh" })}
                className="w-full px-4 py-2 bg-white/20 border border-purple-300/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              />
              {errors.birthDate && <p className="mt-1 text-sm text-red-400">{errors.birthDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">Loại dự báo</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["daily", "weekly", "monthly"].map((type) => (
                  <label
                    key={type}
                    className="relative flex items-center justify-center p-4 bg-white/10 hover:bg-white/20 border border-purple-300/30 rounded-lg cursor-pointer transition-all"
                  >
                    <input type="radio" value={type} {...register("type")} className="sr-only" />
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-1">{type === "daily" ? "📅" : type === "weekly" ? "📊" : "📈"}</span>
                      <span className="font-medium text-white">{getForecastTypeText(type)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang tạo dự báo...
                  </>
                ) : (
                  "Xem Tử Vi"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Tử Vi {getForecastTypeText(result.type)}</h2>
            <button
              onClick={() => setResult(null)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
            >
              Quay lại
            </button>
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center gap-6 p-4 bg-white/5 rounded-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">{result.sign.symbol}</div>
              <h3 className="text-xl font-bold text-white">{result.sign.vietnameseName}</h3>
              <p className="text-purple-200">
                {format(new Date(result.sign.startDate.replace("-", "/01/")), "dd/MM")} -{" "}
                {format(new Date(result.sign.endDate.replace("-", "/01/")), "dd/MM")}
              </p>
              <p className="mt-1 text-yellow-200">Nguyên tố: {result.sign.vietnameseElement}</p>
            </div>

            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border-2 border-purple-500">
                  <span className="text-2xl font-bold text-white">{result.overall.score}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-white">Tổng quan</h4>
                  <p className="text-purple-200">{result.overall.text}</p>
                </div>
              </div>
              <p className="text-white/80 italic">{result.overall.advice}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">💕</span>
                <h4 className="text-lg font-medium text-white">Tình Yêu</h4>
                <div className="ml-auto flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreColor(result.love.score)}`}
                  >
                    <span className="font-bold text-white">{result.love.score}</span>
                  </div>
                  <span className="ml-2 text-sm text-white/80">{getScoreText(result.love.score)}</span>
                </div>
              </div>
              <p className="text-white/90 mb-2">{result.love.text}</p>
              <p className="text-white/70 text-sm italic">{result.love.advice}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">💼</span>
                <h4 className="text-lg font-medium text-white">Sự Nghiệp</h4>
                <div className="ml-auto flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreColor(result.career.score)}`}
                  >
                    <span className="font-bold text-white">{result.career.score}</span>
                  </div>
                  <span className="ml-2 text-sm text-white/80">{getScoreText(result.career.score)}</span>
                </div>
              </div>
              <p className="text-white/90 mb-2">{result.career.text}</p>
              <p className="text-white/70 text-sm italic">{result.career.advice}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">🏥</span>
                <h4 className="text-lg font-medium text-white">Sức Khỏe</h4>
                <div className="ml-auto flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreColor(result.health.score)}`}
                  >
                    <span className="font-bold text-white">{result.health.score}</span>
                  </div>
                  <span className="ml-2 text-sm text-white/80">{getScoreText(result.health.score)}</span>
                </div>
              </div>
              <p className="text-white/90 mb-2">{result.health.text}</p>
              <p className="text-white/70 text-sm italic">{result.health.advice}</p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-2">💰</span>
                <h4 className="text-lg font-medium text-white">Tài Chính</h4>
                <div className="ml-auto flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreColor(result.finance.score)}`}
                  >
                    <span className="font-bold text-white">{result.finance.score}</span>
                  </div>
                  <span className="ml-2 text-sm text-white/80">{getScoreText(result.finance.score)}</span>
                </div>
              </div>
              <p className="text-white/90 mb-2">{result.finance.text}</p>
              <p className="text-white/70 text-sm italic">{result.finance.advice}</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl mb-6">
            <div className="flex items-center mb-3">
              <span className="text-xl mr-2">🍀</span>
              <h4 className="text-lg font-medium text-white">May Mắn</h4>
              <div className="ml-auto flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreColor(result.luck.score)}`}
                >
                  <span className="font-bold text-white">{result.luck.score}</span>
                </div>
                <span className="ml-2 text-sm text-white/80">{getScoreText(result.luck.score)}</span>
              </div>
            </div>
            <p className="text-white/90 mb-4">{result.luck.text}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-white/80 mb-2">Số May Mắn</h5>
                <div className="flex flex-wrap gap-2">
                  {result.luck.luckyNumbers.map((num, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-purple-500/30 border border-purple-500/50 rounded-full text-white"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-white/80 mb-2">Màu May Mắn</h5>
                <div className="flex flex-wrap gap-2">
                  {result.luck.luckyColors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-purple-500/30 border border-purple-500/50 rounded-full text-white"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-lg">
                <h5 className="text-sm font-medium text-white/80 mb-2">Hướng May Mắn</h5>
                <div className="flex flex-wrap gap-2">
                  {result.luck.luckyDirections.map((direction, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-purple-500/30 border border-purple-500/50 rounded-full text-white"
                    >
                      {direction}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setResult(null)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg"
            >
              Xem Tử Vi Khác
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
