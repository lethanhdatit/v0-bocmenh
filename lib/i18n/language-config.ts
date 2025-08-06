/**
 * Centralized Language Configuration
 * Dễ dàng mở rộng, tắt/bật ngôn ngữ, cấu hình accept-language headers
 */

import { NextRequest } from "next/server";

export interface LanguageConfig {
  /** Language code (ISO 639-1) */
  code: string;
  /** Display name in native language */
  name: string;
  /** Display name in English */
  englishName: string;
  /** Flag emoji or icon */
  flag: string;
  /** Accept-Language header value */
  acceptLanguage: string;
  /** Date/time locale for formatting */
  dateLocale: string;
  /** Is this language enabled? */
  enabled: boolean;
  /** Is this the default fallback language? */
  isDefault?: boolean;
  /** Browser language codes that should map to this language */
  browserCodes: string[];
}

/**
 * All supported languages configuration
 * Thêm ngôn ngữ mới bằng cách thêm object vào array này
 */
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: "vi",
    name: "Tiếng Việt",
    englishName: "Vietnamese",
    flag: "🇻🇳",
    acceptLanguage: "vi-VN,vi;q=0.9,en;q=0.8",
    dateLocale: "vi-VN",
    enabled: true,
    isDefault: true,
    browserCodes: ["vi", "vi-VN", "vi-vn"],
  },
  {
    code: "en",
    name: "English",
    englishName: "English",
    flag: "🇺🇸",
    acceptLanguage: "en-US,en;q=0.9,vi;q=0.8",
    dateLocale: "en-US",
    enabled: true,
    browserCodes: ["en", "en-US", "en-us", "en-GB", "en-gb"],
  },
  // Các ngôn ngữ có thể thêm trong tương lai
  // {
  //   code: "zh",
  //   name: "中文",
  //   englishName: "Chinese",
  //   flag: "🇨🇳",
  //   acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
  //   dateLocale: "zh-CN",
  //   enabled: false, // Tắt để không hiển thị trong UI
  //   browserCodes: ["zh", "zh-CN", "zh-cn", "zh-Hans"]
  // },
  // {
  //   code: "ja",
  //   name: "日本語",
  //   englishName: "Japanese",
  //   flag: "🇯🇵",
  //   acceptLanguage: "ja-JP,ja;q=0.9,en;q=0.8",
  //   dateLocale: "ja-JP",
  //   enabled: false,
  //   browserCodes: ["ja", "ja-JP", "ja-jp"]
  // },
  // {
  //   code: "ko",
  //   name: "한국어",
  //   englishName: "Korean",
  //   flag: "🇰🇷",
  //   acceptLanguage: "ko-KR,ko;q=0.9,en;q=0.8",
  //   dateLocale: "ko-KR",
  //   enabled: false,
  //   browserCodes: ["ko", "ko-KR", "ko-kr"]
  // }
];

/**
 * Get only enabled languages for UI display
 */
export function getEnabledLanguages(): LanguageConfig[] {
  return SUPPORTED_LANGUAGES.filter((lang) => lang.enabled);
}

/**
 * Get language config by code
 */
export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code && lang.enabled);
}

/**
 * Get default language config
 */
export function getDefaultLanguageConfig(): LanguageConfig {
  const defaultLang = SUPPORTED_LANGUAGES.find(
    (lang) => lang.isDefault && lang.enabled
  );
  if (!defaultLang) {
    console.warn(
      "No default language found, falling back to first enabled language"
    );
    return getEnabledLanguages()[0] || SUPPORTED_LANGUAGES[0];
  }
  return defaultLang;
}

/**
 * Detect browser language and map to supported language
 * Tự động detect ngôn ngữ mặc định theo browser
 */
export function detectBrowserLanguage(request?: NextRequest): string {
  if (typeof window === "undefined" && !request) {
    return getDefaultLanguageConfig().code;
  }

  // Get browser languages
  const browserLanguages =
    (request
      ? request.headers
          .get("Accept-Language")
          ?.split(",")
          .map((lang) => lang.split(";")[0].trim().toLowerCase())
      : [navigator.language, ...(navigator.languages || [])].map((lang) =>
          lang.toLowerCase()
        )) ?? [];

  // Find matching supported language
  for (const browserLang of browserLanguages) {
    for (const supportedLang of getEnabledLanguages()) {
      if (
        supportedLang.browserCodes.some((code) =>
          browserLang.startsWith(code.toLowerCase())
        )
      ) {
        return supportedLang.code;
      }
    }
  }

  // Fallback to default
  return getDefaultLanguageConfig().code;
}

/**
 * Get Accept-Language header value for API requests
 */
export function getAcceptLanguageHeader(languageCode: string): string {
  const config = getLanguageConfig(languageCode);
  return config?.acceptLanguage || getDefaultLanguageConfig().acceptLanguage;
}

/**
 * Get date locale for formatting
 */
export function getDateLocale(languageCode: string): string {
  const config = getLanguageConfig(languageCode);
  return config?.dateLocale || getDefaultLanguageConfig().dateLocale;
}

/**
 * Validate if language code is supported and enabled
 */
export function isLanguageSupported(code: string): boolean {
  return getEnabledLanguages().some((lang) => lang.code === code);
}

/**
 * Get language type for TypeScript
 */
export type SupportedLanguageCode =
  (typeof SUPPORTED_LANGUAGES)[number]["code"];

/**
 * Type guard for language codes
 */
export function isSupportedLanguageCode(
  code: string
): code is SupportedLanguageCode {
  return isLanguageSupported(code);
}

/**
 * Get all namespaces that need to be loaded for i18n
 */
export const I18N_NAMESPACES = [
  "common",
  "terms",
  "privacy",
  "help",
  "about",
  "contact",
] as const;

export type I18nNamespace = (typeof I18N_NAMESPACES)[number];
