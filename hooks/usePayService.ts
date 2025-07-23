import { useMyFates } from "@/contexts/MyFatesContext";
import { payService } from "@/lib/topups";

export function usePayService() {
  const { fetchMyFates } = useMyFates();
  return async (id: string) => {
    const result = await payService(id);
    await fetchMyFates();
    return result;
  };
}