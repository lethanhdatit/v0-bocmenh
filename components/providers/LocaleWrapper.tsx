'use client'

import { useEffect } from 'react'

interface LocaleWrapperProps {
  locale: string
  children: React.ReactNode
}

export default function LocaleWrapper({ locale, children }: LocaleWrapperProps) {
  useEffect(() => {
    // Set html lang attribute dynamically
    document.documentElement.lang = locale
    
    // Set dir attribute for RTL languages if needed
    const direction = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'
    document.documentElement.dir = direction
  }, [locale])

  return <>{children}</>
}
