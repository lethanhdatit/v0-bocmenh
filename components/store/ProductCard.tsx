"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductBase } from "@/lib/products";
import { addToFavorites, removeFromFavorites } from "@/lib/products";
import type { AffiliateProvider } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  ExternalLink,
  Package,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { encodeSlug, SlugTypes } from "@/lib/seo/slug/slugGeneration";
import { URL_PARAMS, buildSEOFriendlyPath } from "@/lib/constants/url-params";

interface ProductCardProps {
  product: ProductBase;
  className?: string;
  compact?: boolean;
  onUnfavorited?: (productId: string) => void;
  attributes?: string[];
}

export default function ProductCard({
  product,
  className,
  compact = false,
  onUnfavorited,
  attributes,
}: ProductCardProps) {
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [imageError, setImageError] = useState(false);

  const { t } = useTranslation();

  // Fetch product data
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getProviderBadgeColor = (provider: AffiliateProvider) => {
    switch (provider.toLowerCase()) {
      case "shopee":
        return "bg-orange-600/90 text-white border-orange-500 shadow-lg backdrop-blur-sm";
      case "lazada":
        return "bg-blue-600/90 text-white border-blue-500 shadow-lg backdrop-blur-sm";
      case "tiki":
        return "bg-indigo-600/90 text-white border-indigo-500 shadow-lg backdrop-blur-sm";
      case "sendo":
        return "bg-red-600/90 text-white border-red-500 shadow-lg backdrop-blur-sm";
      default:
        return "bg-gray-600/90 text-white border-gray-500 shadow-lg backdrop-blur-sm";
    }
  };

  const handleWishlistToggle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlistLoading) return;

    setIsWishlistLoading(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(product.id);
        setIsFavorite(false);
        // Call the callback to notify parent component (like WishlistClient)
        onUnfavorited?.(product.id);
      } else {
        await addToFavorites(product.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(
        t("store.errors.failedToToggleWishlist", "Failed to toggle wishlist:"),
        error
      );
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const discountPercentage =
    product.discountPercentage > 0 ? Math.round(product.discountPercentage) : 0;

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) {
      return "/placeholder.svg";
    }
    return product.thumbnailImage || "/placeholder.svg";
  };

  const buildSlugLink = () => {
    const basePath = `/store/${encodeSlug(product.name, {
      type: SlugTypes.AFFILIATE,
      ids: [product.autoId.toString() || product.id],
    })}`;

    // Sử dụng helper function để build SEO-friendly URL
    return buildSEOFriendlyPath(basePath, attributes);
  };

  const SlugLink = buildSlugLink();

  return (
    <div
      className={cn(
        "bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 flex flex-col group",
        // Responsive scale and hover effects
        "hover:scale-[1.01] sm:hover:scale-[1.02] lg:hover:scale-[1.03]",
        // Mobile-first width and min-height
        "w-full min-h-[320px] xs:min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]",
        className
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "relative w-full",
          // More responsive image heights
          compact
            ? "h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48"
            : "h-40 xs:h-44 sm:h-48 md:h-56 lg:h-64 xl:h-72"
        )}
      >
        <Image
          src={getImageSrc()}
          alt={product.name}
          fill
          sizes="(max-width: 380px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />

        {/* Labels and Discount Badge */}
        <div className="absolute top-1 left-1 xs:top-2 xs:left-2 flex flex-wrap gap-0.5 xs:gap-1 max-w-[calc(100%-3rem)] xs:max-w-[calc(100%-4rem)]">
          {discountPercentage > 0 && (
            <Badge className="bg-red-600/95 text-white text-[10px] xs:text-xs font-semibold shadow-lg backdrop-blur-sm border border-red-500 px-1 xs:px-2">
              -{discountPercentage}%
            </Badge>
          )}
          {product.labels &&
            product.labels.slice(0, 2).map((label, index) => (
              <Badge
                key={index}
                className="bg-yellow-600/95 text-white border-yellow-500 text-[10px] xs:text-xs font-medium shadow-lg backdrop-blur-sm px-1 xs:px-2"
              >
                {label}
              </Badge>
            ))}
        </div>

        {/* Provider Badge */}
        <Badge
          className={cn(
            "absolute bottom-1 left-1 xs:bottom-2 xs:left-2 text-[10px] xs:text-xs font-semibold px-1 xs:px-2",
            getProviderBadgeColor(product.provider)
          )}
        >
          {product.provider.toUpperCase()}
        </Badge>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 xs:top-2 xs:right-2 w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-black/30 hover:bg-black/60 text-white rounded-full"
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          aria-label={
            isFavorite
              ? t("store.removeFromWishlist", "Xóa khỏi yêu thích")
              : t("store.addToWishlist", "Thêm vào yêu thích")
          }
        >
          <Heart
            className={cn(
              "w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-white",
              isWishlistLoading && "animate-pulse"
            )}
          />
        </Button>
      </div>

      {/* Product Info */}
      <div
        className={cn(
          "flex flex-col flex-grow",
          compact ? "p-2 xs:p-2.5 sm:p-3" : "p-2.5 xs:p-3 sm:p-4 lg:p-5"
        )}
      >
        {/* Product Name */}
        <h3
          className={cn(
            "font-semibold text-yellow-400 hover:text-yellow-200 transition-colors line-clamp-2 leading-tight",
            compact
              ? "text-sm xs:text-base mb-1 xs:mb-1.5"
              : "text-sm xs:text-base sm:text-lg lg:text-xl mb-1.5 xs:mb-2 sm:mb-3"
          )}
          title={product.name}
        >
          <Link href={SlugLink} target="_blank">
            {product.name}
          </Link>
        </h3>

        {/* Rating and Sales */}
        <div
          className={cn(
            "flex items-center justify-between flex-wrap gap-1",
            compact ? "mb-1.5 xs:mb-2" : "mb-2 xs:mb-2.5 sm:mb-3"
          )}
        >
          {product.rating > 0 && (
            <div className="flex items-center min-w-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "flex-shrink-0",
                    compact
                      ? "w-3 h-3 xs:w-3.5 xs:h-3.5"
                      : "w-3 h-3 xs:w-4 xs:h-4",
                    i < Math.round(product.rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-600"
                  )}
                />
              ))}
              <span className="ml-1 xs:ml-2 text-[10px] xs:text-xs text-gray-400 flex-shrink-0">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          )}

          {product.totalSold > 0 && (
            <div className="flex items-center text-[10px] xs:text-xs text-gray-400 flex-shrink-0">
              <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-0.5 xs:mr-1 flex-shrink-0" />
              <span className="truncate">
                {product.totalSold} {t("store.sold", "đã bán")}
              </span>
            </div>
          )}
        </div>

        {/* Attributes Preview */}
        {product.attributes && product.attributes.length > 0 && (
          <div
            className={compact ? "mb-1.5 xs:mb-2" : "mb-2 xs:mb-2.5 sm:mb-3"}
          >
            <div className="flex flex-wrap gap-0.5 xs:gap-1">
              {product.attributes
                .slice(0, compact ? 1 : 2)
                .map((attr, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={cn(
                      "text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 py-0.5 leading-tight max-w-full",
                      attr.isMatched
                        ? "border-green-500/50 text-green-300 bg-green-500/10"
                        : "border-gray-600 text-gray-400"
                    )}
                  >
                    <span className="truncate">
                      {attr.name}: {attr.value.join(", ")}
                    </span>
                  </Badge>
                ))}
              {product.attributes.length > (compact ? 1 : 2) && (
                <Badge
                  variant="outline"
                  className="text-[9px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 py-0.5 border-gray-600 text-gray-400"
                >
                  +{product.attributes.length - (compact ? 1 : 2)}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div
          className={cn(
            "flex items-center",
            compact ? "mb-1.5 xs:mb-2" : "mb-2 xs:mb-2.5 sm:mb-3"
          )}
        >
          <Package
            className={cn(
              "flex-shrink-0 mr-1 xs:mr-2",
              compact ? "w-3 h-3 xs:w-3.5 xs:h-3.5" : "w-3 h-3 xs:w-4 xs:h-4",
              product.stock > 0 ? "text-green-500" : "text-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs xs:text-sm font-medium truncate",
              product.stock > 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {product.stock > 0
              ? t("store.inStock", "Còn hàng")
              : t("store.outOfStock", "Hết hàng")}
          </span>
        </div>

        {/* Pricing */}
        <div className="mt-auto">
          <div
            className={cn(
              "flex items-center justify-between",
              compact ? "mb-1.5 xs:mb-2" : "mb-2 xs:mb-2.5 sm:mb-3"
            )}
          >
            <div className="min-w-0 flex-1">
              {product.discountPrice > 0 &&
              product.discountPrice < product.price ? (
                <div>
                  <p
                    className={cn(
                      "font-bold text-yellow-400 leading-tight",
                      compact
                        ? "text-sm xs:text-base sm:text-lg"
                        : "text-base xs:text-lg sm:text-xl lg:text-2xl"
                    )}
                  >
                    {formatPrice(product.discountPrice)}
                  </p>
                  <p className="text-xs xs:text-sm text-gray-500 line-through leading-tight">
                    {formatPrice(product.price)}
                  </p>
                </div>
              ) : (
                <p
                  className={cn(
                    "font-bold text-yellow-400 leading-tight",
                    compact
                      ? "text-sm xs:text-base sm:text-lg"
                      : "text-base xs:text-lg sm:text-xl lg:text-2xl"
                  )}
                >
                  {formatPrice(product.price)}
                </p>
              )}
            </div>

            {product.autoId && (
              <Badge
                variant="outline"
                className="text-[10px] xs:text-xs text-gray-400 border-gray-600 ml-2 flex-shrink-0"
              >
                #{product.autoId}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 xs:gap-2">
            {/* Secondary Action - Provider Link (Icon only) */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "bg-gray-700/50 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all flex-shrink-0",
                compact
                  ? "h-7 w-7 xs:h-8 xs:w-8"
                  : "h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10"
              )}
              asChild
              title={`${t("store.viewOn", "Xem tại")} ${product.provider}`}
            >
              <a
                href={product.providerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink
                  className={cn(
                    "flex-shrink-0",
                    compact
                      ? "h-2.5 w-2.5 xs:h-3 xs:w-3"
                      : "h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                  )}
                />
              </a>
            </Button>
            {/* Main Action - View Details */}
            <Button
              variant="default"
              className={cn(
                "flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-colors shadow-lg hover:shadow-yellow-500/30 min-w-0",
                compact
                  ? "text-xs xs:text-sm h-7 xs:h-8 px-2 xs:px-3"
                  : "text-xs xs:text-sm sm:text-base h-8 xs:h-9 sm:h-10 px-2 xs:px-3 sm:px-4"
              )}
              asChild
            >
              <Link href={SlugLink} target="_blank">
                <Sparkles
                  className={cn(
                    "mr-1 xs:mr-2 flex-shrink-0",
                    compact
                      ? "h-2.5 w-2.5 xs:h-3 xs:w-3"
                      : "h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4"
                  )}
                />
                <span className="truncate">
                  {t("store.viewDetails", "Xem chi tiết")}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
