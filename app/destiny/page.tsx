import type { Metadata } from "next"
import DestinyForm from "@/components/forms/DestinyForm"
import ProductCard from "@/components/store/ProductCard"
import { getProducts, type Product } from "@/lib/products"
import { calculateDestiny, type DestinyResult, type DestinyData } from "@/lib/destinyService"
import { getSession } from "@/lib/session"
import { type UserSession } from "@/lib/sessionOptions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Sparkles, Gift, ChevronRight } from "lucide-react"
import { getTranslations } from "@/i18n/server" // Assuming you have a server-side translation utility

export const dynamic = "force-dynamic"

export async function generateMetadata({
  searchParams,
  params: { locale },
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { locale: string }
}): Promise<Metadata> {
  const { t } = await getTranslations(["common", "destiny"])

  const name = searchParams?.name as string

  if (name) {
    return {
      title: t("destiny.result.titleFor", { name }),
      description: t("destiny.meta.descriptionFor", { name }),
      keywords: t("destiny.meta.keywordsFor", { name }).split(", "),
    }
  }
  return {
    title: t("destiny.pageTitle"),
    description: t("destiny.meta.descriptionDefault"),
    keywords: t("destiny.meta.keywordsDefault").split(", "),
  }
}

async function getRecommendedProductsForDestiny(destiny: DestinyResult | null): Promise<Product[]> {
  const { t } = await getTranslations(["common", "attributes"])
  if (!destiny?.success || !destiny.data) {
    return []
  }

  const elementToMatch = destiny.element?.toLowerCase()
  const allProducts = await getProducts() // Assuming getProducts can be filtered or fetches all

  if (elementToMatch) {
    const translatedElementKey = `attributes.mệnh.${destiny.element}` // e.g. attributes.mệnh.Kim
    const translatedElement = t(translatedElementKey, destiny.element as string) // Fallback to original if no translation

    const filteredByElement = allProducts.filter(
      (p) =>
        p.attributes.some(
          (attr) =>
            attr.type === "mệnh" &&
            (attr.value.toLowerCase() === elementToMatch ||
              t(`attributes.mệnh.${attr.value}`, attr.value).toLowerCase() === translatedElement.toLowerCase()),
        ) || p.categories.some((cat) => cat.toLowerCase().includes(elementToMatch!)),
    )
    if (filteredByElement.length > 0) return filteredByElement.slice(0, 3)
  }

  const fallbackCategories = [
    t("attributes.mục đích.Bình An"),
    t("attributes.mục đích.May Mắn"),
    t("attributes.mục đích.Tài Lộc"),
  ]
  const fallbackProducts = allProducts.filter((p) => p.categories.some((cat) => fallbackCategories.includes(cat)))
  return fallbackProducts.slice(0, 3)
}

export default async function DestinyPage({
  searchParams,
  params: { locale },
}: { searchParams: { [key: string]: string | string[] | undefined }; params: { locale: string } }) {
  const { t } = await getTranslations(["common", "destiny", "attributes"])

  const name = searchParams?.name as string
  const birthDate = searchParams?.birthDate as string
  const birthTime = searchParams?.birthTime as string
  const session = await getSession()

  let destinyResult: DestinyResult | null = null
  let recommendedProducts: Product[] = []
  let errorMessage: string | null = null

  if (name && birthDate) {
    try {
      destinyResult = await calculateDestiny(name, birthDate, birthTime, session as UserSession)
      if (destinyResult.success) {
        recommendedProducts = await getRecommendedProductsForDestiny(destinyResult)
      } else {
        errorMessage = destinyResult.error || t("destiny.error.generic")
      }
    } catch (error) {
      console.error("Error fetching destiny data:", error)
      errorMessage = t("destiny.error.fetch")
      destinyResult = null
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-400 bg-clip-text text-transparent mb-3 tracking-tight">
            {name ? t("destiny.result.titleFor", { name }) : t("destiny.pageTitle")}
          </h1>
          {!destinyResult && !errorMessage && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t("destiny.pageSubtitle")}</p>
          )}
        </div>

        {(!destinyResult || errorMessage) && (
          <div className="mb-12">
            <DestinyForm />
          </div>
        )}

        {errorMessage && (
          <div
            className="mb-12 bg-red-900/40 border border-red-700/60 text-red-200 px-6 py-8 rounded-xl shadow-2xl text-center"
            role="alert"
          >
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <strong className="font-bold text-2xl block mb-2">{t("common.error")}</strong>
            <span className="block text-red-300 mb-6">{errorMessage}</span>
          </div>
        )}

        {destinyResult?.success && destinyResult.data && (
          <>
            <section className="mb-12 p-6 sm:p-8 bg-gradient-to-br from-slate-800/70 via-gray-800/80 to-slate-800/70 rounded-xl shadow-2xl border border-yellow-500/40 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-8">
                {name ? t("destiny.result.titleFor", { name }) : t("destiny.result.titleDefault")}
              </h2>
              <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
                {(destinyResult.data as DestinyData).personalityTraits && (
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-2.5 flex items-center">
                      <Sparkles className="w-6 h-6 mr-2.5 text-yellow-300" /> {t("destiny.result.personalityTraits")}
                    </h3>
                    <ul className="space-y-1.5 text-gray-300 pl-2">
                      {(destinyResult.data as DestinyData).personalityTraits?.map((trait, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-5 h-5 mr-1.5 mt-1 text-yellow-500 flex-shrink-0" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {destinyResult.element && (
                  <p>
                    <strong className="font-semibold text-yellow-400">{t("destiny.result.element")}</strong>{" "}
                    {destinyResult.element}
                  </p>
                )}
                {(destinyResult.data as DestinyData).careerPath && (
                  <p>
                    <strong className="font-semibold text-yellow-400">{t("destiny.result.careerPath")}</strong>{" "}
                    {(destinyResult.data as DestinyData).careerPath}
                  </p>
                )}
                {(destinyResult.data as DestinyData).loveLife && (
                  <p>
                    <strong className="font-semibold text-yellow-400">{t("destiny.result.loveLife")}</strong>{" "}
                    {(destinyResult.data as DestinyData).loveLife}
                  </p>
                )}
                {(destinyResult.data as DestinyData).luckyNumbers &&
                  (destinyResult.data as DestinyData).luckyNumbers!.length > 0 && (
                    <p>
                      <strong className="font-semibold text-yellow-400">{t("destiny.result.luckyNumbers")}</strong>{" "}
                      {(destinyResult.data as DestinyData).luckyNumbers!.join(", ")}
                    </p>
                  )}
                {(destinyResult.data as DestinyData).luckyColors &&
                  (destinyResult.data as DestinyData).luckyColors!.length > 0 && (
                    <p>
                      <strong className="font-semibold text-yellow-400">{t("destiny.result.luckyColors")}</strong>{" "}
                      {(destinyResult.data as DestinyData).luckyColors!.join(", ")}
                    </p>
                  )}
                {(destinyResult.data as DestinyData).challenges && (
                  <p>
                    <strong className="font-semibold text-yellow-400">{t("destiny.result.challenges")}</strong>{" "}
                    {(destinyResult.data as DestinyData).challenges}
                  </p>
                )}
                {(destinyResult.data as DestinyData).advice && (
                  <p>
                    <strong className="font-semibold text-yellow-400">{t("destiny.result.advice")}</strong>{" "}
                    {(destinyResult.data as DestinyData).advice}
                  </p>
                )}

                {(destinyResult.data as { preview?: string }).preview && (
                  <div className="mt-6 p-5 bg-yellow-600/10 border border-yellow-500/40 rounded-lg text-yellow-300">
                    <p className="font-medium">{(destinyResult.data as { preview?: string }).preview}</p>
                    {destinyResult.isLimited && (
                      <Link
                        href={session?.isLoggedIn ? "/pricing" : "/auth/register"} // Assuming /pricing for upgrade
                        legacyBehavior
                      >
                        <a className="inline-block mt-3 text-sm font-semibold text-gray-900 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md transition-colors">
                          {session?.isLoggedIn
                            ? t("destiny.result.action.upgrade")
                            : t("destiny.result.action.register")}
                        </a>
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-8 pt-6 border-t border-gray-700/50 italic text-gray-400 text-sm text-center">
                {t("destiny.result.disclaimer", { year: currentYear })}
              </p>
              <div className="text-center mt-10">
                <Link href="/destiny" legacyBehavior>
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-gray-900 border-yellow-600 hover:border-yellow-700 px-8 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {t("destiny.result.viewForAnother")}
                  </Button>
                </Link>
              </div>
            </section>

            {recommendedProducts.length > 0 && (
              <section className="mt-16 pt-12 border-t-2 border-dashed border-yellow-500/30">
                <h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent mb-6">
                  {t("destiny.recommendedItemsTitle")}
                </h3>
                <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                  {t("destiny.recommendedItemsSubtitle")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link href="/store" legacyBehavior>
                    <a className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:from-purple-700 hover:via-pink-700 hover:to-rose-600 text-white font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base">
                      <Gift className="w-5 h-5 mr-2.5" />
                      {t("destiny.viewMoreItemsButton")}
                    </a>
                  </Link>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  )
}
