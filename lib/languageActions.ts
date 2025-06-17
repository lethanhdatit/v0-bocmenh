"use server"

import { getSession } from "@/lib/session"

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
    const language = session.language || "vi"
    return { language, hasSession }
  } catch (error) {
    console.error("Failed to get language from session:", error)
    return { language: "vi", hasSession: false }
  }
}
