"use client";

import Image from "next/image";

interface PaymentProviderIconProps {
  provider: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function PaymentProviderIcon({
  provider,
  size = "md",
  showName = true,
}: PaymentProviderIconProps) {
  const sizeClasses = {
    sm: { container: "w-6 h-4", image: { width: 20, height: 12 } },
    md: { container: "w-8 h-6", image: { width: 24, height: 16 } },
    lg: { container: "w-12 h-8", image: { width: 32, height: 20 } },
  };

  const { container, image } = sizeClasses[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center ${container} bg-white rounded border border-gray-300 shadow-sm p-1`}
      >
        <Image
          src={`/${provider.toLowerCase()}.png`}
          alt={provider}
          width={image.width}
          height={image.height}
          className="rounded max-w-full max-h-full object-contain"
        />
      </div>
      {showName && (
        <span className="text-sm text-gray-200 font-medium">{provider}</span>
      )}
    </div>
  );
}