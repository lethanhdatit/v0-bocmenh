import type { Metadata } from "next"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await getTranslations(params.locale)

  return generateI18nMetadata({
    title: t("auth.forgotPassword.title"),
    description: t("auth.forgotPassword.description"),
    locale: params.locale,
    path: "/auth/forgot-password",
  })
}

export default async function ForgotPasswordPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t("auth.forgotPassword.title")}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{t("auth.forgotPassword.subtitle")}</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
