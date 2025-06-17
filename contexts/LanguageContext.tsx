"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { setLanguage as setServerLanguage, getLanguage as getServerLanguage } from "@/lib/languageActions"
import i18n, { initPromise } from "@/lib/i18n"

type Language = "vi" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi")
  const [isLoading, setIsLoading] = useState(true)
  const [isI18nReady, setIsI18nReady] = useState(false)

  // Initialize i18n first, then get translation function
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        setIsLoading(true)

        // Wait for i18n to be fully initialized first
        await initPromise

        // Now fetch language from server
        const { language: serverLanguage } = await getServerLanguage()
        const finalLanguage = serverLanguage || "vi"

        // Set language in i18n
        if (i18n && typeof i18n.changeLanguage === "function") {
          await i18n.changeLanguage(finalLanguage)
        }

        setLanguageState(finalLanguage)
        setIsI18nReady(true)
      } catch (error) {
        console.error("Failed to initialize i18n:", error)
        // Fallback to default
        setLanguageState("vi")
        if (i18n && typeof i18n.changeLanguage === "function") {
          try {
            await i18n.changeLanguage("vi")
          } catch (i18nError) {
            console.error("Failed to set default language:", i18nError)
          }
        }
        setIsI18nReady(true)
      } finally {
        setIsLoading(false)
      }
    }

    initializeI18n()
  }, [])

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

  // Only render children when i18n is ready
  if (!isI18nReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  return (
    <LanguageContextProvider language={language} setLanguage={setLanguage} isLoading={isLoading}>
      {children}
    </LanguageContextProvider>
  )
}

// Separate component that uses useTranslation after i18n is ready
function LanguageContextProvider({
  children,
  language,
  setLanguage,
  isLoading,
}: {
  children: React.ReactNode
  language: Language
  setLanguage: (lang: Language) => void
  isLoading: boolean
}) {
  const { t } = useTranslation() // Now safe to call since i18n is ready

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
