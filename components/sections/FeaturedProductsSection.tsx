"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import ProductCard from "@/components/store/ProductCard";
import { sampleProducts } from "@/lib/products";
import { isFeatureComingSoon, isFeatureMaintenance } from "@/lib/features/feature-flags";
import { ComingSoonBadge, MaintenanceBadge } from "@/components/features/ComingSoonBadge";

export default function FeaturedProductsSection() {
  const { t } = useTranslation();
  const featuredProducts = sampleProducts.slice(0, 4); // Get first 4 products as featured
  const isStoreComingSoon = isFeatureComingSoon('/store');
  const isStoreMaintenance = isFeatureMaintenance('/store');
  const isStoreDisabled = isStoreComingSoon || isStoreMaintenance;

  return (
    <section className="py-12 sm:py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with status badge */}
        <div className="relative text-center mb-10">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">
            {t("home.featuredProducts")}
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            {t("home.featuredProductsDesc")}
          </p>

          {/* Status Badge - floating variant for section header */}
          {isStoreComingSoon && (
            <div className="flex justify-center mt-4">
              <ComingSoonBadge variant="floating" size="sm" />
            </div>
          )}
          {isStoreMaintenance && (
            <div className="flex justify-center mt-4">
              <MaintenanceBadge variant="floating" size="sm" />
            </div>
          )}
        </div>

        {/* Products grid with conditional opacity */}
        <div
          id="featured-products-section"
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transition-opacity duration-300 ${
            isStoreDisabled ? "opacity-60" : "opacity-100"
          }`}
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className={`${
                isStoreDisabled ? "pointer-events-none cursor-not-allowed" : ""
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Call to action button with conditional styling */}
        <div className="text-center mt-10">
          <Link
            href="/store"
            className={`inline-block px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              isStoreDisabled
                ? "bg-gray-600 text-gray-300 cursor-not-allowed hover:bg-gray-600"
                : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
            {...(isStoreDisabled && {
              onClick: (e) => e.preventDefault(),
              "aria-disabled": true,
            })}
          >
            {t("home.viewAllProducts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
