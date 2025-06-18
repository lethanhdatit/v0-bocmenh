"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import { useAuthForm } from "@/hooks/useAuthForm"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  onSuccess?: () => void
  redirectTo?: string
  isModal?: boolean
  className?: string
}

export default function LoginForm({ onSuccess, redirectTo, isModal = false, className }: LoginFormProps) {
  const { t } = useTranslation()
  const { errors, isLoading, message, clearError, handleLogin } = useAuthForm({
    onSuccess,
    redirectTo,
    isModal,
  })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin(formData.email, formData.password, formData.rememberMe)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    clearError(name)
  }

  const containerClass = isModal ? `space-y-4 ${className || ""}` : `mystical-card max-w-md mx-auto ${className || ""}`

  const FormContent = () => (
    <>
      {!isModal && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">{t("auth.login.title")}</h2>
            <p className="text-gray-300">{t("auth.login.subtitle")}</p>
          </div>

          {/* Demo accounts info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
            <p className="text-blue-400 text-sm font-medium mb-2">{t("auth.login.demoAccounts")}</p>
            <div className="text-xs text-blue-300 space-y-1">
              <div>{t("auth.login.demoRegular")}</div>
              <div>{t("auth.login.demoPremium")}</div>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <Label
            className={`flex items-center space-x-2 font-medium mb-2 ${isModal ? "text-yellow-400" : "text-gray-300"}`}
          >
            <Mail className="w-4 h-4" />
            <span>{t("auth.login.email")}</span>
          </Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-white transition-colors ${
              isModal ? "bg-gray-800/70 border-gray-700 placeholder-gray-500" : "bg-gray-800/50 border-gray-600"
            } ${errors.email ? "border-red-500 focus:border-red-400" : "focus:border-yellow-500"}`}
            placeholder={t("auth.login.emailPlaceholder")}
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
          <Label
            className={`flex items-center space-x-2 font-medium mb-2 ${isModal ? "text-yellow-400" : "text-gray-300"}`}
          >
            <Lock className="w-4 h-4" />
            <span>{t("auth.login.password")}</span>
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none text-white transition-colors ${
                isModal ? "bg-gray-800/70 border-gray-700 placeholder-gray-500" : "bg-gray-800/50 border-gray-600"
              } ${errors.password ? "border-red-500 focus:border-red-400" : "focus:border-yellow-500"}`}
              placeholder={t("auth.login.passwordPlaceholder")}
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
          <label className={`flex items-center space-x-2 ${isModal ? "text-gray-300" : "text-gray-300"}`}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
            />
            <span className="text-sm">{t("auth.login.rememberMe")}</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            {t("auth.login.forgotPassword")}
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
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            isModal ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900" : "mystical-button"
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          <span>{isLoading ? t("auth.login.loggingIn") : t("auth.login.loginButton")}</span>
        </Button>
      </form>

      {/* Register Link */}
      {!isModal && (
        <div className="text-center mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400">
            {t("auth.login.noAccount")}{" "}
            <Link href="/auth/register" className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium">
              {t("auth.login.registerNow")}
            </Link>
          </p>
        </div>
      )}
    </>
  )

  return isModal ? (
    <div className={containerClass}>
      <FormContent />
    </div>
  ) : (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={containerClass}>
      <FormContent />
    </motion.div>
  )
}
