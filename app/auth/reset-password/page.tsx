import type { Metadata } from "next"
import { Suspense } from "react"
import ResetPasswordForm from "@/components/auth/ResetPasswordForm"

export const metadata: Metadata = {
  title: "Đặt Lại Mật Khẩu - Bóc Mệnh",
  description: "Tạo mật khẩu mới cho tài khoản Bóc Mệnh của bạn",
}

function ResetPasswordContent() {
  // Get token from URL params
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get("token") || ""

  return <ResetPasswordForm token={token} />
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center text-yellow-500">Đang tải...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </main>
  )
}
