import type { Metadata } from "next"
import FengShuiPageClient from "./FengShuiPageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface FengShuiPageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'fengshui',
    params,
  });
}

export default async function FengShuiPage({ params }: FengShuiPageProps) {
  const structuredData = await generateMultilingualStructuredData('fengshui', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <FengShuiPageClient />
    </>
  );
}
