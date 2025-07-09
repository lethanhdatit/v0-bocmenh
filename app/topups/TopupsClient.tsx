"use client";

import { useState, useEffect, useRef } from "react";
import {
  type TopupPackage,
  type PaymentGate,
  getPaymentGates,
  buyTopup,
} from "@/lib/topups";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TopupsClientProps {
  initialTopupPackages: TopupPackage[];
  openNewWindow: boolean;
}

export default function TopupsClient({
  initialTopupPackages,
  openNewWindow,
}: TopupsClientProps) {
  const { t } = useTranslation("common");
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<TopupPackage | null>(
    null
  );
  const [paymentGates, setPaymentGates] = useState<PaymentGate[]>([]);
  const [selectedPaymentGate, setSelectedPaymentGate] = useState<string | null>(
    null
  );
  const [isBuying, setIsBuying] = useState(false);
  const paymentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGates = async () => {
      try {
        const gates = await getPaymentGates();
        setPaymentGates(gates);
        if (gates.length > 0) {
          setSelectedPaymentGate(gates[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch payment gates:", error);
        toast({
          title: t("topups.error.common"),
          description: t("topups.fetchGatesError"),
          variant: "destructive",
        });
      }
    };
    fetchGates();
  }, [t, toast]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        console.warn("Message from untrusted origin:", event.origin);
        return;
      }

      const { type, transId } = event.data;
      if (type === "paymentComplete" && transId) {
        window.location.href = `/topups-checkout?transId=${transId}`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleBuy = async () => {
    if (!selectedPackage || !selectedPaymentGate) {
      toast({
        title: t("topups.error.common"),
        description: t("topups.selectPackageAndGate"),
        variant: "destructive",
      });
      return;
    }

    setIsBuying(true);
    showGlobalLoading(t("topups.processingPayment"));
    try {
      const { ipnLink } = await buyTopup(
        selectedPackage.id,
        selectedPaymentGate
      );

      if (openNewWindow) {
        // Open IPN link in a new small window
        const newWindow = window.open(
          ipnLink,
          "_blank",
          "width=600,height=700,location=no,menubar=no,toolbar=no,status=no,resizable=yes,scrollbars=yes"
        );

        if (!newWindow) {
          toast({
            title: t("topups.error.common"),
            description: t("topups.popupBlocked"),
            variant: "destructive",
          });
        }
      } else {
        window.location.href = ipnLink;
      }
    } catch (error) {
      console.error("Failed to initiate purchase:", error);
      toast({
        title: t("topups.error.common"),
        description: t("topups.purchaseFailed"),
        variant: "destructive",
      });
    } finally {
      setIsBuying(false);
      hideGlobalLoading();
    }
  };

  const handleSelectPackage = (pkg: TopupPackage) => {
    setSelectedPackage(pkg);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 250);
  };

  // Icon SVG chuyên nghiệp cho từng gói
  const icons = [
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      key="icon-huu-duyen"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="#FFFBEA"
      />
      <path
        d="M16 8v8l6 3"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>, // Hữu Duyên
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      key="icon-thoi-duyen"
    >
      <rect
        x="6"
        y="6"
        width="20"
        height="20"
        rx="6"
        stroke="#7C3AED"
        strokeWidth="2"
        fill="#F3F0FF"
      />
      <path
        d="M16 10v6l4 2"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>, // Thời Duyên
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      key="icon-nhat-duyen"
    >
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="#FFF7E6"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <circle cx="16" cy="16" r="6" fill="#FDBA74" />
    </svg>, // Nhật Duyên
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      key="icon-nguyet-duyen"
    >
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="#F3F0FF"
        stroke="#7C3AED"
        strokeWidth="2"
      />
      <path d="M22 16a6 6 0 1 1-12 0" stroke="#7C3AED" strokeWidth="2" />
    </svg>, // Nguyệt Duyên
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      key="icon-thien-duyen"
    >
      <ellipse
        cx="16"
        cy="20"
        rx="10"
        ry="6"
        fill="#E0E7FF"
        stroke="#6366F1"
        strokeWidth="2"
      />
      <ellipse cx="16" cy="12" rx="6" ry="3" fill="#6366F1" opacity="0.2" />
    </svg>, // Thiên Duyên
    <svg
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      key="icon-vu-duyen"
    >
      <ellipse
        cx="16"
        cy="20"
        rx="10"
        ry="6"
        fill="#DBF4FF"
        stroke="#0EA5E9"
        strokeWidth="2"
      />
      <path d="M12 16c0-2 8-2 8 0" stroke="#0EA5E9" strokeWidth="2" />
    </svg>, // Vũ Duyên
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialTopupPackages.map((pkg, idx) => {
          return (
            <div
              key={pkg.id}
              className={cn(
                "relative group rounded-xl border bg-white p-0 cursor-pointer transition-all duration-300 overflow-hidden shadow hover:shadow-lg",
                selectedPackage?.id === pkg.id
                  ? "border-yellow-400 ring-2 ring-yellow-300 md:scale-105 md:-translate-y-2 shadow-2xl shadow-yellow-200/40 z-10"
                  : "border-gray-200"
              )}
              onClick={() => handleSelectPackage(pkg)}
              style={{ minHeight: 340 }}
            >
              {/* Badge khuyến mãi cắt xéo góc phải */}
              {(pkg.amountDiscount ?? 0) > 0 ||
              (pkg.amountDiscountRate ?? 0) > 0 ? (
                <span
                  className={cn(
                    "absolute right-[-48px] top-4 z-20 w-40 text-center py-1 text-[11px] font-bold text-pink-700 bg-gradient-to-r from-yellow-300 via-pink-200 to-yellow-400 shadow border border-yellow-200",
                    "rotate-12 select-none pointer-events-none",
                    "sm:w-44 sm:text-xs"
                  )}
                  style={{
                    letterSpacing: 1,
                  }}
                >
                  {t("topups.promotionBadge")}
                </span>
              ) : null}
              {/* Icon + tên */}
              <div className="flex flex-col items-center pt-6 pb-3 border-b border-gray-100 bg-white">
                <span className="mb-2">{icons[idx % icons.length]}</span>
                <span className="text-xl font-bold text-gray-900 tracking-wide">
                  {pkg.name}
                </span>
              </div>
              {/* Duyên nhận được + bonus */}
              <div className="py-4 px-2 sm:px-4 bg-gray-50 border-b border-gray-100 flex flex-col items-center">
                <span className="text-2xl font-semibold text-indigo-700">
                  {pkg.finalFates} {t("topups.fatesUnit")}
                </span>
                {/* Bonus */}
                {(pkg.fateBonus ?? 0) > 0 || (pkg.fateBonusRate ?? 0) > 0 ? (
                  <div className="flex flex-col items-center gap-1 mt-2">
                    {(pkg.fateBonus ?? 0) > 0 && (
                      <div className="flex items-center gap-1 text-green-700 font-medium text-xs">
                        <span className="text-base font-bold">
                          +{pkg.fateBonus ?? 0}
                        </span>
                        <span>
                          {t("topups.fatesUnit")}{" "}
                          {t("topups.bonusDirect")}
                        </span>
                      </div>
                    )}
                    {(pkg.fateBonusRate ?? 0) > 0 && (
                      <div className="flex items-center gap-1 text-green-600 font-medium text-xs">
                        <span className="text-base font-bold">
                          +{pkg.fateBonusRate ?? 0}%
                        </span>
                        <span>
                          {t("topups.fatesUnit")}{" "}
                          {t("topups.bonusPercent")}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
              {/* Giá + giảm giá */}
              <div className="py-4 px-2 sm:px-4 bg-yellow-50 flex flex-col items-center rounded-b-xl">
                <span className="text-sm text-gray-400 line-through">
                  {(pkg.amountDiscount ?? 0) > 0
                    ? `${pkg.amount.toLocaleString("vi-VN")}₫`
                    : ""}
                </span>
                <span className="text-xl font-bold text-yellow-700">
                  {pkg.finalAmount.toLocaleString("vi-VN")}₫
                </span>
                {/* Giảm giá */}
                {(pkg.amountDiscount ?? 0) > 0 ||
                (pkg.amountDiscountRate ?? 0) > 0 ? (
                  <div className="flex flex-col items-center gap-1 mt-2">
                    {(pkg.amountDiscount ?? 0) > 0 && (
                      <div className="flex items-center gap-1 text-orange-600 font-medium text-xs">
                        <span className="text-base font-bold">
                          -{(pkg.amountDiscount ?? 0).toLocaleString("vi-VN")}₫
                        </span>
                        <span>{t("topups.discountDirect")}</span>
                      </div>
                    )}
                    {(pkg.amountDiscountRate ?? 0) > 0 && (
                      <div className="flex items-center gap-1 text-orange-500 font-medium text-xs">
                        <span className="text-base font-bold">
                          -{pkg.amountDiscountRate ?? 0}%
                        </span>
                        <span>{t("topups.discountPercent")}</span>
                      </div>
                    )}
                  </div>
                ) : null}
                {/* Dòng mô tả */}
                <span
                  className="block mt-2 text-xs text-gray-700 text-center"
                  dangerouslySetInnerHTML={{
                    __html: t("topups.cardSummary", {
                      defaultValue:
                        "Chỉ với <b>{{amount}}₫</b> bạn nhận được <b>{{fates}} duyên</b>!",
                      amount: pkg.finalAmount.toLocaleString("vi-VN"),
                      fates: pkg.finalFates,
                      interpolation: { escapeValue: false },
                    }),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Thanh toán */}
      {selectedPackage && (
        <div
          ref={paymentRef}
          className="mt-10 p-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-300 rounded-2xl shadow-2xl relative"
        >
          {/* Checkout Bill */}
          <div className="mb-6 w-full max-w-md mx-auto bg-white rounded-lg shadow border border-gray-200">
            <div className="flex items-center gap-3 px-4 pt-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-2xl">
                {
                  icons[
                    initialTopupPackages.findIndex(
                      (p) => p.id === selectedPackage.id
                    )
                  ]
                }
              </span>
              <span className="font-bold text-base text-gray-900">
                {selectedPackage.name}
              </span>
            </div>
            {/* Duyên */}
            <div className="px-4 pt-3 pb-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {t("checkout.fates")}
                </span>
                <span className="font-semibold text-gray-900">
                  {selectedPackage.finalFates} {t("topups.fatesUnit")}
                </span>
              </div>
              {(selectedPackage.fateBonus ?? 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("topups.bonusDirect")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    +{selectedPackage.fateBonus} {t("topups.fatesUnit")}
                  </span>
                </div>
              )}
              {(selectedPackage.fateBonusRate ?? 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("topups.bonusPercent")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    +{selectedPackage.fateBonusRate}% {t("topups.fatesUnit")}
                  </span>
                </div>
              )}
            </div>
            {/* Giá */}
            <div className="px-4 pt-3 pb-4 border-t border-dashed border-gray-200 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {t("checkout.subTotalAmount")}
                </span>
                <span className="line-through text-gray-400">
                  {selectedPackage.amount.toLocaleString("vi-VN")}₫
                </span>
              </div>
              {(selectedPackage.amountDiscount ?? 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("topups.discountDirect")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    -{selectedPackage.amountDiscount!.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              )}
              {(selectedPackage.amountDiscountRate ?? 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {t("topups.discountPercent")}
                  </span>
                  <span className="font-semibold text-gray-800">
                    -{selectedPackage.amountDiscountRate}%
                  </span>
                </div>
              )}
              <div className="flex justify-between mt-2 pt-2 border-t border-dashed border-gray-200 text-base">
                <span className="font-bold text-gray-900">
                  {t("checkout.totalAmount")}
                </span>
                <span className="font-bold text-green-700">
                  {selectedPackage.finalAmount.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>
          </div>
          {/* Tiêu đề chọn cổng thanh toán */}
          <h2 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-2">
            {t("topups.selectPaymentGate")}
          </h2>
          {paymentGates.length > 0 ? (
            <RadioGroup
              onValueChange={setSelectedPaymentGate}
              value={selectedPaymentGate || ""}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {paymentGates.map((gate) => {
                const isDisabled = gate.active !== true;
                return (
                  <div
                    key={gate.id}
                    className={cn(
                      "flex items-center space-x-3 p-4 border-2 border-yellow-200 rounded-xl cursor-pointer bg-white/80 hover:bg-yellow-50 transition-colors shadow",
                      isDisabled &&
                        "opacity-50 pointer-events-none cursor-not-allowed"
                    )}
                  >
                    <RadioGroupItem
                      value={gate.id}
                      id={`gate-${gate.id}`}
                      disabled={isDisabled}
                    />
                    <Label
                      htmlFor={`gate-${gate.id}`}
                      className="flex items-center gap-3 flex-grow cursor-pointer"
                    >
                      {gate.icon && (
                        <Image
                          src={gate.icon || "/placeholder.svg"}
                          alt={gate.name}
                          width={64}
                          height={18}
                          className="drop-shadow"
                        />
                      )}
                      <span className="text-xs text-yellow-700 ml-auto hidden sm:block">
                        {gate.description}
                      </span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          ) : (
            <p className="text-yellow-700">{t("topups.noPaymentGates")}</p>
          )}

          <Button
            onClick={handleBuy}
            disabled={!selectedPackage || !selectedPaymentGate || isBuying}
            className="mystical-button w-full mt-8 text-lg shadow-lg"
          >
            {isBuying ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin-slow">🔮</span>
                {t("topups.processing")}
              </span>
            ) : (
              t("topups.buyNow")
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
