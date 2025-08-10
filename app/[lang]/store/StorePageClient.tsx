"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  ProductBase,
  ProductFilterOptionsResponse,
  ProductSearchParams,
} from "@/lib/products";
import ProductCard from "@/components/store/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import {
  ListFilter,
  Search,
  Sparkles,
  ShoppingBag,
  Star,
  TrendingUp,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Award,
  DollarSign,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFilterOptions, getProducts } from "@/lib/products";

interface StorePageClientProps {
  isHideFilter?: boolean;
  isHideFeatured?: boolean;
  isHideHeader?: boolean;
  isHidePagination?: boolean;
  pageSize?: number;
  isInfinityScroll?: boolean;
  sortBy?: ProductSearchParams["sortBy"];
  defaultHasDiscount?: boolean | undefined | null;
  defaultSearchTerm?: string;
  defaultSelectedCategories?: string[];
  defaultSelectedLabels?: string[];
  defaultSelectedAttributes?: string[];
  defaultSelectedProvider?: string;
  defaultPriceRange?: { from?: number; to?: number };
}

const MaxRangePrice = 100000000;

export default function StorePageClient({
  isHideFilter = false,
  isHideFeatured = false,
  isHideHeader = false,
  isHidePagination = false,
  pageSize = 10,
  isInfinityScroll = true,
  sortBy = "relevance",
  defaultHasDiscount = undefined,
  defaultSearchTerm = "",
  defaultSelectedCategories = [],
  defaultSelectedLabels = [],
  defaultSelectedAttributes = [],
  defaultSelectedProvider = "",
  defaultPriceRange = {},
}: StorePageClientProps = {}) {
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterOptions, setFilterOptions] =
    useState<ProductFilterOptionsResponse>({});

  // Search and filter states
  const [searchParams, setSearchParams] = useState<ProductSearchParams>({
    pageSize: pageSize,
    pageNumber: 1,
    sortBy: sortBy,
  });
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultSelectedCategories
  );
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    defaultSelectedLabels
  );
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(
    defaultSelectedAttributes
  );
  const [selectedProvider, setSelectedProvider] = useState<string>(
    defaultSelectedProvider
  );
  const [priceRange, setPriceRange] = useState<{ from?: number; to?: number }>(
    defaultPriceRange
  );
  const [hasDiscount, setHasDiscount] = useState<boolean | undefined | null>(
    defaultHasDiscount
  );
  const [priceFilterMode, setPriceFilterMode] = useState<
    "all" | "range" | "from" | "to"
  >("all");
  const [tempPriceRange, setTempPriceRange] = useState<{
    from?: number;
    to?: number;
  }>({});
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [attributesDropdownOpen, setAttributesDropdownOpen] = useState(false);
  const [labelsDropdownOpen, setLabelsDropdownOpen] = useState(false);
  const [expandedAttributes, setExpandedAttributes] = useState<Set<string>>(
    new Set()
  );
  const [priceInputs, setPriceInputs] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  // Featured products state
  const [featuredProducts, setFeaturedProducts] = useState<ProductBase[]>([]);

  // Search states for filters
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [attributeSearchTerm, setAttributeSearchTerm] = useState("");
  const [labelSearchTerm, setLabelSearchTerm] = useState("");

  // Pagination
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Infinity scroll states0
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Refs for scroll position preservation
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const filterTimeoutRef = useRef<NodeJS.Timeout>();
  const isInitialLoad = useRef(true);
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { t } = useTranslation();

  // Optimized debounced fetch function
  const debouncedFetchProducts = useCallback(
    async (params: ProductSearchParams, isSearch = false, append = false) => {
      // Clear existing timeouts
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);

      const delay = isSearch ? 800 : 300; // Longer delay for search, shorter for filters
      const timeoutRef = isSearch ? searchTimeoutRef : filterTimeoutRef;

      timeoutRef.current = setTimeout(async () => {
        // Show loading states appropriately
        if (!isInitialLoad.current) {
          if (append) {
            setIsLoadingMore(true);
          } else {
            setIsFiltering(true);
          }
        }

        try {
          const productsData = await getProducts(params);

          if (isInfinityScroll && append) {
            // Append new products for infinity scroll
            setProducts((prev) => [...prev, ...productsData.items]);
          } else {
            // Replace products for regular pagination or initial load
            setProducts(productsData.items);
          }

          setTotalRecords(productsData.totalRecords || 0);
          setTotalPages(productsData.totalPages || 0);
          setCurrentPage(productsData.pageNumber || 1);

          // Update hasNextPage for infinity scroll
          if (isInfinityScroll) {
            setHasNextPage(
              (productsData.pageNumber || 1) < (productsData.totalPages || 0)
            );
          }
        } catch (error) {
          console.error(
            t(
              "store.errors.failedToFetchProducts",
              "Failed to fetch products:"
            ),
            error
          );
        } finally {
          setIsLoading(false);
          setIsFiltering(false);
          setIsLoadingMore(false);
        }
      }, delay);
    },
    [isInfinityScroll, t]
  );

  // Load more function for infinity scroll
  const loadMore = useCallback(async () => {
    if (!hasNextPage || isLoadingMore || isFiltering) return;

    const nextPage = currentPage + 1;
    const params: ProductSearchParams = {
      pageSize: pageSize,
      sortBy: searchParams.sortBy,
      keywords: searchTerm || undefined,
      categoryCodes:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      labels: selectedLabels.length > 0 ? selectedLabels : undefined,
      attributes:
        selectedAttributes.length > 0 ? selectedAttributes : undefined,
      provider: (selectedProvider as any) || undefined,
      priceFrom: priceRange.from,
      priceTo: priceRange.to,
      hasDiscount: hasDiscount || undefined,
      pageNumber: nextPage,
    };

    try {
      setIsLoadingMore(true);
      const productsData = await getProducts(params);
      setProducts((prev) => [...prev, ...productsData.items]);
      setCurrentPage(nextPage);
      setHasNextPage(nextPage < (productsData.totalPages || 0));
    } catch (error) {
      console.error(
        t("store.errors.failedToFetchProducts", "Failed to fetch products:"),
        error
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    hasNextPage,
    isLoadingMore,
    isFiltering,
    currentPage,
    pageSize,
    searchParams.sortBy,
    searchTerm,
    selectedCategories,
    selectedLabels,
    selectedAttributes,
    selectedProvider,
    priceRange,
    hasDiscount,
    t,
  ]);

  // Initialize filter options and products
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // Fetch filter options
        if(!isHideFilter) {
          const filterOptionsData = await getFilterOptions();
          setFilterOptions(filterOptionsData);
        }

        // Fetch initial products
        const productsData = await getProducts(searchParams);
        setProducts(productsData.items);
        setTotalRecords(productsData.totalRecords || 0);
        setTotalPages(productsData.totalPages || 0);
        setCurrentPage(productsData.pageNumber || 1);

        // Initialize hasNextPage for infinity scroll
        if (isInfinityScroll) {
          setHasNextPage(
            (productsData.pageNumber || 1) < (productsData.totalPages || 0)
          );
        }

        // Fetch featured products
        if (!isHideFeatured) {
          try {
            const featuredData = await getProducts({
              labels: ["hot", "bestseller", "featured", "trending"],
              pageSize: 4,
              pageNumber: 1,
              sortBy: "relevance",
            });
            setFeaturedProducts(featuredData.items);
          } catch (error) {
            console.error(
              t(
                "store.errors.failedToFetchFeaturedProducts",
                "Failed to fetch featured products:"
              ),
              error
            );
          }
        }

        // Initialize price filter mode based on default price range
        if (defaultPriceRange.from && defaultPriceRange.to) {
          setPriceFilterMode("range");
          setTempPriceRange(defaultPriceRange);
        } else if (defaultPriceRange.from) {
          setPriceFilterMode("from");
          setPriceInputs((prev) => ({
            ...prev,
            from: defaultPriceRange.from?.toString() || "",
          }));
        } else if (defaultPriceRange.to) {
          setPriceFilterMode("to");
          setPriceInputs((prev) => ({
            ...prev,
            to: defaultPriceRange.to?.toString() || "",
          }));
        }
      } catch (error) {
        console.error(
          t("store.errors.failedToFetchData", "Failed to fetch data:"),
          error
        );
      } finally {
        setIsLoading(false);
        isInitialLoad.current = false;
      }
    };
    initializeData();
  }, [isHideFeatured, t]);

  // Intersection Observer for infinity scroll
  useEffect(() => {
    if (!isInfinityScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isLoadingMore &&
          !isFiltering &&
          !isLoading
        ) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observerRef.current = observer;

    // Only observe if we have the ref and not in loading state
    if (loadMoreRef.current && !isLoading) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    isInfinityScroll,
    hasNextPage,
    isLoadingMore,
    isFiltering,
    isLoading,
    loadMore,
  ]);

  // Handle search term changes
  useEffect(() => {
    if (isInitialLoad.current) return;

    const params: ProductSearchParams = {
      ...searchParams,
      keywords: searchTerm || undefined,
      categoryCodes:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      labels: selectedLabels.length > 0 ? selectedLabels : undefined,
      attributes:
        selectedAttributes.length > 0 ? selectedAttributes : undefined,
      provider: (selectedProvider as any) || undefined,
      priceFrom: priceRange.from,
      priceTo: priceRange.to,
      hasDiscount: hasDiscount || undefined,
      pageNumber: 1, // Reset to first page on search
    };

    // For infinity scroll, reset the current page state and products
    if (isInfinityScroll) {
      setCurrentPage(1);
      setProducts([]); // Clear existing products before new search
    }

    debouncedFetchProducts(params, true);
  }, [
    searchTerm,
    debouncedFetchProducts,
    searchParams.sortBy, // Only watch sortBy, not the entire searchParams
    selectedCategories,
    selectedLabels,
    selectedAttributes,
    selectedProvider,
    priceRange,
    hasDiscount,
    isInfinityScroll,
  ]);

  // Handle filter changes (separate from search for better UX)
  useEffect(() => {
    if (isInitialLoad.current) return;

    const params: ProductSearchParams = {
      ...searchParams,
      keywords: searchTerm || undefined,
      categoryCodes:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      labels: selectedLabels.length > 0 ? selectedLabels : undefined,
      attributes:
        selectedAttributes.length > 0 ? selectedAttributes : undefined,
      provider: (selectedProvider as any) || undefined,
      priceFrom: priceRange.from,
      priceTo: priceRange.to,
      hasDiscount: hasDiscount || undefined,
      pageNumber: 1, // Reset to first page on filter change
    };

    // For infinity scroll, reset the current page state and products
    if (isInfinityScroll) {
      setCurrentPage(1);
      setProducts([]); // Clear existing products before new filter
    }

    debouncedFetchProducts(params, false);
  }, [
    selectedCategories,
    selectedLabels,
    selectedAttributes,
    selectedProvider,
    priceRange,
    hasDiscount,
    debouncedFetchProducts,
    searchParams.sortBy, // Only watch sortBy, not the entire searchParams
    searchTerm,
    isInfinityScroll,
  ]);

  // Handle pagination changes (immediate, no debounce) - Only for regular pagination
  useEffect(() => {
    if (isInitialLoad.current || isInfinityScroll) return; // Skip this effect for infinity scroll

    const params: ProductSearchParams = {
      ...searchParams,
      keywords: searchTerm || undefined,
      categoryCodes:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      labels: selectedLabels.length > 0 ? selectedLabels : undefined,
      attributes:
        selectedAttributes.length > 0 ? selectedAttributes : undefined,
      provider: (selectedProvider as any) || undefined,
      priceFrom: priceRange.from,
      priceTo: priceRange.to,
      hasDiscount: hasDiscount || undefined,
    };

    const fetchPage = async () => {
      // Only show overlay if we have existing products
      if (products.length > 0) {
        setIsFiltering(true);
      }

      try {
        const productsData = await getProducts(params);
        setProducts(productsData.items);
        setTotalRecords(productsData.totalRecords || 0);
        setTotalPages(productsData.totalPages || 0);
        setCurrentPage(productsData.pageNumber || 1);
      } catch (error) {
        console.error(
          t("store.errors.failedToFetchProducts", "Failed to fetch products:"),
          error
        );
      } finally {
        setIsFiltering(false);
      }
    };

    fetchPage();
  }, [searchParams.pageNumber, searchParams.sortBy, isInfinityScroll]);

  // Initialize tempPriceRange when price dropdown opens
  useEffect(() => {
    if (priceDropdownOpen) {
      // Initialize with current price range values or defaults
      setTempPriceRange({
        from: priceRange.from,
        to: priceRange.to,
      });
    }
  }, [priceDropdownOpen, priceRange.from, priceRange.to]);

  const handleCategoryToggle = (categoryCode: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryCode)
        ? prev.filter((c) => c !== categoryCode)
        : [...prev, categoryCode]
    );
  };

  const handleLabelToggle = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleAttributeToggle = (attribute: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute]
    );
  };

  const handleSortChange = (sortBy: string) => {
    // For infinity scroll, reset products and page when sort changes
    if (isInfinityScroll) {
      setProducts([]);
      setCurrentPage(1);
    }

    setSearchParams((prev) => ({
      ...prev,
      sortBy: sortBy as any,
      pageNumber: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, pageNumber: page }));
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider === "all" ? "" : provider);
  };

  const toggleAttributeExpansion = (attributeName: string) => {
    setExpandedAttributes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(attributeName)) {
        newSet.delete(attributeName);
      } else {
        newSet.add(attributeName);
      }
      return newSet;
    });
  };

  const resetFilters = () => {
    // Clear all timeouts
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);

    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedLabels([]);
    setSelectedAttributes([]);
    setSelectedProvider("");
    setPriceRange({});
    setPriceFilterMode("all");
    setTempPriceRange({});
    setPriceInputs({ from: "", to: "" });
    setHasDiscount(false);
    setExpandedAttributes(new Set()); // Reset expanded attributes

    // Reset search terms for filters
    setCategorySearchTerm("");
    setAttributeSearchTerm("");
    setLabelSearchTerm("");

    // For infinity scroll, reset products and page
    if (isInfinityScroll) {
      setProducts([]);
      setCurrentPage(1);
    }

    setSearchParams({ pageSize: pageSize, pageNumber: 1, sortBy: sortBy });
  };

  // Helper functions
  const getTotalCategoryOptions = () => {
    let total = 0;
    filterOptions.categories?.forEach((category) => {
      total += 1;
      if (category.children) {
        total += category.children.length;
      }
    });
    return total;
  };

  const getTotalAttributeOptions = () => {
    return (
      filterOptions.attributes?.reduce(
        (total, attr) => total + attr.value.length,
        0
      ) || 0
    );
  };

  const getTotalLabelsOptions = () => {
    return filterOptions.labels?.length || 0;
  };

  // Filter helper functions for search
  const getFilteredCategories = () => {
    if (!categorySearchTerm.trim()) {
      return filterOptions.categories || [];
    }
    return (
      filterOptions.categories?.filter((category) => {
        const matchesMain = category.name
          .toLowerCase()
          .includes(categorySearchTerm.toLowerCase());
        const matchesChildren = category.children?.some((child) =>
          child.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
        );
        return matchesMain || matchesChildren;
      }) || []
    );
  };

  const getFilteredAttributes = () => {
    if (!attributeSearchTerm.trim()) {
      return filterOptions.attributes || [];
    }
    return (
      filterOptions.attributes
        ?.map((attribute) => ({
          ...attribute,
          value: attribute.value.filter((val) =>
            val.toLowerCase().includes(attributeSearchTerm.toLowerCase())
          ),
        }))
        .filter((attribute) => attribute.value.length > 0) || []
    );
  };

  const getFilteredLabels = () => {
    if (!labelSearchTerm.trim()) {
      return filterOptions.labels || [];
    }
    return (
      filterOptions.labels?.filter((label) =>
        label.toLowerCase().includes(labelSearchTerm.toLowerCase())
      ) || []
    );
  };

  const handlePriceRangeChange = (range: string) => {
    switch (range) {
      case "all":
        setPriceRange({});
        setPriceFilterMode("all");
        setTempPriceRange({});
        setPriceInputs({ from: "", to: "" });
        break;
      case "0-100000":
        setPriceRange({ from: 0, to: 100000 });
        setPriceFilterMode("all"); // Don't show slider for quick selection
        setTempPriceRange({});
        break;
      case "100000-500000":
        setPriceRange({ from: 100000, to: 500000 });
        setPriceFilterMode("all"); // Don't show slider for quick selection
        setTempPriceRange({});
        break;
      case "500000-1000000":
        setPriceRange({ from: 500000, to: 1000000 });
        setPriceFilterMode("all"); // Don't show slider for quick selection
        setTempPriceRange({});
        break;
      case "1000000-":
        setPriceRange({ from: 1000000 });
        setPriceFilterMode("from");
        setPriceInputs({ from: "1000000", to: "" });
        break;
      case "-500000":
        setPriceRange({ to: 500000 });
        setPriceFilterMode("to");
        setPriceInputs({ from: "", to: "500000" });
        break;
      case "custom-range":
        setPriceFilterMode("range");
        // Initialize with current price range or default range
        const currentFrom = priceRange.from || 0;
        const currentTo = priceRange.to || MaxRangePrice;
        setTempPriceRange({ from: currentFrom, to: currentTo });
        break;
      case "custom-from":
        setPriceFilterMode("from");
        setPriceInputs({ from: priceRange.from?.toString() || "", to: "" });
        break;
      case "custom-to":
        setPriceFilterMode("to");
        setPriceInputs({ from: "", to: priceRange.to?.toString() || "" });
        break;
      default:
        setPriceRange({});
        setPriceFilterMode("all");
    }
  };

  const handleSliderChange = (values: number[]) => {
    const [from, to] = values;
    // Handle null/undefined logic properly for the new unified UI
    const validFrom = from === 0 ? undefined : Math.max(0, Math.min(from, MaxRangePrice));
    const validTo = to === MaxRangePrice ? undefined : Math.max(from, Math.min(to, MaxRangePrice));
    setTempPriceRange({ from: validFrom, to: validTo });
  };

  const applySliderPrice = () => {
    // Validate and clean the price range with improved logic
    const fromValue = tempPriceRange.from;
    const toValue = tempPriceRange.to;

    const newRange: { from?: number; to?: number } = {};

    // Handle from value - null means no minimum limit
    if (fromValue !== undefined && fromValue > 0) {
      newRange.from = Math.max(0, fromValue);
    }

    // Handle to value - null means no maximum limit  
    if (toValue !== undefined && toValue < MaxRangePrice) {
      newRange.to = Math.max(newRange.from || 0, toValue);
    }

    // Apply the new price range
    setPriceRange(newRange);
    
    // Reset filter mode and close dropdown for better UX
    setPriceFilterMode("all");
    setPriceDropdownOpen(false);
  };

  const handlePriceInputChange = (type: "from" | "to", value: string) => {
    // Only allow numeric input and ensure valid format
    const cleanValue = value.replace(/[^\d]/g, "");
    setPriceInputs((prev) => ({ ...prev, [type]: cleanValue }));
  };

  const applyPriceInput = () => {
    const newRange: { from?: number; to?: number } = {};

    if (priceFilterMode === "from" || priceFilterMode === "range") {
      const fromValue = parseFloat(priceInputs.from);
      if (!isNaN(fromValue) && fromValue >= 0) {
        newRange.from = Math.max(0, fromValue);
      }
    }

    if (priceFilterMode === "to" || priceFilterMode === "range") {
      const toValue = parseFloat(priceInputs.to);
      if (!isNaN(toValue) && toValue >= 0) {
        // Ensure to value is not less than from value
        const minValue = newRange.from || 0;
        newRange.to = Math.max(minValue, toValue);
      }
    }

    // Update price range and reset mode to normal
    setPriceRange(newRange);
    setPriceFilterMode("all");
    setPriceInputs({ from: "", to: "" });
  };

  const getPriceRangeDisplay = () => {
    if (!priceRange.from && !priceRange.to)
      return t("store.allPrices", "Tất cả");
    if (priceRange.from && priceRange.to) {
      return `${priceRange.from.toLocaleString(
        "vi-VN"
      )} - ${priceRange.to.toLocaleString("vi-VN")} ₫`;
    }
    if (priceRange.from) {
      return `${t("store.from", "Từ")} ${priceRange.from.toLocaleString(
        "vi-VN"
      )} ₫`;
    }
    if (priceRange.to) {
      return `${t("store.under", "Dưới")} ${priceRange.to.toLocaleString(
        "vi-VN"
      )} ₫`;
    }
    return t("store.allPrices", "Tất cả");
  };

  const getSortIcon = (sortType: string) => {
    switch (sortType) {
      case "price_asc":
        return <ArrowUp className="mr-2 h-4 w-4" />;
      case "price_desc":
        return <ArrowDown className="mr-2 h-4 w-4" />;
      case "rating_desc":
        return <Award className="mr-2 h-4 w-4" />;
      default:
        return <ArrowUpDown className="mr-2 h-4 w-4" />;
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    };
  }, []);

  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-300">
            {t("store.loading", "Đang tải sản phẩm...")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {!isHideHeader && (
        <header className="text-center mb-10 sm:mb-14 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-3 sm:mb-4">
            {t("store.title", "Cửa Hàng Phong Thủy")}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t(
              "store.description",
              "Khám phá bộ sưu tập đồ phong thủy, huyền học chất lượng cao từ các nền tảng uy tín"
            )}
          </p>
        </header>
      )}
      {/* Featured Products Section */}
      {!isHideFeatured && featuredProducts.length > 0 && (
        <section className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-yellow-400 mb-4 sm:mb-6 text-center sm:text-left flex items-center justify-center sm:justify-start">
            <TrendingUp className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            {t("store.featuredProducts", "Sản Phẩm Nổi Bật")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact={false} attributes={selectedAttributes} />
            ))}
          </div>

          {/* Divider between Featured Products and Filters */}
          <div className="mt-12 sm:mt-14 mb-3 sm:mb-4">
            <div className="flex items-center">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              <div className="px-3 sm:px-6">
                <div className="flex items-center space-x-2 text-gray-400 bg-gray-900/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-700">
                  <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    {t("store.searchAndFilter", "Tìm kiếm & Lọc sản phẩm")}
                  </span>
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
              </div>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>
          </div>
        </section>
      )}
      {/* Filters and Search */}
      {!isHideFilter && (
        <div className="mb-8 space-y-4">
          {/* Search and Sort Row */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4 sm:items-center">
            <div className="relative flex-grow w-full">
              <Input
                type="search"
                placeholder={t(
                  "store.searchPlaceholder",
                  "Tìm kiếm sản phẩm phong thủy..."
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 sm:py-2 bg-gray-800 border-gray-700 text-white focus:border-yellow-500 w-full text-sm sm:text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <Select
                value={searchParams.sortBy}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-full sm:w-[180px] lg:w-[200px] bg-gray-800 border-gray-700 text-white text-sm sm:text-base">
                  <div className="flex items-center">
                    <SelectValue
                      className="text-sm sm:text-base"
                      placeholder={t("store.sortBy", "Sắp xếp")}
                    />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="relevance">
                    <div className="flex items-center">
                      <ArrowUpDown className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-sm sm:text-base">
                        {t("store.sortRelevance", "Liên quan")}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price_asc">
                    <div className="flex items-center">
                      <ArrowUp className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-sm sm:text-base">
                        {t("store.sortPriceAsc", "Giá thấp đến cao")}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price_desc">
                    <div className="flex items-center">
                      <ArrowDown className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-sm sm:text-base">
                        {t("store.sortPriceDesc", "Giá cao đến thấp")}
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="rating_desc">
                    <div className="flex items-center">
                      <Award className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-sm sm:text-base">
                        {t("store.sortRating", "Đánh giá cao")}
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between">
            {/* Filter Row */}
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 items-center">
              {/* Categories Filter */}
              {filterOptions.categories &&
                filterOptions.categories.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all text-xs sm:text-sm"
                      >
                        <ListFilter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">
                          {t("store.categories", "Danh mục")}
                        </span>
                        <span className="sm:hidden">
                          {t("store.categories", "Danh mục")}
                        </span>
                        <span className="ml-1">
                          ({selectedCategories.length}/
                          {getTotalCategoryOptions()})
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[min(calc(100vw-16px),320px)] sm:w-80 bg-gray-900 border-gray-700 text-white p-0 flex flex-col"
                      side="bottom"
                      align="start"
                      sideOffset={8}
                      avoidCollisions={true}
                      collisionPadding={16}
                      style={{
                        maxHeight: "min(400px, calc(100vh - 120px))",
                        zIndex: 9999,
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                        <DropdownMenuLabel className="text-yellow-500 text-sm sm:text-base p-0">
                          {t("store.categories", "Danh mục")}
                        </DropdownMenuLabel>
                      </div>

                      {/* Search Box */}
                      <div className="p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder={t(
                              "store.searchCategories",
                              "Tìm kiếm danh mục..."
                            )}
                            value={categorySearchTerm}
                            onChange={(e) =>
                              setCategorySearchTerm(e.target.value)
                            }
                            className="pl-8 bg-gray-800 border-gray-600 text-white text-xs sm:text-sm h-8"
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                          />
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                          {categorySearchTerm && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700"
                              onClick={() => setCategorySearchTerm("")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 p-3 sm:p-4 min-h-0">
                        {getFilteredCategories().length > 0 ? (
                          getFilteredCategories().map((category) => (
                            <div key={category.code}>
                              <DropdownMenuCheckboxItem
                                checked={selectedCategories.includes(
                                  category.code
                                )}
                                onCheckedChange={(checked) => {
                                  // Prevent dropdown from closing
                                  handleCategoryToggle(category.code);
                                }}
                                onSelect={(event) => {
                                  // Prevent dropdown from closing
                                  event.preventDefault();
                                }}
                                className="hover:!bg-yellow-500/20 hover:!text-yellow-100 focus:!bg-yellow-500/20 focus:!text-yellow-100 data-[highlighted]:!bg-yellow-500/20 data-[highlighted]:!text-yellow-100 text-white transition-colors text-sm"
                              >
                                <span className="font-medium">
                                  {category.name}
                                </span>
                              </DropdownMenuCheckboxItem>
                              {/* Sub-categories */}
                              {category.children &&
                                category.children.length > 0 && (
                                  <div className="ml-4">
                                    {category.children
                                      .filter(
                                        (child) =>
                                          !categorySearchTerm.trim() ||
                                          child.name
                                            .toLowerCase()
                                            .includes(
                                              categorySearchTerm.toLowerCase()
                                            )
                                      )
                                      .map((subCategory) => (
                                        <DropdownMenuCheckboxItem
                                          key={subCategory.code}
                                          checked={selectedCategories.includes(
                                            subCategory.code
                                          )}
                                          onCheckedChange={(checked) => {
                                            // Prevent dropdown from closing
                                            handleCategoryToggle(
                                              subCategory.code
                                            );
                                          }}
                                          onSelect={(event) => {
                                            // Prevent dropdown from closing
                                            event.preventDefault();
                                          }}
                                          className="hover:!bg-yellow-500/15 hover:!text-yellow-200 focus:!bg-yellow-500/15 focus:!text-yellow-200 data-[highlighted]:!bg-yellow-500/15 data-[highlighted]:!text-yellow-200 text-gray-300 text-xs sm:text-sm transition-colors"
                                        >
                                          <span className="ml-2">
                                            {subCategory.name}
                                          </span>
                                        </DropdownMenuCheckboxItem>
                                      ))}
                                  </div>
                                )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-400 text-sm">
                            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>
                              {t(
                                "store.noResultsFound",
                                "Không tìm thấy kết quả"
                              )}
                            </p>
                            {categorySearchTerm && (
                              <p className="text-xs mt-1">
                                {t(
                                  "store.tryDifferentKeywords",
                                  "Thử từ khóa khác"
                                )}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              {/* Attributes Filter */}
              {filterOptions.attributes &&
                filterOptions.attributes.length > 0 && (
                  <DropdownMenu
                    open={attributesDropdownOpen}
                    onOpenChange={setAttributesDropdownOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all text-xs sm:text-sm px-2 sm:px-3"
                      >
                        <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">
                          {t("store.attributes", "Thuộc tính")} (
                        </span>
                        <span className="sm:hidden">★(</span>
                        {selectedAttributes.length}/{getTotalAttributeOptions()}
                        <span>)</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[min(calc(100vw-16px),280px)] sm:w-72 bg-gray-900 border-gray-700 text-white p-0 flex flex-col"
                      side="bottom"
                      align="start"
                      sideOffset={8}
                      avoidCollisions={true}
                      collisionPadding={16}
                      style={{
                        maxHeight: "min(350px, calc(100vh - 120px))",
                        zIndex: 9999,
                      }}
                    >
                      {/* Header with close button for mobile */}
                      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                        <DropdownMenuLabel className="text-yellow-500 text-sm sm:text-base p-0">
                          {t("store.attributes", "Thuộc tính")}
                        </DropdownMenuLabel>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="sm:hidden h-6 w-6 p-0 hover:bg-gray-700"
                          onClick={() => setAttributesDropdownOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Search Box */}
                      <div className="p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder={t(
                              "store.searchAttributes",
                              "Tìm kiếm thuộc tính..."
                            )}
                            value={attributeSearchTerm}
                            onChange={(e) =>
                              setAttributeSearchTerm(e.target.value)
                            }
                            className="pl-8 bg-gray-800 border-gray-600 text-white text-xs sm:text-sm h-8"
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                          />
                          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                          {attributeSearchTerm && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700"
                              onClick={() => setAttributeSearchTerm("")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 p-3 sm:p-4 min-h-0">
                        {getFilteredAttributes().length > 0 ? (
                          getFilteredAttributes().map((attribute) => (
                            <div key={attribute.name} className="mb-2">
                              <div className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                {attribute.name}
                              </div>
                              {/* Show first 10 items or all if expanded */}
                              {(expandedAttributes.has(attribute.name)
                                ? attribute.value
                                : attribute.value.slice(0, 10)
                              ).map((value) => (
                                <DropdownMenuCheckboxItem
                                  key={`${attribute.name}-${value}`}
                                  checked={selectedAttributes.includes(
                                    `${attribute.name}:${value}`
                                  )}
                                  onCheckedChange={(checked) => {
                                    // Prevent dropdown from closing
                                    handleAttributeToggle(
                                      `${attribute.name}:${value}`
                                    );
                                  }}
                                  onSelect={(event) => {
                                    // Prevent dropdown from closing
                                    event.preventDefault();
                                  }}
                                  className="hover:!bg-purple-500/20 hover:!text-purple-100 focus:!bg-purple-500/20 focus:!text-purple-100 data-[highlighted]:!bg-purple-500/20 data-[highlighted]:!text-purple-100 text-gray-300 text-sm ml-2 transition-colors"
                                >
                                  {value}
                                </DropdownMenuCheckboxItem>
                              ))}
                              {/* Show more/less button */}
                              {attribute.value.length > 10 && (
                                <button
                                  onClick={() =>
                                    toggleAttributeExpansion(attribute.name)
                                  }
                                  className="px-4 py-1 text-xs text-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer ml-2 hover:bg-yellow-500/10 rounded"
                                >
                                  {expandedAttributes.has(attribute.name)
                                    ? `${t("store.showLess", "Ẩn bớt")}`
                                    : `+${attribute.value.length - 10} ${t(
                                        "store.more",
                                        "thêm..."
                                      )}`}
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-400 text-sm">
                            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>
                              {t(
                                "store.noResultsFound",
                                "Không tìm thấy kết quả"
                              )}
                            </p>
                            {attributeSearchTerm && (
                              <p className="text-xs mt-1">
                                {t(
                                  "store.tryDifferentKeywords",
                                  "Thử từ khóa khác"
                                )}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

              {/* Labels Filter */}
              {filterOptions.labels && filterOptions.labels.length > 0 && (
                <DropdownMenu
                  open={labelsDropdownOpen}
                  onOpenChange={setLabelsDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <Star className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">
                        {t("store.labels", "Nhãn")} (
                      </span>
                      <span className="sm:hidden">⭐(</span>
                      {selectedLabels.length}/{getTotalLabelsOptions()}
                      <span>)</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[min(calc(100vw-16px),256px)] sm:w-64 bg-gray-900 border-gray-700 text-white p-0 flex flex-col"
                    side="bottom"
                    align="start"
                    sideOffset={8}
                    avoidCollisions={true}
                    collisionPadding={16}
                    style={{
                      maxHeight: "min(320px, calc(100vh - 120px))",
                      zIndex: 9999,
                    }}
                  >
                    {/* Header with close button for mobile */}
                    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                      <DropdownMenuLabel className="text-yellow-500 text-sm sm:text-base p-0">
                        {t("store.labels", "Nhãn")}
                      </DropdownMenuLabel>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="sm:hidden h-6 w-6 p-0 hover:bg-gray-700"
                        onClick={() => setLabelsDropdownOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Search Box */}
                    <div className="p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder={t(
                            "store.searchLabels",
                            "Tìm kiếm nhãn..."
                          )}
                          value={labelSearchTerm}
                          onChange={(e) => setLabelSearchTerm(e.target.value)}
                          className="pl-8 bg-gray-800 border-gray-600 text-white text-xs sm:text-sm h-8"
                          autoComplete="off"
                          autoCapitalize="off"
                          spellCheck={false}
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                        {labelSearchTerm && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-700"
                            onClick={() => setLabelSearchTerm("")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 p-3 sm:p-4 min-h-0">
                      {getFilteredLabels().length > 0 ? (
                        getFilteredLabels().map((label) => (
                          <DropdownMenuCheckboxItem
                            key={label}
                            checked={selectedLabels.includes(label)}
                            onCheckedChange={(checked) => {
                              // Prevent dropdown from closing
                              handleLabelToggle(label);
                            }}
                            onSelect={(event) => {
                              // Prevent dropdown from closing
                              event.preventDefault();
                            }}
                            className="hover:!bg-blue-500/20 hover:!text-blue-100 focus:!bg-blue-500/20 focus:!text-blue-100 data-[highlighted]:!bg-blue-500/20 data-[highlighted]:!text-blue-100 text-white transition-colors text-xs sm:text-sm"
                          >
                            {label}
                          </DropdownMenuCheckboxItem>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-400 text-sm">
                          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>
                            {t(
                              "store.noResultsFound",
                              "Không tìm thấy kết quả"
                            )}
                          </p>
                          {labelSearchTerm && (
                            <p className="text-xs mt-1">
                              {t(
                                "store.tryDifferentKeywords",
                                "Thử từ khóa khác"
                              )}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Price Range Filter */}
              <DropdownMenu
                open={priceDropdownOpen}
                onOpenChange={setPriceDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all text-xs sm:text-sm"
                  >
                    <DollarSign className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">
                      {t("store.priceRange", "Khoảng giá")}:{" "}
                    </span>
                    <span className="sm:hidden">₫</span>
                    <span className="max-w-[100px] sm:max-w-none truncate">
                      {getPriceRangeDisplay()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[min(calc(100vw-16px),320px)] sm:w-80 bg-gray-900 border-gray-700 text-white p-0 flex flex-col"
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  avoidCollisions={true}
                  collisionPadding={16}
                  style={{
                    maxHeight: "min(500px, calc(100vh - 150px))",
                    zIndex: 9999,
                  }}
                >
                  {/* Header with close button for mobile */}
                  <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-900 flex-shrink-0">
                    <DropdownMenuLabel className="text-yellow-500 text-sm sm:text-base">
                      {t("store.priceRange", "Khoảng giá")}
                    </DropdownMenuLabel>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-gray-700"
                      onClick={() => setPriceDropdownOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 p-3 sm:p-4 min-h-0">
                    {/* Unified Price Range Filter */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm sm:text-base font-medium text-yellow-500">
                          {t("store.priceFilter", "Lọc theo giá")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {t("store.priceHint", "Để trống = không giới hạn")}
                        </div>
                      </div>

                      {/* Smart Input Fields */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 flex items-center">
                              <span>{t("store.minPrice", "Giá tối thiểu")}</span>
                              <span className="ml-1 text-gray-500">(₫)</span>
                            </label>
                            <Input
                              type="number"
                              placeholder={t("store.noLimit", "Không giới hạn")}
                              value={tempPriceRange.from || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                const numValue = value === "" ? undefined : parseInt(value, 10);
                                setTempPriceRange((prev) => ({
                                  ...prev,
                                  from: numValue,
                                }));
                              }}
                              className="bg-gray-800 border-gray-600 text-white text-xs h-9 focus:border-yellow-500 transition-colors"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-400 flex items-center">
                              <span>{t("store.maxPrice", "Giá tối đa")}</span>
                              <span className="ml-1 text-gray-500">(₫)</span>
                            </label>
                            <Input
                              type="number"
                              placeholder={t("store.noLimit", "Không giới hạn")}
                              value={tempPriceRange.to || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                const numValue = value === "" ? undefined : parseInt(value, 10);
                                setTempPriceRange((prev) => ({
                                  ...prev,
                                  to: numValue,
                                }));
                              }}
                              className="bg-gray-800 border-gray-600 text-white text-xs h-9 focus:border-yellow-500 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Quick Preset Buttons */}
                        <div className="flex flex-wrap gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTempPriceRange({ from: undefined, to: 100000 })}
                            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1 h-7"
                          >
                            {t("store.pricePreset1", "≤ 100K")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTempPriceRange({ from: 100000, to: 500000 })}
                            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1 h-7"
                          >
                            {t("store.pricePreset2", "100K-500K")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTempPriceRange({ from: 500000, to: 1000000 })}
                            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1 h-7"
                          >
                            {t("store.pricePreset3", "500K-1M")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setTempPriceRange({ from: 1000000, to: undefined })}
                            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-2 py-1 h-7"
                          >
                            {t("store.pricePreset4", "≥ 1M")}
                          </Button>
                        </div>

                        {/* Interactive Slider */}
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-gray-400 flex items-center justify-between">
                            <span>{t("store.useSlider", "Hoặc kéo thanh trượt")}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setTempPriceRange({ from: undefined, to: undefined })}
                              className="text-gray-500 hover:text-gray-300 text-xs px-1 py-0 h-5"
                            >
                              {t("store.clear", "Xóa")}
                            </Button>
                          </div>
                          <div className="px-2">
                            <Slider
                              value={[
                                tempPriceRange.from || 0,
                                tempPriceRange.to || MaxRangePrice,
                              ]}
                              onValueChange={handleSliderChange}
                              max={MaxRangePrice}
                              min={0}
                              step={10000}
                              className="w-full"
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 px-2">
                            <span>
                              {tempPriceRange.from ? 
                                `${tempPriceRange.from.toLocaleString("vi-VN")} ₫` : 
                                t("store.noMin", "Không tối thiểu")
                              }
                            </span>
                            <span>
                              {tempPriceRange.to ? 
                                `${tempPriceRange.to.toLocaleString("vi-VN")} ₫` : 
                                t("store.noMax", "Không tối đa")
                              }
                            </span>
                          </div>
                        </div>

                        {/* Smart Apply Button */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={applySliderPrice}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm h-9 font-medium transition-colors"
                          >
                            {t("store.applyFilter", "Áp dụng bộ lọc")}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setTempPriceRange({ from: undefined, to: undefined });
                              setPriceRange({});
                            }}
                            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white text-xs px-3 h-9"
                          >
                            {t("store.reset", "Đặt lại")}
                          </Button>
                        </div>

                        {/* Current Filter Display */}
                        {(priceRange.from || priceRange.to) && (
                          <div className="bg-gray-800/50 rounded-lg p-2 border border-gray-700">
                            <div className="text-xs text-gray-400 mb-1">
                              {t("store.currentFilter", "Bộ lọc hiện tại")}:
                            </div>
                            <div className="text-sm text-yellow-400 font-medium">
                              {getPriceRangeDisplay()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Has Discount Filter */}
              <Button
                variant={hasDiscount ? "default" : "outline"}
                onClick={() => setHasDiscount(!hasDiscount)}
                className={
                  hasDiscount
                    ? "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500 hover:border-yellow-600 transition-all text-xs sm:text-sm px-2 sm:px-3"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all text-xs sm:text-sm px-2 sm:px-3"
                }
              >
                <Tag className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">
                  {t("store.hasDiscount", "Có giảm giá")}
                </span>
                <span className="sm:hidden">%</span>
              </Button>
            </div>
            {/* Provider Filter */}
            <Select
              value={selectedProvider}
              onValueChange={handleProviderChange}
            >
              <SelectTrigger className="w-[100px] sm:w-[140px] bg-gray-800 border-gray-700 text-white text-xs sm:text-sm">
                <SelectValue placeholder={t("store.allPlatforms", "Tất cả")} />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all" className="text-xs sm:text-sm">
                  {t("store.allPlatforms", "Tất cả")}
                </SelectItem>
                <SelectItem value="shopee" className="text-xs sm:text-sm">
                  Shopee
                </SelectItem>
                <SelectItem value="lazada" className="text-xs sm:text-sm">
                  Lazada
                </SelectItem>
                <SelectItem value="tiki" className="text-xs sm:text-sm">
                  Tiki
                </SelectItem>
                <SelectItem value="sendo" className="text-xs sm:text-sm">
                  Sendo
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            {/* Results Count - moved here as secondary info */}
            <div className="flex items-center justify-start sm:justify-start space-x-1 text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              <span className="font-medium">
                {totalRecords.toLocaleString()}
              </span>
              <span>{t("store.products", "sản phẩm")}</span>
            </div>
            {/* Reset Filters */}
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-gray-400 hover:text-white hover:bg-gray-700 transition-all text-xs sm:text-sm px-2 sm:px-3"
            >
              <Filter className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">
                {t("store.resetFilters", "Đặt lại")}
              </span>
              <span className="sm:hidden">⟲</span>
            </Button>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 ||
            selectedLabels.length > 0 ||
            selectedAttributes.length > 0 ||
            selectedProvider ||
            priceRange.from ||
            priceRange.to ||
            hasDiscount) && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm text-gray-400 mb-1">
                <span className="hidden sm:inline">
                  {t("store.activeFilters", "Bộ lọc đang áp dụng")}:
                </span>
                <span className="sm:hidden">Đang lọc:</span>
              </span>
              {selectedCategories.map((categoryCode) => {
                const category =
                  filterOptions.categories?.find((c) => c.code === categoryCode) ||
                  filterOptions.categories
                    ?.find((c) =>
                      c.children?.some((child) => child.code === categoryCode)
                    )
                    ?.children?.find((child) => child.code === categoryCode);
                return (
                  <Badge
                    key={categoryCode}
                    variant="secondary"
                    className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition-colors"
                  >
                    {category?.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0 text-yellow-300 hover:text-yellow-100"
                      onClick={() => handleCategoryToggle(categoryCode)}
                    >
                      ×
                    </Button>
                  </Badge>
                );
              })}
              {(priceRange.from || priceRange.to) && (
                <Badge
                  variant="secondary"
                  className="bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
                >
                  <DollarSign className="mr-1 h-3 w-3" />
                  {getPriceRangeDisplay()}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-green-300 hover:text-green-100"
                    onClick={() => setPriceRange({})}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {hasDiscount && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 transition-colors"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {t("store.hasDiscount", "Có giảm giá")}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-yellow-300 hover:text-yellow-100"
                    onClick={() => setHasDiscount(false)}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {selectedAttributes.map((attribute) => (
                <Badge
                  key={attribute}
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
                >
                  {attribute}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-purple-300 hover:text-purple-100"
                    onClick={() => handleAttributeToggle(attribute)}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
              {selectedLabels.map((label: string) => (
                <Badge
                  key={label}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                >
                  {label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-blue-300 hover:text-blue-100"
                    onClick={() => handleLabelToggle(label)}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
              {selectedProvider && (
                <Badge
                  variant="secondary"
                  className="bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
                >
                  {selectedProvider}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-green-300 hover:text-green-100"
                    onClick={() => setSelectedProvider("")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
      {/* Loading State - Only show for initial load */}
      {isLoading && products.length === 0 && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">{t("store.loading", "Đang tải...")}</p>
        </div>
      )}
      {/* Product Grid with overlay loading */}
      {products.length > 0 ? (
        <>
          <div className="relative">
            {/* Overlay loading indicator */}
            {isFiltering && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-start justify-center pt-8 rounded-lg transition-all duration-300">
                <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-500"></div>
                    <span className="text-sm text-gray-300">
                      {t("store.filtering", "Đang lọc...")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} attributes={selectedAttributes} />
              ))}
            </div>
          </div>

          {/* Conditional Pagination or Infinity Scroll */}
          {isInfinityScroll ? (
            <>
              {/* Infinity Scroll Trigger */}
              {hasNextPage && (
                <div
                  ref={loadMoreRef}
                  className="flex justify-center items-center mt-8 sm:mt-12 py-4"
                >
                  {isLoadingMore && (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-500"></div>
                      <span className="text-gray-300 text-sm">
                        {t("store.loadingMore", "Đang tải thêm...")}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {/* End of results indicator */}
              {!hasNextPage && products.length > 0 && (
                <div className="text-center mt-8 sm:mt-12 py-4">
                  <span className="text-gray-400 text-sm">
                    {t(
                      "store.allProductsLoaded",
                      "Đã hiển thị tất cả sản phẩm"
                    )}
                  </span>
                </div>
              )}
            </>
          ) : (
            /* Regular Pagination */
            !isHidePagination &&
            totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8 sm:mt-12">
                <Button
                  variant="outline"
                  disabled={currentPage <= 1 || isFiltering}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-white hover:text-white transition-all disabled:opacity-50 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <span className="hidden sm:inline">
                    {t("store.previous", "Trước")}
                  </span>
                  <span className="sm:hidden">‹</span>
                </Button>

                <span className="text-gray-300 text-xs sm:text-sm px-2">
                  <span className="hidden sm:inline">
                    {t("store.pageInfo", "Trang {{current}} / {{total}}", {
                      current: currentPage,
                      total: totalPages,
                    })}
                  </span>
                  <span className="sm:hidden">
                    {currentPage}/{totalPages}
                  </span>
                </span>

                <Button
                  variant="outline"
                  disabled={currentPage >= totalPages || isFiltering}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-white hover:text-white transition-all disabled:opacity-50 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <span className="hidden sm:inline">
                    {t("store.next", "Tiếp")}
                  </span>
                  <span className="sm:hidden">›</span>
                </Button>
              </div>
            )
          )}
        </>
      ) : !isLoading && products.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-4">
            {t("store.noProductsFound", "Không tìm thấy sản phẩm nào")}
          </p>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-white hover:text-white transition-all"
          >
            {t("store.clearFilters", "Xóa bộ lọc")}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
