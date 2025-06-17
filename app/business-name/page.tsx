import type { Metadata } from "next"
import BusinessNameForm from "@/components/forms/BusinessNameForm"

export const metadata: Metadata = {
  title: "Phân Tích Tên Doanh Nghiệp - Bóc Mệnh",
  description: "Khám phá năng lượng thần số học của tên doanh nghiệp và tiềm năng thành công kinh doanh",
  keywords: "phân tích tên doanh nghiệp, thần số học kinh doanh, tên công ty, phong thủy doanh nghiệp",
}

export default function BusinessNamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Phân Tích Tên Doanh Nghiệp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá năng lượng thần số học của tên doanh nghiệp, tiềm năng thành công và những yếu tố quan trọng cho sự
            phát triển bền vững
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BusinessNameForm />
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Lợi Ích Của Phân Tích Tên Doanh Nghiệp</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Định Hướng Chiến Lược</h3>
              <p className="text-gray-600">
                Hiểu rõ năng lượng cốt lõi của doanh nghiệp để xây dựng chiến lược kinh doanh phù hợp
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Tối Ưu Marketing</h3>
              <p className="text-gray-600">
                Nhận được lời khuyên marketing và branding phù hợp với đặc tính thần số học
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Dự Báo Thành Công</h3>
              <p className="text-gray-600">Đánh giá tiềm năng thành công và những thách thức cần vượt qua</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Cách Thức Hoạt Động</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nhập Thông Tin</h3>
                <p className="text-gray-600">
                  Cung cấp tên doanh nghiệp, loại hình kinh doanh và ngày sinh chủ doanh nghiệp (tùy chọn)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tính Toán Thần Số</h3>
                <p className="text-gray-600">
                  Hệ thống tính toán các con số quan trọng: Số Định Mệnh, Số Cá Tính, Số Linh Hồn
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Phân Tích Toàn Diện</h3>
                <p className="text-gray-600">
                  Nhận được báo cáo chi tiết về tiềm năng, thách thức, lời khuyên marketing và chiến lược
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
