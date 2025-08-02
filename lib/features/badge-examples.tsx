/**
 * Example usage of Coming Soon Badge system with custom configurations
 */

import { ComingSoonNavBadge } from '@/components/features/ComingSoonBadge';

// Example 1: Standalone badge with custom configuration
export function StandaloneBadgeExample() {
  return (
    <div className="relative inline-block p-4">
      <span>Menu Item</span>
      <ComingSoonNavBadge
        position="top-center"
        size="md"
        distance="far"
      />
    </div>
  );
}

// Example 3: Different configurations for different menu sections
export const MENU_BADGE_CONFIGS = {
  // Main navigation - subtle badges
  main: {
    position: 'top-right' as const,
    size: 'xs' as const,
    distance: 'normal' as const
  },
  
  // Sidebar navigation - more prominent badges
  sidebar: {
    position: 'top-right' as const,
    size: 'sm' as const,
    distance: 'far' as const
  },
  
  // Mobile menu - compact badges
  mobile: {
    position: 'top-right' as const,
    size: 'xs' as const,
    distance: 'near' as const
  }
} as const;
