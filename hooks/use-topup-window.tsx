import { useCallback, useRef } from "react";

export function useTopupWindow() {
  const winRef = useRef<Window | null>(null);

  const openTopup = useCallback((onSuccess?: (transId: string) => void) => {
    
    winRef.current = window.open(
      "/topups?openNewWindow=0",
      "TopupWindow",
      "width=640,height=750,location=no,menubar=no,toolbar=no,status=no,resizable=yes,scrollbars=yes"
    );

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "paymentComplete") {
        if (onSuccess) onSuccess(event.data.transId);
        if (winRef.current) winRef.current.close();
        window.removeEventListener("message", handler);
      }
    };
    window.addEventListener("message", handler);
  }, []);

  return { openTopup };
}