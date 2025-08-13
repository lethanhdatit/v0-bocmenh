import { AffiliateProvider } from "@/lib/products";

/**
 * Get all available affiliate providers
 */
export const getAvailableProviders = (): AffiliateProvider[] => {
  return ["shopee", "lazada", "tiki", "sendo"];
};

/**
 * Get display name for a provider
 */
export const getProviderDisplayName = (provider: AffiliateProvider): string => {
  switch (provider) {
    case "shopee":
      return "Shopee";
    case "lazada":
      return "Lazada";
    case "tiki":
      return "Tiki";
    case "sendo":
      return "Sendo";
  }
};

/**
 * Get Tailwind CSS classes for provider badge
 */


/**
 * Get provider brand colors for theming
 */
export const getProviderColors = (provider: AffiliateProvider) => {
  switch (provider.toLowerCase()) {
    case "shopee":
      return {
        primary: "#EE4D2D",
        secondary: "#FF6B35",
        background: "bg-orange-600/90",
        border: "border-orange-500",
        text: "text-white",
      };
    case "lazada":
      return {
        primary: "#0F146D",
        secondary: "#1B4ED8",
        background: "bg-blue-600/90",
        border: "border-blue-500",
        text: "text-white",
      };
    case "tiki":
      return {
        primary: "#0D7EBD",
        secondary: "#0EA5E9",
        background: "bg-indigo-600/90",
        border: "border-indigo-500",
        text: "text-white",
      };
    case "sendo":
      return {
        primary: "#DC2626",
        secondary: "#EF4444",
        background: "bg-red-600/90",
        border: "border-red-500",
        text: "text-white",
      };
    default:
      return {
        primary: "#6B7280",
        secondary: "#9CA3AF",
        background: "bg-gray-600/90",
        border: "border-gray-500",
        text: "text-white",
      };
  }
};
