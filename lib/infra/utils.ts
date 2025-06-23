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

// Type definitions for About page
export interface AboutType {
  title: string
  subtitle: string
  introduction: {
    title: string
    content: string[]
  }
  mission: {
    title: string
    mission: string
    vision: string
  }
  values: {
    title: string
    accuracy: string
    privacy: string
  }
  technology: {
    title: string
    ai: string
    team: string
  }
  partners: {
    title: string
    experts: string
    affiliates: string
  }
  community: {
    title: string
    content: string
  }
}
