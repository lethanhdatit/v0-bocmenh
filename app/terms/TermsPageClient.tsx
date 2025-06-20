"use client"

import { useTranslation } from "next-i18next"

export default function TermsPageClient() {
  const { t } = useTranslation("terms")

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center mb-2">{t("title")}</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section1.title")}</h2>
        <p>{t("section1.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section2.title")}</h2>
        <ul>
          <li>{t("section2.item1")}</li>
          <li>{t("section2.item2")}</li>
          <li>{t("section2.item3")}</li>
          <li>{t("section2.item4")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section3.title")}</h2>
        <ul>
          <li>{t("section3.item1")}</li>
          <li>{t("section3.item2")}</li>
          <li>{t("section3.item3")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section4.title")}</h2>
        <p>{t("section4.content")}</p>
        <ul>
          <li>{t("section4.item1")}</li>
          <li>{t("section4.item2")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section5.title")}</h2>
        <ul>
          <li>{t("section5.item1")}</li>
          <li>{t("section5.item2")}</li>
          <li>{t("section5.item3")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section6.title")}</h2>
        <p>{t("section6.content")}</p>
        <ul>
          <li>{t("section6.item1")}</li>
          <li>{t("section6.item2")}</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section7.title")}</h2>
        <p>{t("section7.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section8.title")}</h2>
        <p>{t("section8.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section9.title")}</h2>
        <p>{t("section9.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section10.title")}</h2>
        <p>{t("section10.content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section11.title")}</h2>
        <p>{t("section11.content")}</p>
      </section>

      {/* <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("section12.title")}</h2>
        <p>{t("section12.content")}</p>
      </section> */}
    </div>
  )
}
