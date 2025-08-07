import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { 
  getDefaultLanguageConfig, 
  getEnabledLanguages, 
  I18N_NAMESPACES 
} from "@/lib/i18n/language-config";

// Cache cho translation resources
const TRANSLATION_CACHE_KEY = "i18n_translations_cache";
const CACHE_VERSION = "1.0.5"; // Tăng version này khi có thay đổi translation
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 giờ

interface CachedTranslations {
  version: string;
  timestamp: number;
  resources: any;
}

const defaultLang = getDefaultLanguageConfig();

// Initialize i18next without resources first
const isInitialized = i18n.use(initReactI18next).init({
  resources: {}, // Empty initially, will be populated by LanguageContext
  fallbackLng: defaultLang.code,
  defaultNS: "common",
  ns: [...I18N_NAMESPACES],
  lng: defaultLang.code, // Default language, will be set by LanguageContext

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

  // Add debug for development
  debug: false,
});

// Helper function để get cache từ localStorage
function getCachedTranslations(): CachedTranslations | null {
  if (typeof window === "undefined") return null;
  
  try {
    const cached = localStorage.getItem(TRANSLATION_CACHE_KEY);
    if (!cached) return null;
    
    const parsed: CachedTranslations = JSON.parse(cached);
    
    // Kiểm tra version và expiry
    if (
      parsed.version !== CACHE_VERSION ||
      Date.now() - parsed.timestamp > CACHE_EXPIRY
    ) {
      localStorage.removeItem(TRANSLATION_CACHE_KEY);
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error("Error reading translation cache:", error);
    localStorage.removeItem(TRANSLATION_CACHE_KEY);
    return null;
  }
}

// Helper function để save cache vào localStorage
function setCachedTranslations(resources: any): void {
  if (typeof window === "undefined") return;
  
  try {
    const cached: CachedTranslations = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      resources,
    };
    
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cached));
  } catch (error) {
    console.error("Error saving translation cache:", error);
  }
}

// Helper function to load resources dynamically
export async function loadTranslationResources(): Promise<boolean> {
  // Kiểm tra nếu i18n đã có resources
  if (Object.keys(i18n.store.data).length > 0) {
    return true;
  }

  try {
    // Thử load từ cache trước
    const cached = getCachedTranslations();
    if (cached && cached.resources) {
      
      // Add cached resources to i18n instance
      Object.keys(cached.resources).forEach((lng) => {
        Object.keys(cached.resources[lng]).forEach((ns) => {
          i18n.addResourceBundle(
            lng,
            ns,
            cached.resources[lng][ns],
            true,
            true
          );
        });
      });
      
      return true;
    }
    
    const enabledLanguages = getEnabledLanguages();
    
    // Dynamically load translation files for enabled languages
    const loadPromises: Promise<Response>[] = [];
    
    enabledLanguages.forEach(lang => {
      I18N_NAMESPACES.forEach(namespace => {
        loadPromises.push(fetch(`/locales/${lang.code}/${namespace}.json`));
      });
    });

    const responses = await Promise.all(loadPromises);

    // Kiểm tra tất cả response đều OK
    if (!responses.every(r => r.ok)) {
      throw new Error("Some translation files failed to load");
    }

    const jsonData = await Promise.all(responses.map(r => r.json()));

    // Build resources object dynamically
    const resources: any = {};
    
    let dataIndex = 0;
    enabledLanguages.forEach(lang => {
      resources[lang.code] = {};
      I18N_NAMESPACES.forEach(namespace => {
        resources[lang.code][namespace] = jsonData[dataIndex];
        dataIndex++;
      });
    });

    // Add resources to i18n instance
    Object.keys(resources).forEach((lng) => {
      Object.keys(resources[lng]).forEach((ns) => {
        i18n.addResourceBundle(
          lng,
          ns,
          resources[lng][ns],
          true,
          true
        );
      });
    });

    // Cache the resources
    setCachedTranslations(resources);

    return true;
  } catch (error) {
    console.error("Failed to load translations:", error);
    return false;
  }
}

// Function để clear cache khi cần
export function clearTranslationCache(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TRANSLATION_CACHE_KEY);
  }
}

export default i18n;
