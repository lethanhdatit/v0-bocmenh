import { Metadata } from "next"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"
import PalmistryPageClient from "./PalmistryPageClient"

interface PalmistryPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: PalmistryPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'palmistry',
    params
  });
}

export default async function PalmistryPage({ params }: PalmistryPageProps) {
  const structuredData = await generateMultilingualStructuredData('palmistry', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PalmistryPageClient />
    </>
  )
}
