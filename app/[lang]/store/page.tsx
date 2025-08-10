import type { Metadata } from "next"
import StorePageClient from "./StorePageClient"
import { generateMultilingualMetadata, generateMultilingualStructuredData } from "@/lib/seo/seo-helpers"

interface StorePageProps {
  params: {
    lang: string
  }
  searchParams?: {
    hide_filter?: string
    hide_featured?: string
    hide_header?: string
    limit?: string
    sort?: string
    discount?: string
    q?: string
    categories?: string
    tags?: string
    attributes?: string
    platform?: string
    min_price?: string
    max_price?: string
  }
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: 'store',
    params
  });
}

export default async function StorePage({ params, searchParams }: StorePageProps) {
  const structuredData = await generateMultilingualStructuredData('store', params);

  // Parse search params with defaults matching StorePageClient props
  const isHideFilter = searchParams?.hide_filter === 'true' || false;
  const isHideFeatured = searchParams?.hide_featured === 'true' || false;
  const isHideHeader = searchParams?.hide_header === 'true' || false;
  const pageSize = searchParams?.limit ? parseInt(searchParams.limit, 10) : 10;
  const sortBy = (searchParams?.sort as any) || 'relevance';
  const defaultHasDiscount = searchParams?.discount === 'true' ? true : 
                           searchParams?.discount === 'false' ? false : 
                           undefined;
  const defaultSearchTerm = searchParams?.q || '';
  const defaultSelectedCategories = searchParams?.categories 
    ? searchParams.categories.split(',').filter(Boolean)
    : [];
  const defaultSelectedLabels = searchParams?.tags 
    ? searchParams.tags.split(',').filter(Boolean)
    : [];
  const defaultSelectedAttributes = searchParams?.attributes 
    ? searchParams.attributes.split(',').filter(Boolean)
    : [];
  const defaultSelectedProvider = searchParams?.platform || '';
  
  // Parse price range from separate from/to params
  const defaultPriceRange: { from?: number; to?: number } = {};
  if (searchParams?.min_price) {
    const fromValue = parseInt(searchParams.min_price, 10);
    if (!isNaN(fromValue)) defaultPriceRange.from = fromValue;
  }
  if (searchParams?.max_price) {
    const toValue = parseInt(searchParams.max_price, 10);
    if (!isNaN(toValue)) defaultPriceRange.to = toValue;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <StorePageClient 
        isHideFilter={isHideFilter}
        isHideFeatured={isHideFeatured}
        isHideHeader={isHideHeader}
        pageSize={pageSize}
        sortBy={sortBy}
        defaultHasDiscount={defaultHasDiscount}
        defaultSearchTerm={defaultSearchTerm}
        defaultSelectedCategories={defaultSelectedCategories}
        defaultSelectedLabels={defaultSelectedLabels}
        defaultSelectedAttributes={defaultSelectedAttributes}
        defaultSelectedProvider={defaultSelectedProvider}
        defaultPriceRange={defaultPriceRange}
      />
    </div>
  )
}
