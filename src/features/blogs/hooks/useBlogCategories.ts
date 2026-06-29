'use client';

import { useQuery } from '@tanstack/react-query';
import { blogCategoriesService } from '@/features/blogs/services/blogCategoriesService';

export const blogCategoryKeys = {
  all: ['blog-categories'] as const,
  list: ['blog-categories', 'list'] as const,
};

export function useBlogCategories() {
  return useQuery({
    queryKey: blogCategoryKeys.list,
    queryFn: () => blogCategoriesService.getCategories(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
