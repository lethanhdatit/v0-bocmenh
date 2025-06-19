import type { Metadata } from "next"
import NameAnalysisForm from "@/components/forms/NameAnalysisForm"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Phân Tích Thần Số Học Tên | Bóc Mệnh",
  description:
    "Khám phá bí mật ẩn giấu trong tên của bạn qua thần số học. Phân tích số định mệnh, cá tính, linh hồn và nhiều yếu tố khác từ tên.",
  keywords: "thần số học tên, phân tích tên, số định mệnh, numerology, bóc mệnh tên",
}

export default function NameAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-4">
            Phân Tích Thần Số Học Tên
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Khám phá những bí mật ẩn giấu trong tên của bạn. Mỗi chữ cái đều mang một năng lượng riêng, ảnh hưởng đến
            tính cách, số phận và con đường cuộc đời.
          </p>
        </div>

        {/* Main Form */}
        <NameAnalysisForm />

        {/* Information Section */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="mystical-card">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">🔢 Số Định Mệnh</h3>
            <p className="text-gray-300">
              Được tính từ tổng tất cả chữ cái trong tên, thể hiện sứ mệnh và mục đích cuộc đời của bạn.
            </p>
          </div>

          <div className="mystical-card">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">👤 Số Cá Tính</h3>
            <p className="text-gray-300">
              Được tính từ các phụ âm trong tên, thể hiện hình ảnh bên ngoài và cách người khác nhìn nhận bạn.
            </p>
          </div>

          <div className="mystical-card">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">💖 Số Linh Hồn</h3>
            <p className="text-gray-300">
              Được tính từ các nguyên âm trong tên, thể hiện mong muốn sâu thẳm và động lực nội tại của bạn.
            </p>
          </div>

          <div className="mystical-card">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">🔤 Chữ Cái Đặc Biệt</h3>
            <p className="text-gray-300">
              Chữ cái đầu (Cornerstone) và cuối (Capstone) trong tên có ý nghĩa đặc biệt về cách tiếp cận và hoàn thành
              công việc.
            </p>
          </div>

          <div className="mystical-card">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">🔥 Số Đam Mê Ẩn Giấu</h3>
            <p className="text-gray-300">
              Những con số xuất hiện nhiều nhất trong tên, thể hiện tài năng tự nhiên và đam mê của bạn.
            </p>
          </div>

          <div className="mystical-card">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">📚 Bài Học Nghiệp Quả</h3>
            <p className="text-gray-300">
              Những con số không có trong tên, thể hiện các bài học cần phát triển để hoàn thiện bản thân.
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 mystical-card">
          <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center">💡 Mẹo Sử Dụng Kết Quả</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">🎯 Phát Triển Bản Thân:</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Tập trung phát triển điểm mạnh từ số định mệnh</li>
                <li>• Khắc phục thách thức được chỉ ra</li>
                <li>• Sử dụng màu sắc may mắn trong trang phục</li>
                <li>• Chọn ngày may mắn cho các quyết định quan trọng</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">💼 Ứng Dụng Thực Tế:</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Chọn nghề nghiệp phù hợp với số định mệnh</li>
                <li>• Hiểu rõ hơn về bản thân và người khác</li>
                <li>• Cải thiện mối quan hệ qua tương hợp số học</li>
                <li>• Đặt tên con em theo nguyên tắc thần số học</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
