import { Metadata } from "next";
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers";
import { getTranslations } from "@/i18n/server";
import TopupsHistoryClient from "./TopupsHistoryClient";

interface TopupsHistoryPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: TopupsHistoryPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'topups-history',
    params
  });
}

export default async function TopupsHistoryPage({ params }: TopupsHistoryPageProps) {
  const structuredData = await generateMultilingualStructuredData('topups-history', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopupsHistoryClient />
    </>
  );
}