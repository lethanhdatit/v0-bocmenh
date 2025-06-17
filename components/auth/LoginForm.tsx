"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface LoginFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export default function LoginForm({ onSuccess, redirectTo }: LoginFormProps) {
  const { login } = useAuth()
  const pathname = usePathname()
  const currentLocale = pathname.split("/")[1] || "vi"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage("")

    const result = await login(formData.email, formData.password, formData.rememberMe)

    if (result.success) {
      setMessage(result.message || "Đăng nhập thành công!")
      if (onSuccess) {
        setTimeout(onSuccess, 1000)
      } else if (redirectTo) {
        setTimeout(() => {
          window.location.href = redirectTo
        }, 1000)
      }
    } else {
      setErrors(result.errors || {})
      setMessage(result.message || "Đăng nhập thất bại")
    }

    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mystical-card max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">Đăng Nhập</h2>
        <p className="text-gray-300">Chào mừng bạn trở lại với Bóc Mệnh</p>
      </div>

      {/* Demo accounts info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
        <p className="text-blue-400 text-sm font-medium mb-2">🎯 Tài khoản demo:</p>
        <div className="text-xs text-blue-300 space-y-1">
          <div>• Email: demo@bocmenh.com | Pass: 123456</div>
          <div>• Email: premium@bocmenh.com | Pass: 123456 (Premium)</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
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

        {/* Password Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
            <Lock className="w-4 h-4" />
            <span>Mật khẩu</span>
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
              placeholder="Nhập mật khẩu"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <span className="text-sm">Ghi nhớ đăng nhập</span>
          </label>
          <Link
            href={`/${currentLocale}/auth/forgot-password`}
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* General Error */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
          >
            <p className="text-red-400 text-sm">{errors.general}</p>
          </motion.div>
        )}

        {/* Success Message */}
        {message && !Object.keys(errors).length && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
          >
            <p className="text-green-400 text-sm">{message}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mystical-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          <span>{isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}</span>
        </button>
      </form>

      {/* Register Link */}
      <div className="text-center mt-6 pt-6 border-t border-gray-700">
        <p className="text-gray-400">
          Chưa có tài khoản?{" "}
          <Link
            href={`/${currentLocale}/auth/register`}
            className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
