import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TermsPageClient from "./TermsPageClient"

export const metadata = {
  title: "Điều khoản dịch vụ",
  description: "Điều khoản dịch vụ của Bóc Mệnh",
}

export default function TermsPage() {
  return <TermsPageClient />
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["terms", "common"])),
  },
})
