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

// Type definitions for Contact page
export interface ContactType {
  title: string
  subtitle: string
  channels: {
    title: string
    facebook: string
    youtube: string
    zalo: string
    email: string
  }
  users: {
    title: string
    subtitle: string
    support: {
      title: string
      description: string
      hours: string
      response: string
    }
    feedback: {
      title: string
      description: string
      types: string[]
    }
    community: {
      title: string
      description: string
      benefits: string[]
    }
  }
  partners: {
    title: string
    subtitle: string
    advertising: {
      title: string
      description: string
      formats: string[]
      contact: string
    }
    affiliate: {
      title: string
      description: string
      requirements: string[]
      benefits: string[]
      contact: string
    }
    collaboration: {
      title: string
      description: string
      opportunities: string[]
      contact: string
    }
  }
  office: {
    title: string
    address: string
    hours: string
    note: string
  }
}
