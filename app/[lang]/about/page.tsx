import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface AboutPageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'about',
    params,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const structuredData = await generateMultilingualStructuredData('about', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AboutPageClient />
    </>
  );
}
