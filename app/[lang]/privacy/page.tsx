import type { Metadata } from "next"
import PrivacyPageClient from "./PrivacyPageClient"
import { i18n } from "@/i18n/server"
import { type Locale, i18nConfig } from "@/i18n/server"

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const { t } = await i18n(params.lang, ["privacy", "common"])
  return {
    title: t("privacy:meta_title"),
    description: t("privacy:meta_description"),
    alternates: {
      canonical: `/${params.lang}/privacy`,
      languages: {
        "vi-VN": "/vi/privacy",
        "en-US": "/en/privacy",
        "x-default": "/vi/privacy",
      },
    },
  }
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
