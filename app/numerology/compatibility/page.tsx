import type { Metadata } from "next"
import CompatibilityForm from "@/components/forms/CompatibilityForm"

export const metadata: Metadata = {
  title: "Tương Hợp Thần Số Học - Kiểm Tra Độ Hợp Nhau Qua Con Số",
  description:
    "Phân tích tương hợp thần số học giữa hai người. Kiểm tra độ hợp nhau trong tình yêu, tình bạn và kinh doanh qua ngày sinh và tên",
  keywords:
    "tương hợp thần số học, numerology compatibility, độ hợp nhau, tình yêu, tình bạn, kinh doanh, phân tích mối quan hệ",
}

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Tương Hợp Thần Số Học</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khám phá mức độ tương hợp giữa hai người thông qua thần số học. Phân tích chi tiết về tình yêu, tình bạn và
            hợp tác kinh doanh.
          </p>
        </div>

        <CompatibilityForm />

        {/* Information Section */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💕</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">Tình Yêu</h3>
            <p className="text-gray-300 text-sm">
              Phân tích sự tương thích trong mối quan hệ tình cảm, khả năng kết nối tâm linh và tiềm năng lâu dài.
            </p>
          </div>

          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">Tình Bạn</h3>
            <p className="text-gray-300 text-sm">
              Đánh giá khả năng xây dựng tình bạn bền vững, sở thích chung và cách giao tiếp hiệu quả.
            </p>
          </div>

          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">Kinh Doanh</h3>
            <p className="text-gray-300 text-sm">
              Phân tích khả năng hợp tác trong công việc, phong cách lãnh đạo và tiềm năng thành công chung.
            </p>
          </div>

          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔮</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">Tổng Quan</h3>
            <p className="text-gray-300 text-sm">
              Phân tích toàn diện mọi khía cạnh của mối quan hệ với lời khuyên chi tiết và dự báo tương lai.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 mystical-card">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Cách Thức Hoạt Động</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">Nhập Thông Tin</h3>
              <p className="text-gray-400 text-sm">
                Cung cấp tên đầy đủ và ngày sinh của cả hai người để tính toán các con số thần số học.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">Phân Tích Tương Hợp</h3>
              <p className="text-gray-400 text-sm">
                Hệ thống so sánh các con số cốt lõi và tính toán mức độ tương thích theo từng khía cạnh.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">Nhận Kết Quả</h3>
              <p className="text-gray-400 text-sm">
                Xem báo cáo chi tiết với điểm số, phân tích và lời khuyên cụ thể cho mối quan hệ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
