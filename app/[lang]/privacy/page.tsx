import type { Metadata } from "next"
import PrivacyPageClient from "./PrivacyPageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface PrivacyPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'privacy',
    params
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const structuredData = await generateMultilingualStructuredData('privacy', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <PrivacyPageClient />
    </>
  )
}
