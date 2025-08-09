/* eslint-disable consistent-return */

// import { getProductSlugMetadata } from '@/seo/getProductMetadata';
import { decodeSlug } from "@/lib/seo/slug/slugGeneration";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  generateMultilingualMetadata,
  generateMultilingualStructuredData,
} from "@/lib/seo/seo-helpers";
import { headers } from "next/headers";
import { getProduct } from "@/lib/products";
import { cache } from "react";
import { URL_PARAMS, decodeAttributes } from "@/lib/constants/url-params";
import ProductPageClient from "./ProductPageClient";

interface StorePageProps {
  params: {
    lang: string;
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Cached version để chỉ gọi API 1 lần cho cùng productId (per-request deduplication)
const getCachedProduct = cache(
  async (productId: string, attributesKey: string) => {
    const attributes = attributesKey ? attributesKey.split(',') : undefined;
    return getProduct(headers(), productId, attributes);
  }
);

// Helper function để convert query params thành attributes array - Simplified
function parseAttributesFromQuery(searchParams: {
  [key: string]: string | string[] | undefined;
}): string[] {
  // Ưu tiên lấy từ attrs parameter (encoded)
  const attrsParam = searchParams[URL_PARAMS.ATTRIBUTES];
  if (attrsParam) {
    const attrsString = Array.isArray(attrsParam) ? attrsParam[0] : attrsParam;
    return decodeAttributes(attrsString);
  }

  // Fallback: parse từ các query params khác (backward compatibility)
  const attributes: string[] = [];
  Object.entries(searchParams).forEach(([key, value]) => {
    if (
      !(URL_PARAMS.RESERVED_PARAMS as readonly string[]).includes(key) &&
      value
    ) {
      const values = Array.isArray(value) ? value : [value];
      values.forEach((val) => {
        if (val) {
          attributes.push(`${key}${URL_PARAMS.ATTR_VALUE_SEPARATOR}${val}`);
        }
      });
    }
  });

  return attributes;
}

export async function generateMetadata({
  params,
  searchParams,
}: StorePageProps): Promise<Metadata> {
  const data = decodeSlug(params.slug);
  const attributes = parseAttributesFromQuery(searchParams);
  const attributesKey = attributes.join(',');
  const product = await getCachedProduct(data.ids[0], attributesKey);
  return generateMultilingualMetadata({
    pageKey: "store",
    params,
  });
}

const Page = async ({ params, searchParams }: StorePageProps) => {
  try {
    const data = decodeSlug(params.slug);
    const attributes = parseAttributesFromQuery(searchParams);
    const attributesKey = attributes.join(',');
    const product = await getCachedProduct(data.ids[0], attributesKey);

    const structuredData = await generateMultilingualStructuredData(
      "store",
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
        <ProductPageClient slug={params.slug} data={product} />
      </>
    );
  } catch {
    notFound();
  }
};

export default Page;
