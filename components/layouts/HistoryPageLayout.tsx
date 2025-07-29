"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HistoryNavigation } from "./HistoryNavigation";

interface HistoryPageLayoutProps {
  title: string;
  titleIcon: ReactNode;
  isLoading: boolean;
  error: any;
  isEmpty: boolean;
  emptyIcon: ReactNode;
  emptyTitle: string;
  emptyDescription: string;
  actionButtonText?: string;
  onActionClick?: () => void;
  totalRecords?: number;
  children: ReactNode;
  loadingMessage?: string;
  showNavigation?: boolean;
}

export function HistoryPageLayout({
  title,
  titleIcon,
  isLoading,
  error,
  isEmpty,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  actionButtonText,
  onActionClick,
  totalRecords,
  children,
  loadingMessage,
  showNavigation = true,
}: HistoryPageLayoutProps) {
  const { t } = useTranslation("common");

  // Use translation for default loading message if not provided
  const defaultLoadingMessage = loadingMessage || t("common.loading.loadingData", "Đang tải dữ liệu...");

  if (error) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 text-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <Card className="max-w-md mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm text-center">
            <CardContent className="pt-6">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-300 mb-2">
                {t("common.error.loadFailed", "Không thể tải dữ liệu")}
              </h3>
              <p className="text-gray-300 mb-4">
                {t("common.error.tryAgainLater", "Vui lòng thử lại sau")}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold border-0"
              >
                {t("common.tryAgain", "Thử lại")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <Card className="w-full mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent flex items-center gap-2">
              {titleIcon}
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {showNavigation && <HistoryNavigation />}
            {isLoading ? (
              <section className="p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg flex flex-col items-center justify-center min-h-[260px] relative">
                <div className="absolute top-4 right-4 animate-pulse">
                  {titleIcon}
                </div>
                <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-yellow-400 mb-4" />
                <div className="text-yellow-300 text-lg font-bold mb-2">
                  {defaultLoadingMessage}
                </div>
                <div className="text-yellow-100 text-base text-center mb-2 animate-pulse">
                  {t("common.retrievingData", "Đang truy xuất dữ liệu từ hệ thống...")}
                </div>
                <div className="flex gap-1 mt-4">
                  <span
                    className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-2 h-2 bg-yellow-200 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </section>
            ) : isEmpty ? (
              <section className="p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg flex flex-col items-center justify-center min-h-[260px]">
                {emptyIcon}
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {emptyTitle}
                </h3>
                <p className="text-gray-300 mb-6 text-center max-w-md">
                  {emptyDescription}
                </p>
                {actionButtonText && onActionClick && (
                  <Button
                    onClick={onActionClick}
                    className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold border-0 shadow-lg"
                  >
                    {actionButtonText}
                  </Button>
                )}
              </section>
            ) : (
              <section className="p-2 xs:p-4 md:p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {totalRecords !== undefined && (
                    <p className="text-sm text-gray-300">
                      {t("common.totalRecords", "Tổng cộng {{count}} bản ghi", {
                        count: totalRecords,
                      })}
                    </p>
                  )}
                  {actionButtonText && onActionClick && (
                    <Button
                      onClick={onActionClick}
                      size="sm"
                      className="gap-2 bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-yellow-500/50 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      {actionButtonText}
                    </Button>
                  )}
                </div>
                {children}
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
