import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { getBaseUrl } from "@/lib/infra/utils"

// Dynamic loading function for translation files
async function loadTranslations() {
  try {
    const baseUrl = getBaseUrl()
    
    // Load translation files dynamically from public folder
    const [viResponse, enResponse] = await Promise.all([
      fetch(new URL('/locales/vi/common.json', baseUrl).toString()),
      fetch(new URL('/locales/en/common.json', baseUrl).toString()),
    ])

    const viCommon = await viResponse.json()
    const enCommon = await enResponse.json()

    return {
      vi: { common: viCommon },
      en: { common: enCommon },
    }
  } catch (error) {
    console.error("Failed to load translations:", error)
    // Fallback to empty resources
    return {
      vi: { common: {} },
      en: { common: {} },
    }
  }
}

// Initialize i18next with dynamic loading
const initPromise = loadTranslations().then((resources) => {
  return i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "vi",
    defaultNS: "common",
    ns: ["common"],
    lng: "vi", // Default language, will be set by LanguageContext

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: false, // Avoid suspense for better UX
    },

    // No automatic detection - we handle this via server session
    detection: {
      order: [],
      caches: [],
    },
  })
})

// Export both the instance and initialization promise
export { initPromise }
export default i18n
