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
import Image from "next/image";

interface TopupsCheckoutClientProps {
  transId: string;
  cancel?: string;
}

export default function TopupsCheckoutClient({
  transId,
  cancel,
}: TopupsCheckoutClientProps) {
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
    const handler = async (id: string) => {
      await cancelTopup(id);
    };

    if (cancel === "1") {
      handler(transId);
    }
  }, []);

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
    <Card
      className={`w-full max-w-md p-6 shadow-xl border rounded-2xl bg-white text-center transition-all duration-300`}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-serif text-gray-800">
          {t("checkout.transactionStatus")}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center gap-6">
        {error ? (
          <>
            <XCircle className="w-16 h-16 text-red-500" />
            <p className="text-lg text-red-600">{t("checkout.fetchError")}</p>
          </>
        ) : (
          <>
            {getStatusIcon(data?.status || "new")}
            {data?.status !== "paid" && data?.status !== "cancelled" && (
              <div className={`px-4 py-2 text-lg font-semibold`}>
                {data?.message || t("checkout.checkingStatus")}
              </div>
            )}

            {data && (
              <div className="text-left w-full mt-4 space-y-3 text-gray-700">
                <p>
                  <strong className="font-medium">
                    {t("checkout.status")}:
                  </strong>{" "}
                  <b className={`${statusColors.text}`}>
                    {t(`checkout.paymentStatus.${data.status}`)}
                  </b>
                </p>
                <p className="flex items-center gap-x-2">
                  <strong className="font-medium">
                    {t("checkout.paymentGate")}:
                  </strong>
                  <Image
                    src={
                      `${data.provider.toLowerCase()}.png` || "/placeholder.svg"
                    }
                    alt={data.provider}
                    width={64}
                    height={18}
                    className="inline-block"
                  />
                </p>
                <p>
                  <strong className="font-medium">
                    {t("checkout.fates")}:
                  </strong>{" "}
                  {data.fates} {data.content ? `(${data.content})` : ""}
                </p>
                <p>
                  <strong className="font-medium">
                    {t("checkout.subTotalAmount")}:
                  </strong>{" "}
                  {data.subTotal.toLocaleString("vi-VN")} {data.currency}
                </p>
                <p>
                  <strong className="font-medium">
                    {t("checkout.totalAmount")}:
                  </strong>{" "}
                  {data.total.toLocaleString("vi-VN")} {data.currency}
                </p>
                <p>
                  <strong className="font-medium">
                    {t("checkout.paidAmount")}:
                  </strong>{" "}
                  {data.paid.toLocaleString("vi-VN")} {data.currency}
                </p>
              </div>
            )}

            {(data?.status === "cancelled" ||
              data?.status === "partiallyPaid") && (
              <Button
                onClick={() => (window.location.href = "/topups")}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                {t("checkout.tryAgain")}
              </Button>
            )}

            {data?.status !== "processing" && data?.status !== "new" && data?.status !== "cancelled" && (
              <Button
                onClick={() => (window.location.href = "/")}
                className="mt-2 bg-gray-800 hover:bg-gray-900 text-white"
              >
                {t("checkout.backToHome")}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
