'use client';

import { useQuery } from '@tanstack/react-query';
import { blogHomepageService } from '@/features/blogs/services/blogHomepageService';
import {
  mapBlogHomepageBundle,
  type BlogHomepageViewModel,
} from '@/features/blogs/utils/mapBlogHomepageBundle';

export const blogHomepageKeys = {
  all: ['blog-homepage'] as const,
  bundle: (language: string) => ['blog-homepage', language] as const,
};

type UseBlogHomepageOptions = {
  language?: string | null;
  enabled?: boolean;
};

export function useBlogHomepage({
  language,
  enabled = true,
}: UseBlogHomepageOptions = {}) {
  const trimmedLanguage = language?.trim() ?? '';

  return useQuery<BlogHomepageViewModel>({
    queryKey: blogHomepageKeys.bundle(trimmedLanguage),
    queryFn: async () => {
      const bundle = await blogHomepageService.getBlogHomepageBundle({
        language: trimmedLanguage,
      });
      return mapBlogHomepageBundle(bundle);
    },
    enabled: enabled && Boolean(trimmedLanguage),
    staleTime: 2 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
