"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api"
import type { UserSession } from "@/lib/sessionOptions" // Your defined session type
import { useTranslation } from "react-i18next"

interface AuthContextType {
  user: UserSession | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>
  register: (name: string, email: string, password: string, confirmPassword?: string) => Promise<AuthResult>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
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
  const { t } = useTranslation() // Get t function

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

  const login = async (email: string, password: string, rememberMe = false): Promise<AuthResult> => {
    setIsLoading(true)
    try {
      const response = await apiClient.post("/auth/login", { email, password, rememberMe })
      if (response.data.success && response.data.user) {
        setUser(response.data.user)
        return { success: true, message: t("auth.login.loginSuccess"), user: response.data.user }
      }
      return { success: false, message: response.data.message || t("auth.login.loginFailed"), errors: response.data.errors }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("auth.login.loginFailed")
      return { success: false, message: errorMessage, errors: error.response?.data?.errors }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
  ): Promise<AuthResult> => {
    setIsLoading(true)
    try {
      const response = await apiClient.post("/auth/register", { name, email, password, confirmPassword })
      if (response.data.success && response.data.user) {
        setUser(response.data.user)
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
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await apiClient.post("/auth/logout")
      setUser(null)
      // Optionally display a success message using a toast or similar
    } catch (error) {
      console.error("Logout failed:", error)
      // Optionally display an error message
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser: fetchUserProfile,
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
