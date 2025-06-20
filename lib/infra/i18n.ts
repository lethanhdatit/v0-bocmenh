import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getBaseUrl } from "@/lib/infra/utils";

// Dynamic loading function for translation files
async function loadTranslations() {
  try {
    const baseUrl = getBaseUrl();

    // Load translation files dynamically from public folder
    const [viCommonResponse, enCommonResponse, viTermResponse, enTermResponse] =
      await Promise.all([
        fetch(new URL("/locales/vi/common.json", baseUrl).toString()),
        fetch(new URL("/locales/en/common.json", baseUrl).toString()),
        fetch(new URL("/locales/vi/terms.json", baseUrl).toString()),
        fetch(new URL("/locales/en/terms.json", baseUrl).toString()),
      ]);

    const viCommon = await viCommonResponse.json();
    const enCommon = await enCommonResponse.json();
    const viTerm = await viTermResponse.json();
    const enTerm = await enTermResponse.json();

    return {
      vi: { common: viCommon, terms: viTerm },
      en: { common: enCommon, terms: enTerm },
    };
  } catch (error) {
    console.error("Failed to load translations:", error);
    // Fallback to empty resources
    return {
      vi: { common: {}, terms: {} },
      en: { common: {}, terms: {} },
    };
  }
}

// Initialize i18next with dynamic loading
const initPromise = loadTranslations().then((resources) => {
  return i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "vi",
    defaultNS: ["common", "terms"],
    ns: ["common", "terms"],
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
  });
});

// Export both the instance and initialization promise
export { initPromise };
export default i18n;
