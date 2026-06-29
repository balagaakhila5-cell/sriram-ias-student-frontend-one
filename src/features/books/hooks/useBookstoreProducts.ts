"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAvailableBookProducts,
  fetchBookProductById,
  fetchBookProductBySlug,
} from "@/features/books/services/bookstoreProductsService";

export const bookstoreProductKeys = {
  all: ["bookstore-products"] as const,
  list: () => [...bookstoreProductKeys.all, "list"] as const,
  detail: (slug: string) => [...bookstoreProductKeys.all, "detail", slug] as const,
};

export function useAvailableBookProducts() {
  return useQuery({
    queryKey: bookstoreProductKeys.list(),
    queryFn: fetchAvailableBookProducts,
    staleTime: 0,
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });
}

export function useBookProductBySlug(slug: string, enabled = true) {
  return useQuery({
    queryKey: bookstoreProductKeys.detail(slug),
    queryFn: () => fetchBookProductBySlug(slug),
    enabled: Boolean(slug) && enabled,
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });
}

export function useBookProductById(productId: string, enabled = true) {
  return useQuery({
    queryKey: bookstoreProductKeys.detail(productId),
    queryFn: () => fetchBookProductById(productId),
    enabled: Boolean(productId) && enabled,
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });
}
