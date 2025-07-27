import { useMyFates } from "@/contexts/MyFatesContext";
import { payService } from "@/lib/topups";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { showGlobalLoading, hideGlobalLoading } from "@/lib/utils";

export function usePayment({
  id,
  serviceName,
  servicePrice,
  onSuccess,
  onError,
  scrollToRef,
}: {
  id: string;
  serviceName: string;
  servicePrice: number | string;
  onSuccess?: () => void;
  onError?: (err: any) => void;
  scrollToRef?: React.RefObject<HTMLDivElement>;
}) {
  const [paying, setPaying] = useState(false);
  const { fetchMyFates } = useMyFates();

  async function pay(id: string) {
    const result = await payService(id);
    await fetchMyFates();
    return result;
  }

  const handlePay = async () => {
    setPaying(true);
    showGlobalLoading("Đang thanh toán...");
    try {
      await pay(id);
      toast({
        title: "Thanh toán thành công!",
        description: `<span className="text-yellow-400 font-bold">${serviceName}</span> đã sẵn sàng.`,
        variant: "success",
      });
      if (scrollToRef?.current) {
        setTimeout(() => {
          scrollToRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 1000);
      }
      onSuccess?.();
    } catch (err: any) {
      if (err?.response?.data?.beErrorCode === "FatesNotEnough") {
        toast({
          title: "Không đủ điểm duyên!",
          description: `Bạn cần có ít nhất <span className="text-yellow-400 font-bold">${servicePrice}</span> điểm duyên để mở khoá dịch vụ <span className="text-yellow-400 font-bold">${serviceName}</span>.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Thanh toán thất bại!",
          description: err?.message || "Có lỗi xảy ra.",
          variant: "destructive",
        });
      }
      onError?.(err);
    } finally {
      setPaying(false);
      hideGlobalLoading();
    }
  };

  return { paying, handlePay };
}
