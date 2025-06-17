import type { Metadata } from "next"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Quên Mật Khẩu - Bóc Mệnh",
  description: "Đặt lại mật khẩu cho tài khoản Bóc Mệnh của bạn",
}

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <ForgotPasswordForm />
      </div>
    </main>
  )
}
