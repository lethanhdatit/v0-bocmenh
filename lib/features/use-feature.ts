'use client';

import { useCallback } from 'react';
import { getFeatureConfig, isFeatureActive, isFeatureComingSoon, isFeatureMaintenance } from './feature-flags';

/**
 * Hook đơn giản để kiểm tra trạng thái feature
 */
export function useFeature(path: string) {
  const config = getFeatureConfig(path);
  
  const isActive = useCallback(() => {
    return isFeatureActive(path);
  }, [path]);
  
  const isComingSoon = useCallback(() => {
    return isFeatureComingSoon(path);
  }, [path]);

  const isMaintenance = useCallback(() => {
    return isFeatureMaintenance(path);
  }, [path]);

  return {
    config,
    isActive: isActive(),
    isComingSoon: isComingSoon(),
    isMaintenance: isMaintenance(),
    title: config?.title || '',
    description: config?.description || '',
    estimatedLaunch: config?.estimatedLaunch
  };
}
