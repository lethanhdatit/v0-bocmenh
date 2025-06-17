"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react"
import { apiClient } from "@/lib/api"
import Link from "next/link"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage("")

    try {
      const response = await apiClient.post("/auth/forgot-password", { email })

      if (response.data.success) {
        setIsSuccess(true)
        setMessage(response.data.message)
      } else {
        setErrors(response.data.errors || {})
        setMessage(response.data.message || "Có lỗi xảy ra")
      }
    } catch (error: any) {
      setErrors(error.response?.data?.errors || {})
      setMessage(error.response?.data?.message || "Lỗi kết nối")
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }))
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mystical-card max-w-md mx-auto text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Email Đã Được Gửi</h2>
        </div>

        <div className="space-y-4 text-gray-300">
          <p>{message}</p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-400 mb-2">📧 Kiểm tra email của bạn</h3>
            <ul className="text-sm text-blue-300 space-y-1 text-left">
              <li>• Kiểm tra hộp thư đến</li>
              <li>• Kiểm tra thư mục spam/junk</li>
              <li>• Link có hiệu lực trong 15 phút</li>
              <li>• Chỉ sử dụng được 1 lần</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-400 text-sm">
              <strong>💡 Mẹo:</strong> Nếu không nhận được email sau 5 phút, hãy thử gửi lại hoặc kiểm tra địa chỉ
              email.
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button
            onClick={() => {
              setIsSuccess(false)
              setEmail("")
              setMessage("")
            }}
            className="mystical-button"
          >
            Gửi lại email
          </button>

          <Link
            href="/auth/login"
            className="flex items-center justify-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại đăng nhập</span>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mystical-card max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">Quên Mật Khẩu</h2>
        <p className="text-gray-300">Nhập email để nhận link đặt lại mật khẩu</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
            <Mail className="w-4 h-4" />
            <span>Email đã đăng ký</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:outline-none text-white transition-colors ${
              errors.email ? "border-red-500 focus:border-red-400" : "border-gray-600 focus:border-yellow-500"
            }`}
            placeholder="Nhập email của bạn"
            required
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-400 mb-2">ℹ️ Lưu ý</h3>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Link đặt lại mật khẩu có hiệu lực 15 phút</li>
            <li>• Chỉ sử dụng được 1 lần</li>
            <li>• Kiểm tra cả thư mục spam</li>
          </ul>
        </div>

        {/* Error Message */}
        {message && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
          >
            <p className="text-red-400 text-sm">{message}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mystical-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          <span>{isLoading ? "Đang gửi..." : "Gửi Link Đặt Lại"}</span>
        </button>
      </form>

      <div className="text-center mt-6 pt-6 border-t border-gray-700">
        <Link
          href="/auth/login"
          className="flex items-center justify-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại đăng nhập</span>
        </Link>
      </div>
    </motion.div>
  )
}
