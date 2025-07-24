"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { InputInfoSection } from "./InputInfoSection";
import { ExplanationSection } from "./ExplanationSection";
import { LaSoBatTuSection } from "./LaSoBatTuSection";
import { DestinyResult } from "./types";
import useSWR from "swr";
import { apiClient } from "@/lib/api/apiClient";
import { usePayService } from "@/hooks/usePayService";
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FatesUnit } from "@/components/common/FatesUnit";

export default function DestinyResultClient({ id }: { id: string }) {
  const { t } = useTranslation(["common", "destiny", "attributes"]);
  const [showPayDialog, setShowPayDialog] = useState(false);
  const [paying, setPaying] = useState(false);
  const [justPaid, setJustPaid] = useState(false);
  const pay = usePayService();

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
      if (!result) return 2000;
      if (justPaid && !explanation?.paidResult) return 1000;
      return 0;
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const genders = (t("genders", { returnObjects: true }) as Array<any>) || [];
  const categories =
    (t("batTuTuTruCategories", { returnObjects: true }) as Array<any>) || [];

  // Xử lý thanh toán
  const handlePay = async () => {
    setPaying(true);
    showGlobalLoading(t("destiny.result.paying"));
    try {
      await pay(id);
      setShowPayDialog(false);
      setJustPaid(true);
      toast({
        title: t("destiny.result.paySuccessTitle", "Thanh toán thành công!"),
        description: t(
          "destiny.result.paySuccessDesc",
          "Vui lòng chờ hệ thống cập nhật kết quả luận giải đầy đủ."
        ),
        variant: "default", // Sửa lại thành "default"
      });
      mutate();
    } catch (err: any) {
      toast({
        title: t("destiny.result.payErrorTitle", "Thanh toán thất bại!"),
        description: err?.message || t("common.errorUnexpected"),
        variant: "destructive",
      });
    } finally {
      setPaying(false);
      hideGlobalLoading();
    }
  };

  if (isLoading)
    return <div className="text-center py-12">{t("common.loading")}</div>;
  if (!destinyResult) return null;

  const { servicePrice, input, preData, explanation } = destinyResult;
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
      <div>
        <ExplanationSection
          result={result}
          t={t}
          isPaid={isPaid}
          loading={!result}
          onPayClick={() => setShowPayDialog(true)}
        >
          {!isPaid && (
            <div className="flex flex-col items-center mt-12">
              {/* Nút thanh toán */}
              <Button
                onClick={() => setShowPayDialog(true)}
                className="bg-[#18181c] hover:bg-[#23232a] text-yellow-400 font-bold px-8 py-3 text-lg rounded-lg shadow-lg border-2 border-yellow-600 flex items-center gap-2 transition-all"
                style={{ letterSpacing: 0.5 }}
                disabled={paying}
              >
                <span className="font-bold text-lg text-yellow-700 text-base">
                  {servicePrice?.toLocaleString() ?? "--"}
                </span>
                <FatesUnit
                  type="icon"
                  width={22}
                  height={22}
                  className="mr-1"
                  isAura={true}
                />

                <span className="mx-2 text-yellow-400 font-extrabold">|</span>
                <span className="font-semibold">
                  {t("destiny.result.payToUnlock", "Mở khoá toàn bộ")}
                </span>
              </Button>
            </div>
          )}
        </ExplanationSection>
      </div>
      {/* <div className="text-center mt-10">
        <Link href="/destiny">
          <Button
            variant="outline"
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-gray-900 border-yellow-600 hover:border-yellow-700 px-8 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {t("destiny.result.viewForAnother")}
          </Button>
        </Link>
      </div> */}
      {/* Dialog xác nhận thanh toán */}
      <Dialog open={showPayDialog} onOpenChange={setShowPayDialog}>
        <DialogContent className="bg-gradient-to-br bg-gray-900/95 backdrop-blur-md border-2 border-yellow-400 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white-900 text-xl font-bold flex items-center gap-2">
              <FatesUnit
                type="icon"
                width={22}
                height={22}
                className="drop-shadow"
              />
              {t("destiny.result.payConfirmTitle", "Xác nhận")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-base text-white-900 font-medium">
            {t(
              "destiny.result.payConfirmDesc",
              `Sử dụng ${
                servicePrice?.toLocaleString() ?? "--"
              } điểm duyên để mở khoá toàn bộ luận giải?`
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPayDialog(false)}
              disabled={paying}
              className="border border-gray-400 text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold"
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handlePay}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-gray-900 font-bold border-2 border-yellow-600 hover:from-yellow-500 hover:to-amber-600 shadow-lg"
              disabled={paying}
            >
              {paying ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600" />
                  {t("destiny.result.payNow", "Mở ngay")}
                </span>
              ) : (
                t("destiny.result.payNow", "Mở ngay")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
