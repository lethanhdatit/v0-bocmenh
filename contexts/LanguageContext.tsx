"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { setLanguage as setServerLanguage, getLanguage as getServerLanguage } from "@/lib/languageActions"
import i18n, { initPromise } from "@/lib/i18n" // Import both i18n and init promise

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const [language, setLanguageState] = useState<Language>("vi")
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize language from server session on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        setIsLoading(true)

        // Wait for i18n to be fully initialized first
        await initPromise

        // Now fetch language from server
        const { language: serverLanguage } = await getServerLanguage()

        // Always use server language as single source of truth
        const finalLanguage = serverLanguage || "vi"

        setLanguageState(finalLanguage)

        // Now safely call changeLanguage
        if (i18n && typeof i18n.changeLanguage === "function") {
          await i18n.changeLanguage(finalLanguage)
        } else {
          console.warn("i18n.changeLanguage is not available")
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize language from server:", error)
        // Fallback to default
        setLanguageState("vi")

        // Try to set default language if possible
        try {
          if (i18n && typeof i18n.changeLanguage === "function") {
            await i18n.changeLanguage("vi")
          }
        } catch (i18nError) {
          console.error("Failed to set default language:", i18nError)
        }

        setIsInitialized(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (!isInitialized) {
      initializeLanguage()
    }
  }, [isInitialized])

  const setLanguage = async (lang: Language) => {
    try {
      setIsLoading(true)

      // Update server session first
      const result = await setServerLanguage(lang)

      if (result.success) {
        // Update local state
        setLanguageState(lang)

        // Update i18next if available
        if (i18n && typeof i18n.changeLanguage === "function") {
          await i18n.changeLanguage(lang)
        } else {
          console.warn("i18n.changeLanguage is not available during language change")
        }
      } else {
        console.error("Failed to save language to server:", result.error)
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
