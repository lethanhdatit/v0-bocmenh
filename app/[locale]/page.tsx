import type { Metadata } from "next"
import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LuckyBoxSection from "@/components/sections/LuckyBoxSection"
import Navigation from "@/components/layout/Navigation"
import { generateSEOMetadata } from "@/lib/metadata"
import { isValidLocale, type Locale } from "@/lib/i18n"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as Locale

  if (!isValidLocale(locale)) {
    return {}
  }

  return generateSEOMetadata({
    locale,
    pathname: `/${locale}`,
    titleKey: "site.title",
    descriptionKey: "site.description",
  })
}

export default function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  const locale = params.locale as Locale

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <LuckyBoxSection />
    </main>
  )
}

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }]
}
