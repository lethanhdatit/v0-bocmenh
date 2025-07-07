"use client"

import { useEffect } from "react"
import useSWR from "swr"
import { getTransactionStatus, type TransactionStatusResponse } from "@/lib/topups"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface TopupsCheckoutClientProps {
  transId: string
}

export default function TopupsCheckoutClient({ transId }: TopupsCheckoutClientProps) {
  const { t } = useTranslation("common")
  const { data, error, isLoading } = useSWR<TransactionStatusResponse>(
    transId ? `/api/transaction-status?id=${transId}` : null,
    () => getTransactionStatus(transId),
    {
      refreshInterval: (data) => (data?.status === "PENDING" ? 3000 : 0), // Poll every 3 seconds if pending
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (isLoading) {
      showGlobalLoading(t("checkout.checkingStatus"))
    } else {
      hideGlobalLoading()
    }
  }, [isLoading, t])

  useEffect(() => {
    if (data && data.status !== "PENDING") {
      // Send message to opener window if it exists (for IPN popup)
      if (window.opener) {
        window.opener.postMessage({ type: "paymentComplete", transId }, window.location.origin)
        // Optionally close the popup after a short delay
        setTimeout(() => window.close(), 2000)
      }
    }
  }, [data, transId])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="w-16 h-16 text-green-500 animate-fade-in" />
      case "FAILED":
        return <XCircle className="w-16 h-16 text-destructive animate-fade-in" />
      case "PENDING":
      default:
        return <Loader2 className="w-16 h-16 text-primary animate-spin-slow" />
    }
  }

  const getStatusMessageClass = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "text-green-500"
      case "FAILED":
        return "text-destructive"
      case "PENDING":
      default:
        return "text-primary"
    }
  }

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg text-center">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-serif text-foreground">{t("checkout.transactionStatus")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        {error ? (
          <>
            <XCircle className="w-16 h-16 text-destructive" />
            <p className="text-lg text-destructive">{t("checkout.fetchError")}</p>
          </>
        ) : (
          <>
            {getStatusIcon(data?.status || "PENDING")}
            <p className={`text-xl font-semibold ${getStatusMessageClass(data?.status || "PENDING")}`}>
              {data?.message || t("checkout.checkingStatus")}
            </p>
            {data?.status === "SUCCESS" && data.details && (
              <div className="text-left w-full mt-4 space-y-2 text-foreground">
                <p>
                  <strong>{t("checkout.amount")}:</strong> {data.details.amount.toLocaleString("vi-VN")} VND
                </p>
                <p>
                  <strong>{t("checkout.fatesAdded")}:</strong> {data.details.fatesAdded} {t("topups.fatesUnit")}
                </p>
                <p>
                  <strong>{t("checkout.transactionRef")}:</strong> {data.details.transactionRef}
                </p>
              </div>
            )}
            {data?.status === "FAILED" && (
              <Button onClick={() => (window.location.href = "/topups")} className="mystical-button mt-4">
                {t("checkout.tryAgain")}
              </Button>
            )}
            {data?.status !== "PENDING" && (
              <Button onClick={() => (window.location.href = "/")} className="mystical-button mt-4">
                {t("checkout.backToHome")}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
