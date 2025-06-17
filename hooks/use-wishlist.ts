"use client"

import { useState, useEffect, useCallback } from "react"

const WISHLIST_STORAGE_KEY = "bocmenh_wishlist"

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist))
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
      // Initialize with empty array if localStorage is corrupt or inaccessible
      setWishlist([])
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
      } catch (error) {
        console.error("Failed to save wishlist to localStorage:", error)
      }
    }
  }, [wishlist, isLoaded])

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev
      return [...prev, productId]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
  }, [])

  const isWishlisted = useCallback(
    (productId: string) => {
      return wishlist.includes(productId)
    },
    [wishlist],
  )

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (isWishlisted(productId)) {
        removeFromWishlist(productId)
      } else {
        addToWishlist(productId)
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist],
  )

  return { wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, isWishlistLoaded: isLoaded }
}
