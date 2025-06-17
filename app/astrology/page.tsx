import AstrologyForm from "@/components/forms/AstrologyForm"

export default function AstrologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Biểu Đồ Sao Cá Nhân
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá bản đồ sao của bạn và hiểu rõ hơn về tính cách, vận mệnh và tiềm năng của mình
          </p>
        </div>

        <AstrologyForm />
      </div>
    </div>
  )
}
