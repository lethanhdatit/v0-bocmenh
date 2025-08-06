import { getTranslations } from "@/i18n/server"
import HelpPageClient from "./HelpPageClient"
import type { Metadata } from "next"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface HelpPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: HelpPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'help',
    params
  });
}

export default async function HelpPage({ params }: HelpPageProps) {
  const structuredData = await generateMultilingualStructuredData('help', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HelpPageClient />
    </>
  )
}
