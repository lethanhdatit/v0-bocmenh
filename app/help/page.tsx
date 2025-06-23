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
  const { t } = await getTranslations(["help", "common"])

  // Transform the translations into the expected format
  const content = {
    title: t("help:title"),
    questions: {
      q1: {
        question: t("help:questions.q1.question"),
        answer: t("help:questions.q1.answer"),
      },
      q2: {
        question: t("help:questions.q2.question"),
        answer: t("help:questions.q2.answer"),
      },
      q3: {
        question: t("help:questions.q3.question"),
        answer: t("help:questions.q3.answer"),
        note: t("help:questions.q3.note"),
      },
      q4: {
        question: t("help:questions.q4.question"),
        answer: t("help:questions.q4.answer"),
      },
      q5: {
        question: t("help:questions.q5.question"),
        answer: t("help:questions.q5.answer"),
      },
      q6: {
        question: t("help:questions.q6.question"),
        answer: t("help:questions.q6.answer"),
      },
      q7: {
        question: t("help:questions.q7.question"),
        answer: t("help:questions.q7.answer"),
      },
      q8: {
        question: t("help:questions.q8.question"),
        answer: t("help:questions.q8.answer"),
      },
      q9: {
        question: t("help:questions.q9.question"),
        answer: t("help:questions.q9.answer"),
        note: t("help:questions.q9.note"),
      },
    },
  }

  return <HelpPageClient content={content} />
}
