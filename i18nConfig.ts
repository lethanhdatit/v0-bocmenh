import type { Config } from 'next-i18n-router/dist/types';
import { 
  getEnabledLanguages, 
  getDefaultLanguageConfig,
  detectBrowserLanguage,
  type SupportedLanguageCode 
} from '@/lib/i18n/language-config';

// Lấy languages từ cấu hình hiện tại
const enabledLanguages = getEnabledLanguages();
const defaultLang = getDefaultLanguageConfig();

// Tạo array locales từ enabled languages
export const LOCALES = enabledLanguages.map(lang => lang.code);

export type I18nLocale = SupportedLanguageCode;

export const fallbackLng = defaultLang.code as I18nLocale;

// Cấu hình cho next-i18n-router
const i18nConfig: Config = {
  locales: LOCALES,
  defaultLocale: fallbackLng,
  
  // Cải thiện locale detector
  localeDetector: (request, config) => {
    // 1. Kiểm tra cookie NEXT_LOCALE trước (highest priority)
    const nextLocaleCookie = request.cookies.get('NEXT_LOCALE')?.value;
    if (nextLocaleCookie && config.locales.includes(nextLocaleCookie)) {
      return nextLocaleCookie;
    }
    
    return detectBrowserLanguage(request);
  },
  
  // Improved settings
  prefixDefault: false, // false = /about thay vì /vi/about cho default locale
  basePath: '', // Nếu app deploy ở subdirectory
  serverSetCookie: 'always', // Luôn set NEXT_LOCALE cookie
  
  // Add segment validation
  // skipTrailingSlashRedirect: true,
};

export default i18nConfig;
