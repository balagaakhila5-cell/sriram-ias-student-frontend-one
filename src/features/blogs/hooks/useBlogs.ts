"use client";

import { useQuery } from "@tanstack/react-query";
import {
  blogsService,
  mapPortalBlogToBookmarkInput,
  type BlogDetail,
} from "@/features/blogs/services/blogsService";

export const blogKeys = {
  all: ["blogs"] as const,
  published: ["blogs", "published"] as const,
  detail: (slug: string) => ["blogs", "detail", slug] as const,
};

export function usePublishedBlogs() {
  return useQuery({
    queryKey: blogKeys.published,
    queryFn: async () => {
      const blogs = await blogsService.getPublishedBlogs();
      return blogs.map((blog, index) => mapPortalBlogToBookmarkInput(blog, index));
    },
    staleTime: 0,
    gcTime: 0,
    retry: 2,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}

export function useBlogBySlug(slug: string) {
  return useQuery<BlogDetail | null>({
    queryKey: blogKeys.detail(slug),
    queryFn: () => blogsService.getBlogBySlug(slug),
    enabled: Boolean(slug.trim()),
    staleTime: 0,
    gcTime: 0,
    retry: 2,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}
