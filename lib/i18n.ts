export const locales = ["vi", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "vi"

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/")
  const potentialLocale = segments[1]

  if (isValidLocale(potentialLocale)) {
    return potentialLocale
  }

  return defaultLocale
}

export function getAlternateUrls(pathname: string) {
  const cleanPath = pathname.replace(/^\/[a-z]{2}/, "") || "/"

  return {
    "vi-VN": `/vi${cleanPath}`,
    "en-US": `/en${cleanPath}`,
    "x-default": `/vi${cleanPath}`, // Default to Vietnamese
  }
}

export function getCanonicalUrl(locale: Locale, pathname: string) {
  const cleanPath = pathname.replace(/^\/[a-z]{2}/, "") || "/"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bocmenh.com"
  return `${baseUrl}/${locale}${cleanPath}`
}

export function getPathWithoutLocale(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}/, "") || "/"
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const pathWithoutLocale = getPathWithoutLocale(pathname)
  return `/${locale}${pathWithoutLocale}`
}
