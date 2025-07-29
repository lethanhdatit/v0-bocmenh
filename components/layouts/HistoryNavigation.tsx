"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function HistoryNavigation() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      key: "topups",
      label: t("nav.topupsHistory", "Lịch sử nạp duyên"),
      href: "/topups-history",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      key: "services",
      label: t("nav.servicesHistory", "Lịch sử sử dụng dịch vụ"),
      href: "/services-history",
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex gap-2 mb-6">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.key}
            onClick={() => handleNavigation(item.href)}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={`gap-2 transition-all duration-200 ${
              isActive
                ? "bg-yellow-600 hover:bg-yellow-700 text-black border-yellow-500"
                : "bg-gray-800/50 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-yellow-500/50"
            }`}
          >
            {item.icon}
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
