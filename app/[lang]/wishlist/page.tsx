import type { Metadata } from "next";
import {
  generateMultilingualMetadata,
  generateMultilingualStructuredData,
} from "@/lib/seo/seo-helpers";
import WishlistClient from "./WishlistClient";

interface WishlistPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({
  params,
}: WishlistPageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: "wishlist",
    params,
  });
}

export default async function WishlistPage({ params }: WishlistPageProps) {
  const structuredData = await generateMultilingualStructuredData(
    "wishlist",
    params
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen max-w-7xl mx-auto">
        <WishlistClient />
      </div>
    </>
  );
}
