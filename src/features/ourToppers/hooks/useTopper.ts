"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/lib/apiResult";
import { toppersPortalService } from "@/features/ourToppers/services/toppersPortalService";

export const topperKeys = {
  all: ["topper"] as const,
  detail: (id: string) => [...topperKeys.all, id] as const,
};

export function useTopper(id: string | undefined) {
  const trimmedId = id?.trim() ?? "";

  return useQuery({
    queryKey: topperKeys.detail(trimmedId),
    queryFn: ({ signal }) => toppersPortalService.getTopperById(trimmedId, signal),
    enabled: Boolean(trimmedId),
    staleTime: 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError) {
        if (
          error.httpStatus === 400 ||
          error.httpStatus === 401 ||
          error.httpStatus === 404
        ) {
          return false;
        }
      }
      return failureCount < 1;
    },
    refetchOnWindowFocus: true,
  });
}
