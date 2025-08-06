import type { Metadata } from "next"
import StorePageClient from "./StorePageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface StorePageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'store',
    params
  });
}

export default async function StorePage({ params }: StorePageProps) {
  const structuredData = await generateMultilingualStructuredData('store', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <StorePageClient />
    </>
  )
}
