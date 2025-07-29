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
import { FileText, Copy, ExternalLink, Sparkles } from "lucide-react";
import {
  getServicesHistory,
  type ServicesHistoryResponse,
  type ServiceHistoryItem,
} from "@/lib/topups";
import {
  formatDateTime,
  windowUtils,
} from "@/lib/infra/utils";
import { HistoryPageLayout } from "@/components/layouts/HistoryPageLayout";
import { PaginationComponent } from "@/components/ui/PaginationComponent";
import { ServiceStatusBadge } from "./ServiceStatusBadge";

const PAGE_SIZE = 10;

export default function ServicesHistoryClient() {
  const { t, i18n } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const {
    data: historyData,
    error,
    isLoading,
  } = useSWR<ServicesHistoryResponse>(
    `/services-history?pageSize=${PAGE_SIZE}&pageNumber=${currentPage}`,
    () => getServicesHistory(PAGE_SIZE, currentPage),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const handleCopyServiceId = async (serviceId: string) => {
    const success = await windowUtils.copyToClipboard(serviceId);
    
    if (success) {
      toast({
        title: t("common.copied", "Đã sao chép"),
        description: t("services.history.copiedServiceId", "Mã dịch vụ đã được sao chép"),
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

  const getServiceName = (kind: string): string => {
    const serviceNames = {
      basic: t("services.kinds.basic", "Tra cứu cơ bản"),
      tuTruBatTu: t("services.kinds.tuTruBatTu", "Tử trụ bát tự"),
    };
    return serviceNames[kind as keyof typeof serviceNames] || kind;
  };

  const getServiceDetailUrl = (service: ServiceHistoryItem): string => {
    // Build URL based on service kind
    const urlMap = {
      tuTruBatTu: `/destiny?id=${service.id}`,
    };
    return urlMap[service.kind as keyof typeof urlMap] || `/services/${service.id}`;
  };

  const handleViewDetail = (service: ServiceHistoryItem) => {
    const url = getServiceDetailUrl(service);
    windowUtils.openTab(url);
  };

  const handleUseServiceNow = () => {
    windowUtils.openTab("/destiny");
  };

  const totalPages = Math.ceil((historyData?.totalRecords || 0) / PAGE_SIZE);

  return (
    <HistoryPageLayout
      title={t("services.history.title", "Lịch sử dịch vụ")}
      titleIcon={<FileText className="w-8 h-8 text-yellow-500" />}
      isLoading={isLoading}
      error={error}
      isEmpty={!historyData?.items?.length}
      emptyIcon={<Sparkles className="w-16 h-16 text-gray-400 mb-4" />}
      emptyTitle={t("services.history.empty", "Chưa có lịch sử dịch vụ")}
      emptyDescription={t(
        "services.history.emptyDescription",
        "Bạn chưa sử dụng dịch vụ nào. Hãy khám phá các dịch vụ của chúng tôi."
      )}
    //   actionButtonText={t("services.history.useServiceNow", "Sử dụng dịch vụ")}
    //   onActionClick={handleUseServiceNow}
      totalRecords={historyData?.totalRecords}
      loadingMessage={t("services.history.loading", "Đang tải lịch sử dịch vụ...")}
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-yellow-500/30">
              <TableHead className="text-yellow-400 font-semibold">
                {t("services.history.serviceId", "Mã DV")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("services.history.serviceName", "Dịch vụ")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("services.history.cost", "Chi phí")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("services.history.status", "Trạng thái")}
              </TableHead>
              <TableHead className="text-yellow-400 font-semibold">
                {t("services.history.createdAt", "Thời gian")}
              </TableHead>
              <TableHead className="text-right text-yellow-400 font-semibold">
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData?.items?.map((service) => (
              <TableRow
                key={service.id}
                className="border-yellow-500/20 hover:bg-yellow-500/5 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-200">
                      {service.id.substring(0, 8)}...
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopyServiceId(service.id)}
                      className="h-6 w-6 p-0 hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400"
                      title={t("common.copy", "Sao chép")}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-100">
                    {getServiceName(service.kind)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-100">
                      {service.servicePrice.finalFates} {t("checkout.fates")}
                    </div>
                    {service.servicePrice.fatesDiscount && service.servicePrice.fatesDiscount > 0 && (
                      <div className="text-sm text-gray-400 line-through">
                        {service.servicePrice.fates} {t("checkout.fates")}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <ServiceStatusBadge status={service.status} />
                </TableCell>
                <TableCell className="text-sm text-gray-200">
                  {formatDateTime(
                    service.createdTs || new Date().toISOString(),
                    i18n.language
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => handleViewDetail(service)}
                    className="gap-1 bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-yellow-500/50 text-xs"
                    disabled={service.status !== "analyzed"}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {service.status === "analyzed" 
                      ? t("services.history.viewResult", "Xem kết quả")
                      : t("services.history.viewDetail", "Chi tiết")
                    }
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
