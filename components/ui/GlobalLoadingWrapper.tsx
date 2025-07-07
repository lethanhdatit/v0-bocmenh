"use client";

import { useGlobalLoading } from "@/lib/store/globalLoadingStore";
import { GlobalLoading } from "@/components/ui/global-loading";

export default function GlobalLoadingWrapper() {
  const { isVisible, message } = useGlobalLoading();
  return <GlobalLoading isVisible={isVisible} message={message} />;
}
