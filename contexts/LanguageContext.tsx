"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, usePathname } from "next/navigation"
import { setLanguage as setServerLanguage, getLanguage as getServerLanguage } from "@/lib/languageActions"
import { setApiClientLanguage } from "@/lib/api/apiClient"
import i18n, { loadTranslationResources } from "@/lib/infra/i18n"
import { cacheManager } from "@/lib/utils/i18n-cache"
import { 
  getDefaultLanguageConfig,
  getEnabledLanguages,
  isLanguageSupported,
  detectBrowserLanguage,
  type SupportedLanguageCode 
} from "@/lib/i18n/language-config"

interface LanguageContextType {
  language: SupportedLanguageCode
  setLanguage: (lang: SupportedLanguageCode) => void
  t: (key: string) => string
  isLoading: boolean
  cacheInfo: {
    isCached: boolean
    cacheSize?: number
    timestamp?: number
  }
  refreshTranslations: () => Promise<void>
  availableLanguages: ReturnType<typeof getEnabledLanguages>
  isDetectedLanguage: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
  initialLocale?: SupportedLanguageCode
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Get locale from URL or use initialLocale or default
  const getLocaleFromUrl = (): SupportedLanguageCode => {
    if (initialLocale) return initialLocale
    
    const segments = pathname.split('/').filter(Boolean)
    const urlLocale = segments[0]
    
    if (urlLocale && isLanguageSupported(urlLocale)) {
      return urlLocale as SupportedLanguageCode
    }
    
    return getDefaultLanguageConfig().code as SupportedLanguageCode
  }

  const [language, setLanguageState] = useState<SupportedLanguageCode>(getLocaleFromUrl())
  const [isLoading, setIsLoading] = useState(true)
  const [isI18nReady, setIsI18nReady] = useState(false)
  const [cacheInfo, setCacheInfo] = useState(cacheManager.getClientCacheInfo())
  const [isDetectedLanguage, setIsDetectedLanguage] = useState(false)

  const refreshTranslations = async () => {
    await cacheManager.refreshTranslations()
    setCacheInfo(cacheManager.getClientCacheInfo())
  }

  // Initialize i18n first, then get translation function
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        setIsLoading(true)

        // Load translation resources first
        const resourcesLoaded = await loadTranslationResources()
        
        if (!resourcesLoaded) {
          throw new Error("Failed to load translation resources")
        }

        // Get current locale from URL
        const currentLocale = getLocaleFromUrl()

        // If no initial locale provided, check for language detection
        if (!initialLocale) {
          // Fetch language from server/cookies
          const { language: serverLanguage, isDetected, hasSession } = await getServerLanguage()
          let finalLanguage = serverLanguage || currentLocale
          let isActuallyDetected = isDetected

          // Only do client-side detection if:
          // 1. Server didn't detect (SSR)
          // 2. User has never set a language preference (no session/cookies)
          // 3. We're on client-side
          // 4. Current URL locale is default (meaning user hasn't explicitly chosen)
          if (!isDetected && !hasSession && typeof window !== "undefined" && currentLocale === getDefaultLanguageConfig().code) {
            const detectedLang = detectBrowserLanguage()
            
            // Only use detected language if it's different from default
            if (detectedLang !== getDefaultLanguageConfig().code) {
              finalLanguage = detectedLang as SupportedLanguageCode
              isActuallyDetected = true
              
              // Save the client-detected language
              await setServerLanguage(finalLanguage)
              
              // Navigate to detected language URL
              const newPath = pathname.replace(`/${currentLocale}`, `/${finalLanguage}`)
              router.replace(newPath)
              setLanguageState(finalLanguage)
              setIsDetectedLanguage(isActuallyDetected)
            }
          } else {
            setLanguageState(finalLanguage as SupportedLanguageCode)
            setIsDetectedLanguage(isActuallyDetected)
          }
        } else {
          // Use provided initial locale
          setLanguageState(currentLocale)
          // Save to server for consistency
          await setServerLanguage(currentLocale)
        }

        // Set language in i18n
        if (i18n && typeof i18n.changeLanguage === "function") {
          await i18n.changeLanguage(language)
        }

        // Set language in API client for Accept-Language header
        setApiClientLanguage(language)
        setIsI18nReady(true)

        if (isDetectedLanguage) {
          console.log(`Auto-detected browser language: ${language}`)
        }
      } catch (error) {
        console.error("Failed to initialize i18n:", error)
        // Fallback to current locale without crashing
        const fallbackLang = getLocaleFromUrl()
        setLanguageState(fallbackLang)
        setApiClientLanguage(fallbackLang)
        if (i18n && typeof i18n.changeLanguage === "function") {
          try {
            await i18n.changeLanguage(fallbackLang)
          } catch (i18nError) {
            console.error("Failed to set fallback language:", i18nError)
          }
        }
        setIsI18nReady(true)
      } finally {
        setIsLoading(false)
      }
    }

    initializeI18n()
  }, [initialLocale, router, pathname])

  const setLanguage = async (lang: SupportedLanguageCode) => {
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

        // Update API client language for Accept-Language header
        setApiClientLanguage(lang)

        // Navigate to new language URL
        const segments = pathname.split('/').filter(Boolean)
        const currentLocale = segments[0]
        
        if (isLanguageSupported(currentLocale)) {
          // Replace current locale with new one
          const newPath = pathname.replace(`/${currentLocale}`, `/${lang}`)
          router.push(newPath)
        } else {
          // Add locale to beginning of path
          const newPath = `/${lang}${pathname}`
          router.push(newPath)
        }

        // Reset detected flag since user manually changed language
        setIsDetectedLanguage(false)
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
    <LanguageContextProvider 
      language={language} 
      setLanguage={setLanguage} 
      isLoading={isLoading}
      cacheInfo={cacheInfo}
      refreshTranslations={refreshTranslations}
      availableLanguages={getEnabledLanguages()}
      isDetectedLanguage={isDetectedLanguage}
    >
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
  cacheInfo,
  refreshTranslations,
  availableLanguages,
  isDetectedLanguage,
}: {
  children: React.ReactNode
  language: SupportedLanguageCode
  setLanguage: (lang: SupportedLanguageCode) => void
  isLoading: boolean
  cacheInfo: {
    isCached: boolean
    cacheSize?: number
    timestamp?: number
  }
  refreshTranslations: () => Promise<void>
  availableLanguages: ReturnType<typeof getEnabledLanguages>
  isDetectedLanguage: boolean
}) {
  const { t } = useTranslation() // Now safe to call since i18n is ready

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLoading,
        cacheInfo,
        refreshTranslations,
        availableLanguages,
        isDetectedLanguage,
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
