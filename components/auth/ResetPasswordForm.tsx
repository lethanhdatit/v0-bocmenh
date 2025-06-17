"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface ResetPasswordFormProps {
  token: string
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { refreshUser } = useAuth()
  const pathname = usePathname()
  const currentLocale = pathname.split("/")[1] || "vi"

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage("")

    try {
      const response = await apiClient.post("/auth/reset-password", {
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })

      if (response.data.success) {
        setIsSuccess(true)
        setMessage(response.data.message)
        // Refresh user context since they're now logged in
        await refreshUser()
        // Redirect after success
        setTimeout(() => {
          window.location.href = `/${currentLocale}`
        }, 3000)
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
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"]
  const strengthLabels = ["Yếu", "Trung bình", "Khá", "Mạnh"]

  // Check if token is provided
  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mystical-card max-w-md mx-auto text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">Link Không Hợp Lệ</h2>
        </div>

        <p className="text-gray-300 mb-6">
          Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu link mới.
        </p>

        <Link href={`/${currentLocale}/auth/forgot-password`} className="mystical-button inline-block">
          Yêu Cầu Link Mới
        </Link>
      </motion.div>
    )
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
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">Thành Công!</h2>
        </div>

        <div className="space-y-4 text-gray-300">
          <p>{message}</p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400 text-sm">🎉 Bạn sẽ được chuyển hướng về trang chủ trong 3 giây...</p>
          </div>
        </div>

        <Link href={`/${currentLocale}`} className="mystical-button inline-block mt-6">
          Về Trang Chủ
        </Link>
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
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">Đặt Lại Mật Khẩu</h2>
        <p className="text-gray-300">Tạo mật khẩu mới cho tài khoản của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
            <Lock className="w-4 h-4" />
            <span>Mật khẩu mới</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 bg-gray-800/50 border rounded-lg focus:outline-none text-white transition-colors ${
                errors.password ? "border-red-500 focus:border-red-400" : "border-gray-600 focus:border-yellow-500"
              }`}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex space-x-1 mb-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded ${
                      i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Độ mạnh mật khẩu:{" "}
                <span className="text-yellow-500">{strengthLabels[passwordStrength - 1] || "Yếu"}</span>
              </p>
            </div>
          )}

          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.password}
            </motion.p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
            <Lock className="w-4 h-4" />
            <span>Xác nhận mật khẩu</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 bg-gray-800/50 border rounded-lg focus:outline-none text-white transition-colors ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-400"
                  : "border-gray-600 focus:border-yellow-500"
              }`}
              placeholder="Nhập lại mật khẩu mới"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </div>

        {/* Security Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-400 mb-2">🔒 Bảo mật</h3>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Mật khẩu mạnh giúp bảo vệ tài khoản</li>
            <li>• Không chia sẻ mật khẩu với ai</li>
            <li>• Bạn sẽ được đăng nhập tự động sau khi đặt lại</li>
          </ul>
        </div>

        {/* Token Error */}
        {errors.token && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
          >
            <p className="text-red-400 text-sm">{errors.token}</p>
            <Link
              href={`/${currentLocale}/auth/forgot-password`}
              className="text-yellow-500 hover:text-yellow-400 text-sm"
            >
              Yêu cầu link mới →
            </Link>
          </motion.div>
        )}

        {/* General Error */}
        {message && Object.keys(errors).length > 0 && !errors.token && (
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
            <Lock className="w-5 h-5" />
          )}
          <span>{isLoading ? "Đang đặt lại..." : "Đặt Lại Mật Khẩu"}</span>
        </button>
      </form>

      <div className="text-center mt-6 pt-6 border-t border-gray-700">
        <Link href={`/${currentLocale}/auth/login`} className="text-gray-400 hover:text-yellow-500 transition-colors">
          Quay lại đăng nhập
        </Link>
      </div>
    </motion.div>
  )
}
