"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "react-i18next"

interface UseAuthFormOptions {
  onSuccess?: () => void
  redirectTo?: string
  isModal?: boolean
}

export function useAuthForm(options: UseAuthFormOptions = {}) {
  const { login, register } = useAuth()
  const { t } = useTranslation()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleLogin = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true)
    setErrors({})
    setMessage("")

    const result = await login(email, password, rememberMe)

    if (result.success) {
      setMessage(result.message || t("auth.login.loginSuccess"))
      if (options.onSuccess) {
        setTimeout(options.onSuccess, 1000)
      } else if (options.redirectTo) {
        setTimeout(() => {
          window.location.href = options.redirectTo!
        }, 1000)
      }
    } else {
      setErrors(result.errors || {})
      setMessage(result.message || t("auth.login.loginFailed"))
    }

    setIsLoading(false)
    return result
  }

  const handleRegister = async (name: string, email: string, password: string, confirmPassword?: string) => {
    setIsLoading(true)
    setErrors({})
    setMessage("")

    const result = await register(name, email, password, confirmPassword)

    if (result.success) {
      setMessage(result.message || t("auth.register.registerSuccess"))
      if (options.onSuccess) {
        setTimeout(options.onSuccess, 1000)
      } else if (options.redirectTo) {
        setTimeout(() => {
          window.location.href = options.redirectTo!
        }, 1000)
      }
    } else {
      setErrors(result.errors || {})
      setMessage(result.message || t("auth.register.registerFailed"))
    }

    setIsLoading(false)
    return result
  }

  return {
    errors,
    isLoading,
    message,
    clearError,
    handleLogin,
    handleRegister,
    setErrors,
    setMessage,
  }
}
