"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { InputInfoSection } from "./InputInfoSection";
import { ExplanationSection } from "./ExplanationSection";
import { LaSoBatTuSection } from "./LaSoBatTuSection";
import { DestinyResult } from "./types";
import useSWR from "swr";
import { apiClient } from "@/lib/api/apiClient";
import {
  PaymentDialog,
  PaymentButton,
} from "@/components/common/PaymentDialog";
import { usePayment } from "@/hooks/usePayService";

const serviceName = "Luận giải Bát tự";

export default function DestinyResultClient({ id }: { id: string }) {
  const { t } = useTranslation(["common", "destiny", "attributes"]);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [justPaid, setJustPaid] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);

  // SWR fetcher
  const fetchDestinyResult = useCallback(async () => {
    const response = await apiClient.get(`/destiny?id=${id}`);
    return response.data?.data as DestinyResult;
  }, [id]);

  const {
    data: destinyResult,
    isLoading,
    mutate,
  } = useSWR(id ? [`destiny-result`, id] : null, fetchDestinyResult, {
    refreshInterval: (data: DestinyResult | undefined) => {
      const explanation = data?.explanation;
      const result = explanation?.paidResult ?? explanation?.freeResult;
      if (!result) return 3000;
      if (justPaid && !explanation?.paidResult) return 1000;
      return 0;
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Đặt giá trị mặc định cho servicePrice để dùng cho hook
  const servicePrice = destinyResult?.servicePrice ?? 0;

  // Luôn gọi hook ở đầu component
  const { paying, handlePay } = usePayment({
    id,
    serviceName,
    servicePrice,
    scrollToRef: explanationRef,
    onSuccess: () => {
      setShowPayDialog(false);
      setJustPaid(true);
      mutate();
    },
    onError: () => setShowPayDialog(false),
  });

  const genders = (t("genders", { returnObjects: true }) as Array<any>) || [];
  const categories =
    (t("batTuTuTruCategories", { returnObjects: true }) as Array<any>) || [];

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4" />
        <div className="text-yellow-300 text-lg">{t("common.loading")}</div>
      </div>
    );
  if (!destinyResult) return null;

  const { input, preData, explanation } = destinyResult;
  const isPaid = Boolean(explanation?.paidResult);
  const result = explanation?.paidResult ?? explanation?.freeResult;

  return (
    <div className="space-y-10">
      <InputInfoSection
        input={input}
        genders={genders}
        categories={categories}
        t={t}
      />
      <LaSoBatTuSection preData={preData} t={t} />
      <ExplanationSection
        ref={explanationRef}
        result={result}
        t={t}
        isPaid={isPaid}
        loading={!result}
        onPayClick={() => setShowPayDialog(true)}
      >
        {!isPaid && (
          <div className="flex flex-col items-center mt-12">
            <PaymentButton
              servicePrice={servicePrice}
              onClick={() => setShowPayDialog(true)}
              disabled={paying}
              label={t("destiny.result.payToUnlock", "Mở khoá toàn bộ")}
            />
          </div>
        )}
      </ExplanationSection>
      <PaymentDialog
        open={showPayDialog}
        onOpenChange={setShowPayDialog}
        serviceName={serviceName}
        servicePrice={servicePrice}
        onConfirm={handlePay}
        paying={paying}
      />
    </div>
  );
}
