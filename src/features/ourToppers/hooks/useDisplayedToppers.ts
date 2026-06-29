"use client";

import { useQuery } from "@tanstack/react-query";
import { toppersPortalService } from "@/features/ourToppers/services/toppersPortalService";

export const displayedToppersKeys = {
  all: ["displayed-toppers"] as const,
};

export function useDisplayedToppers() {
  return useQuery({
    queryKey: displayedToppersKeys.all,
    queryFn: toppersPortalService.getDisplayedToppers,
    staleTime: 30 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
}
