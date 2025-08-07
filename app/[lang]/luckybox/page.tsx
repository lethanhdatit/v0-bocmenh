import { Suspense } from "react"
import { Metadata } from "next"
import LuckyBoxSection from "@/components/sections/LuckyBoxSection"
import { generateMultilingualMetadata } from "@/lib/seo/seo-helpers"
import LuckyBoxPageClient from "./LuckyBoxPageClient"

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'luckybox',
    params,
    customTitle: undefined, // Will use from translation files
    customDescription: undefined,
  });
}

export default function LuckyBoxPage() {
  return <LuckyBoxPageClient />
}
