import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// Import translation files
import viCommon from "../locales/vi/common.json"
import enCommon from "../locales/en/common.json"

const resources = {
  vi: {
    common: viCommon,
  },
  en: {
    common: enCommon,
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "vi",
  defaultNS: "common",
  ns: ["common"],
  lng: "vi", // Set default language, will be overridden by server

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },

  // Remove language detection - we'll handle this manually via server session
  detection: {
    order: [], // Empty array means no automatic detection
    caches: [], // No caching
  },
})

export default i18n
