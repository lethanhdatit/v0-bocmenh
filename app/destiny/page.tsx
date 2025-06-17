import type { Metadata } from "next"
import DestinyForm from "@/components/forms/DestinyForm"

export const metadata: Metadata = {
  title: "Bóc Mệnh Cá Nhân - Khám Phá Vận Mệnh Của Bạn",
  description: "Khám phá vận mệnh, tính cách và tương lai của bạn thông qua ngày sinh và thông tin cá nhân",
}

export default function DestinyPage() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Bóc Mệnh Cá Nhân</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Nhập thông tin của bạn để khám phá vận mệnh, tính cách và con đường phía trước
          </p>
        </div>

        <DestinyForm />
      </div>
    </main>
  )
}
