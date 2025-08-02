'use client';

import { ReactNode } from 'react';
import { useFeature } from '@/lib/features/use-feature';
import { cn } from '@/lib/utils';

interface FeatureWrapperProps {
  children: ReactNode;
  path: string;
  className?: string;
  disableClicks?: boolean;
  reduceOpacity?: boolean;
}

/**
 * Wrapper để áp dụng styling cho features coming soon
 * Giữ nguyên nội dung gốc, chỉ thêm opacity và disable clicks
 */
export function FeatureWrapper({ 
  children, 
  path, 
  className,
  disableClicks = true,
  reduceOpacity = true
}: FeatureWrapperProps) {
  const { isComingSoon } = useFeature(path);
  
  if (!isComingSoon) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={cn(
        "relative",
        // Giảm opacity cho coming soon
        reduceOpacity && "opacity-60 hover:opacity-70 transition-opacity",
        // Disable pointer events nếu cần
        disableClicks && "pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
}
