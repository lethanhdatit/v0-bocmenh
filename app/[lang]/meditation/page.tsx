import type { Metadata } from "next"
import MeditationPageClient from "./MeditationPageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface MeditationPageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'meditation',
    params,
  });
}

export default async function MeditationPage({ params }: MeditationPageProps) {
  const structuredData = await generateMultilingualStructuredData('meditation', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <MeditationPageClient />
    </>
  );
}
