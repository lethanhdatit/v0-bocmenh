import { Metadata } from "next";
import { getTranslations } from "@/i18n/server";
import { createSEOMetadata } from "@/lib/seo/metadata";
import TopupsHistoryClient from "./TopupsHistoryClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");
  
  return createSEOMetadata({
    title: "Lịch Sử Nạp Điểm Duyên - Quản Lý Giao Dịch | Bóc Mệnh",
    description: "📊 Xem lịch sử giao dịch nạp điểm duyên của bạn. Theo dõi trạng thái thanh toán, số dư tài khoản và các giao dịch đã thực hiện.",
    keywords: "lịch sử nạp tiền, giao dịch điểm duyên, quản lý tài khoản, transaction history, payment history, bóc mệnh account",
    ogImage: "/imgs/history-og.jpg",
    canonicalUrl: "/topups-history",
    noindex: true // Không index vì là trang cá nhân
  });
}

export default function TopupsHistoryPage() {
  const historyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Lịch Sử Nạp Điểm Duyên",
    "description": "Trang quản lý lịch sử giao dịch nạp điểm duyên",
    "provider": {
      "@type": "Organization",
      "name": "Bóc Mệnh",
      "url": "https://bocmenh.com"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Bóc Mệnh",
      "url": "https://bocmenh.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(historyStructuredData) }}
      />
      <TopupsHistoryClient />
    </>
  );
}