"use server"

import { 
  getLanguageCookies,
  updateLanguage as updateLanguageCookies,
  clearLanguageCookies,
} from "@/lib/session/language-cookies"
import { 
  type SupportedLanguageCode 
} from "@/lib/i18n/language-config"

export async function setLanguage(language: SupportedLanguageCode) {
  try {
    const result = await updateLanguageCookies(language)
    if (result.success) {
      return { success: true }
    } else {
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("Failed to save language:", error)
    return { success: false, error: "Failed to save language" }
  }
}

export async function getLanguage(): Promise<{ 
  language: SupportedLanguageCode
  hasSession: boolean
  isDetected: boolean 
}> {
  try {
    const { language, isDetected, userHasSetLanguage } = await getLanguageCookies()
    
    // Only consider as "no session" if user has never set language AND we haven't detected
    const hasRealSession = userHasSetLanguage || isDetected
    
    return { 
      language, 
      hasSession: hasRealSession,
      isDetected 
    }
  } catch (error) {
    console.error("Failed to get language:", error)
    // Fallback
    const { language: fallbackLang } = await getLanguageCookies()
    return { language: fallbackLang, hasSession: false, isDetected: false }
  }
}

// Function to initialize language for new users (auto-detection happens in getLanguageCookies)
export async function initializeLanguageSession() {
  try {
    const { language, isDetected } = await getLanguageCookies()
    
    return { 
      success: true, 
      language, 
      isDetected 
    }
  } catch (error) {
    console.error("Failed to initialize language:", error)
    return { success: false, error: "Failed to initialize language" }
  }
}

// New function to clear language preferences (for user to reset)
export async function resetLanguagePreferences() {
  try {
    const result = await clearLanguageCookies()
    return result
  } catch (error) {
    console.error("Failed to reset language preferences:", error)
    return { success: false, error: "Failed to reset language preferences" }
  }
}
