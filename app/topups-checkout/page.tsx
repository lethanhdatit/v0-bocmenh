import type { Metadata } from "next"
import TopupsCheckoutClient from "./TopupsCheckoutClient"
import { getTranslations } from "@/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations("common")
  return {
    title: t("checkout.title"),
    description: t("checkout.description"),
  }
}

interface TopupsCheckoutPageProps {
  searchParams: {
    transId?: string
    cancel?: string
    miniMode?: boolean;
  }
}

export default async function TopupsCheckoutPage({ searchParams }: TopupsCheckoutPageProps) {
  const { transId, cancel, miniMode } = searchParams
  const { t } = await getTranslations("common")

  if (!transId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-oriental-bg bg-cover bg-center text-foreground">
        <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg">
          <h1 className="text-3xl font-serif text-primary mb-4">{t("checkout.invalidTransaction")}</h1>
          <p className="text-lg text-muted-foreground">{t("checkout.missingId")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-oriental-bg bg-cover bg-center text-foreground">
      <TopupsCheckoutClient transId={transId} cancel={cancel} miniMode={miniMode} />
    </div>
  )
}
