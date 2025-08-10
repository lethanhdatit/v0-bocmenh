import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useGlobalLoading } from "@/lib/store/globalLoadingStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showGlobalLoading(message?: string) {
  useGlobalLoading.getState().show(message);
}

export function hideGlobalLoading() {
  useGlobalLoading.getState().hide();
}

export function getIsLoading() {
  return useGlobalLoading.getState().isVisible;
}
export function getLoadingMessage() {
  return useGlobalLoading.getState().message;
}

export interface PaginatedBase<TDto> {
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  totalSelected?: number;
  totalPages?: number;
  items: TDto[];
}
