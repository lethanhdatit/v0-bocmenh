/**
 * Configuration constants for Coming Soon badges
 */

export const BADGE_CONFIG = {
  // Default configuration for navigation badges
  navigation: {
    position: 'top-left' as const,
    size: 'xs' as const,
    distance: 'normal' as const,
  },
  
  // Default configuration for feature cards
  featureCard: {
    variant: 'floating' as const,
    size: 'sm' as const,
  },
  
  // Available options
  options: {
    positions: [
      'top-right',
      'top-center', 
      'top-left',
      'bottom-right',
      'bottom-center',
      'bottom-left',
      'inline-left',
      'inline-center',
      'inline-right'
    ] as const,
    
    sizes: ['xs', 'sm', 'md', 'lg'] as const,
    
    distances: ['near', 'normal', 'far'] as const,
    
    variants: ['corner', 'inline', 'floating'] as const
  }
} as const;

// Type exports
export type BadgePosition = typeof BADGE_CONFIG.options.positions[number];
export type BadgeSize = typeof BADGE_CONFIG.options.sizes[number];
export type BadgeDistance = typeof BADGE_CONFIG.options.distances[number];
export type BadgeVariant = typeof BADGE_CONFIG.options.variants[number];
