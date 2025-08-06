import { Metadata } from "next";
import ServicesHistoryClient from "./ServicesHistoryClient";
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface ServicesHistoryPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: ServicesHistoryPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'services-history',
    params
  });
}

export default async function ServicesHistoryPage({ params }: ServicesHistoryPageProps) {
  const structuredData = await generateMultilingualStructuredData('services-history', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ServicesHistoryClient />
    </>
  );
}
