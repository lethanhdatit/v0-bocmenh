"use client"

import { useTranslation } from "next-i18next"
import { useEffect } from "react"
// Assuming LanguageContext and useLanguage are set up as per project requirements
// import { useLanguage } from '@/contexts/LanguageContext';
import { useParams } from "next/navigation"

export default function PrivacyPageClient() {
  const params = useParams()
  const currentLanguage = (params.lang as string) || "vi" // Default to 'vi' or get from params

  const { t, i18n: i18nInstance } = useTranslation(["privacy", "common"])
  // const { currentLanguage } = useLanguage(); // If using context

  useEffect(() => {
    if (currentLanguage && i18nInstance.language !== currentLanguage) {
      i18nInstance.changeLanguage(currentLanguage)
    }
  }, [currentLanguage, i18nInstance])

  if (!i18nInstance.isInitialized || !t) {
    return (
      <div className="bg-black text-white min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-10 bg-gray-800 rounded w-3/4 mb-6 mx-auto"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-10 mx-auto"></div>
          <div className="bg-gray-900 p-6 md:p-10 rounded-lg shadow-xl">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="mb-8">
                <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const sections = (t("sections", { returnObjects: true, ns: "privacy" }) as Array<any>) || []

  return (
    <div className="bg-black text-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-3">
            {t("page_title", { ns: "privacy" })}
          </h1>
          <p className="text-md sm:text-lg text-gray-400">{t("subtitle", { ns: "privacy" })}</p>
        </header>

        <article className="bg-gray-900 p-6 md:p-10 rounded-lg shadow-2xl">
          <p className="text-gray-300 mb-4 text-lg">{t("intro_p1", { ns: "privacy" })}</p>
          <p className="text-gray-300 mb-8 text-lg">{t("intro_p2", { ns: "privacy" })}</p>

          {sections.map((section, index) => (
            <section key={index} className="mb-8 last:mb-0">
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-500 mb-4 pt-4 border-t border-gray-700 first:border-t-0 first:pt-0">
                {section.title}
              </h2>
              {section.points &&
                section.points.map((point: string, pIndex: number) => (
                  <p key={pIndex} className="text-gray-300 mb-3 leading-relaxed">
                    {point}
                  </p>
                ))}
              {section.subsections &&
                section.subsections.map((subsection: any, sIndex: number) => (
                  <div key={sIndex} className="ml-4 md:ml-6 mt-4 mb-6 pl-4 border-l-2 border-yellow-600">
                    <h3 className="text-xl sm:text-2xl font-medium text-yellow-600 mb-3">{subsection.title}</h3>
                    {subsection.points &&
                      subsection.points.map((point: string, spIndex: number) => (
                        <p key={spIndex} className="text-gray-300 mb-3 leading-relaxed">
                          {point}
                        </p>
                      ))}
                  </div>
                ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  )
}
