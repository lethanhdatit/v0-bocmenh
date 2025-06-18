"use server"

import { getSession } from "@/lib/session/session"

export async function setLanguage(language: "vi" | "en") {
  try {
    const session = await getSession()
    session.language = language
    await session.save()
    return { success: true }
  } catch (error) {
    console.error("Failed to save language to session:", error)
    return { success: false, error: "Failed to save language" }
  }
}

export async function getLanguage(): Promise<{ language: "vi" | "en"; hasSession: boolean }> {
  try {
    const session = await getSession()

    // Check if session has any data (indicating it's been initialized)
    const hasSession = !!(session.id || session.email || session.isLoggedIn || session.language)

    // Always return a language, default to "vi" if not set
    const language = session.language || "vi"

    // If no language is set in session, set it to default
    if (!session.language) {
      session.language = "vi"
      await session.save()
    }

    return { language, hasSession }
  } catch (error) {
    console.error("Failed to get language from session:", error)
    return { language: "vi", hasSession: false }
  }
}

// New function to initialize language session for new users
export async function initializeLanguageSession() {
  try {
    const session = await getSession()

    // Only initialize if no language is set
    if (!session.language) {
      session.language = "vi"
      await session.save()
    }

    return { success: true, language: session.language }
  } catch (error) {
    console.error("Failed to initialize language session:", error)
    return { success: false, error: "Failed to initialize language session" }
  }
}
