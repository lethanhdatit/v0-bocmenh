"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useRouter } from "next/navigation"
import { setApiClientLanguage } from "@/lib/api/apiClient"
import i18n, { loadTranslationResources } from "@/lib/infra/i18n"
import { cacheManager } from "@/lib/utils/i18n-cache"
import { 
  getDefaultLanguageConfig,
  getEnabledLanguages,
  isLanguageSupported,
  type SupportedLanguageCode 
} from "@/lib/i18n/language-config"

// Constants
const COOKIE_NAME = 'NEXT_LOCALE'
const COOKIE_EXPIRY_YEARS = 1
const COOKIE_ATTRIBUTES = {
  PATH: '/',
  SAME_SITE: 'Lax'
} as const

const LOADING_SPINNER_CONFIG = {
  className: "animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"
} as const

const ERROR_MESSAGES = {
  LOAD_RESOURCES_FAILED: "Failed to load translation resources",
  LANGUAGE_CHANGE_FAILED: "Failed to change language:",
  I18N_FALLBACK_FAILED: "Fallback i18n change also failed:",
  CONTEXT_USAGE_ERROR: "useLanguage must be used within a LanguageProvider"
} as const

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

// Helper function để đọc NEXT_LOCALE cookie
function getNextLocaleCookie(): SupportedLanguageCode | null {
  if (typeof window === "undefined") return null;
  
  const cookies = document.cookie.split(';');
  const nextLocaleCookie = cookies
    .find(cookie => cookie.trim().startsWith(`${COOKIE_NAME}=`))
    ?.split('=')[1];
    
  if (nextLocaleCookie && isLanguageSupported(nextLocaleCookie)) {
    return nextLocaleCookie as SupportedLanguageCode;
  }
  
  return null;
}

// Helper function để set NEXT_LOCALE cookie
function setNextLocaleCookie(language: SupportedLanguageCode): void {
  const cookieExpiry = new Date();
  cookieExpiry.setFullYear(cookieExpiry.getFullYear() + COOKIE_EXPIRY_YEARS);
  
  const cookieValue = [
    `${COOKIE_NAME}=${language}`,
    `path=${COOKIE_ATTRIBUTES.PATH}`,
    `expires=${cookieExpiry.toUTCString()}`,
    `SameSite=${COOKIE_ATTRIBUTES.SAME_SITE}`
  ].join(';');
  
  document.cookie = cookieValue;
}

// Helper function để build full URL với params và hash
function buildFullUrl(basePath: string): string {
  const currentSearch = window.location.search; // Query parameters
  const currentHash = window.location.hash;     // Hash fragment
  return `${basePath}${currentSearch}${currentHash}`;
}

// Helper function để remove language prefix từ path
function removeLanguageFromPath(path: string, language: SupportedLanguageCode): string {
  const languagePrefix = `/${language}`;
  if (path.startsWith(languagePrefix)) {
    return path.slice(languagePrefix.length) || '/';
  }
  return path;
}

// Helper function để build path với language prefix
function buildLanguagePath(path: string, language: SupportedLanguageCode): string {
  const defaultLanguage = getDefaultLanguageConfig().code;
  return language === defaultLanguage ? path : `/${language}${path}`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const router = useRouter()
  
  // Lấy language từ URL params, NEXT_LOCALE cookie, hoặc fallback
  const getCurrentLanguage = (): SupportedLanguageCode => {
    // 1. Ưu tiên từ URL params (cho non-default languages)
    const langFromUrl = params?.lang as string
    if (langFromUrl && isLanguageSupported(langFromUrl)) {
      return langFromUrl as SupportedLanguageCode
    }
    
    // 2. Fallback từ NEXT_LOCALE cookie (được set manually hoặc bởi middleware)
    const cookieLanguage = getNextLocaleCookie()
    if (cookieLanguage) {
      return cookieLanguage
    }
    
    // 3. Fallback cuối cùng
    return getDefaultLanguageConfig().code as SupportedLanguageCode
  }
  
  const [language, setLanguageState] = useState<SupportedLanguageCode>(getCurrentLanguage())
  const [isLoading, setIsLoading] = useState(true)
  const [isI18nReady, setIsI18nReady] = useState(false)
  const [cacheInfo, setCacheInfo] = useState(cacheManager.getClientCacheInfo())
  const [isDetectedLanguage, setIsDetectedLanguage] = useState(false)

  const refreshTranslations = async () => {
    await cacheManager.refreshTranslations()
    setCacheInfo(cacheManager.getClientCacheInfo())
  }

  // Sync language with URL params
  useEffect(() => {
    const currentLang = getCurrentLanguage()
    if (currentLang !== language) {
      setLanguageState(currentLang)
      
      // Update i18next if available
      if (i18n && typeof i18n.changeLanguage === "function") {
        i18n.changeLanguage(currentLang)
      }
      
      // Update API client language
      setApiClientLanguage(currentLang)
    }
  }, [params?.lang, language])

  // Sync html lang attribute with current language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language])

  // Initialize i18n
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        setIsLoading(true)

        // Load translation resources first
        const resourcesLoaded = await loadTranslationResources()
        
        if (!resourcesLoaded) {
          throw new Error(ERROR_MESSAGES.LOAD_RESOURCES_FAILED)
        }

        // Get current language
        const finalLanguage = getCurrentLanguage()

        // Set language in i18n
        if (i18n && typeof i18n.changeLanguage === "function") {
          await i18n.changeLanguage(finalLanguage)
        }

        // Set language in API client for Accept-Language header
        setApiClientLanguage(finalLanguage)

        setLanguageState(finalLanguage)
        setIsI18nReady(true)

        // Check if this language was auto-detected by middleware
        // (nếu không có URL lang param và có NEXT_LOCALE cookie khác default)
        const hasUrlLang = !!params?.lang
        const cookieLanguage = getNextLocaleCookie()
        const defaultLanguage = getDefaultLanguageConfig().code
        const wasAutoDetected = !hasUrlLang && !!cookieLanguage && cookieLanguage !== defaultLanguage
        
        setIsDetectedLanguage(wasAutoDetected)

        if (wasAutoDetected) {
          console.log(`Auto-detected browser language: ${finalLanguage}`)
        }
      } catch (error) {
        console.error("Failed to initialize i18n:", error)
        // Fallback to default without crashing
        const defaultLang = getDefaultLanguageConfig().code as SupportedLanguageCode
        setLanguageState(defaultLang)
        setApiClientLanguage(defaultLang)
        if (i18n && typeof i18n.changeLanguage === "function") {
          try {
            await i18n.changeLanguage(defaultLang)
          } catch (i18nError) {
            console.error(ERROR_MESSAGES.I18N_FALLBACK_FAILED, i18nError)
          }
        }
        setIsI18nReady(true)
      } finally {
        setIsLoading(false)
      }
    }

    initializeI18n()
  }, [])

  const setLanguage = (lang: SupportedLanguageCode) => {
    try {
      setIsLoading(true)

      // Get current URL components
      const currentPath = window.location.pathname;
      const currentLang = getCurrentLanguage();
      
      // Build new path with language prefix
      const pathWithoutLanguage = removeLanguageFromPath(currentPath, currentLang);
      const newLanguagePath = buildLanguagePath(pathWithoutLanguage, lang);
      const fullUrl = buildFullUrl(newLanguagePath);

      // Set cookie manually vì middleware chỉ set khi direct access/refresh
      // Client-side navigation cần manually set cookie
      setNextLocaleCookie(lang);
      
      // Navigate to new URL with all components preserved
      router.push(fullUrl);

      // Update application state
      setLanguageState(lang);

      // Update i18next if available
      if (i18n && typeof i18n.changeLanguage === "function") {
        i18n.changeLanguage(lang);
      }

      // Update API client language for Accept-Language header
      setApiClientLanguage(lang);

      // Reset detected flag since user manually changed language
      setIsDetectedLanguage(false);
    } catch (error) {
      console.error(ERROR_MESSAGES.LANGUAGE_CHANGE_FAILED, error);
    } finally {
      setIsLoading(false);
    }
  }

  // Only render children when i18n is ready
  if (!isI18nReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={LOADING_SPINNER_CONFIG.className}></div>
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
    throw new Error(ERROR_MESSAGES.CONTEXT_USAGE_ERROR)
  }
  return context
}
