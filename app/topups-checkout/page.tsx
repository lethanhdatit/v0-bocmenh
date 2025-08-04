import type { Metadata } from "next";
import TopupsCheckoutClient from "./TopupsCheckoutClient";
import { createSEOMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return createSEOMetadata({
    title: "Thanh Toán Điểm Duyên - Checkout An Toàn | Bóc Mệnh",
    description:
      "🛒 Hoàn tất thanh toán gói điểm duyên với hệ thống bảo mật cao. Hỗ trợ Paypal, VietQR, Banking, Visa. Giao dịch nhanh chóng, an toàn và đáng tin cậy.",
    keywords:
      "thanh toán điểm duyên, checkout bóc mệnh, vietqr, paypal payment, banking vietnam, visa checkout, giao dịch an toàn, payment gateway",
    ogImage: "/imgs/checkout-og.jpg",
    canonicalUrl: "/topups-checkout",
    alternateLanguages: {
      vi: `/topups-checkout`,
      en: `/topups-checkout`,
    },
    noindex: true, // Không index trang checkout
  });
}

interface TopupsCheckoutPageProps {
  searchParams: {
    transId?: string;
    cancel?: string;
    miniMode?: boolean;
    autoClose?: boolean;
    showContinuePayment?: boolean;
  };
}

export default async function TopupsCheckoutPage({
  searchParams,
}: TopupsCheckoutPageProps) {
  const { transId, cancel, miniMode, showContinuePayment, autoClose } =
    searchParams;
  const { t } = await getTranslations("common");

  // Structured data cho trang checkout
  const checkoutStructuredData = {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    name: "Thanh Toán Điểm Duyên",
    description: "Trang thanh toán an toàn cho việc mua điểm duyên",
    paymentAccepted: [
      "VietQR",
      "PayPal",
      "Credit Card",
      "Banking",
      "Digital Wallet",
    ],
    currenciesAccepted: "VND",
    provider: {
      "@type": "Organization",
      name: "Bóc Mệnh",
      url: "https://bocmenh.com",
    },
  };

  if (!transId) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(checkoutStructuredData),
          }}
        />
        <div className="min-h-screen flex items-center justify-center bg-oriental-bg bg-cover bg-center text-foreground">
          <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg">
            <h1 className="text-3xl font-serif text-primary mb-4">
              {t("checkout.invalidTransaction")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("checkout.missingId")}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(checkoutStructuredData),
        }}
      />
      <div className="min-h-screen flex items-center justify-center bg-oriental-bg bg-cover bg-center text-foreground">
        <TopupsCheckoutClient
          transId={transId}
          cancel={cancel}
          miniMode={miniMode}
          showContinuePayment={showContinuePayment}
          autoClose={autoClose}
        />
      </div>
    </>
  );
}
