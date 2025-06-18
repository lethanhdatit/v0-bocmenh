"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api/apiClient"
import type { UserSession } from "@/lib/session/sessionOptions"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"

interface PromptLoginOptions {
  onLoginSuccess?: () => Promise<void> | void
  redirectTo?: string
  preserveState?: boolean
}

type AuthModalType = "login" | "register" | "forgot-password" | null

interface AuthContextType {
  user: UserSession | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<AuthResult>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>

  // Modal management
  activeModal: AuthModalType
  openLoginModal: (options?: PromptLoginOptions) => void
  openRegisterModal: (options?: PromptLoginOptions) => void
  openForgotPasswordModal: () => void
  closeAuthModal: () => void

  // For modal callbacks
  onLoginSuccessCallback: (() => Promise<void> | void) | null
  redirectToAfterLogin: string | null
}

interface AuthResult {
  success: boolean
  message?: string
  errors?: Record<string, string>
  user?: UserSession
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false)

  const { t } = useTranslation()
  const router = useRouter()

  // Modal states
  const [activeModal, setActiveModal] = useState<AuthModalType>(null)
  const [onLoginSuccessCallback, setOnLoginSuccessCallback] = useState<(() => Promise<void> | void) | null>(null)
  const [redirectToAfterLogin, setRedirectToAfterLogin] = useState<string | null>(null)

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await apiClient.get("/auth/profile")
      if (response.data.success && response.data.user) {
        setUser(response.data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
      console.error("Failed to fetch user profile:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  // Modal management functions
  const openLoginModal = useCallback((options?: PromptLoginOptions) => {
    setOnLoginSuccessCallback(options?.onLoginSuccess ?? null)
    setRedirectToAfterLogin(options?.redirectTo || null)
    setActiveModal("login")
  }, [])

  const openRegisterModal = useCallback((options?: PromptLoginOptions) => {
    setOnLoginSuccessCallback(options?.onLoginSuccess ?? null)
    setRedirectToAfterLogin(options?.redirectTo || null)
    setActiveModal("register")
  }, [])

  const openForgotPasswordModal = useCallback(() => {
    setActiveModal("forgot-password")
  }, [])

  const closeAuthModal = useCallback(() => {
    setActiveModal(null)
    setOnLoginSuccessCallback(null)
    setRedirectToAfterLogin(null)
  }, [])

  const login = async (email: string, password: string, rememberMe = false): Promise<AuthResult> => {
    setIsAuthActionLoading(true)
    try {
      const response = await apiClient.post("/auth/login", { email, password, rememberMe })
      if (response.data.success && response.data.data) {
        setUser(response.data.data)

        // Handle success callbacks
        if (onLoginSuccessCallback) {
          await onLoginSuccessCallback()
        } else if (redirectToAfterLogin) {
          router.push(redirectToAfterLogin)
        }

        // Close modal and clear callbacks
        closeAuthModal()

        return { success: true, message: t("auth.login.loginSuccess"), user: response.data.data }
      }
      return {
        success: false,
        message: response.data.message || t("auth.login.loginFailed"),
        errors: response.data.errors,
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("auth.login.loginFailed")
      return { success: false, message: errorMessage, errors: error.response?.data?.errors }
    } finally {
      setIsAuthActionLoading(false)
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
  ): Promise<AuthResult> => {
    setIsAuthActionLoading(true)
    try {
      const response = await apiClient.post("/auth/register", { name, email, password, confirmPassword })
      if (response.data.success && response.data.data) {
        setUser(response.data.data)

        // Handle success callbacks
        if (onLoginSuccessCallback) {
          await onLoginSuccessCallback()
        } else if (redirectToAfterLogin) {
          router.push(redirectToAfterLogin)
        }

        // Close modal and clear callbacks
        closeAuthModal()

        return { success: true, message: t("auth.register.registerSuccess"), user: response.data.data }
      }
      return {
        success: false,
        message: response.data.message || t("auth.register.registerFailed"),
        errors: response.data.errors,
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("auth.register.registerFailed")
      return { success: false, message: errorMessage, errors: error.response?.data?.errors }
    } finally {
      setIsAuthActionLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsAuthActionLoading(true)
    try {
      await apiClient.post("/auth/logout")
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsAuthActionLoading(false)
    }
  }

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading: isLoading || isAuthActionLoading,
    login,
    register,
    logout,
    refreshUser: fetchUserProfile,

    // Modal management
    activeModal,
    openLoginModal,
    openRegisterModal,
    openForgotPasswordModal,
    closeAuthModal,

    // For modal callbacks
    onLoginSuccessCallback,
    redirectToAfterLogin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
