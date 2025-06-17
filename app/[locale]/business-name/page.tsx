import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import BusinessNameForm from "@/components/forms/BusinessNameForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Phân Tích Tên Doanh Nghiệp - Chọn Tên Hợp Phong Thủy | Bóc Mệnh",
      en: "Business Name Analysis - Choose Feng Shui Business Name | Boc Menh",
    },
    description: {
      vi: "Phân tích và chọn tên doanh nghiệp hợp phong thủy. Tìm tên công ty mang lại thịnh vượng và thành công.",
      en: "Analyze and choose feng shui business names. Find company names that bring prosperity and success.",
    },
    keywords: {
      vi: "tên doanh nghiệp, phong thủy kinh doanh, tên công ty, business name",
      en: "business name analysis, company name feng shui, business naming, corporate naming",
    },
    locale: params.locale,
    path: "/business-name",
  })
}

export default async function BusinessNamePage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("businessName.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("businessName.subtitle")}</p>
        </div>

        <BusinessNameForm />
      </div>
    </main>
  )
}
