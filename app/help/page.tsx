import { getTranslations } from "@/i18n/server"
import HelpPageClient from "./HelpPageClient"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations(["help", "root"])

  return {
    title: `${t("root.title")} - Bóc Mệnh`,
    description: t("root.title"),
    openGraph: {
      title: `${t("root.title")} - Bóc Mệnh`,
      description: t("root.title"),
    },
    twitter: {
      title: `${t("root.title")} - Bóc Mệnh`,
      description: t("root.title"),
    },
  }
}

export default async function HelpPage() {
  return <HelpPageClient />
}
