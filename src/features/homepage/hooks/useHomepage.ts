"use client";

import {
  useQuery,
  type QueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { homepageService } from "../services/homepageService";
import type { HomepageData } from "../types";

export const homepageKeys = {
  all: ["homepage"] as const,
};

export const homepageQueryOptions = {
  queryKey: homepageKeys.all,
  queryFn: homepageService.getHomepage,
  staleTime: 2 * 60 * 1000,
  retry: 4,
  retryDelay: (attemptIndex: number) =>
    Math.min(10_000 * (attemptIndex + 1), 30_000),
  refetchOnWindowFocus: true,
} satisfies Omit<UseQueryOptions<HomepageData>, "queryKey"> & {
  queryKey: typeof homepageKeys.all;
};

export function prefetchHomepage(queryClient: QueryClient) {
  return queryClient.prefetchQuery(homepageQueryOptions);
}

export function useHomepage() {
  return useQuery(homepageQueryOptions);
}
