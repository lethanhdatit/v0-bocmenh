import type { Metadata } from "next"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Đăng Nhập - Bóc Mệnh",
  description: "Đăng nhập vào tài khoản Bóc Mệnh để trải nghiệm đầy đủ các tính năng khám phá vận mệnh",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <LoginForm redirectTo="/" />
      </div>
    </main>
  )
}
