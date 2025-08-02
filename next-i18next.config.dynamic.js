// Dynamic i18n config generated from language-config.ts
import { 
  getDefaultLanguageConfig, 
  getEnabledLanguages 
} from "./lib/i18n/language-config";

const defaultLang = getDefaultLanguageConfig();
const enabledLanguages = getEnabledLanguages();

module.exports = {
  i18n: {
    defaultLocale: defaultLang.code,
    locales: enabledLanguages.map(lang => lang.code),
    localeDetection: false, // Chúng ta handle detection manually
  },
  fallbackLng: {
    default: [defaultLang.code],
  },
  debug: process.env.NODE_ENV === "development",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
