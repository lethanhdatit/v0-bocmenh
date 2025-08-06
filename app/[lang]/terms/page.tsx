import type { Metadata } from "next"
import TermsPageClient from "./TermsPageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface TermsPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'terms',
    params
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const structuredData = await generateMultilingualStructuredData('terms', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <TermsPageClient />
    </>
  )
}
