"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient } from "@/lib/api"

interface User {
  id: string
  email: string
  name: string
  isPremium: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<{ success: boolean; message?: string; errors?: Record<string, string> }>
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<{ success: boolean; message?: string; errors?: Record<string, string> }>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const response = await apiClient.get("/auth/profile")
      if (response.data.success) {
        setUser(response.data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
        rememberMe,
      })

      if (response.data.success) {
        setUser(response.data.user)
        return { success: true, message: response.data.message }
      } else {
        return {
          success: false,
          message: response.data.message,
          errors: response.data.errors,
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Lỗi kết nối",
        errors: error.response?.data?.errors,
      }
    }
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
      const response = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      })

      if (response.data.success) {
        setUser(response.data.user)
        return { success: true, message: response.data.message }
      } else {
        return {
          success: false,
          message: response.data.message,
          errors: response.data.errors,
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Lỗi kết nối",
        errors: error.response?.data?.errors,
      }
    }
  }

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout")
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const value: AuthContextType = {
    user,
    isLoading,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    refreshUser,
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
