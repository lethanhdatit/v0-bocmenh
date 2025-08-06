// Template for page with multilingual SEO
export const generatePageTemplate = (pageKey: string, clientComponent: string) => `
import type { Metadata } from "next"
import ${clientComponent} from "./${clientComponent}"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface ${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}PageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: '${pageKey}',
    params,
  });
}

export default async function ${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}Page({ params }: ${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}PageProps) {
  const structuredData = await generateMultilingualStructuredData('${pageKey}', params);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <${clientComponent} />
    </>
  );
}
`.trim();

// List of pages that need to be updated
export const pagesToUpdate = [
  { pageKey: 'numerology', clientComponent: 'NumerologyPageClient', path: '/numerology' },
  { pageKey: 'tarot', clientComponent: 'TarotPageClient', path: '/tarot' },
  { pageKey: 'astrology', clientComponent: 'AstrologyPageClient', path: '/astrology' },
  { pageKey: 'palmistry', clientComponent: 'PalmistryPageClient', path: '/palmistry' },
  { pageKey: 'crystals', clientComponent: 'CrystalsPageClient', path: '/crystals' },
  { pageKey: 'meditation', clientComponent: 'MeditationPageClient', path: '/meditation' },
  { pageKey: 'fengshui', clientComponent: 'FengShuiPageClient', path: '/fengshui' },
  { pageKey: 'horoscope', clientComponent: 'HoroscopePageClient', path: '/horoscope' },
  { pageKey: 'compatibility', clientComponent: 'CompatibilityPageClient', path: '/compatibility' },
  { pageKey: 'dreams', clientComponent: 'DreamsPageClient', path: '/dreams' },
  { pageKey: 'destiny', clientComponent: 'DestinyPageClient', path: '/destiny' },
  { pageKey: 'name-analysis', clientComponent: 'NameAnalysisPageClient', path: '/name-analysis' },
  { pageKey: 'business-name', clientComponent: 'BusinessNamePageClient', path: '/business-name' },
  { pageKey: 'moving-date', clientComponent: 'MovingDatePageClient', path: '/moving-date' },
  { pageKey: 'wedding-date', clientComponent: 'WeddingDatePageClient', path: '/wedding-date' },
];
