import fs from "fs"
import path from "path"
import type { Locale } from "./i18n"

interface Translations {
  [key: string]: string | Translations
}

const translationsCache = new Map<string, Translations>()

export async function loadTranslations(locale: Locale): Promise<Translations> {
  if (translationsCache.has(locale)) {
    return translationsCache.get(locale)!
  }

  try {
    const filePath = path.join(process.cwd(), "public", "locales", locale, "common.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const translations = JSON.parse(fileContents)

    translationsCache.set(locale, translations)
    return translations
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error)

    // Fallback to default locale
    if (locale !== "vi") {
      return loadTranslations("vi")
    }

    return {}
  }
}

export function createTranslator(translations: Translations) {
  return function t(key: string, params?: Record<string, string>): string {
    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    if (typeof value !== "string") {
      return key
    }

    // Simple interpolation
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match
      })
    }

    return value
  }
}

export async function getTranslations(locale: Locale) {
  const translations = await loadTranslations(locale)
  const t = createTranslator(translations)

  return { t, translations, currentLocale: locale }
}
