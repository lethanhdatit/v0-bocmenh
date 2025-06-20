"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useTranslation } from "next-i18next"
import type { Locale } from "@/i18n/server"

const sectionKeys = [
  "acceptance",
  "registration",
  "userRights",
  "userConduct",
  "serviceDescription",
  "affiliateAdvertising",
  "intellectualProperty",
  "disclaimer",
  "termination",
  "generalTerms",
  "policyChanges",
]

export default function TermsPageClient({ lang: initialLang }: { lang: Locale }) {
  const params = useParams()
  const lang = (params?.lang as Locale) || initialLang || "vi"
  const { t, i18n: i18nInstance } = useTranslation(["terms", "common"])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeI18n = async () => {
      setIsLoading(true)
      if (i18nInstance.language !== lang) {
        await i18nInstance.changeLanguage(lang)
      }
      // Ensure translations are loaded
      await i18nInstance.loadNamespaces("terms")
      setIsLoading(false)
    }
    initializeI18n()
  }, [lang, i18nInstance])

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 text-center text-gray-100">
        <p>{t("common:loading")}</p>
      </div>
    )
  }

  const renderContent = (sectionKey: string, itemKey: string) => {
    const content = t(itemKey, { returnObjects: true, ns: "terms" })
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {content.map((text, index) => (
            <li key={`${sectionKey}-item-${index}`}>{text}</li>
          ))}
        </ul>
      )
    }
    if (typeof content === "string") {
      return <p className="text-gray-300 mb-2">{content}</p>
    }
    return null
  }

  return (
    <div className="bg-black text-gray-100 min-h-screen py-8">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-yellow-500">{t("pageTitle")}</h1>
        <p className="mb-8 text-lg text-center text-gray-300">{t("introduction")}</p>

        <div className="space-y-8">
          {sectionKeys.map((key) => {
            const sectionTitle = t(`sections.${key}.title`)
            const sectionIntro = t(`sections.${key}.intro`, { defaultValue: undefined })
            const sectionContentIsArray = Array.isArray(
              t(`sections.${key}.content`, { returnObjects: true, defaultValue: undefined }),
            )
            const sectionItemsIsArray = Array.isArray(
              t(`sections.${key}.items`, { returnObjects: true, defaultValue: undefined }),
            )

            return (
              <section key={key} className="p-6 bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{sectionTitle}</h2>
                {sectionIntro && <p className="text-gray-300 mb-3">{sectionIntro}</p>}

                {sectionContentIsArray && (
                  <div className="space-y-2">
                    {(t(`sections.${key}.content`, { returnObjects: true }) as string[]).map((paragraph, idx) => (
                      <p key={`${key}-content-${idx}`} className="text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {sectionItemsIsArray && (
                  <ul className="list-disc list-inside space-y-1 text-gray-300 pl-4">
                    {(t(`sections.${key}.items`, { returnObjects: true }) as string[]).map((item, idx) => (
                      <li key={`${key}-item-${idx}`}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Fallback for simple string content if not array and no items */}
                {!sectionContentIsArray &&
                  !sectionItemsIsArray &&
                  t(`sections.${key}.content`, { defaultValue: undefined }) &&
                  typeof t(`sections.${key}.content`) === "string" && (
                    <p className="text-gray-300">{t(`sections.${key}.content`)}</p>
                  )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
