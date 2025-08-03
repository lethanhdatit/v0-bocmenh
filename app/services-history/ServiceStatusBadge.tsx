"use client";

import { CheckCircle, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServiceStatusBadgeProps {
  status: "created" | "analyzing" | "analyzed" | "failed";
  translationKey?: string;
  size?: "sm" | "md" | "lg";
}

export function ServiceStatusBadge({
  status,
  translationKey = "services.status", 
  size = "sm",
}: ServiceStatusBadgeProps) {
  const { t } = useTranslation("common");

  const getStatusIcon = () => {
    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    };
    const iconClass = iconSizes[size];

    switch (status) {
      case "analyzed":
        return <CheckCircle className={`${iconClass} text-emerald-400`} />;
      case "failed":
        return <XCircle className={`${iconClass} text-red-400`} />;
      case "analyzing":
        return <Loader2 className={`${iconClass} text-blue-400 animate-spin`} />;
      case "created":
      default:
        return <Clock className={`${iconClass} text-amber-400`} />;
    }
  };

  const getStatusBadgeClass = () => {
    const baseClass =
      size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

    switch (status) {
      case "analyzed":
        return `${baseClass} bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30`;
      case "failed":
        return `${baseClass} bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30`;
      case "analyzing":
        return `${baseClass} bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30`;
      case "created":
      default:
        return `${baseClass} bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30`;
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
