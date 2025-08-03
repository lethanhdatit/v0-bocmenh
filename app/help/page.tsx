import { getTranslations } from "@/i18n/server"
import HelpPageClient from "./HelpPageClient"
import type { Metadata } from "next"
import { createSEOMetadata, createFAQStructuredData } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations(["help"])

  return createSEOMetadata({
    title: "Trung Tâm Hỗ Trợ - Bóc Mệnh | Câu Hỏi Thường Gặp & Hướng Dẫn",
    description: "❓ Trung tâm hỗ trợ Bóc Mệnh với đầy đủ câu hỏi thường gặp, hướng dẫn sử dụng dịch vụ bói toán, phong thủy. Giải đáp mọi thắc mắc về tài khoản, thanh toán, dịch vụ.",
    keywords: "trung tâm hỗ trợ, câu hỏi thường gặp, FAQ, hướng dẫn sử dụng, hỗ trợ khách hàng, giải đáp thắc mắc, liên hệ hỗ trợ",
    ogImage: "/og-help.jpg",
    canonicalUrl: "/help",
    alternateLanguages: {
      vi: `/help`,
      en: `/help`,
    },
  })
}

export default async function HelpPage() {
  // FAQ structured data
  const helpFAQs = [
    {
      question: "Làm sao để tạo tài khoản Bóc Mệnh?",
      answer: "Bạn có thể đăng ký tài khoản miễn phí bằng cách click vào nút 'Đăng ký' ở góc trên phải và nhập email, mật khẩu."
    },
    {
      question: "Dịch vụ nào miễn phí trên Bóc Mệnh?",
      answer: "Bóc Mệnh cung cấp nhiều dịch vụ miễn phí như bóc mệnh cơ bản, giải mơ, thần số học cơ bản, và nhiều tính năng khác."
    },
    {
      question: "Làm sao để nạp duyên?",
      answer: "Vào trang Nạp Duyên, chọn gói phù hợp và thanh toán qua các phương thức được hỗ trợ như chuyển khoản, ví điện tử."
    },
    {
      question: "Độ chính xác của dịch vụ AI bói toán như thế nào?",
      answer: "Dịch vụ AI của chúng tôi được phát triển dựa trên hàng ngàn năm tri thức phong thủy, kết hợp công nghệ hiện đại để đạt độ chính xác cao nhất."
    }
  ];

  const helpStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Trung Tâm Hỗ Trợ",
    description: "Trung tâm hỗ trợ và câu hỏi thường gặp",
    url: `${baseUrl}/help`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: helpFAQs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Trung tâm hỗ trợ",
          item: `${baseUrl}/help`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(helpStructuredData),
        }}
      />
      <HelpPageClient />
    </>
  )
}
