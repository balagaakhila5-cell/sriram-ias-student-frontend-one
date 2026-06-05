"use client";

import { useQuery } from "@tanstack/react-query";
import { homepageService } from "../services/homepageService";

export const homepageKeys = {
  all: ["homepage"] as const,
};

export function useHomepage() {
  return useQuery({
    queryKey: homepageKeys.all,
    queryFn: homepageService.getHomepage,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
