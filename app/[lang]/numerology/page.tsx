import type { Metadata } from "next"
import NumerologyForm from "@/components/forms/NumerologyForm"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface NumerologyPageProps {
  params: {
    lang: string
  }
}

export async function generateMetadata({ params }: NumerologyPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'numerology',
    params
  });
}

export default async function NumerologyPage({ params }: NumerologyPageProps) {
  const structuredData = await generateMultilingualStructuredData('numerology', params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Thần Số Học</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Khám phá bí mật cuộc đời qua con số. Phân tích tên và ngày sinh để hiểu rõ về tính cách, vận mệnh và con
              đường phía trước.
            </p>
          </div>

          <NumerologyForm />

          {/* Information Section */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🔢 Số Đường Đời</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ ngày sinh, cho biết mục đích cuộc đời và những bài học quan trọng bạn cần trải qua.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🎯 Số Định Mệnh</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ tên đầy đủ, thể hiện tài năng tự nhiên và những gì bạn được sinh ra để làm.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">💎 Số Linh Hồn</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ các nguyên âm trong tên, thể hiện động lực sâu thẳm và mong muốn của trái tim.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🎭 Số Cá Tính</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ các phụ âm trong tên, cho biết cách người khác nhìn nhận bạn và ấn tượng đầu tiên.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🍀 Số May Mắn</h3>
              <p className="text-gray-300 text-sm">
                Những con số mang lại may mắn và năng lượng tích cực cho bạn trong cuộc sống và công việc.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">📅 Chu Kỳ Cá Nhân</h3>
              <p className="text-gray-300 text-sm">
                Phân tích năm, tháng, ngày cá nhân hiện tại để biết thời điểm thuận lợi cho các hoạt động.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
