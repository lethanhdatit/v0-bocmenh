import { Metadata } from "next"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"
import CrystalsPageClient from "./CrystalsPageClient"

interface CrystalsPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: CrystalsPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'crystals',
    params
  });
}

export default async function CrystalsPage({ params }: CrystalsPageProps) {
  const structuredData = await generateMultilingualStructuredData('crystals', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CrystalsPageClient />
    </>
  );
}
