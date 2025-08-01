import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/infra/utils"
import { getFeatureConfig } from "@/lib/features/feature-flags"
import { ComingSoonPage } from "@/components/features/ComingSoonPage"
import DreamForm from "@/components/forms/DreamForm"
import DreamJournal from "@/components/sections/DreamJournal"
import DreamTips from "@/components/sections/DreamTips"

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Giải Mơ - Khám Phá Ý Nghĩa Giấc Mơ",
  description: "Giải mã giấc mơ của bạn với AI thông minh. Khám phá ý nghĩa sâu xa và thông điệp từ tiềm thức",
  keywords: "giải mơ, giấc mơ, ý nghĩa giấc mơ, phân tích giấc mơ, AI giải mơ",
}

export default function DreamsPage() {
  const featureConfig = getFeatureConfig('/dreams');
  
  // Nếu feature coming soon, hiển thị coming soon page
  if (featureConfig?.status === 'coming-soon') {
    return (
      <ComingSoonPage 
        title={featureConfig.title}
        description={featureConfig.description}
        estimatedLaunch={featureConfig.estimatedLaunch}
      />
    );
  }

  return (
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
  )
}
