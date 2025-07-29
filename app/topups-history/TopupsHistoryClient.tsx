"use client";

import { useState } from "react";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Copy, ExternalLink, Sparkles, History, CreditCard } from "lucide-react";
import {
  getTransactionHistory,
  type TransactionHistoryResponse,
} from "@/lib/topups";
import {
  formatDateTime,
  formatCurrency,
  windowUtils,
} from "@/lib/infra/utils";
import { HistoryPageLayout } from "@/components/layouts/HistoryPageLayout";
import { PaginationComponent } from "@/components/ui/PaginationComponent";
import { StatusBadge } from "./StatusBadge";
import { PaymentProviderIcon } from "./PaymentProviderIcon";

const PAGE_SIZE = 10;

export default function TopupsHistoryClient() {
  const { t, i18n } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const {
    data: historyData,
    error,
    isLoading,
  } = useSWR<TransactionHistoryResponse>(
    `/transaction-history?pageSize=${PAGE_SIZE}&pageNumber=${currentPage}`,
    () => getTransactionHistory(PAGE_SIZE, currentPage),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const handleCopyTransactionId = async (transId: string) => {
    const success = await windowUtils.copyToClipboard(transId);
    
    if (success) {
      toast({
        title: t("common.copied", "Đã sao chép"),
        description: t("topups.history.copiedTransId", "Mã giao dịch đã được sao chép"),
        duration: 2000,
      });
    } else {
      toast({
        title: t("common.error", "Lỗi"),
        description: t("common.copyFailed", "Không thể sao chép"),
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleViewDetail = (transId: string) => {
    windowUtils.openTab(
      `/topups-checkout?transId=${transId}&showContinuePayment=true`
    );
  };

  const handleTopupNow = () => {
    windowUtils.openUrl("/topups?openNewWindow=0");
  };

  const totalPages = Math.ceil((historyData?.totalRecords || 0) / PAGE_SIZE);

  return (
    <HistoryPageLayout
      title={t("topups.history.title", "Lịch sử nạp tiền")}
      titleIcon={<History className="w-8 h-8 text-yellow-500" />}
      isLoading={isLoading}
      error={error}
      isEmpty={!historyData?.items?.length}
      emptyIcon={<CreditCard className="w-16 h-16 text-gray-400 mb-4" />}
      emptyTitle={t("topups.history.empty", "Chưa có lịch sử nạp tiền")}
      emptyDescription={t(
        "topups.history.emptyDescription",
        "Bạn chưa thực hiện giao dịch nạp duyên nào. Hãy nạp duyên để sử dụng các dịch vụ của chúng tôi."
      )}
      actionButtonText={t("topups.history.topupNow", "Nạp duyên ngay")}
      onActionClick={handleTopupNow}
      totalRecords={historyData?.totalRecords}
      loadingMessage={t("topups.history.loading", "Đang tải lịch sử giao dịch...")}
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-yellow-500/30">
              <TableHead className="text-yellow-400 font-semibold">
                {t("topups.history.orderId", "Mã GD")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("topups.history.package", "Gói")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("topups.history.amount", "Số tiền")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("topups.history.provider", "Phương thức")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("topups.history.status", "Trạng thái")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("topups.history.createdAt", "Thời gian")}
              </TableHead>
              <TableHead className="text-right text-yellow-400 font-semibold">
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData?.items?.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-yellow-500/20 hover:bg-yellow-500/5 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-200">
                      {transaction.id.substring(0, 8)}...
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyTransactionId(transaction.id)}
                      className="h-6 w-6 p-0 hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400"
                      title={t("common.copy", "Sao chép")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-100">
                      {transaction.packageName}
                    </div>
                    {transaction.finalFates && (
                      <div className="text-sm text-gray-400">
                        {transaction.finalFates} {t("checkout.fates")}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-100">
                      {formatCurrency(transaction.finalTotal, transaction.currency)}
                    </div>
                    {transaction.exchangeRate !== 1 && (
                      <div className="text-sm text-gray-400">
                        {formatCurrency(
                          transaction.finalTotal * transaction.exchangeRate,
                          "VND"
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <PaymentProviderIcon provider={transaction.provider} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
                <TableCell className="text-sm text-gray-200">
                  {formatDateTime(
                    transaction.createdTs || new Date().toISOString(),
                    i18n.language
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => handleViewDetail(transaction.id)}
                    className="gap-1 bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-yellow-500/50 text-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t("topups.history.viewDetail", "Chi tiết")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </HistoryPageLayout>
  );
}
