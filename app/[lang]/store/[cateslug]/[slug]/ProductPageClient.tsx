"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ChevronLeft,
  Share2,
  Heart,
  ExternalLink,
  Info,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Package,
  TrendingUp,
  Sparkles,
  MapPin,
  Truck,
  CreditCard,
  Tag,
  Globe,
  Award,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn, formatShortNumber } from "@/lib/infra/utils";
import {
  ProductDetail,
  AffiliateProvider,
  addToFavorites,
  removeFromFavorites,
} from "@/lib/products";
import { getProviderBadgeColor } from "@/lib/store/utils";
import { StarDisplay } from "@/lib/utils/rating";

interface ProductPageClientProps {
  data: ProductDetail;
  slug: string;
  cateslug: string;
}

export default function ProductPageClient({
  data,
  slug,
  cateslug,
}: ProductPageClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const [selectedShippingOption, setSelectedShippingOption] = useState(
    data.shippingOptions?.defaultShippingId ||
      data.shippingOptions?.options[0]?.id
  );
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [mainImageError, setMainImageError] = useState(false);
  const [sellerImageError, setSellerImageError] = useState(false);
  const [variantImageErrors, setVariantImageErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllAttributes, setShowAllAttributes] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedVariants, setExpandedVariants] = useState<{
    [key: number]: boolean;
  }>({});
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  // Track window width for responsive pagination
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Set initial width
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleWishlistToggle = async () => {
    if (isWishlistLoading) return;

    setIsWishlistLoading(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(data.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(data.id);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data.name,
          text: `${data.name} - ${t("store.checkOutProduct")}`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const getSelectedShippingOption = () => {
    return data.shippingOptions?.options.find(
      (opt) => opt.id === selectedShippingOption
    );
  };

  const handleMainImageError = () => {
    setMainImageError(true);
  };

  const handleImageIndexChange = (newIndex: number) => {
    setSelectedImageIndex(newIndex);
    setMainImageError(false); // Reset lỗi khi chuyển ảnh
  };

  const handleThumbnailImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getMainImageSrc = () => {
    if (mainImageError) {
      return "/placeholder.svg";
    }

    // Tạo array chứa tất cả images bao gồm thumbnail
    const allImages = [];
    if (data.images?.thumbnail) {
      allImages.push(data.images.thumbnail);
    }
    if (data.images?.images) {
      allImages.push(...data.images.images);
    }

    return allImages[selectedImageIndex] || "/placeholder.svg";
  };

  const getAllImages = () => {
    const allImages = [];
    if (data.images?.thumbnail) {
      allImages.push(data.images.thumbnail);
    }
    if (data.images?.images) {
      allImages.push(...data.images.images);
    }
    return allImages;
  };

  const getThumbnailImageSrc = (image: string, index: number) => {
    if (imageErrors[index]) {
      return "/placeholder.svg";
    }
    return image || "/placeholder.svg";
  };

  const handleSellerImageError = () => {
    setSellerImageError(true);
  };

  const getSellerImageSrc = () => {
    if (sellerImageError || !data.seller?.imageUrl) {
      return "/placeholder-user.jpg";
    }
    return data.seller.imageUrl;
  };

  const handleVariantImageError = (
    variantIndex: number,
    valueIndex: number
  ) => {
    const key = `${variantIndex}-${valueIndex}`;
    setVariantImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  const getVariantImageSrc = (
    imageUrl: string,
    variantIndex: number,
    valueIndex: number
  ) => {
    const key = `${variantIndex}-${valueIndex}`;
    if (variantImageErrors[key] || !imageUrl) {
      return "/placeholder.svg";
    }
    return imageUrl;
  };

  const discountPercentage =
    data.discountPercentage > 0 ? Math.round(data.discountPercentage) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 overflow-hidden">
            <Link
              href={`/store`}
              className="hover:text-yellow-400 transition-colors whitespace-nowrap"
            >
              {t("store.store")}
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href={`/store?categories=${encodeURIComponent(
                data.category.code
              )}`}
              target="_blank"
              className="text-gray-300 capitalize hover:text-yellow-300 transition-colors whitespace-nowrap"
            >
              {data.category.name}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-yellow-400 truncate" title={data.name}>
              {data.name}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-gray-700 bg-gray-800/50">
              <Image
                src={getMainImageSrc()}
                alt={data.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                onError={handleMainImageError}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                priority
              />

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <Badge className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 bg-red-600/95 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm border border-red-500">
                  -{discountPercentage}%
                </Badge>
              )}

              {/* Provider Badge */}
              <Link
                href={`/store?platform=${encodeURIComponent(
                  data.provider
                )}`}
                target="_blank"
                className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4"
              >
                <Badge
                  className={cn(
                    "text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity cursor-pointer",
                    getProviderBadgeColor(data.provider)
                  )}
                >
                  {data.provider.toUpperCase()}
                </Badge>
              </Link>

              {/* Stock Status */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs sm:text-sm font-medium",
                    data.stock > 0
                      ? "border-green-500/50 text-green-300 bg-green-500/10"
                      : "border-red-500/50 text-red-300 bg-red-500/10"
                  )}
                >
                  <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {data.stock > 0 ? t("store.inStock") : t("store.outOfStock")}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            {getAllImages().length > 1 && (
              <div className="space-y-2 w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[480px] mx-auto">
                <div className="relative w-full">
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-1 sm:gap-1.5 lg:gap-2 pb-2">
                      {getAllImages().map((image, index) => (
                        <button
                          key={index}
                          onClick={() => handleImageIndexChange(index)}
                          className={cn(
                            "relative flex-shrink-0 w-12 h-12 max-w-12 sm:w-16 sm:h-16 sm:max-w-16 lg:w-20 lg:h-20 lg:max-w-20 rounded-md sm:rounded-lg overflow-hidden border-2 transition-all",
                            selectedImageIndex === index
                              ? "border-yellow-400 shadow-lg shadow-yellow-400/30"
                              : "border-gray-600 hover:border-gray-500"
                          )}
                        >
                          <Image
                            src={getThumbnailImageSrc(image, index)}
                            alt={`${data.name} ${index + 1}`}
                            fill
                            sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
                            className="object-cover"
                            onError={() => handleThumbnailImageError(index)}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Counter & Pagination */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {selectedImageIndex + 1} / {getAllImages().length}{" "}
                    {t("store.images", "ảnh")}
                  </span>
                  {getAllImages().length > 4 && (
                    <div className="flex gap-0.5">
                      {(() => {
                        const totalImages = getAllImages().length;
                        const pageSize =
                          windowWidth >= 1024 ? 6 : windowWidth >= 640 ? 5 : 4;
                        const totalPages = Math.ceil(totalImages / pageSize);
                        const currentPage = Math.floor(
                          selectedImageIndex / pageSize
                        );

                        return [...Array(Math.min(totalPages, 8))].map(
                          (_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-1 h-1 rounded-full transition-colors cursor-pointer",
                                currentPage === i
                                  ? "bg-yellow-400"
                                  : "bg-gray-600 hover:bg-gray-500"
                              )}
                              onClick={() => {
                                const targetIndex = i * pageSize;
                                if (targetIndex < totalImages) {
                                  handleImageIndexChange(targetIndex);
                                }
                              }}
                            />
                          )
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col space-y-4 sm:space-y-6">
            {/* Product Header */}
            <div>
              <div className="mb-2 sm:mb-3">
                <h1
                  className={cn(
                    "text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 leading-tight transition-all duration-300",
                    !showFullTitle && data.name.length > 100 && "line-clamp-2"
                  )}
                >
                  {data.name}
                </h1>

                {data.name.length > 100 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullTitle(!showFullTitle)}
                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 p-0 h-auto mt-1 text-xs"
                  >
                    {showFullTitle
                      ? t("store.showLess", "Thu gọn")
                      : t("store.showMore", "Xem thêm")}
                  </Button>
                )}
              </div>

              {/* Rating & Sales */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                {data.rating > 0 && (
                  <div className="flex items-center">
                    <StarDisplay 
                      rating={data.rating}
                      size="md"
                      className="mr-1 sm:mr-2"
                      starClassName="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="text-xs sm:text-sm text-gray-400">
                      (<span className="font-medium">{data.rating.toFixed(1)}</span>)
                      {data.ratingCount > 0 && (
                        <span className="text-gray-500 ml-1">
                          • <span className="font-medium">{formatShortNumber(data.ratingCount, 1000)}</span> {t("store.reviews", "đánh giá")}
                        </span>
                      )}
                    </span>
                  </div>
                )}

                {data.totalSold > 0 && (
                  <div className="flex items-center text-xs sm:text-sm text-gray-400">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>
                      <span className="font-medium">{formatShortNumber(data.totalSold, 1000)}</span> {t("store.sold")}
                    </span>
                  </div>
                )}
              </div>

              {/* Product ID */}
              {data.autoId && (
                <Badge
                  variant="outline"
                  className="text-xs text-gray-400 border-gray-600 mb-3 sm:mb-4"
                >
                  #{data.autoId}
                </Badge>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div>
                  {data.discountPrice > 0 && data.discountPrice < data.price ? (
                    <div>
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">
                        {formatPrice(data.discountPrice)}
                      </p>
                      <p className="text-base sm:text-lg text-gray-500 line-through">
                        {formatPrice(data.price)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">
                      {formatPrice(data.price)}
                    </p>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  disabled={isWishlistLoading}
                  className={cn(
                    "bg-gray-800/70 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400 w-full sm:w-auto",
                    isFavorite &&
                      "border-red-500 text-red-500 hover:border-red-400 hover:text-red-400"
                  )}
                >
                  <Heart
                    className={cn(
                      "mr-2 h-4 w-4 sm:h-5 sm:w-5",
                      isFavorite && "fill-current",
                      isWishlistLoading && "animate-pulse"
                    )}
                  />
                  <span className="text-sm sm:text-base">
                    {isFavorite
                      ? t("store.removeFromWishlist")
                      : t("store.addToWishlist")}
                  </span>
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  size="lg"
                  className="flex-grow bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-colors shadow-lg hover:shadow-yellow-500/30"
                  asChild
                >
                  <a href={data.providerUrl} target="_blank">
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">
                      {t("store.viewOn")} {data.provider}
                    </span>
                    <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                  className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-yellow-400"
                >
                  <Share2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-sm sm:text-base">
                    {t("store.share")}
                  </span>
                </Button>
              </div>
            </div>

            {/* Product Labels */}
            {data.labels && data.labels.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2 sm:mb-3 flex items-center">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                  {t("store.labels")}
                  {data.labels.length > 5 && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({data.labels.length})
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(showAllLabels ? data.labels : data.labels.slice(0, 5)).map(
                    (label, index) => (
                      <Link
                        key={index}
                        href={`/store?tags=${encodeURIComponent(
                          label
                        )}`}
                        target="_blank"
                      >
                        <Badge className="bg-yellow-600/20 text-yellow-300 border border-yellow-500/30 text-xs sm:text-sm hover:bg-yellow-600/30 hover:border-yellow-400/50 transition-colors cursor-pointer">
                          {label}
                        </Badge>
                      </Link>
                    )
                  )}

                  {data.labels.length > 5 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllLabels(!showAllLabels)}
                      className="h-auto p-1 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    >
                      {showAllLabels
                        ? t("store.showLess", "Thu gọn")
                        : t("store.showMore", "Xem thêm") +
                          ` (+${data.labels.length - 5})`}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Product Categories */}
            {data.categories && data.categories.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-2 sm:mb-3 flex items-center">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                  {t("store.categories")}
                  {data.categories.length > 3 && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({data.categories.length})
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(showAllCategories
                    ? data.categories
                    : data.categories.slice(0, 3)
                  ).map((category) => (
                    <Link
                      key={category.code}
                      href={`/store?categories=${encodeURIComponent(
                        category.code
                      )}`}
                      target="_blank"
                    >
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-300 text-xs sm:text-sm hover:border-yellow-400/50 hover:text-yellow-300 transition-colors cursor-pointer"
                      >
                        {category.name}
                      </Badge>
                    </Link>
                  ))}

                  {data.categories.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="h-auto p-1 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    >
                      {showAllCategories
                        ? t("store.showLess", "Thu gọn")
                        : t("store.showMore", "Xem thêm") +
                          ` (+${data.categories.length - 3})`}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Sections */}
        <div className="mt-8 sm:mt-12 grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Description */}
            {data.description && (
              <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4 flex items-center">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {t("store.descriptionSection")}
                </h3>
                <div className="prose prose-invert prose-gray max-w-none">
                  <div className="relative">
                    <p
                      className={cn(
                        "text-sm sm:text-base text-gray-300 leading-relaxed transition-all duration-300",
                        !showFullDescription &&
                          data.description.length > 300 &&
                          "line-clamp-4"
                      )}
                    >
                      {data.description}
                    </p>

                    {data.description.length > 300 && (
                      <div className="mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 p-0 h-auto"
                        >
                          {showFullDescription
                            ? t("store.showLess", "Thu gọn")
                            : t("store.readMore", "Đọc thêm")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Product Attributes */}
            {data.attributes && data.attributes.length > 0 && (
              <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 flex items-center">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    {t("store.attributes")}
                    {data.attributes.length > 3 && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({data.attributes.length})
                      </span>
                    )}
                  </h3>

                  {data.attributes.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllAttributes(!showAllAttributes)}
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    >
                      {showAllAttributes
                        ? t("store.showLess", "Thu gọn")
                        : t("store.showMore", "Xem thêm")}
                    </Button>
                  )}
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {(showAllAttributes
                    ? data.attributes
                    : data.attributes.slice(0, 3)
                  ).map((attr, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 sm:p-4 rounded-lg border",
                        attr.isMatched
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-gray-600 bg-gray-700/30"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-300 text-sm sm:text-base">
                          <Link
                            href={`/store?attributes=${encodeURIComponent(
                              `${attr.name}`
                            )}`}
                            target="_blank"
                          >
                            {attr.name}
                          </Link>
                        </span>
                        {attr.isMatched && (
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {attr.value.map((val, valIndex) => (
                          <Link
                            key={valIndex}
                            href={`/store?attributes=${encodeURIComponent(
                              `${attr.name}:${val}`
                            )}`}
                            target="_blank"
                          >
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs cursor-pointer transition-colors",
                                attr.isMatched
                                  ? "border-green-400/50 text-green-300 hover:border-green-300 hover:text-green-200"
                                  : "border-gray-500 text-gray-400 hover:border-yellow-400/50 hover:text-yellow-300"
                              )}
                            >
                              {val}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Variants */}
            {data.variants && data.variants.length > 0 && (
              <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4 flex items-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {t("store.variants")}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {data.variants.map((variant, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-300 text-sm sm:text-base">
                          {variant.name}
                          {variant.values.length > 5 && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({variant.values.length})
                            </span>
                          )}
                        </h4>

                        {variant.values.length > 5 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedVariants((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 text-xs"
                          >
                            {expandedVariants[index]
                              ? t("store.showLess", "Thu gọn")
                              : t("store.showMore", "Xem thêm")}
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {(expandedVariants[index]
                          ? variant.values
                          : variant.values.slice(0, 5)
                        ).map((value, valueIndex) => (
                          <div
                            key={valueIndex}
                            className="flex items-center p-2 sm:p-3 rounded-lg border border-gray-600 bg-gray-700/30 hover:border-yellow-400/50 transition-colors cursor-pointer"
                          >
                            {value.imageUrl && value.imageUrl.trim() !== "" && (
                              <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded mr-2 sm:mr-3 flex-shrink-0">
                                <Image
                                  src={getVariantImageSrc(
                                    value.imageUrl,
                                    index,
                                    valueIndex
                                  )}
                                  alt={value.valueText}
                                  fill
                                  sizes="32px"
                                  className="object-cover rounded"
                                  onError={() =>
                                    handleVariantImageError(index, valueIndex)
                                  }
                                  placeholder="blur"
                                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                              </div>
                            )}
                            <span className="text-xs sm:text-sm text-gray-300 truncate">
                              {value.valueText}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Seller Information */}
            {data.seller && (
              <div className="bg-gray-800/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-lg font-semibold text-yellow-400 mb-3 sm:mb-4">
                  {t("store.seller")}
                </h3>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  {data.seller.imageUrl && (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={getSellerImageSrc()}
                        alt={data.seller.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        onError={handleSellerImageError}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-gray-300 mb-1 text-sm sm:text-base truncate">
                      {data.seller.name}
                    </h4>
                    {data.seller.description && (
                      <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2">
                        {data.seller.description}
                      </p>
                    )}
                    {data.seller.labels && data.seller.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {data.seller.labels.map((label, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs border-gray-600 text-gray-400"
                          >
                            {label.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Options */}
            {data.shippingOptions &&
              data.shippingOptions.options.length > 0 && (
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    {t("store.shipping")}
                  </h3>

                  {data.shippingOptions.freeShippingAvailable && (
                    <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                      <p className="text-sm text-green-300">
                        {t("store.freeShippingOver")}{" "}
                        {formatPrice(
                          data.shippingOptions.freeShippingThreshold
                        )}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {data.shippingOptions.options.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-colors",
                          selectedShippingOption === option.id
                            ? "border-yellow-400/50 bg-yellow-500/10"
                            : "border-gray-600 bg-gray-700/30 hover:border-gray-500"
                        )}
                        onClick={() => setSelectedShippingOption(option.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-300">
                            {option.name}
                          </span>
                          <span className="text-sm text-yellow-400">
                            {option.isFree
                              ? t("store.free")
                              : formatPrice(option.price)}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-xs text-gray-400 mb-1">
                            {option.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {option.estimatedDays} {t("store.days")} •{" "}
                          {option.provider}
                        </p>
                      </div>
                    ))}
                  </div>

                  {data.shippingOptions.shippingFrom && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {t("store.shippingFrom")}:{" "}
                        {data.shippingOptions.shippingFrom}
                      </div>
                    </div>
                  )}
                </div>
              )}

            {/* Additional Product Info */}
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                {t("store.productInfo")}
              </h3>
              <div className="space-y-3 text-sm">
                {data.saleLocation && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">
                      {t("store.saleLocation")}:
                    </span>
                    <span className="text-gray-300">{data.saleLocation}</span>
                  </div>
                )}
                {data.promotion && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">
                      {t("store.promotion")}:
                    </span>
                    <span className="text-green-300">{data.promotion}</span>
                  </div>
                )}
                {data.warranty && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">
                      {t("store.warranty")}:
                    </span>
                    <span className="text-gray-300">{data.warranty}</span>
                  </div>
                )}
                {data.shipping && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">
                      {t("store.shippingInfo")}:
                    </span>
                    <span className="text-gray-300">{data.shipping}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
