import type { Metadata } from "next"
import ResetPasswordForm from "@/components/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Đặt Lại Mật Khẩu - Bóc Mệnh",
  description: "Tạo mật khẩu mới cho tài khoản Bóc Mệnh của bạn",
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ResetPasswordPage({ searchParams }: Props) {
  const token = typeof searchParams.token === "string" ? searchParams.token : ""

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <ResetPasswordForm token={token} />
      </div>
    </main>
  )
}
