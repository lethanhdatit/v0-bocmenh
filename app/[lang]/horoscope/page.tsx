import type { Metadata } from "next"
import HoroscopePageClient from "./HoroscopePageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface HoroscopePageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'horoscope',
    params,
  });
}

export default async function HoroscopePage({ params }: HoroscopePageProps) {
  const structuredData = await generateMultilingualStructuredData('horoscope', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HoroscopePageClient />
    </>
  );
}
