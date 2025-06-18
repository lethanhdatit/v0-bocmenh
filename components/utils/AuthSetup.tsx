"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { setGlobalAuthPrompt } from "@/lib/api/apiClient"

export default function AuthSetup() {
  const { openLoginModal } = useAuth()

  useEffect(() => {
    setGlobalAuthPrompt(openLoginModal)
    return () => {
      setGlobalAuthPrompt(null) // Cleanup on unmount
    }
  }, [openLoginModal])

  return null // This component does not render anything visible
}
