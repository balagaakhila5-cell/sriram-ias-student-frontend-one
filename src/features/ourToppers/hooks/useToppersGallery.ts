'use client';

import { useQuery } from '@tanstack/react-query';
import { toppersGalleryService } from '@/features/ourToppers/services/toppersGalleryService';
import type { ToppersGalleryQuery } from '@/features/ourToppers/types';
import { TOPPERS_GALLERY_PAGE_SIZE } from '@/features/ourToppers/types';

export const toppersGalleryKeys = {
  all: ['toppers-gallery'] as const,
  list: (query: ToppersGalleryQuery) =>
    [...toppersGalleryKeys.all, query.year, query.page, query.limit ?? TOPPERS_GALLERY_PAGE_SIZE] as const,
};

export function useToppersGallery(query: ToppersGalleryQuery) {
  const normalizedQuery = {
    year: query.year,
    page: Math.max(1, query.page),
    limit: query.limit ?? TOPPERS_GALLERY_PAGE_SIZE,
  };

  return useQuery({
    queryKey: toppersGalleryKeys.list(normalizedQuery),
    queryFn: () => toppersGalleryService.getGallery(normalizedQuery),
    staleTime: 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
}
