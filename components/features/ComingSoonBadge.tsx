'use client';

import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface ComingSoonBadgeProps {
  className?: string;
  variant?: 'corner' | 'inline' | 'floating';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  type?: 'coming-soon' | 'maintenance';
}

interface ComingSoonNavBadgeProps {
  className?: string;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' | 'inline-left' | 'inline-center' | 'inline-right';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  distance?: 'near' | 'normal' | 'far';
  type?: 'coming-soon' | 'maintenance';
}

/**
 * Badge nhẹ nhàng cho tính năng "Coming Soon" hoặc "Maintenance"
 * Hiển thị góc trên phải của card/item
 */
export function ComingSoonBadge({ 
  className,
  variant = 'corner', 
  size = 'sm',
  type = 'coming-soon'
}: ComingSoonBadgeProps) {
  const { t } = useTranslation();

  const baseStyles = {
    corner: 'absolute top-2 right-2 z-10',
    inline: 'inline-flex',
    floating: 'relative z-10' // Không dùng absolute để tránh ảnh hưởng layout
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm', 
    lg: 'px-4 py-2 text-base'
  };

  // Different colors and text for different types
  const typeConfig = {
    'coming-soon': {
      bgGradient: 'from-amber-500 to-orange-500',
      text: t('common.comingSoon'),
      borderColor: 'border-white/20'
    },
    'maintenance': {
      bgGradient: 'from-red-500 to-red-600',
      text: t('common.maintenance'),
      borderColor: 'border-white/30'
    }
  };

  const config = typeConfig[type];

  return (
    <div className={cn(
      // Base styles
      `bg-gradient-to-r ${config.bgGradient}`,
      "text-white font-medium rounded-full",
      `shadow-lg ${config.borderColor}`,
      "backdrop-blur-sm",
      // Animation
      type === 'coming-soon' ? "animate-pulse-glow" : "animate-pulse",
      // Variant positioning
      baseStyles[variant],
      // Size
      sizeStyles[size],
      // Responsive: ẩn trên mobile để tránh chen chúc
      variant === 'floating' && "hidden sm:flex",
      className
    )}>
      <div className="flex items-center gap-1">
        <span className={cn(
          "w-1.5 h-1.5 bg-white/80 rounded-full",
          type === 'coming-soon' ? "animate-bounce" : "animate-ping"
        )} />
        <span className="whitespace-nowrap">{config.text}</span>
      </div>
    </div>
  );
}

/**
 * Badge cho navigation menu với nhiều tùy chọn positioning và sizing
 */
export function ComingSoonNavBadge({ 
  className,
  position = 'top-right',
  size = 'xs',
  distance = 'normal',
  type = 'coming-soon'
}: ComingSoonNavBadgeProps) {
  const { t } = useTranslation();
  
  // Position styles
  const positionStyles = {
    'top-right': 'top-0 right-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-0 left-0',
    'inline-left': 'left-0 top-1/2 -translate-y-1/2',
    'inline-center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'inline-right': 'right-0 top-1/2 -translate-y-1/2'
  };

  // Distance from menu name
  const distanceStyles = {
    'near': {
      'top-right': '-top-1 -right-1',
      'top-center': '-top-1 left-1/2 -translate-x-1/2',
      'top-left': '-top-1 -left-1',
      'bottom-right': '-bottom-1 -right-1',
      'bottom-center': '-bottom-1 left-1/2 -translate-x-1/2',
      'bottom-left': '-bottom-1 -left-1',
      'inline-left': '-left-1 top-1/2 -translate-y-1/2',
      'inline-center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
      'inline-right': '-right-1 top-1/2 -translate-y-1/2'
    },
    'normal': {
      'top-right': '-top-2 -right-2',
      'top-center': '-top-2 left-1/2 -translate-x-1/2',
      'top-left': '-top-2 -left-2',
      'bottom-right': '-bottom-2 -right-2',
      'bottom-center': '-bottom-2 left-1/2 -translate-x-1/2',
      'bottom-left': '-bottom-2 -left-2',
      'inline-left': '-left-2 top-1/2 -translate-y-1/2',
      'inline-center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
      'inline-right': '-right-2 top-1/2 -translate-y-1/2'
    },
    'far': {
      'top-right': '-top-3 -right-3',
      'top-center': '-top-3 left-1/2 -translate-x-1/2',
      'top-left': '-top-3 -left-3',
      'bottom-right': '-bottom-3 -right-3',
      'bottom-center': '-bottom-3 left-1/2 -translate-x-1/2',
      'bottom-left': '-bottom-3 -left-3',
      'inline-left': '-left-3 top-1/2 -translate-y-1/2',
      'inline-center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
      'inline-right': '-right-3 top-1/2 -translate-y-1/2'
    }
  };

  // Size styles for nav badge
  const navSizeStyles = {
    xs: 'px-1 py-0.5 text-xs leading-none scale-75',
    sm: 'px-1.5 py-0.5 text-xs leading-none scale-90',
    md: 'px-2 py-1 text-xs leading-none',
    lg: 'px-2.5 py-1 text-sm leading-none'
  };

  // Different configs for different types
  const typeConfig = {
    'coming-soon': {
      bgGradient: 'from-amber-500 to-orange-500',
      text: t('common.comingSoon'),
      borderColor: 'border-white/30',
      animation: 'animate-pulse'
    },
    'maintenance': {
      bgGradient: 'from-red-500 to-red-600', 
      text: t('common.maintenance'),
      borderColor: 'border-white/40',
      animation: 'animate-pulse'
    }
  };

  const config = typeConfig[type];
  
  return (
    <span 
      className={cn(
        // Base positioning
        "absolute z-10",
        // Dynamic position and distance
        distanceStyles[distance][position],
        // Styling
        `bg-gradient-to-r ${config.bgGradient}`,
        "text-white font-medium rounded-full",
        config.borderColor,
        config.animation,
        // "pointer-events-none", // Không cản click vào menu item
        "group-hover:scale-110 transition-transform", // Hover effect
        "whitespace-nowrap", // Không wrap text
        // Size
        navSizeStyles[size],
        className
      )}
      title={config.text} // Tooltip khi hover
    >
      {config.text}
    </span>
  );
}

/**
 * Convenience component for Maintenance Badge
 */
export function MaintenanceBadge(props: Omit<ComingSoonBadgeProps, 'type'>) {
  return <ComingSoonBadge {...props} type="maintenance" />;
}

/**
 * Convenience component for Maintenance Nav Badge  
 */
export function MaintenanceNavBadge(props: Omit<ComingSoonNavBadgeProps, 'type'>) {
  return <ComingSoonNavBadge {...props} type="maintenance" />;
}
