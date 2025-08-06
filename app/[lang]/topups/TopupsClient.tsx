"use client";

import { useState, useEffect, useRef } from "react";
import {
  type TopupPackage,
  type PaymentGate,
  type MemoCheckoutResponse,
  buyTopup,
  memoCheckout,
} from "@/lib/topups";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TopupBill } from "@/components/topups/TopupBill";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useLayoutVisibility } from "@/contexts/LayoutVisibilityContext";
import {
  Infinity,
  Radar,
  Pyramid,
  SunSnow,
  Aperture,
  ShipWheel,
  BadgePercent,
} from "lucide-react";

interface TopupsClientProps {
  initialTopupPackages: TopupPackage[];
  openNewWindow: boolean;
  paymentGates: PaymentGate[];
}

export default function TopupsClient({
  initialTopupPackages,
  paymentGates,
  openNewWindow,
}: TopupsClientProps) {
  const { t } = useTranslation("common");
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<TopupPackage | null>(
    null
  );
  const [selectedPaymentGate, setSelectedPaymentGate] = useState<string | null>(
    paymentGates.find((gate) => gate.active === true)?.id ?? null
  );
  const [isBuying, setIsBuying] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const paymentRef = useRef<HTMLButtonElement>(null);
  const [selectedMemoCheckout, setSelectedMemoCheckout] =
    useState<MemoCheckoutResponse | null>(null);
  const { hideNav, hideFooter } = useLayoutVisibility();

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

    if (!openNewWindow) {
      hideNav();
      hideFooter();
    }

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

    if (!agreeToTerms) {
      toast({
        title: t("topups.error.common"),
        description: t("topups.agreeTermsError"),
        variant: "destructive",
      });
      return;
    }

    setIsBuying(true);
    showGlobalLoading(t("topups.processingPayment"));
    try {
      const { ipnLink } = await buyTopup(
        selectedPackage.id,
        selectedPaymentGate,
        true
      );

      if (openNewWindow) {
        // Open IPN link in a new small window
        const scaleRate = 0.8;

        const width = Math.round(window.innerWidth * scaleRate);
        const height = Math.round(window.innerHeight * scaleRate);

        const newWindow = window.open(
          ipnLink,
          "_blank",
          `width=${width},height="100%",location=no,menubar=no,toolbar=no,status=no,resizable=yes,scrollbars=yes`
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

  const loadMemoCheckout = async (pkgId: string, paymentGateId: string) => {
    try {
      const data = await memoCheckout(pkgId, paymentGateId);
      setSelectedMemoCheckout(data);
    } catch (error) {
      setSelectedMemoCheckout(null);
      throw error;
    }
  };

  const handleSelectPaymentGate = async (value: string) => {
    setSelectedPaymentGate(value);
    setAgreeToTerms(false);
    if (selectedPackage) {
      showGlobalLoading(t("topups.processing"));
      try {
        await loadMemoCheckout(selectedPackage.id, value);
        setTimeout(() => {
        paymentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 250);
      } catch (error) {
        toast({
          title: t("topups.error.common"),
          description: t("topups.systemFailed"),
          variant: "destructive",
        });
      } finally {
        hideGlobalLoading();
      }
    }
  };

  const handleSelectPackage = async (pkg: TopupPackage) => {
    setSelectedPackage(pkg);
    setAgreeToTerms(false);
    showGlobalLoading(t("topups.processing"));
    try {
      await loadMemoCheckout(pkg.id, selectedPaymentGate ?? "");
      setTimeout(() => {
        paymentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 250);
    } catch (error) {
      toast({
        title: t("topups.error.common"),
        description: t("topups.systemFailed"),
        variant: "destructive",
      });
    } finally {
      hideGlobalLoading();
    }
  };

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
                  className="absolute top-1 right-1 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-300 via-pink-200 to-yellow-400 shadow border border-yellow-200"
                  style={{ pointerEvents: "none" }}
                >
                  <BadgePercent className="w-6 h-6 text-red-700" />
                </span>
              ) : null}
              {/* Icon + tên */}
              <div className="mt-4 flex flex-col items-center pt-6 pb-3 border-b border-gray-100 bg-white">
                <span className="text-xl font-bold text-gray-900 tracking-wide">
                  {pkg.name}
                </span>
                <span className="mt-2">{icons[idx % icons.length]}</span>
              </div>
              {/* Duyên nhận được + bonus */}
              <div className="py-4 px-2 sm:px-4 bg-gray-50 border-b border-gray-100 flex flex-col items-center">
                <span className="text-sm text-gray-400 line-through">
                  {(pkg.fateBonus ?? 0) > 0 || (pkg.fateBonusRate ?? 0) > 0
                    ? `${pkg.fates} ${t("topups.fatesUnit")}`
                    : ""}
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
                          {t("topups.bonusDirect")} {t("topups.fatesUnit")}
                        </span>
                      </div>
                    )}
                    {(pkg.fateBonusRate ?? 0) > 0 && (
                      <div className="flex items-center gap-1 text-green-600 font-medium text-xs">
                        <span className="text-base font-bold">
                          +{pkg.fateBonusRate ?? 0}%
                        </span>
                        <span>{t("topups.bonusPercent")}</span>
                      </div>
                    )}
                  </div>
                ) : null}
                <span className="text-2xl font-semibold text-indigo-700 mt-2">
                  {pkg.finalFates} {t("topups.fatesUnit")}
                </span>
              </div>
              {/* Giá + giảm giá */}
              <div className="py-4 px-2 sm:px-4 bg-yellow-50 flex flex-col items-center rounded-b-xl">
                <span className="text-sm text-gray-400 line-through">
                  {(pkg.amountDiscount ?? 0) > 0 ||
                  (pkg.amountDiscountRate ?? 0) > 0
                    ? `${pkg.amount.toLocaleString("vi-VN")}₫`
                    : ""}
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
                <span className="text-2xl font-bold text-yellow-700 mt-2">
                  {pkg.finalAmount.toLocaleString("vi-VN")}₫
                </span>
                {/* Dòng mô tả */}
                <span
                  className="block mt-4 text-sm text-gray-700 text-center"
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
                <i
                  className="block mt-2 text-xs text-gray-500 text-center"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      `topups.${pkg.vaTaxIncluded ? "cardVAT" : "cardNotVAT"}`,
                      {
                        defaultValue: "",
                        vatRate: pkg.vaTaxRate,
                        interpolation: { escapeValue: false },
                      }
                    ),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Thanh toán */}
      {selectedPackage && (
        <div className="mt-10 p-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-2 border-yellow-300 rounded-2xl shadow-2xl relative">
          {/* Tiêu đề chọn cổng thanh toán */}
          <h2 className="text-2xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
            {t("topups.selectPaymentGate")}
          </h2>
          {/* Checkout Bill - Memo Checkout */}
          {selectedMemoCheckout && (
            <div className="mb-4 w-full mx-auto bg-gray-50 rounded-xl shadow-inner border border-dashed border-gray-200 text-left text-sm font-mono p-4">
              <TopupBill data={selectedMemoCheckout.memoCheckout} />
            </div>
          )}
          {paymentGates.length > 0 ? (
            <RadioGroup
              onValueChange={handleSelectPaymentGate}
              value={selectedPaymentGate || ""}
              className="grid mb-2 grid-cols-1 sm:grid-cols-2 gap-4 h-full items-stretch"
            >
              {paymentGates.map((gate) => {
                const isDisabled = gate.active !== true;
                return (
                  <Label
                    key={gate.id}
                    htmlFor={`gate-${gate.id}`}
                    className={cn(
                      "flex items-center space-x-3 p-4 border-2 border-yellow-200 rounded-xl cursor-pointer bg-white/80 hover:bg-yellow-50 transition-colors shadow h-full",
                      isDisabled &&
                        "opacity-50 pointer-events-none cursor-not-allowed"
                    )}
                    style={{ width: "100%" }}
                  >
                    <RadioGroupItem
                      value={gate.id}
                      id={`gate-${gate.id}`}
                      disabled={isDisabled}
                    />
                    {gate.icon && (
                      <Image
                        src={`/${gate.icon}` || "/placeholder.svg"}
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
                );
              })}
            </RadioGroup>
          ) : (
            <p className="text-yellow-700">{t("topups.noPaymentGates")}</p>
          )}

          {/* Terms Agreement */}
          <div className="mt-6 mb-4">
            <label className="flex items-start space-x-3 text-gray-700">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-yellow-500 bg-white border-yellow-300 rounded focus:ring-yellow-500 focus:ring-2"
              />
              <span className="text-sm">
                {t("topups.agreeToTerms")}{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-500 transition-colors font-medium underline"
                >
                  {t("topups.termsOfService")}
                </a>{" "}
                {t("topups.and")}{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-500 transition-colors font-medium underline"
                >
                  {t("topups.privacyPolicy")}
                </a>
              </span>
            </label>
          </div>

          <Button
            ref={paymentRef}
            onClick={handleBuy}
            disabled={!selectedPackage || !selectedPaymentGate || !agreeToTerms || isBuying}
            className="mystical-button w-full mt-2 text-lg shadow-lg"
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

// Icon SVG chuyên nghiệp cho từng gói
const icons = [
  <ShipWheel
    key="icon-vo-vi"
    size={32}
    strokeWidth={2.2}
    className="text-blue-400 drop-shadow"
  />, // Vô Vi
  <Aperture
    key="icon-vo-nga"
    size={32}
    strokeWidth={2.2}
    className="text-purple-400 drop-shadow"
  />, // Vô Ngã
  <SunSnow
    key="icon-vo-tuong"
    size={32}
    strokeWidth={2.2}
    className="text-gray-400 drop-shadow"
  />, // Vô Tướng
  <Radar
    key="icon-vo-uy"
    size={32}
    strokeWidth={2.2}
    className="text-green-400 drop-shadow"
  />, // Vô Uý
  <Pyramid
    key="icon-vo-nhiem"
    size={32}
    strokeWidth={2.2}
    className="text-cyan-400 drop-shadow"
  />, // Vô Nhiễm
  <Infinity
    key="icon-vo-luong"
    size={32}
    strokeWidth={2.4}
    className="text-yellow-400 drop-shadow"
  />, // Vô Lượng
];
