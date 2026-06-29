'use client';

import { useQuery } from '@tanstack/react-query';
import { blogLanguagesService } from '@/features/blogs/services/blogLanguagesService';

export const blogLanguageKeys = {
  all: ['blog-languages'] as const,
  list: ['blog-languages', 'list'] as const,
};

export function useBlogLanguages() {
  return useQuery({
    queryKey: blogLanguageKeys.list,
    queryFn: () => blogLanguagesService.getLanguages(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
