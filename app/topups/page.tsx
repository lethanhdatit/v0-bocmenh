import { getTopupPackages, getPaymentGates } from "@/lib/topups";
import TopupsClient from "./TopupsClient";
import type { Metadata } from "next";
import { getTranslations } from "@/i18n/server";
import { createSEOMetadata } from "@/lib/seo/metadata";
import { FatesUnit } from "@/components/common/FatesUnit";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo");

  return createSEOMetadata({
    title: "Nạp Điểm Duyên - Mua Gói Dịch Vụ Premium | Bóc Mệnh",
    description:
      "💳 Nạp điểm duyên để trải nghiệm đầy đủ các dịch vụ bói toán cao cấp. Thanh toán an toàn qua Momo, Banking, Visa. Gói ưu đãi từ 50K với nhiều quyền lợi hấp dẫn.",
    keywords:
      "nạp điểm duyên, mua gói premium, cổng vietqr, thanh toán paypal, banking online, visa payment, dịch vụ bói toán, gói ưu đãi, bóc mệnh premium, nạp tiền online, payment vietnam",
    ogImage: "/imgs/topups-og.jpg",
    canonicalUrl: "/topups",
  });
}

interface TopupsPageProps {
  searchParams: {
    openNewWindow?: string;
  };
}

export default async function TopupsPage({ searchParams }: TopupsPageProps) {
  const topupPackages = await getTopupPackages();
  const paymentGates = await getPaymentGates();

  const { t } = await getTranslations("common");

  const openNewWindow = searchParams?.openNewWindow !== "0";

  // Structured data cho trang nạp điểm duyên
  const topupsStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://bocmenh.com/topups#product",
        name: "Điểm Duyên - Dịch Vụ Bói Toán Premium",
        description:
          "Điểm duyên để sử dụng các dịch vụ bói toán cao cấp như xem tử vi, bói bài tarot, phân tích vận mệnh chi tiết",
        brand: {
          "@type": "Brand",
          name: "Bóc Mệnh",
        },
        offers: topupPackages.map((pkg, index) => ({
          "@type": "Offer",
          "@id": `https://bocmenh.com/topups#offer-${index + 1}`,
          name: `Gói ${pkg.fates} Điểm Duyên`,
          price: pkg.finalAmount.toString(),
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Bóc Mệnh",
          },
          validFrom: new Date().toISOString(),
          priceValidUntil: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000
          ).toISOString(),
        })),
        category: "Digital Services",
        audience: {
          "@type": "Audience",
          audienceType: "Fortune Telling Enthusiasts",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/topups",
        name: "Nạp Điểm Duyên - Mua Gói Dịch Vụ Premium",
        description:
          "Trang nạp điểm duyên để trải nghiệm đầy đủ các dịch vụ bói toán cao cấp",
        url: "https://bocmenh.com/topups",
        inLanguage: "vi",
        isPartOf: {
          "@type": "WebSite",
          name: "Bóc Mệnh",
          url: "https://bocmenh.com",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Trang Chủ",
              item: "https://bocmenh.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Nạp Điểm Duyên",
              item: "https://bocmenh.com/topups",
            },
          ],
        },
        mainEntity: {
          "@id": "https://bocmenh.com/topups#product",
        },
      },
      {
        "@type": "PaymentService",
        "@id": "https://bocmenh.com/topups#payment-service",
        name: "Dịch Vụ Thanh Toán Bóc Mệnh",
        description: "Hệ thống thanh toán an toàn cho việc nạp điểm duyên",
        provider: {
          "@type": "Organization",
          name: "Bóc Mệnh",
          url: "https://bocmenh.com",
        },
        paymentAccepted: paymentGates.map((gate) => gate.name),
        currenciesAccepted: "VND",
        areaServed: "Vietnam",
        serviceType: "Digital Payment",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Điểm duyên là gì?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Điểm duyên là đơn vị tiền tệ ảo trong hệ thống Bóc Mệnh, được sử dụng để trải nghiệm các dịch vụ bói toán cao cấp như xem tử vi chi tiết, bói bài tarot, phân tích vận mệnh.",
            },
          },
          {
            "@type": "Question",
            name: "Có những phương thức thanh toán nào?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Chúng tôi hỗ trợ thanh toán qua Momo, Banking online, thẻ Visa/Mastercard và các ví điện tử phổ biến tại Việt Nam.",
            },
          },
          {
            "@type": "Question",
            name: "Gói nạp điểm nào phù hợp nhất?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Gói cơ bản 50K phù hợp cho người mới trải nghiệm. Gói 200K-500K có nhiều ưu đãi và bonus điểm. Gói VIP 1M+ dành cho khách hàng thường xuyên với quyền lợi đặc biệt.",
            },
          },
          {
            "@type": "Question",
            name: "Điểm duyên có thời hạn sử dụng không?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Điểm duyên không có thời hạn sử dụng. Bạn có thể tích lũy và sử dụng bất cứ lúc nào để trải nghiệm các dịch vụ.",
            },
          },
          {
            "@type": "Question",
            name: "Có chính sách hoàn tiền không?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Chúng tôi có chính sách hoàn tiền trong vòng 24h nếu gặp lỗi kỹ thuật hoặc sự cố không mong muốn. Vui lòng liên hệ support để được hỗ trợ.",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://bocmenh.com#organization",
        name: "Bóc Mệnh",
        url: "https://bocmenh.com",
        description: "Nền tảng bói toán AI hàng đầu Việt Nam",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          areaServed: "VN",
          availableLanguage: ["vi", "en"],
        },
        paymentAccepted: [
          "VietQR",
          "PayPal",
          "Credit Card",
          "Banking",
          "Digital Wallet",
        ],
        currenciesAccepted: "VND",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(topupsStructuredData),
        }}
      />
      <div className="min-h-screen bg-oriental-bg bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif text-primary-foreground text-center mb-8 drop-shadow-lg">
          <span className="inline-flex items-center justify-center gap-2 w-full">
            {t("topups.pageTitle")}
            <FatesUnit
              type="icon"
              width={28}
              height={28}
              text={t("topups.fatesUnit")}
              className="flex-shrink-0 cursor-pointer"
              // isAura={false}
            />
          </span>
        </h1>
        <TopupsClient
          initialTopupPackages={topupPackages}
          openNewWindow={openNewWindow}
          paymentGates={paymentGates}
        />
      </div>
    </>
  );
}
