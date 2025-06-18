"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api" // Assuming ApiErrorResponse type
import type { UserSession } from "@/lib/sessionOptions"
import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation" // For redirection

interface PromptLoginOptions {
  onLoginSuccess?: () => Promise<void> | void // Callback after successful login & action re-try
  redirectTo?: string // URL to redirect to after login (overrides onLoginSuccess for re-try)
  preserveState?: boolean // Hint for client to try to preserve state (form data)
}

interface AuthContextType {
  user: UserSession | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<AuthResult>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  promptLogin: (options?: PromptLoginOptions) => void
  isLoginPromptActive: boolean
  closeLoginPrompt: () => void
  // For the modal to use:
  processLogin: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>
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
  const [isLoading, setIsLoading] = useState(true) // For initial profile fetch
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false) // For login/register actions

  const { t } = useTranslation()
  const router = useRouter()

  const [isLoginPromptActive, setIsLoginPromptActive] = useState(false)
  const [onLoginSuccessCallback, setOnLoginSuccessCallback] = useState<(() => Promise<void> | void) | null>(null)
  const [redirectToAfterLoginState, setRedirectToAfterLoginState] = useState<string | null>(null)
  // preserveState is more of a hint for the calling component or interceptor,
  // actual state preservation happens outside AuthContext.

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

  const promptLogin = useCallback((options?: PromptLoginOptions) => {
    setOnLoginSuccessCallback(options?.onLoginSuccess ? () => options.onLoginSuccess : null)
    setRedirectToAfterLoginState(options?.redirectTo || null)
    setIsLoginPromptActive(true)
    // The UI (e.g., a LoginModal) will observe isLoginPromptActive
  }, [])

  const closeLoginPrompt = useCallback(() => {
    setIsLoginPromptActive(false)
    setOnLoginSuccessCallback(null)
    setRedirectToAfterLoginState(null)
  }, [])

  // This is the function the LoginModal will call
  const processLogin = async (email: string, password: string, rememberMe = false): Promise<AuthResult> => {
    setIsAuthActionLoading(true)
    try {
      const response = await apiClient.post("/auth/login", { email, password, rememberMe })
      if (response.data.success && response.data.user) {
        setUser(response.data.user)
        closeLoginPrompt() // Close modal on success

        // IMPORTANT: The onLoginSuccessCallback is expected to be the function that re-tries the original API call.
        // The Axios interceptor will provide this callback.
        if (onLoginSuccessCallback) {
          await onLoginSuccessCallback()
        } else if (redirectToAfterLoginState) {
          router.push(redirectToAfterLoginState)
        }
        // Clear callbacks after execution
        setOnLoginSuccessCallback(null)
        setRedirectToAfterLoginState(null)
        return { success: true, message: t("auth.login.loginSuccess"), user: response.data.user }
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

  // Original login function (e.g., for a dedicated login page)
  const login = async (email: string, password: string, rememberMe = false): Promise<AuthResult> => {
    setIsAuthActionLoading(true)
    try {
      const response = await apiClient.post("/auth/login", { email, password, rememberMe })
      if (response.data.success && response.data.user) {
        setUser(response.data.user)
        // No automatic callback execution here, this is for direct login page.
        return { success: true, message: t("auth.login.loginSuccess"), user: response.data.user }
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
      if (response.data.success && response.data.user) {
        setUser(response.data.user)
        // Potentially close login prompt if registration leads to login
        closeLoginPrompt()
        if (redirectToAfterLoginState) {
          // If a redirect was pending from an auth-triggered flow
          router.push(redirectToAfterLoginState)
          setRedirectToAfterLoginState(null)
        }
        return { success: true, message: t("auth.register.registerSuccess"), user: response.data.user }
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
    isLoading: isLoading || isAuthActionLoading, // Combine loading states
    login,
    register,
    logout,
    refreshUser: fetchUserProfile,
    promptLogin,
    isLoginPromptActive,
    closeLoginPrompt,
    processLogin, // Expose this for the modal
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
