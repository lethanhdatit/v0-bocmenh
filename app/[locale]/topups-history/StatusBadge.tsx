"use client";

import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StatusBadgeProps {
  status: "paid" | "cancelled" | "partiallyPaid" | "processing" | "new";
  translationKey?: string;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({
  status,
  translationKey = "checkout.paymentStatus", 
  size = "sm",
}: StatusBadgeProps) {
  const { t } = useTranslation("common");

  const getStatusIcon = () => {
    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };
    const iconClass = iconSizes[size];

    switch (status) {
      case "paid":
        return <CheckCircle className={`${iconClass} text-emerald-400`} />;
      case "cancelled":
        return <XCircle className={`${iconClass} text-red-400`} />;
      case "partiallyPaid":
        return <AlertCircle className={`${iconClass} text-amber-400`} />;
      case "processing":
      case "new":
      default:
        return <Clock className={`${iconClass} text-blue-400`} />;
    }
  };

  const getStatusBadgeClass = () => {
    const baseClass =
      size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

    switch (status) {
      case "paid":
        return `${baseClass} bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30`;
      case "cancelled":
        return `${baseClass} bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30`;
      case "partiallyPaid":
        return `${baseClass} bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30`;
      case "processing":
      case "new":
      default:
        return `${baseClass} bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30`;
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border font-medium ${getStatusBadgeClass()}`}
    >
      {getStatusIcon()}
      {t(`${translationKey}.${status}`)}
    </div>
  );
}