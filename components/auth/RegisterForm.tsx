"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

interface RegisterFormProps {
  onSuccess?: () => void
  redirectTo?: string
}

export default function RegisterForm({ onSuccess, redirectTo }: RegisterFormProps) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setMessage("")

    // Client-side validation
    const clientErrors: Record<string, string> = {}

    if (!formData.agreeToTerms) {
      clientErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản sử dụng"
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      setIsLoading(false)
      return
    }

    const result = await register(formData.name, formData.email, formData.password, formData.confirmPassword)

    if (result.success) {
      setMessage(result.message || "Đăng ký thành công!")
      if (onSuccess) {
        setTimeout(onSuccess, 1000)
      } else if (redirectTo) {
        setTimeout(() => {
          window.location.href = redirectTo
        }, 1000)
      }
    } else {
      setErrors(result.errors || {})
      setMessage(result.message || "Đăng ký thất bại")
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mystical-card max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">Đăng Ký</h2>
        <p className="text-gray-300">Tạo tài khoản để khám phá vận mệnh</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2">
            <User className="w-4 h-4" />
            <span>Họ và tên</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:outline-none text-white transition-colors ${
              errors.name ? "border-red-500 focus:border-red-400" : "border-gray-600 focus:border-yellow-500"
            }`}
            placeholder="Nhập họ và tên của bạn"
            required
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

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
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
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
              placeholder="Nhập lại mật khẩu"
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

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start space-x-3 text-gray-300">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className={`w-4 h-4 mt-0.5 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2 ${
                errors.agreeToTerms ? "border-red-500" : ""
              }`}
            />
            <span className="text-sm">
              Tôi đồng ý với{" "}
              <Link href="/terms" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link href="/privacy" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                Chính sách bảo mật
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm mt-1"
            >
              {errors.agreeToTerms}
            </motion.p>
          )}
        </div>

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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mystical-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <UserPlus className="w-5 h-5" />
          )}
          <span>{isLoading ? "Đang đăng ký..." : "Đăng Ký"}</span>
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6 pt-6 border-t border-gray-700">
        <p className="text-gray-400">
          Đã có tài khoản?{" "}
          <Link href="/auth/login" className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
