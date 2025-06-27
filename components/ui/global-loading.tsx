"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface GlobalLoadingProps {
  isVisible: boolean
  message?: string
}

export function GlobalLoading({ isVisible, message = "Đang phân tích vận mệnh..." }: GlobalLoadingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-32 h-32 border-2 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin-slow" />

        {/* Inner rotating ring (reverse direction) */}
        <div className="absolute w-24 h-24 border-2 border-transparent border-b-amber-400 border-l-amber-400 rounded-full animate-spin-reverse" />

        {/* Logo container */}
        <div className="relative w-16 h-16 animate-pulse-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-md opacity-50 animate-ping" />
          <div className="relative w-full h-full bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full p-2 shadow-2xl">
            <Image
              src="/logo.png"
              alt="Bóc Mệnh Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain animate-spin-slow opacity-90"
              priority
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-center">
          <p className="text-yellow-300 text-lg font-medium mb-2 animate-pulse">{message}</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

        {/* Mystical glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-transparent to-transparent animate-pulse" />
      </div>
    </div>
  )
}
