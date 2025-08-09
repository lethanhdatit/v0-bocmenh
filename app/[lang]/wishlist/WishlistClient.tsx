"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import ProductCard from "@/components/store/ProductCard"
import { useTranslation } from "react-i18next"
import { HeartCrack, ShoppingBag, RefreshCw, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getMyFavorites, type FavoriteItem, type ProductBase } from "@/lib/products"
import { useAuth } from "@/contexts/AuthContext"

export default function WishlistClient() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Infinity scroll pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const pageSize = 20

  // Refs for infinity scroll
  const isInitialLoad = useRef(true)
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const fetchFavorites = useCallback(async (page: number = 1, isRefresh: boolean = false, append: boolean = false) => {
    if (!user) return
    
    try {
      if (isRefresh) {
        setIsRefreshing(true)
      } else if (append) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }
      setError(null)
      
      const response = await getMyFavorites(pageSize, page)
      
      if (append) {
        // Append new items for infinity scroll
        setFavoriteItems(prev => [...prev, ...response.items])
      } else {
        // Replace items for initial load or refresh
        setFavoriteItems(response.items)
      }
      
      setTotalPages(response.totalPages || 0)
      setTotalRecords(response.totalRecords || 0)
      setCurrentPage(response.pageNumber || 1)
      
      // Update hasNextPage for infinity scroll
      setHasNextPage((response.pageNumber || 1) < (response.totalPages || 0))
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
      setError(t("wishlist.errorLoading", "Không thể tải danh sách yêu thích"))
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
      setIsLoadingMore(false)
      isInitialLoad.current = false
    }
  }, [user, pageSize, t])

  useEffect(() => {
    fetchFavorites(1)
  }, [fetchFavorites])

  // Load more function for infinity scroll
  const loadMore = useCallback(async () => {
    if (!hasNextPage || isLoadingMore || isRefreshing || !user) return

    const nextPage = currentPage + 1
    await fetchFavorites(nextPage, false, true)
  }, [hasNextPage, isLoadingMore, isRefreshing, currentPage, user, fetchFavorites])

  // Intersection Observer for infinity scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasNextPage && !isLoadingMore && !isRefreshing && !isLoading) {
          loadMore()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    )

    observerRef.current = observer

    // Only observe if we have the ref and not in loading state
    if (loadMoreRef.current && !isLoading) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasNextPage, isLoadingMore, isRefreshing, isLoading, loadMore])

  const handleRefresh = () => {
    // Reset to first page and clear existing items
    setCurrentPage(1)
    setFavoriteItems([])
    fetchFavorites(1, true)
  }

  // Handle when a product is unfavorited from ProductCard
  const handleProductUnfavorited = useCallback((productId: string) => {
    // Remove the item from the current list immediately for better UX
    setFavoriteItems(prev => prev.filter(item => item.product.id !== productId))
    
    // Update total records count
    setTotalRecords(prev => Math.max(0, prev - 1))
    
    // Update hasNextPage based on new total
    const newTotal = Math.max(0, totalRecords - 1)
    const newTotalPages = Math.ceil(newTotal / pageSize)
    setTotalPages(newTotalPages)
    setHasNextPage(currentPage < newTotalPages)
  }, [totalRecords, pageSize, currentPage])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-8 min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-sm sm:text-base">{t("wishlist.loading", "Đang tải danh sách yêu thích...")}</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-16 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center">
          <HeartCrack className="w-20 h-20 sm:w-24 sm:h-24 text-red-500/30 mb-6" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{t("wishlist.errorTitle", "Có lỗi xảy ra")}</h1>
          <p className="text-gray-400 mb-8 max-w-md text-sm sm:text-base">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button onClick={handleRefresh} variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-white hover:text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("common.retry", "Thử lại")}
            </Button>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold">
              <Link href="/store">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("wishlist.browseProducts", "Xem sản phẩm")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!user || favoriteItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-16 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center">
          <HeartCrack className="w-20 h-20 sm:w-24 sm:h-24 text-yellow-500/30 mb-6" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{t("wishlist.emptyTitle", "Danh sách yêu thích trống")}</h1>
          <p className="text-gray-400 mb-8 max-w-md text-sm sm:text-base">{t("wishlist.emptySubtitle", "Hãy thêm những sản phẩm yêu thích để dễ dàng tìm lại sau này")}</p>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-lg hover:shadow-yellow-500/30">
            <Link href="/store">
              <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {t("wishlist.browseProducts", "Khám phá sản phẩm")}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center sm:text-left mb-12 sm:mb-16">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-2 sm:mb-3">
              {t("wishlist.title", "Danh Sách Yêu Thích")}
            </h1>
          </div>
        </header>

        {/* Simple Stats - Only Total Records */}
        {totalRecords > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 sm:p-6 text-center relative">
              {/* Refresh Button - Top Right */}
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              
              <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-2">{totalRecords}</div>
              <div className="text-sm sm:text-base text-gray-400">{t("wishlist.totalFavorites", "Tổng sản phẩm yêu thích")}</div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {favoriteItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {favoriteItems.map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={item.product}
                  onUnfavorited={handleProductUnfavorited}
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20"
                />
              ))}
            </div>

            {/* Infinity Scroll Loading Indicator */}
            {hasNextPage && (
              <div 
                ref={loadMoreRef}
                className="flex justify-center items-center py-6 sm:py-8"
              >
                {isLoadingMore ? (
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm sm:text-base">{t("wishlist.loadingMore", "Đang tải thêm...")}</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-2">{t("wishlist.scrollForMore", "Cuộn xuống để xem thêm")}</div>
                    <div className="w-8 h-1 bg-yellow-500/30 rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            )}

            {/* End of results indicator */}
            {!hasNextPage && favoriteItems.length > 0 && (
              <div className="text-center py-6 sm:py-8">
                <div className="inline-flex items-center space-x-2 text-gray-500 bg-gray-800/30 px-4 py-2 rounded-lg border border-gray-700">
                  <HeartCrack className="h-4 w-4" />
                  <span className="text-sm">{t("wishlist.endOfResults", "Đã hiển thị tất cả sản phẩm yêu thích")}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Current page has no items but there are favorites in other pages */
          <div className="text-center py-12 sm:py-16">
            <HeartCrack className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              {t("wishlist.noItemsFound", "Không tìm thấy sản phẩm")}
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              {t("wishlist.tryRefresh", "Thử làm mới để cập nhật danh sách")}
            </p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-600 hover:border-gray-500 text-white hover:text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("common.refresh", "Làm mới")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
