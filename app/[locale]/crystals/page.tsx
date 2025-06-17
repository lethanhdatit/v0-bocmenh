import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import CrystalForm from "@/components/forms/CrystalForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Đá Quý Phong Thủy - Chọn Đá Theo Mệnh | Bóc Mệnh",
      en: "Feng Shui Crystals - Choose Crystals by Destiny | Boc Menh",
    },
    description: {
      vi: "Khám phá sức mạnh của đá quý phong thủy. Chọn đá phù hợp với mệnh để thu hút tài lộc, tình yêu và sức khỏe.",
      en: "Discover the power of feng shui crystals. Choose crystals that match your destiny to attract wealth, love and health.",
    },
    keywords: {
      vi: "đá quý, phong thủy, đá theo mệnh, crystal, năng lượng đá",
      en: "crystals, feng shui stones, healing crystals, gemstones, crystal energy",
    },
    locale: params.locale,
    path: "/crystals",
  })
}

export default async function CrystalsPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("crystals.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("crystals.subtitle")}</p>
        </div>

        <CrystalForm />
      </div>
    </main>
  )
}
