import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { getBaseUrl } from "@/lib/infra/utils"

// Dynamic loading function for translation files
async function loadTranslations() {
  try {
    const baseUrl = getBaseUrl()

    // Load translation files dynamically from public folder
    const [
      viCommonResponse,
      enCommonResponse,
      viTermResponse,
      enTermResponse,
      viPrivacyResponse,
      enPrivacyResponse,
      viHelpResponse,
      enHelpResponse,
      viAboutResponse,
      enAboutResponse,
      viContactResponse,
      enContactResponse,
    ] = await Promise.all([
      fetch(new URL("/locales/vi/common.json", baseUrl).toString()),
      fetch(new URL("/locales/en/common.json", baseUrl).toString()),
      fetch(new URL("/locales/vi/terms.json", baseUrl).toString()),
      fetch(new URL("/locales/en/terms.json", baseUrl).toString()),
      fetch(new URL("/locales/vi/privacy.json", baseUrl).toString()),
      fetch(new URL("/locales/en/privacy.json", baseUrl).toString()),
      fetch(new URL("/locales/vi/help.json", baseUrl).toString()),
      fetch(new URL("/locales/en/help.json", baseUrl).toString()),
      fetch(new URL("/locales/vi/about.json", baseUrl).toString()),
      fetch(new URL("/locales/en/about.json", baseUrl).toString()),
      fetch(new URL("/locales/vi/contact.json", baseUrl).toString()),
      fetch(new URL("/locales/en/contact.json", baseUrl).toString()),
    ])

    const viCommon = await viCommonResponse.json()
    const enCommon = await enCommonResponse.json()
    const viTerm = await viTermResponse.json()
    const enTerm = await enTermResponse.json()
    const viPrivacy = await viPrivacyResponse.json()
    const enPrivacy = await enPrivacyResponse.json()
    const viHelp = await viHelpResponse.json()
    const enHelp = await enHelpResponse.json()
    const viAbout = await viAboutResponse.json()
    const enAbout = await enAboutResponse.json()
    const viContact = await viContactResponse.json()
    const enContact = await enContactResponse.json()

    return {
      vi: { common: viCommon, terms: viTerm, privacy: viPrivacy, help: viHelp, about: viAbout, contact: viContact },
      en: { common: enCommon, terms: enTerm, privacy: enPrivacy, help: enHelp, about: enAbout, contact: enContact },
    }
  } catch (error) {
    console.error("Failed to load translations:", error)
    // Fallback to empty resources
    return {
      vi: { common: {}, terms: {}, privacy: {}, help: {}, about: {}, contact: {} },
      en: { common: {}, terms: {}, privacy: {}, help: {}, about: {}, contact: {} },
    }
  }
}

// Initialize i18next with dynamic loading
const initPromise = loadTranslations().then((resources) => {
  return i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "vi",
    defaultNS: ["common", "terms", "privacy", "help", "about", "contact"],
    ns: ["common", "terms", "privacy", "help", "about", "contact"],
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
