import type { Metadata } from "next"
import { getFeatureConfig } from "@/lib/features/feature-flags"
import { ComingSoonPage } from "@/components/features/ComingSoonPage"
import DreamForm from "@/components/forms/DreamForm"
import DreamJournal from "@/components/sections/DreamJournal"
import DreamTips from "@/components/sections/DreamTips"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface DreamsPageProps {
  params: { lang: string };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'dreams',
    params,
  });
}

export default async function DreamsPage({ params }: DreamsPageProps) {
  const featureConfig = getFeatureConfig('/dreams');
  const structuredData = await generateMultilingualStructuredData('dreams', params);
  
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Giải Mơ AI</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Khám phá ý nghĩa sâu xa của giấc mơ với công nghệ AI tiên tiến. Mỗi giấc mơ đều mang thông điệp từ tiềm thức
              của bạn.
            </p>
          </div>

          <DreamForm />
        </div>

        {/* Dream Journal Section */}
        <DreamJournal />

        {/* Dream Tips Section */}
        <DreamTips />
      </main>
    </>
  )
}
