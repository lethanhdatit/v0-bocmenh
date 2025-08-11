import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StarDisplayProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  starClassName?: string;
}

// Rule: x.9 round up to full star, x.1 to x.8 show half star
export const calculateStarDisplay = (rating: number) => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  
  let halfStar = false;
  let totalFullStars = fullStars;
  
  if (decimal >= 0.9) {
    totalFullStars += 1; // Round up to full star
  } else if (decimal >= 0.1) {
    halfStar = true; // Show half star
  }
  
  return { fullStars: totalFullStars, halfStar };
};

export const StarDisplay: React.FC<StarDisplayProps> = ({
  rating,
  maxStars = 5,
  size = "md",
  className,
  starClassName,
}) => {
  const { fullStars, halfStar } = calculateStarDisplay(rating);
  
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };
  
  const starSize = sizeClasses[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(maxStars)].map((_, i) => {
        if (i < fullStars) {
          // Full star
          return (
            <Star
              key={i}
              className={cn(
                starSize,
                "text-yellow-500 fill-yellow-500 flex-shrink-0",
                starClassName
              )}
            />
          );
        } else if (i === fullStars && halfStar) {
          // Half star
          return (
            <div key={i} className={cn("relative flex-shrink-0", starSize)}>
              <Star
                className={cn(
                  starSize,
                  "text-gray-600 absolute top-0 left-0",
                  starClassName
                )}
              />
              <Star
                className={cn(
                  starSize,
                  "text-yellow-500 fill-yellow-500 absolute top-0 left-0",
                  starClassName
                )}
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                }}
              />
            </div>
          );
        } else {
          // Empty star
          return (
            <Star
              key={i}
              className={cn(
                starSize,
                "text-gray-600 flex-shrink-0",
                starClassName
              )}
            />
          );
        }
      })}
    </div>
  );
};

// For compact display with responsive sizing
export const CompactStarDisplay: React.FC<StarDisplayProps & { compact?: boolean }> = ({
  rating,
  maxStars = 5,
  compact = false,
  className,
  starClassName,
}) => {
  const { fullStars, halfStar } = calculateStarDisplay(rating);
  
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(maxStars)].map((_, i) => {
        const starClass = cn(
          "flex-shrink-0",
          compact 
            ? "w-3 h-3 xs:w-3.5 xs:h-3.5" 
            : "w-3 h-3 xs:w-4 xs:h-4",
          starClassName
        );
        
        if (i < fullStars) {
          // Full star
          return (
            <Star
              key={i}
              className={cn(starClass, "text-yellow-500 fill-yellow-500")}
            />
          );
        } else if (i === fullStars && halfStar) {
          // Half star
          return (
            <div key={i} className={cn("relative flex-shrink-0", 
              compact 
                ? "w-3 h-3 xs:w-3.5 xs:h-3.5" 
                : "w-3 h-3 xs:w-4 xs:h-4"
            )}>
              <Star
                className={cn(starClass, "text-gray-600 absolute top-0 left-0")}
              />
              <Star
                className={cn(starClass, "text-yellow-500 fill-yellow-500 absolute top-0 left-0")}
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                }}
              />
            </div>
          );
        } else {
          // Empty star
          return (
            <Star
              key={i}
              className={cn(starClass, "text-gray-600")}
            />
          );
        }
      })}
    </div>
  );
};
