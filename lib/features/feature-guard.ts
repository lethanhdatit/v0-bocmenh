import React from "react";
import { getFeatureConfig } from "@/lib/features/feature-flags";
import { ComingSoonPage } from "@/components/features/ComingSoonPage";

/**
 * Higher-order component để wrap pages với feature flags
 * Tự động hiển thị coming soon page nếu feature chưa sẵn sàng
 */
export function withFeatureGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  path: string
) {
  return function FeatureGuardedComponent(props: P) {
    const featureConfig = getFeatureConfig(path);
    
    // Nếu feature coming soon, hiển thị coming soon page
    if (featureConfig?.status === 'coming-soon') {
      return React.createElement(ComingSoonPage, {
        title: featureConfig.title,
        description: featureConfig.description,
        estimatedLaunch: featureConfig.estimatedLaunch
      });
    }

    // Nếu feature active, render component bình thường
    return React.createElement(WrappedComponent, props);
  };
}

/**
 * Hook để kiểm tra nhanh feature status
 */
export function useFeatureGuard(path: string) {
  const featureConfig = getFeatureConfig(path);
  
  return {
    isActive: featureConfig?.status === 'active',
    isComingSoon: featureConfig?.status === 'coming-soon',
    shouldShowComingSoon: featureConfig?.status === 'coming-soon',
    config: featureConfig
  };
}
