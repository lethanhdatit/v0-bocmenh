import { useCallback, useRef } from "react";
import { useMyFates } from "@/contexts/MyFatesContext";

export function useTopupWindow() {
  const winRef = useRef<Window | null>(null);
  const { fetchMyFates } = useMyFates();

  const openTopup = useCallback((onSuccess?: (transId: string) => void) => {
    const scaleRate = 0.8;

    const width = Math.round(window.innerWidth * scaleRate);
    const height = Math.round(window.innerHeight * scaleRate);

    winRef.current = window.open(
      "/topups?openNewWindow=0",
      "TopupWindow",
      `width=${width},height='100%',location=no,menubar=no,toolbar=no,status=no,resizable=yes,scrollbars=yes`
    );

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "paymentComplete") {
        fetchMyFates();
        if (onSuccess) onSuccess(event.data.transId);
        if (winRef.current) winRef.current.close();
        window.removeEventListener("message", handler);
      }
    };
    window.addEventListener("message", handler);
  }, []);

  return { openTopup };
}
