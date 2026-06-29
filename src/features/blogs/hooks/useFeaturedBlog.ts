'use client';

import { useQuery } from '@tanstack/react-query';
import { featuredBlogService } from '@/features/blogs/services/featuredBlogService';
import { mapFeaturedBlogToCard } from '@/features/blogs/utils/mapFeaturedBlogToCard';
import type { BlogBookmarkInput } from '@/features/blogs/types';

export const featuredBlogKeys = {
  all: ['featured-blog'] as const,
  detail: (language: string) => ['featured-blog', language] as const,
};

type UseFeaturedBlogOptions = {
  language?: string | null;
  enabled?: boolean;
};

export function useFeaturedBlog({
  language,
  enabled = true,
}: UseFeaturedBlogOptions = {}) {
  const trimmedLanguage = language?.trim() ?? '';

  return useQuery<BlogBookmarkInput | null>({
    queryKey: featuredBlogKeys.detail(trimmedLanguage),
    queryFn: async () => {
      const blog = await featuredBlogService.getFeaturedBlog({
        language: trimmedLanguage,
      });
      return blog ? mapFeaturedBlogToCard(blog) : null;
    },
    enabled: enabled && Boolean(trimmedLanguage),
    staleTime: 2 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
