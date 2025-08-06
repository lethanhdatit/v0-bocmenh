import type { Metadata } from "next"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"
import MovingDateForm from "@/components/forms/MovingDateForm"

interface MovingDatePageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: MovingDatePageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'moving-date',
    params
  });
}

export default async function MovingDatePage({ params }: MovingDatePageProps) {
  const structuredData = await generateMultilingualStructuredData('moving-date', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <MovingDateForm />
    </>
  );
}
