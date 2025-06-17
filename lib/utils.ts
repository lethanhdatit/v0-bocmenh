import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get base URL dynamically
export function getBaseUrl(): string {
  // For client-side
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  // For server-side
  if (process.env.FE_PORT) {
    return `http://localhost:${process.env.FE_PORT}`
  }

  // Fallback for development
  return "http://localhost:3000"
}

// Utility function for API calls that need base URL
export function getApiUrl(path: string): string {
  const baseUrl = getBaseUrl()
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
}
