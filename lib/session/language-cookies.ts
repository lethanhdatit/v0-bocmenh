"use server"

import { cookies } from "next/headers"
import { 
  getDefaultLanguageConfig,
  isLanguageSupported,
  detectBrowserLanguage,
  type SupportedLanguageCode 
} from "@/lib/i18n/language-config"

// Language cookie configuration
const LANGUAGE_COOKIE_NAME = "boc-menh-language"
const LANGUAGE_DETECTED_COOKIE_NAME = "boc-menh-language-detected"
const LANGUAGE_USER_SET_COOKIE_NAME = "boc-menh-language-user-set" // Track if user manually set language
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year

interface LanguageSession {
  language: SupportedLanguageCode
  isDetected: boolean
  userHasSetLanguage: boolean // Track if user manually set language
}

/**
 * Get language from dedicated cookies (independent of user session)
 */
export async function getLanguageCookies(): Promise<LanguageSession> {
  try {
    const cookieStore = await cookies()
    const languageCookie = cookieStore.get(LANGUAGE_COOKIE_NAME)
    const detectedCookie = cookieStore.get(LANGUAGE_DETECTED_COOKIE_NAME)
    const userSetCookie = cookieStore.get(LANGUAGE_USER_SET_COOKIE_NAME)
    
    const savedLanguage = languageCookie?.value
    const isDetected = detectedCookie?.value === "true"
    const userHasSetLanguage = userSetCookie?.value === "true"
    
    // If we have a valid saved language, use it
    if (savedLanguage && isLanguageSupported(savedLanguage)) {
      return {
        language: savedLanguage as SupportedLanguageCode,
        isDetected,
        userHasSetLanguage
      }
    }
    
    // Only auto-detect if user has never set a language AND we haven't detected before
    if (!detectedCookie && !userHasSetLanguage) {
      // For server-side, use default and let client-side handle detection
      if (typeof window === "undefined") {
        const defaultLang = getDefaultLanguageConfig().code as SupportedLanguageCode
        return {
          language: defaultLang,
          isDetected: false,
          userHasSetLanguage: false
        }
      }
      
      // Client-side detection
      const detectedLang = detectBrowserLanguage()
      
      // Save detected language
      await setLanguageCookies(detectedLang as SupportedLanguageCode, true, false)
      
      return {
        language: detectedLang as SupportedLanguageCode,
        isDetected: true,
        userHasSetLanguage: false
      }
    }
    
    // Fallback to default
    const defaultLang = getDefaultLanguageConfig().code as SupportedLanguageCode
    await setLanguageCookies(defaultLang, false, userHasSetLanguage)
    
    return {
      language: defaultLang,
      isDetected: false,
      userHasSetLanguage
    }
  } catch (error) {
    console.error("Failed to get language from cookies:", error)
    const defaultLang = getDefaultLanguageConfig().code as SupportedLanguageCode
    return {
      language: defaultLang,
      isDetected: false,
      userHasSetLanguage: false
    }
  }
}

/**
 * Set language in dedicated cookies
 */
export async function setLanguageCookies(
  language: SupportedLanguageCode, 
  isDetected: boolean = false,
  isUserSet: boolean = false
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate language is supported
    if (!isLanguageSupported(language)) {
      console.warn(`Language ${language} is not supported, falling back to default`)
      language = getDefaultLanguageConfig().code as SupportedLanguageCode
    }

    const cookieStore = await cookies()
    
    // Set language cookie
    cookieStore.set(LANGUAGE_COOKIE_NAME, language, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })
    
    // Set detected flag cookie
    cookieStore.set(LANGUAGE_DETECTED_COOKIE_NAME, isDetected.toString(), {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })
    
    // Set user-set flag cookie
    cookieStore.set(LANGUAGE_USER_SET_COOKIE_NAME, isUserSet.toString(), {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    })
    
    return { success: true }
  } catch (error) {
    console.error("Failed to set language cookies:", error)
    return { success: false, error: "Failed to set language cookies" }
  }
}

/**
 * Update language (when user manually changes)
 */
export async function updateLanguage(language: SupportedLanguageCode): Promise<{ success: boolean; error?: string }> {
  // When user manually changes language, mark as user-set (not detected)
  return setLanguageCookies(language, false, true)
}

/**
 * Clear language cookies (for debugging or user preference reset)
 */
export async function clearLanguageCookies(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(LANGUAGE_COOKIE_NAME)
    cookieStore.delete(LANGUAGE_DETECTED_COOKIE_NAME)
    cookieStore.delete(LANGUAGE_USER_SET_COOKIE_NAME)
    return { success: true }
  } catch (error) {
    console.error("Failed to clear language cookies:", error)
    return { success: false }
  }
}

/**
 * Check if language cookies exist
 */
export async function hasLanguageCookies(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    return !!(
      cookieStore.get(LANGUAGE_COOKIE_NAME) || 
      cookieStore.get(LANGUAGE_DETECTED_COOKIE_NAME) ||
      cookieStore.get(LANGUAGE_USER_SET_COOKIE_NAME)
    )
  } catch (error) {
    return false
  }
}
