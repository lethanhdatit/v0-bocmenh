import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/infra/utils"
import { getFeatureConfig } from "@/lib/features/feature-flags"
import { ComingSoonPage } from "@/components/features/ComingSoonPage"
import TarotForm from "@/components/forms/TarotForm"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface TarotPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: TarotPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'tarot',
    params
  });
}

export default async function TarotPage({ params }: TarotPageProps) {
  const structuredData = await generateMultilingualStructuredData('tarot', params);
  const featureConfig = getFeatureConfig('/tarot');

  // Nếu feature coming soon, hiển thị coming soon page
  if (featureConfig?.status === 'coming-soon') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <ComingSoonPage 
          title={featureConfig.title}
          description={featureConfig.description}
          estimatedLaunch={featureConfig.estimatedLaunch}
        />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Bói Tarot Mystical</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Khám phá những bí ẩn của tương lai thông qua nghệ thuật Tarot cổ xưa. Mỗi lá bài mang một thông điệp từ vũ
              trụ dành riêng cho bạn.
            </p>
          </div>

          <TarotForm />
        </div>
      </main>
    </>
  )
}
