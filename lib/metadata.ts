import type { Metadata } from "next"
import type { Locale } from "./i18n"
import { getAlternateUrls, getCanonicalUrl } from "./i18n"
import { getTranslations } from "./serverTranslations"

interface MetadataParams {
  locale: Locale
  pathname: string
  titleKey?: string
  descriptionKey?: string
  customTitle?: string
  customDescription?: string
  keywords?: string[]
}

export async function generateSEOMetadata({
  locale,
  pathname,
  titleKey,
  descriptionKey,
  customTitle,
  customDescription,
  keywords = [],
}: MetadataParams): Promise<Metadata> {
  const { t } = await getTranslations(locale)

  const title = customTitle || (titleKey ? t(titleKey) : t("site.title"))
  const description = customDescription || (descriptionKey ? t(descriptionKey) : t("site.description"))

  const alternateUrls = getAlternateUrls(pathname)
  const canonicalUrl = getCanonicalUrl(locale, pathname)

  const defaultKeywords = [
    "bóc mệnh",
    "vận mệnh",
    "tarot",
    "thần số học",
    "giải mơ",
    "phong thủy",
    "destiny",
    "numerology",
    "dream interpretation",
    "feng shui",
  ]

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: t("site.title"),
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export async function generateI18nMetadata({
  title,
  description,
  keywords = [],
  locale,
  path,
}: {
  title: string
  description: string
  keywords?: string[]
  locale: string
  path: string
}): Promise<Metadata> {
  const alternateUrls = getAlternateUrls(path)
  const canonicalUrl = getCanonicalUrl(locale as Locale, path)

  const defaultKeywords = [
    "bóc mệnh",
    "vận mệnh",
    "tarot",
    "thần số học",
    "giải mơ",
    "phong thủy",
    "destiny",
    "numerology",
    "dream interpretation",
    "feng shui",
  ]

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords].join(", "),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Bóc Mệnh",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}
