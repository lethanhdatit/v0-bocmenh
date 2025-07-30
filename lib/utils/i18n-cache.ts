// Cache management utility for i18n system
import { clearTranslationCache } from "@/lib/infra/i18n";
import { clearI18nCache, getCacheStats } from "@/i18n/server";

export class I18nCacheManager {
  private static instance: I18nCacheManager;

  static getInstance(): I18nCacheManager {
    if (!this.instance) {
      this.instance = new I18nCacheManager();
    }
    return this.instance;
  }

  // Clear all caches (both client and server)
  clearAllCaches(): void {
    // Clear client-side cache
    if (typeof window !== "undefined") {
      clearTranslationCache();
    }

    // Clear server-side cache (if running on server)
    if (typeof window === "undefined") {
      clearI18nCache();
    }
  }

  // Clear only client-side cache
  clearClientCache(): void {
    if (typeof window !== "undefined") {
      clearTranslationCache();
    }
  }

  // Get cache statistics (server-side only)
  async getCacheStats() {
    if (typeof window === "undefined") {
      return getCacheStats();
    }
    return null;
  }

  // Preload translations for specific locales (client-side)
  async preloadTranslations(locales: string[] = ["vi", "en"]): Promise<void> {
    if (typeof window === "undefined") return;

    const namespaces = ["common", "terms", "privacy", "help", "about", "contact"];
    
    try {
      const promises = locales.flatMap(locale =>
        namespaces.map(ns =>
          fetch(`/locales/${locale}/${ns}.json`)
            .then(res => res.json())
            .catch(err => {
              console.warn(`Failed to preload ${locale}/${ns}:`, err);
              return null;
            })
        )
      );

      await Promise.all(promises);
    } catch (error) {
      console.error("Error preloading translations:", error);
    }
  }

  // Force refresh translations (clear cache and reload)
  async refreshTranslations(): Promise<void> {
    this.clearAllCaches();
    
    if (typeof window !== "undefined") {
      // Reload page to reinitialize translations
      window.location.reload();
    }
  }

  // Check if translations are cached (client-side)
  isTranslationsCached(): boolean {
    if (typeof window === "undefined") return false;
    
    try {
      const cached = localStorage.getItem("i18n_translations_cache");
      return !!cached;
    } catch {
      return false;
    }
  }

  // Get cache size info (client-side)
  getClientCacheInfo(): { 
    isCached: boolean; 
    cacheSize?: number; 
    timestamp?: number; 
  } {
    if (typeof window === "undefined") {
      return { isCached: false };
    }

    try {
      const cached = localStorage.getItem("i18n_translations_cache");
      if (!cached) return { isCached: false };

      const parsed = JSON.parse(cached);
      return {
        isCached: true,
        cacheSize: new Blob([cached]).size,
        timestamp: parsed.timestamp,
      };
    } catch {
      return { isCached: false };
    }
  }
}

// Export singleton instance
export const cacheManager = I18nCacheManager.getInstance();

// Export utility functions
export const i18nCache = {
  clear: () => cacheManager.clearAllCaches(),
  clearClient: () => cacheManager.clearClientCache(),
  refresh: () => cacheManager.refreshTranslations(),
  preload: (locales?: string[]) => cacheManager.preloadTranslations(locales),
  stats: () => cacheManager.getCacheStats(),
  info: () => cacheManager.getClientCacheInfo(),
  isCached: () => cacheManager.isTranslationsCached(),
};
