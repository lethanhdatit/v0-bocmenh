"use client";

import { useEffect } from "react";
import useSWR from "swr";
import {
  getTransactionStatus,
  cancelTopup,
  type TransactionStatusResponse,
} from "@/lib/topups";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import { TopupBill } from "@/components/topups/TopupBill";
import { useLayoutVisibility } from "@/contexts/LayoutVisibilityContext";

interface TopupsCheckoutClientProps {
  transId: string;
  cancel?: string;
  miniMode?: boolean;
}

export default function TopupsCheckoutClient({
  transId,
  cancel,
  miniMode = false,
}: TopupsCheckoutClientProps) {
  const { hideNav, showNavFn, hideFooter, showFooterFn } =
      useLayoutVisibility();
  const { t } = useTranslation("common");
  const { data, error, isLoading } = useSWR<TransactionStatusResponse>(
    transId ? `/transaction-status?id=${transId}` : null,
    () => getTransactionStatus(transId),
    {
      refreshInterval: (data) =>
        data?.status === "processing" || data?.status === "new" ? 1500 : 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (cancel === "1") {
      cancelTopup(transId);
    }
  }, [cancel, transId]);

  useEffect(() => {
    if (miniMode) {
      hideNav();
      hideFooter();
    }else{
      showNavFn();
      showFooterFn();
    }
  }, [miniMode]);

  useEffect(() => {
    if (isLoading) {
      showGlobalLoading(t("checkout.checkingStatus"));
    } else {
      hideGlobalLoading();
    }
  }, [isLoading, t]);

  useEffect(() => {
    if (data && !["processing", "new"].includes(data.status)) {
      if (window.opener) {
        window.opener.postMessage(
          { type: "paymentComplete", transId },
          window.location.origin
        );
        setTimeout(() => window.close(), 1000);
      }
    }
  }, [data, transId]);

  const getStatusIcon = (status: TransactionStatusResponse["status"]) => {
    switch (status) {
      case "paid":
        return (
          <CheckCircle className="w-16 h-16 text-green-500 animate-fade-in" />
        );
      case "cancelled":
        return <XCircle className="w-16 h-16 text-red-500 animate-fade-in" />;
      case "partiallyPaid":
        return (
          <AlertCircle className="w-16 h-16 text-yellow-500 animate-fade-in" />
        );
      case "processing":
      case "new":
      default:
        return (
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin-slow" />
        );
    }
  };

  const getStatusColors = (status: TransactionStatusResponse["status"]) => {
    switch (status) {
      case "paid":
        return {
          text: "text-green-600",
          bg: "bg-green-100 border-green-300",
        };
      case "cancelled":
        return {
          text: "text-red-600",
          bg: "bg-red-100 border-red-300",
        };
      case "partiallyPaid":
        return {
          text: "text-yellow-600",
          bg: "bg-yellow-100 border-yellow-300",
        };
      case "processing":
      case "new":
      default:
        return {
          text: "text-blue-600",
          bg: "bg-blue-100 border-blue-300",
        };
    }
  };

  const statusColors = getStatusColors(data?.status || "new");

  return (
    <Card className="w-full max-w-xl p-0 shadow-xl border rounded-2xl bg-white text-center transition-all duration-300 mx-auto">
      <CardHeader className="pb-2 pt-6">
        <CardTitle className="text-2xl font-serif text-gray-800">
          {t("checkout.transactionStatus")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        {error ? (
          <>
            <XCircle className="w-16 h-16 text-red-500" />
            <p className="text-lg text-red-600">{t("checkout.fetchError")}</p>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              {getStatusIcon(data?.status || "new")}
              <div
                className={`px-4 py-2 text-lg font-semibold ${statusColors.text}`}
              >
                {t(`checkout.paymentStatus.${data?.status || "new"}`)}
              </div>
              {data?.status !== "paid" && data?.status !== "cancelled" && (
                <div className="text-sm text-gray-500">
                  {t("checkout.checkingStatus")}
                </div>
              )}
            </div>

            {/* BILL */}
            {data && (
              <div className="w-full max-w-lg mx-auto bg-gray-50 rounded-xl border border-dashed border-gray-200 text-left text-sm font-mono p-4 mt-1">
                <TopupBill data={data} statusColors={statusColors} showExport={true}/>
              </div>
            )}

            {/* Action buttons giữ nguyên */}
            <div className="flex flex-col gap-2 w-full mt-4">
              {(data?.status === "cancelled" ||
                data?.status === "partiallyPaid") && (
                <Button
                  onClick={() => (window.location.href = "/topups")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {t("checkout.tryAgain")}
                </Button>
              )}

              {data?.status !== "processing" &&
                data?.status !== "new" &&
                data?.status !== "cancelled" && (
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    {t("checkout.backToHome")}
                  </Button>
                )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
