"use client";

import { useTranslation } from "react-i18next";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  showPageInfo?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showPageInfo = true,
  size = "sm",
}: PaginationComponentProps) {
  const { t } = useTranslation("common");

  if (totalPages <= 1) return null;

  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxVisiblePages / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const buttonClass = sizeClasses[size];

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <button
          onClick={() => {
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          disabled={currentPage <= 1}
          className={`${buttonClass} rounded border transition-colors ${
            currentPage <= 1
              ? "bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed"
              : "bg-gray-800 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
          }`}
        >
          ‹
        </button>

        {/* First page + ellipsis */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`${buttonClass} rounded border bg-gray-800 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10 transition-colors`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-1 text-xs text-gray-500">...</span>
            )}
          </>
        )}

        {/* Page numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${buttonClass} rounded border transition-colors ${
                currentPage === page
                  ? "bg-yellow-600 text-black border-yellow-500 font-semibold"
                  : "bg-gray-800 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Last page + ellipsis */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-xs text-gray-500">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`${buttonClass} rounded border bg-gray-800 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10 transition-colors`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => {
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
          disabled={currentPage >= totalPages}
          className={`${buttonClass} rounded border transition-colors ${
            currentPage >= totalPages
              ? "bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed"
              : "bg-gray-800 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10"
          }`}
        >
          ›
        </button>
      </div>

      {/* Page info */}
      {showPageInfo && (
        <div className="ml-4 text-xs text-gray-400">
          {t("common.pagination.pageInfo", "Trang {{current}} / {{total}}", {
            current: currentPage,
            total: totalPages,
          })}
        </div>
      )}
    </div>
  );
}