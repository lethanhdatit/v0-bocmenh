import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translation files directly (static import)
// This is more reliable than dynamic fetch in Next.js
import viCommon from "../public/locales/vi/common.json"
import enCommon from "../public/locales/en/common.json"

const resources = {
  vi: {
    common: viCommon,
  },
  en: {
    common: enCommon,
  },
}

// Initialize i18next and export the promise
const initPromise = i18n.use(initReactI18next).init({
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

// Export both the instance and initialization promise
export { initPromise }
export default i18n
