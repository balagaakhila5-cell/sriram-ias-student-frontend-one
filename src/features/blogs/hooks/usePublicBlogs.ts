'use client';

import { useQuery } from '@tanstack/react-query';
import { publicBlogsService } from '@/features/blogs/services/publicBlogsService';
import { mapPublicBlogsToCards } from '@/features/blogs/utils/mapPublicBlogToCard';
import type { BlogBookmarkInput } from '@/features/blogs/types';
import type { PublicBlogListPagination } from '@/features/blogs/types/publicBlog';

export const publicBlogKeys = {
  all: ['public-blogs'] as const,
  list: (
    language: string,
    category: string | undefined,
    isFeatured: boolean | undefined,
    page: number,
    limit: number,
  ) =>
    ['public-blogs', 'list', language, category ?? '', isFeatured ? 'featured' : '', page, limit] as const,
};

export type PublicBlogsQueryData = {
  blogs: BlogBookmarkInput[];
  pagination: PublicBlogListPagination;
};

const EMPTY_PAGINATION: PublicBlogListPagination = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

type UsePublicBlogsOptions = {
  language?: string | null;
  category?: string | null;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
  enabled?: boolean;
};

export function usePublicBlogs({
  language,
  category,
  isFeatured,
  page = 1,
  limit = 12,
  enabled = true,
}: UsePublicBlogsOptions = {}) {
  const trimmedLanguage = language?.trim() ?? '';
  const trimmedCategory = category?.trim() || undefined;
  const featuredOnly = isFeatured === true;

  return useQuery<PublicBlogsQueryData>({
    queryKey: publicBlogKeys.list(
      trimmedLanguage,
      trimmedCategory,
      featuredOnly,
      page,
      limit,
    ),
    queryFn: async () => {
      const result = await publicBlogsService.getPublicBlogs({
        language: trimmedLanguage,
        category: trimmedCategory,
        isFeatured: featuredOnly ? true : undefined,
        page,
        limit,
      });

      return {
        blogs: mapPublicBlogsToCards(result.blogs),
        pagination: result.pagination,
      };
    },
    enabled: enabled && Boolean(trimmedLanguage),
    staleTime: 2 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData:
      trimmedCategory || featuredOnly
        ? undefined
        : (previousData) => previousData,
  });
}

export function getEmptyPublicBlogsData(
  page = 1,
  limit = 12,
): PublicBlogsQueryData {
  return {
    blogs: [],
    pagination: { ...EMPTY_PAGINATION, page, limit },
  };
}
