import { getTranslations } from "@/i18n/server"
import HelpPageClient from "./HelpPageClient"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations(["help"])

  return {
    title: `${t("help:root.title")} - Bóc Mệnh`,
    description: t("help:root.subTitle"),
    openGraph: {
      title: `${t("help:root.title")} - Bóc Mệnh`,
      description: t("help:root.subTitle"),
    },
    twitter: {
      title: `${t("help:root.title")} - Bóc Mệnh`,
      description: t("help:root.subTitle"),
    },
  }
}

export default async function HelpPage() {
  return <HelpPageClient />
}
