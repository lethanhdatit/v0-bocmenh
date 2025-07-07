import { create } from "zustand";

interface GlobalLoadingState {
  isVisible: boolean;
  message?: string;
  show: (message?: string) => void;
  hide: () => void;
}

export const useGlobalLoading = create<GlobalLoadingState>((set) => ({
  isVisible: false,
  message: "",
  show: (message) =>
    set((state) => ({
      isVisible: true,
      message: message !== undefined ? message : state.message,
    })),
  hide: () => set({ isVisible: false, message: "" }),
}));
