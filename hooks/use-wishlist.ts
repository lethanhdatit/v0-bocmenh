"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/AuthContext" // To check login status

const WISHLIST_STORAGE_KEY = "bocmenh_wishlist"

async function fetchWishlistAPI(): Promise<string[]> {
  try {
    const response = await fetch("/api/wishlist")
    if (!response.ok) {
      console.error("Failed to fetch wishlist from API:", response.statusText)
      return []
    }
    const data = await response.json()
    return data.wishlist || []
  } catch (error) {
    console.error("Error fetching wishlist from API:", error)
    return []
  }
}

async function addToWishlistAPI(productId: string): Promise<boolean> {
  try {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    })
    if (!response.ok) {
      console.error("Failed to add to wishlist API:", response.statusText)
      return false
    }
    // const data = await response.json(); // Optional: use response data
    return true
  } catch (error) {
    console.error("Error adding to wishlist API:", error)
    return false
  }
}

async function removeFromWishlistAPI(productId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/wishlist/${productId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      console.error("Failed to remove from wishlist API:", response.statusText)
      return false
    }
    // const data = await response.json(); // Optional: use response data
    return true
  } catch (error) {
    console.error("Error removing from wishlist API:", error)
    return false
  }
}

export function useWishlist() {
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { isLoggedIn } = useAuth()

  // Load from localStorage initially, then sync with API if logged in
  useEffect(() => {
    let localWishlist: string[] = []
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (storedWishlist) {
        localWishlist = JSON.parse(storedWishlist)
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
      localWishlist = []
    }

    setWishlistProductIds(localWishlist) // Set local wishlist first for immediate UI update

    if (isLoggedIn) {
      fetchWishlistAPI().then((apiWishlist) => {
        // Simple merge: combine local and API, remove duplicates.
        // API could be the source of truth, or merge logic can be more complex.
        // For now, let's assume API is more up-to-date for logged-in users.
        // Or, if local has items not in API (e.g., added while offline), sync them up.
        // For simplicity here: if API returns data, use it. Otherwise, stick to local.
        // A more robust sync would be needed for production.

        // Let's try to sync local to server if local has items and server doesn't
        // This is a very basic sync logic.
        const combined = Array.from(new Set([...localWishlist, ...apiWishlist]))
        setWishlistProductIds(combined)
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(combined))

        // Optional: If local has items not on server, add them
        localWishlist.forEach((localId) => {
          if (!apiWishlist.includes(localId)) {
            addToWishlistAPI(localId) // Sync to server
          }
        })
      })
    }
    setIsLoaded(true)
  }, [isLoggedIn]) // Re-fetch/re-sync if login status changes

  // Save to localStorage whenever wishlistProductIds changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistProductIds))
      } catch (error) {
        console.error("Failed to save wishlist to localStorage:", error)
      }
    }
  }, [wishlistProductIds, isLoaded])

  const addToWishlist = useCallback(
    async (productId: string) => {
      setWishlistProductIds((prev) => {
        if (prev.includes(productId)) return prev
        const newWishlist = [...prev, productId]
        // Optimistic update to localStorage
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist))
        return newWishlist
      })
      if (isLoggedIn) {
        await addToWishlistAPI(productId)
        // Potentially re-fetch or update based on API response if needed
      }
    },
    [isLoggedIn],
  )

  const removeFromWishlist = useCallback(
    async (productId: string) => {
      setWishlistProductIds((prev) => {
        const newWishlist = prev.filter((id) => id !== productId)
        // Optimistic update to localStorage
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist))
        return newWishlist
      })
      if (isLoggedIn) {
        await removeFromWishlistAPI(productId)
        // Potentially re-fetch or update based on API response
      }
    },
    [isLoggedIn],
  )

  const isWishlisted = useCallback(
    (productId: string) => {
      return wishlistProductIds.includes(productId)
    },
    [wishlistProductIds],
  )

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (isWishlisted(productId)) {
        await removeFromWishlist(productId)
      } else {
        await addToWishlist(productId)
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist],
  )

  return {
    wishlistProductIds,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    toggleWishlist,
    isWishlistLoaded: isLoaded,
  }
}
