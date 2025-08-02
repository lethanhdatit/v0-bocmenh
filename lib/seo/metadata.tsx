import { Metadata } from "next"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

interface SEOConfig {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: "website" | "article" | "profile"
  noindex?: boolean
  nofollow?: boolean
  canonicalUrl?: string
  alternateLanguages?: Record<string, string>
}

export function createSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    ogImage = "/og-image.jpg",
    ogType = "website",
    noindex = false,
    nofollow = false,
    canonicalUrl,
    alternateLanguages = {
      vi: "",
      en: "",
    },
  } = config

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    authors: [{ name: "Bóc Mệnh Team" }],
    creator: "Bóc Mệnh",
    publisher: "Bóc Mệnh",
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: ogType,
      locale: "vi_VN",
      alternateLocale: ["en_US"],
      url: canonicalUrl || baseUrl,
      siteName: "Bóc Mệnh",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@bocmenh",
      creator: "@bocmenh",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    category: "Entertainment",
    classification: "Astrology, Fortune Telling, Feng Shui",
  }
}

export function createStructuredData(type: string, data: any) {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseStructure),
      }}
    />
  )
}

// Hàm tạo breadcrumb structured data
export function createBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return createStructuredData("BreadcrumbList", {
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  })
}

// Hàm tạo FAQ structured data
export function createFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return createStructuredData("FAQPage", {
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  })
}

// Hàm tạo Service structured data
export function createServiceStructuredData(service: {
  name: string
  description: string
  provider: string
  areaServed?: string
  url?: string
}) {
  return createStructuredData("Service", {
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.provider,
    },
    areaServed: service.areaServed || "VN",
    url: service.url || baseUrl,
  })
}
