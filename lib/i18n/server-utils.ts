"use server"

import { cookies } from "next/headers"
import { 
  getDefaultLanguageConfig,
  isLanguageSupported,
  type SupportedLanguageCode 
} from "@/lib/i18n/language-config"

/**
 * Get current language from NEXT_LOCALE cookie (set by next-i18n-router)
 * Falls back to default language if cookie is not present or invalid
 */
export async function getCurrentLanguage(): Promise<SupportedLanguageCode> {
  try {
    const cookieStore = await cookies()
    const nextLocaleCookie = cookieStore.get('NEXT_LOCALE')
    
    const savedLanguage = nextLocaleCookie?.value
    
    // If we have a valid saved language, use it
    if (savedLanguage && isLanguageSupported(savedLanguage)) {
      return savedLanguage as SupportedLanguageCode
    }
    
    // Fallback to default
    return getDefaultLanguageConfig().code as SupportedLanguageCode
  } catch (error) {
    console.error("Failed to get language from NEXT_LOCALE cookie:", error)
    return getDefaultLanguageConfig().code as SupportedLanguageCode
  }
}

/**
 * Legacy compatibility function for existing code
 * Returns the same interface as the old getLanguage function
 */
export async function getLanguage(): Promise<{ 
  language: SupportedLanguageCode
  hasSession: boolean
  isDetected: boolean 
}> {
  try {
    const cookieStore = await cookies()
    const nextLocaleCookie = cookieStore.get('NEXT_LOCALE')
    const language = await getCurrentLanguage()
    
    // Consider session exists if NEXT_LOCALE cookie is present
    const hasSession = !!nextLocaleCookie?.value
    
    // We can't reliably determine if language was auto-detected vs manually set
    // from NEXT_LOCALE cookie alone, so default to false for safety
    const isDetected = false
    
    return {
      language,
      hasSession,
      isDetected
    }
  } catch (error) {
    console.error("Failed to get language:", error)
    // Fallback
    const defaultLang = getDefaultLanguageConfig().code as SupportedLanguageCode
    return { 
      language: defaultLang, 
      hasSession: false, 
      isDetected: false 
    }
  }
}
