import type { Metadata } from "next"
import RegisterForm from "@/components/auth/RegisterForm"

export const metadata: Metadata = {
  title: "Đăng Ký - Bóc Mệnh",
  description: "Tạo tài khoản Bóc Mệnh để khám phá vận mệnh, giải mơ và nhiều tính năng thú vị khác",
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <RegisterForm redirectTo="/" />
      </div>
    </main>
  )
}
