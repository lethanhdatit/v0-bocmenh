import type { Metadata } from "next"
import ResetPasswordForm from "@/components/auth/ResetPasswordForm"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await getTranslations(params.locale)

  return generateI18nMetadata({
    title: t("auth.resetPassword.title"),
    description: t("auth.resetPassword.description"),
    locale: params.locale,
    path: "/auth/reset-password",
  })
}

export default async function ResetPasswordPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t("auth.resetPassword.title")}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">{t("auth.resetPassword.subtitle")}</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
