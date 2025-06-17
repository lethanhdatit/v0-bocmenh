"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
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
  const language = i18n.language as Language

  useEffect(() => {
    // Sync with server session on mount
    const syncWithServer = async () => {
      try {
        const { language: serverLanguage, hasSession } = await getServerLanguage()

        // Only sync if we have a valid session and different language
        if (hasSession && serverLanguage && serverLanguage !== i18n.language) {
          await i18n.changeLanguage(serverLanguage)
        }
      } catch (error) {
        console.error("Failed to sync language with server:", error)
      }
    }

    // Delay server sync to avoid blocking initial render
    setTimeout(syncWithServer, 100)
  }, [i18n])

  const setLanguage = async (lang: Language) => {
    // Update i18next language
    await i18n.changeLanguage(lang)

    // Save to server session in background
    setServerLanguage(lang).catch((error) => {
      console.error("Failed to save language to server:", error)
    })
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLoading: false,
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
