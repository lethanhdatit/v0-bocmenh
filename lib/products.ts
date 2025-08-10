import { apiClient } from "@/lib/api/apiClient";
import { apiServer, getConfigSSR } from "@/lib/api/apiServer";
import { PaginatedBase } from "@/lib/utils";
import { getSession } from "@/lib/session/session";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type AffiliateProvider = "shopee" | "lazada" | "tiki" | "sendo";
export type AffiliateStatus = "active" | "inactive" | "soldOut" | "seleted";

export interface ProductAttribute {
  name: string;
  value: string[];
  type: string;
}

export interface ProductAttributeWithMatch extends ProductAttribute {
  isMatched: boolean;
}

export interface ProductCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  parentId: string | null;
  children?: ProductCategory[];
}

export interface ProductFilterOptionsResponse {
  attributes?: ProductAttribute[];
  labels?: string[];
  categories?: ProductCategory[];
}

export interface ProductBase {
  id: string;
  autoId: number;
  provider: AffiliateProvider;
  providerUrl: string;
  status: AffiliateStatus;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  stock: number;
  rating: number;
  totalSold: number;
  name: string;
  thumbnailImage: string;
  category: ProductCategory;
  attributes: ProductAttributeWithMatch[];
  labels: string[];
  isFavorite: boolean;
}

export interface ProductBaseResponse extends PaginatedBase<ProductBase> {}

export interface FavoriteItem {
  id: string;
  product: ProductBase;
  favoritedAt: string;
}

export interface FavoritesResponse extends PaginatedBase<FavoriteItem> {}

export interface ProductImages {
  thumbnail: string;
  images: string[];
}

export interface ProductVariantValue {
  valueText: string;
  imageUrl: string;
}

export interface ProductVariant {
  name: string;
  imageUrl: string;
  values: ProductVariantValue[];
}

export interface ProductSellerLabel {
  name: string;
  imageUrl: string;
}

export interface ProductSeller {
  name: string;
  imageUrl: string;
  description: string;
  labels: ProductSellerLabel[];
}

export interface ProductShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  isFree: boolean;
  estimatedDays: number;
  provider: string;
  isDefault: boolean;
}

export interface ProductShippingOptions {
  options: ProductShippingOption[];
  defaultShippingId: string;
  freeShippingAvailable: boolean;
  freeShippingThreshold: number;
  shippingFrom: string;
}

export interface ProductDetail extends Omit<ProductBase, "thumbnailImage"> {
  description: string;
  saleLocation: string;
  promotion: string;
  warranty: string;
  shipping: string;
  images: ProductImages;
  variants: ProductVariant[];
  seller: ProductSeller;
  shippingOptions: ProductShippingOptions;
  categories: ProductCategory[];
}

export interface ProductSearchParams {
  attributes?: string[]; // Format "name:value" (e.g., "Màu sắc:Đỏ")
  labels?: string[];
  keywords?: string;
  categoryIds?: string[];
  categoryCodes?: string[];
  priceFrom?: number;
  priceTo?: number;
  provider?: AffiliateProvider;
  hasDiscount?: boolean;
  sortBy?:
    | "relevance"
    | "price_asc"
    | "price_desc"
    | "rating_asc"
    | "rating_desc";
  pageSize?: number; // 1-100, default: 20
  pageNumber?: number; // default: 1
}

export async function getFilterOptions(): Promise<ProductFilterOptionsResponse> {
  const response = await apiClient.get<{ data: ProductFilterOptionsResponse }>(
    `/products/filter-options`
  );
  return response.data.data;
}

export async function getProducts(
  params: ProductSearchParams = {}
): Promise<ProductBaseResponse> {
  const {
    attributes = [],
    labels = [],
    keywords,
    categoryIds = [],
    categoryCodes = [],
    priceFrom,
    priceTo,
    provider,
    hasDiscount,
    sortBy = "relevance",
    pageSize = 20,
    pageNumber = 1,
  } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add attributes (can be multiple)
  attributes.forEach((attr) => {
    queryParams.append("attributes", attr);
  });

  // Add labels (can be multiple)
  labels.forEach((label) => {
    queryParams.append("labels", label);
  });

  // Add categoryIds (can be multiple)
  categoryIds.forEach((categoryId) => {
    queryParams.append("categoryIds", categoryId);
  });

  categoryCodes.forEach((categoryCode) => {
    queryParams.append("categoryCodes", categoryCode);
  });

  // Add single value parameters
  if (keywords) queryParams.set("keywords", keywords);
  if (priceFrom !== undefined)
    queryParams.set("priceFrom", priceFrom.toString());
  if (priceTo !== undefined) queryParams.set("priceTo", priceTo.toString());
  if (provider) queryParams.set("provider", provider);
  if (hasDiscount !== undefined)
    queryParams.set("hasDiscount", hasDiscount.toString());
  queryParams.set("sortBy", sortBy);
  queryParams.set("pageSize", pageSize.toString());
  queryParams.set("pageNumber", pageNumber.toString());

  const response = await apiClient.get<{ data: ProductBaseResponse }>(
    `/products?${queryParams.toString()}`
  );
  return response.data.data;
}

export async function getProduct(
  headers: ReadonlyHeaders,
  productId: string,
  attributes?: string[]
): Promise<ProductDetail> {
  // Build query parameters for attribute filtering
  const queryParams = new URLSearchParams();

  if (attributes && attributes.length > 0) {
    attributes.forEach((attr) => {
      queryParams.append("attributes", attr);
    });
  }

  const queryString = queryParams.toString();
  const url = queryString
    ? `/affiliate/products/${productId}?${queryString}`
    : `/affiliate/products/${productId}`;

  const session = await getSession();
  const config = await getConfigSSR(headers, session.accessToken);
  const response = await apiServer.get<{ data: ProductDetail }>(url, config);
  return response.data.data;
}

export async function addToFavorites(productId: string): Promise<boolean> {
  const response = await apiClient.post<{ data: boolean }>(
    `/products/favorites`,
    { productId }
  );
  return response.data.data;
}

export async function removeFromFavorites(productId: string): Promise<boolean> {
  const response = await apiClient.delete<{ data: boolean }>(
    `/products/favorites/${productId}`
  );
  return response.data.data;
}

export async function getMyFavorites(
  pageSize: number = 20,
  pageNumber: number = 1
): Promise<FavoritesResponse> {
  const queryParams = new URLSearchParams();
  queryParams.set("pageSize", pageSize.toString());
  queryParams.set("pageNumber", pageNumber.toString());

  const response = await apiClient.get<{ data: FavoritesResponse }>(
    `/products/favorites?${queryParams.toString()}`
  );
  return response.data.data;
}
