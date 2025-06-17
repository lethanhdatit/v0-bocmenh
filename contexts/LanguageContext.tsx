"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { setLanguage as setServerLanguage, getLanguage as getServerLanguage } from "@/lib/languageActions"
import "@/lib/i18n" // Import i18n configuration

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n, t } = useTranslation()
  const [language, setLanguageState] = useState<Language>("vi")
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize language from server session on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        setIsLoading(true)
        const { language: serverLanguage } = await getServerLanguage()

        // Always use server language as single source of truth
        const finalLanguage = serverLanguage || "vi"

        setLanguageState(finalLanguage)
        await i18n.changeLanguage(finalLanguage)
        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize language from server:", error)
        // Fallback to default
        setLanguageState("vi")
        await i18n.changeLanguage("vi")
        setIsInitialized(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isInitialized) {
      initializeLanguage()
    }
  }, [i18n, isInitialized])

  const setLanguage = async (lang: Language) => {
    try {
      setIsLoading(true)

      // Update server session first
      const result = await setServerLanguage(lang)

      if (result.success) {
        // Update local state and i18next
        setLanguageState(lang)
        await i18n.changeLanguage(lang)
      } else {
        console.error("Failed to save language to server:", result.error)
        // Don't update local state if server update failed
      }
    } catch (error) {
      console.error("Failed to change language:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
