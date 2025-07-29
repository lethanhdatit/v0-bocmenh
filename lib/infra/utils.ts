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
  if (num < minAbbr) return num.toString();

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
  return num.toString();
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

// === DATETIME UTILITIES ===

/**
 * Get datetime locale mapping for i18n languages
 */
export function getDateTimeLocale(language?: string): string {
  const localeMap: Record<string, string> = {
    vi: "vi-VN",
    en: "en-US",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR",
    th: "th-TH",
    id: "id-ID",
  };

  return localeMap[language || "en"] || navigator?.language || "en-US";
}

/**
 * Format UTC datetime string to user's locale and timezone
 */
export function formatDateTime(utcString: string, language?: string): string {
  try {
    const date = new Date(utcString);
    const locale = getDateTimeLocale(language);

    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date);
  } catch {
    return utcString;
  }
}

/**
 * Format currency with proper locale
 */
export function formatCurrency(amount: number, currency: string): string {
  const locale = getLocaleByCurrency(currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// === WINDOW UTILITIES ===

/**
 * Check if current window is a popup/mini window
 */
export function isMiniWindow(): boolean {
  try {
    return (
      typeof window !== "undefined" &&
      window.opener &&
      window.opener !== window
    );
  } catch {
    return false;
  }
}

/**
 * Safe window operations with error handling
 */
export const windowUtils = {
  /**
   * Open URL in new window/tab
   */
  openUrl: (url: string, newWindow = true, windowFeatures?: string) => {
    try {
      if (newWindow) {
        const defaultFeatures =
          windowFeatures ||
          `width=${Math.round(window.innerWidth * 0.8)},height=${Math.round(
            window.innerHeight * 0.8
          )},location=no,menubar=no,toolbar=no,status=no,resizable=yes,scrollbars=yes`;

        const popup = window.open(url, "_blank", defaultFeatures);
        if (!popup) {
          // Fallback if popup blocked
          window.location.href = url;
        }
        return popup;
      } else {
        window.location.href = url;
        return null;
      }
    } catch (error) {
      console.warn("Failed to open URL:", error);
      return null;
    }
  },

  /**
   * Open URL in new tab (same window)
   */
  openTab: (url: string) => {
    try {
      const tab = window.open(url, "_blank");
      if (!tab) {
        // Fallback if popup blocked
        window.location.href = url;
      }
      return tab;
    } catch (error) {
      console.warn("Failed to open tab:", error);
      window.location.href = url;
      return null;
    }
  },

  /**
   * Copy text to clipboard with modern API and fallback
   */
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // @ts-ignore - execCommand is deprecated but needed for fallback support
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (error) {
      console.warn("Failed to copy to clipboard:", error);
      return false;
    }
  },

  /**
   * Send message to parent window (for mini windows)
   */
  sendMessageToParent: (message: any, targetOrigin?: string) => {
    try {
      if (isMiniWindow()) {
        window.opener.postMessage(
          message,
          targetOrigin || window.location.origin
        );
        return true;
      }
      return false;
    } catch (error) {
      console.warn("Failed to send message to parent:", error);
      return false;
    }
  },

  /**
   * Close current window (for mini windows)
   */
  closeWindow: () => {
    try {
      window.close();
      return true;
    } catch (error) {
      console.warn("Failed to close window:", error);
      return false;
    }
  },
};
