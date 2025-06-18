"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { setGlobalAuthPrompt } from "@/lib/api"

export default function AuthSetup() {
  const { promptLogin } = useAuth()

  useEffect(() => {
    setGlobalAuthPrompt(promptLogin)
    return () => {
      setGlobalAuthPrompt(null) // Cleanup on unmount
    }
  }, [promptLogin])

  return null // This component does not render anything visible
}
