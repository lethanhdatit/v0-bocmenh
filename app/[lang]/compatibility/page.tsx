import type { Metadata } from "next"
import CompatibilityPageClient from "./CompatibilityPageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface CompatibilityPageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'compatibility',
    params,
  });
}

export default async function CompatibilityPage({ params }: CompatibilityPageProps) {
  const structuredData = await generateMultilingualStructuredData('compatibility', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <CompatibilityPageClient />
    </>
  );
}
