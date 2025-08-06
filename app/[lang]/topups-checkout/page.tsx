import type { Metadata } from "next";
import TopupsCheckoutClient from "./TopupsCheckoutClient";
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers";
import { getTranslations } from "@/i18n/server";

interface TopupsCheckoutPageProps {
  params: {
    lang: string
  }
  searchParams: {
    transId?: string;
    cancel?: string;
    miniMode?: boolean;
    autoClose?: boolean;
    showContinuePayment?: boolean;
  };
}

export async function generateMetadata({ params }: TopupsCheckoutPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'topups-checkout',
    params
  });
}

export default async function TopupsCheckoutPage({ params, searchParams }: TopupsCheckoutPageProps) {
  const structuredData = await generateMultilingualStructuredData('topups-checkout', params);
  const { transId, cancel, miniMode, showContinuePayment, autoClose } = searchParams;
  const { t } = await getTranslations("common");

  if (!transId) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
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
          __html: JSON.stringify(structuredData),
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
