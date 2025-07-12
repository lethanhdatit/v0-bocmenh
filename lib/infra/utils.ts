import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import short from "short-uuid";

export function toShortId(regularUUID: string): string {
  return short().fromUUID(regularUUID);
}

export function fromShortId(shortId: string): string {
  return short().toUUID(shortId);
}

export function formatShortNumber(
  num: number | null | undefined,
  minAbbr: number = 10000,
  maxDecimal: number = 2
) {
  if (num == null) return "--";
  if (num < minAbbr) return num.toLocaleString();

  const format = (value: number, suffix: string) => {
    const factor = Math.pow(10, maxDecimal);
    const floored = Math.floor(value * factor) / factor;
    // Loại bỏ .00 nếu là số nguyên
    return (
      (floored % 1 === 0
        ? floored.toFixed(0)
        : floored.toFixed(maxDecimal).replace(/\.?0+$/, "")) + suffix
    );
  };

  if (num >= 1_000_000_000) {
    return format(num / 1_000_000_000, "B");
  }
  if (num >= 1_000_000) {
    return format(num / 1_000_000, "M");
  }
  if (num >= 1_000) {
    return format(num / 1_000, "k");
  }
  return num.toLocaleString();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocaleByCurrency(currency: string) {
  if (currency === "VND") return "vi-VN";
  if (currency === "USD") return "en-US";
  return "en-US";
}

// Utility function to get base URL dynamically
export function getBaseUrl(): string {
  // For client-side
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // For server-side
  if (process.env.FE_PORT) {
    return `http://localhost:${process.env.FE_PORT}`;
  }

  // Fallback for development
  return "http://localhost:3000";
}
