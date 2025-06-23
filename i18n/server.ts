// Helper for server-side translations
// This is a simplified example. You might need a more robust solution based on next-i18next's App Router patterns.
import { createInstance, type i18n as I18nInstanceType } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import i18nConfig from "../next-i18next.config" // Adjust path if your config is elsewhere
import { getLanguage as getServerLanguage } from "@/lib/languageActions"

let i18nInstance: I18nInstanceType | null = null

async function initI18next(locale: string, namespaces: string | string[] = "common") {
  if (i18nInstance && i18nInstance.language === locale) {
    return i18nInstance
  }

  const instance = createInstance()
  await instance
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`../public/locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng: locale,
      fallbackLng: i18nConfig.i18n.defaultLocale,
      supportedLngs: i18nConfig.i18n.locales,
      defaultNS: Array.isArray(namespaces) ? namespaces[0] : namespaces,
      ns: namespaces,
      // debug: process.env.NODE_ENV === 'development', // Optional: for debugging
      interpolation: {
        escapeValue: false, // React already safes from xss
      },
    })
  i18nInstance = instance
  return instance
}

export async function getTranslations(namespaces: string | string[] = ["common", "terms", "privacy", "help", "about"]) {
  const { language: locale } = await getServerLanguage()

  const i18n = await initI18next(locale, namespaces)
  return {
    t: i18n.t,
    i18n: i18n, // Optional: if you need the full i18n instance
    messages: {}, // Add empty messages object for compatibility
  }
}

export async function getLocale() {
  const { language } = await getServerLanguage()
  return language
}
