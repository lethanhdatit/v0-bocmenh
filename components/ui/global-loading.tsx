"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface GlobalLoadingProps {
  isVisible: boolean
  message?: string
}

export function GlobalLoading({ isVisible, message = "Đang khởi tạo lá số..." }: GlobalLoadingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isVisible])

  if (!mounted || !isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col items-center justify-center gap-8 font-serif">
        <div className="relative w-48 h-48">
          <Image
            src="/imgs/zodiac-wheel.png"
            alt="Loading Wheel"
            layout="fill"
            className="animate-spin-slow opacity-30"
            priority
          />
          <Image
            src="/imgs/bagua-wheel.png"
            alt="Loading Wheel"
            layout="fill"
            className="animate-spin-reverse-slow opacity-30"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/logo.png" alt="Bóc Mệnh Logo" width={64} height={64} className="animate-pulse opacity-90" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-secondary animate-pulse">{message}</p>
        </div>
      </div>
    </div>
  )
}
