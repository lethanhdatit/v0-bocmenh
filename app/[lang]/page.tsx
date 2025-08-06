import type { Metadata } from "next"
import ClientPage from "./ClientPage"
import { generateMultilingualMetadata } from "@/lib/seo/seo-helpers";

interface HomePageProps {
  params: { lang: string };
}

// Generate metadata dynamically based on language
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'home',
    params,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  return <ClientPage />;
}
