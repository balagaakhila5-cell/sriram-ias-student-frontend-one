'use client';

import { useQuery } from '@tanstack/react-query';
import { blogDetailsService } from '@/features/blogs/services/blogDetailsService';
import type { BlogDetails } from '@/features/blogs/types/blogDetails';

export const blogDetailsKeys = {
  all: ['blog-details'] as const,
  detail: (id: string) => ['blog-details', id] as const,
};

type UseBlogDetailsOptions = {
  id?: string | null;
  enabled?: boolean;
};

export function useBlogDetails({ id, enabled = true }: UseBlogDetailsOptions = {}) {
  const trimmedId = id?.trim() ?? '';

  return useQuery<BlogDetails | null>({
    queryKey: blogDetailsKeys.detail(trimmedId),
    queryFn: () => blogDetailsService.getBlogDetails(trimmedId),
    enabled: enabled && Boolean(trimmedId),
    staleTime: 2 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
