'use client';

import React from "react";
import { useTranslation } from "react-i18next";

type FatesUnitProps = {
  type?: "text" | "icon" | "both";
  text?: string;
  iconSrc?: string;
  size?: "xs" | "sm" | "md" | "lg";
  width?: number | string;
  height?: number | string;
  className?: string;
  isAura?: boolean;
};

const sizeMap = {
  xs: { w: 16, h: 16, text: "text-[10px]" },
  sm: { w: 20, h: 20, text: "text-xs" },
  md: { w: 24, h: 24, text: "text-sm" },
  lg: { w: 32, h: 32, text: "text-base" },
};

export const FatesUnit: React.FC<FatesUnitProps> = ({
  type = "icon",
  text = "duyên",
  iconSrc = "/unit.svg",
  size = "sm",
  width,
  height,
  className = "",
  isAura = true
}) => {
  const s = sizeMap[size] || sizeMap.sm;
  const w = width ?? s.w;
  const h = height ?? s.h;

  const { t } = useTranslation("common");

  return (
    <span className={`inline-flex items-center gap-1 ${s.text} ${className}`}>
      {(type === "text" || type === "both") && (
        <span className="text-gray-500">{text}</span>
      )}
      {(type === "icon" || type === "both") && (
        <img
          title={t("checkout.fates")}
          src={iconSrc}
          alt={text}
          width={w}
          height={h}
          style={{ width: w, height: h, display: "inline-block" }}
          className={`object-contain ${isAura ? "fate-glow" : ""}`}
        />
      )}
    </span>
  );
};