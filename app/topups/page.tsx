import { getTopupPackages, getPaymentGates } from "@/lib/topups";
import TopupsClient from "./TopupsClient";
import type { Metadata } from "next";
import { getTranslations } from "@/i18n/server";
import { FatesUnit } from "@/components/common/FatesUnit";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations("common");
  return {
    title: t("topups.title"),
    description: t("topups.description"),
  };
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

  return (
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
  );
}
