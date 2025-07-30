// Helper for server-side translations with enhanced caching
import { createInstance, type i18n as I18nInstanceType } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "../next-i18next.config";
import { getLanguage as getServerLanguage } from "@/lib/languageActions";

// Multi-level cache for i18n instances
const i18nInstances = new Map<string, I18nInstanceType>();
const resourceCache = new Map<string, any>(); // Cache cho translation resources
const translationCache = new Map<string, string>(); // Cache cho translated strings

// Cache expiry settings
const INSTANCE_CACHE_SIZE = 50; // Giới hạn số lượng instances cached
const RESOURCE_CACHE_SIZE = 100; // Giới hạn số lượng resources cached
const TRANSLATION_CACHE_SIZE = 1000; // Giới hạn số lượng translations cached

// LRU Cache implementation để quản lý memory
class LRUCache<K, V> extends Map<K, V> {
  private maxSize: number;

  constructor(maxSize: number) {
    super();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = super.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.delete(key);
      this.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): this {
    if (this.has(key)) {
      this.delete(key);
    } else if (this.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.keys().next().value;
      if (firstKey !== undefined) {
        this.delete(firstKey);
      }
    }
    return super.set(key, value);
  }
}

// Tạo LRU caches
const lruInstanceCache = new LRUCache<string, I18nInstanceType>(INSTANCE_CACHE_SIZE);
const lruResourceCache = new LRUCache<string, any>(RESOURCE_CACHE_SIZE);
const lruTranslationCache = new LRUCache<string, string>(TRANSLATION_CACHE_SIZE);

// Optimized resource loader với cache
const cachedResourceLoader = (language: string, namespace: string) => {
  const cacheKey = `${language}-${namespace}`;
  
  if (lruResourceCache.has(cacheKey)) {
    return Promise.resolve(lruResourceCache.get(cacheKey));
  }

  return import(`../public/locales/${language}/${namespace}.json`)
    .then((resource) => {
      lruResourceCache.set(cacheKey, resource.default);
      return resource.default;
    })
    .catch((error) => {
      console.error(`Failed to load ${language}/${namespace}:`, error);
      return {};
    });
};

async function initI18next(
  locale: string,
  namespaces: string | string[] = "common"
) {
  const cacheKey = `${locale}-${Array.isArray(namespaces) ? namespaces.join(',') : namespaces}`;
  
  // Kiểm tra LRU cache trước
  if (lruInstanceCache.has(cacheKey)) {
    return lruInstanceCache.get(cacheKey)!;
  }

  // Fallback to legacy cache
  if (i18nInstances.has(cacheKey)) {
    const instance = i18nInstances.get(cacheKey)!;
    lruInstanceCache.set(cacheKey, instance);
    i18nInstances.delete(cacheKey); // Remove from old cache
    return instance;
  }

  try {
    const instance = createInstance();
    await instance
      .use(resourcesToBackend(cachedResourceLoader))
      .init({
        lng: locale,
        fallbackLng: i18nConfig.i18n.defaultLocale,
        supportedLngs: i18nConfig.i18n.locales,
        defaultNS: Array.isArray(namespaces) ? namespaces[0] : namespaces,
        ns: namespaces,
        interpolation: {
          escapeValue: false, // React already safes from xss
        },
        // Optimize performance
        load: "languageOnly", // Chỉ load language, không load region variants
        preload: false, // Không preload languages khác
        cleanCode: true, // Clean language codes
      });
    
    lruInstanceCache.set(cacheKey, instance);
    return instance;
  } catch (error) {
    console.error(`Failed to initialize i18n for ${locale}:`, error);
    // Return fallback instance
    const fallbackKey = `${i18nConfig.i18n.defaultLocale}-${Array.isArray(namespaces) ? namespaces.join(',') : namespaces}`;
    if (lruInstanceCache.has(fallbackKey)) {
      return lruInstanceCache.get(fallbackKey)!;
    }
    throw error;
  }
}

export async function getTranslations(
  namespaces: string | string[] = [
    "common",
    "terms", 
    "privacy",
    "help",
    "about",
    "contact"
  ]
) {
  try {
    const { language: locale } = await getServerLanguage();
    const i18n = await initI18next(locale, namespaces);
    
    // Cached t function
    const cachedT = (key: string, options?: any): string => {
      const cacheKey = `${locale}-${key}-${JSON.stringify(options || {})}`;
      
      if (lruTranslationCache.has(cacheKey)) {
        return lruTranslationCache.get(cacheKey)!;
      }
      
      const result = i18n.t(key, options) as string;
      lruTranslationCache.set(cacheKey, result);
      return result;
    };
    
    return {
      t: cachedT,
      i18n: i18n,
      messages: {},
    };
  } catch (error) {
    console.error("Error getting translations:", error);
    // Fallback to default locale với cached instance
    try {
      const i18n = await initI18next(i18nConfig.i18n.defaultLocale, namespaces);
      const cachedT = (key: string, options?: any): string => {
        const cacheKey = `${i18nConfig.i18n.defaultLocale}-${key}-${JSON.stringify(options || {})}`;
        
        if (lruTranslationCache.has(cacheKey)) {
          return lruTranslationCache.get(cacheKey)!;
        }
        
        const result = i18n.t(key, options) as string;
        lruTranslationCache.set(cacheKey, result);
        return result;
      };
      
      return {
        t: cachedT,
        i18n: i18n,
        messages: {},
      };
    } catch (fallbackError) {
      console.error("Fallback translation also failed:", fallbackError);
      // Return emergency fallback
      return {
        t: (key: string) => key, // Return key as fallback
        i18n: null,
        messages: {},
      };
    }
  }
}

export async function getLocale() {
  try {
    const { language } = await getServerLanguage();
    return language;
  } catch (error) {
    console.error("Error getting locale:", error);
    return i18nConfig.i18n.defaultLocale;
  }
}

// Utility functions để quản lý cache
export function clearI18nCache() {
  lruInstanceCache.clear();
  lruResourceCache.clear();
  lruTranslationCache.clear();
  i18nInstances.clear();
  resourceCache.clear();
  translationCache.clear();
}

export function getCacheStats() {
  return {
    instances: lruInstanceCache.size,
    resources: lruResourceCache.size,
    translations: lruTranslationCache.size,
    legacyInstances: i18nInstances.size,
    legacyResources: resourceCache.size,
    legacyTranslations: translationCache.size,
  };
}
