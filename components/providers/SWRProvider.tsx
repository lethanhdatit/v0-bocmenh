"use client"

import type React from "react"

import { SWRConfig } from "swr"
import { fetcher } from "@/lib/api"

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  )
}
