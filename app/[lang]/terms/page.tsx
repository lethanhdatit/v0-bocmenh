import type { Metadata } from "next"
import { type Locale, i18n } from "@/i18n/server"
import TermsPageClient from "./TermsPageClient"
import { i18nConfig } from "@/i18n/server" // Assuming i18nConfig is exported from your i18n setup

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const { t } = await i18n(params.lang, "terms")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }))
}

export default function TermsPage({ params: { lang } }: { params: { lang: Locale } }) {
  return <TermsPageClient lang={lang} />
}
