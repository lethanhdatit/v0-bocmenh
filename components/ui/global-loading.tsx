"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface GlobalLoadingProps {
  isVisible: boolean
  className?: string
}

export function GlobalLoading({ isVisible, className }: GlobalLoadingProps) {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/70 backdrop-blur-sm",
        "transition-all duration-300",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-32 h-32 border-2 border-transparent border-t-yellow-400/60 border-r-yellow-400/40 rounded-full animate-spin" />

        {/* Inner rotating ring (counter-clockwise) */}
        <div className="absolute w-24 h-24 border-2 border-transparent border-b-yellow-500/80 border-l-yellow-500/50 rounded-full animate-spin-reverse" />

        {/* Logo container with fade animation */}
        <div className="relative w-16 h-16 animate-pulse-slow">
          <div className="absolute inset-0 animate-spin-slow">
            <Image
              src="/logo.png"
              alt="Bóc Mệnh Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain opacity-80 drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="absolute bottom-1/3 text-center">
        <p className="text-yellow-400 text-lg font-medium animate-pulse">Đang phân tích vận mệnh...</p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  )
}
