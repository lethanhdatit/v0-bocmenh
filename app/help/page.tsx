import { getTranslations } from "@/i18n/server"
import HelpPageClient from "./HelpPageClient"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations(["help", "common"])

  return {
    title: `${t("help:title")} - Bóc Mệnh`,
    description: t("help:title"),
    openGraph: {
      title: `${t("help:title")} - Bóc Mệnh`,
      description: t("help:title"),
    },
    twitter: {
      title: `${t("help:title")} - Bóc Mệnh`,
      description: t("help:title"),
    },
  }
}

export default async function HelpPage() {
  return <HelpPageClient />
}
