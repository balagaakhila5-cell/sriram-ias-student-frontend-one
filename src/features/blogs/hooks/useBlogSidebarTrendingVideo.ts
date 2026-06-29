'use client';

import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import {
  blogDetailsKeys,
  useBlogDetails,
} from '@/features/blogs/hooks/useBlogDetails';
import { useBlogHomepage } from '@/features/blogs/hooks/useBlogHomepage';
import {
  blogDetailsService,
  buildBlogTrendingVideoPreview,
  collectHomepageBlogIds,
  getBlogTrendingViewAllHref,
  type BlogVideoSource,
  type BlogTrendingVideo,
} from '@/features/blogs/services/blogDetailsService';
import type { BlogHomepageViewModel } from '@/features/blogs/utils/mapBlogHomepageBundle';
import { FOOTER_SOCIAL_LINKS } from '@/config/footerLinks';

const BLOG_SIDEBAR_FALLBACK_VIDEOS: BlogTrendingVideo[] = [
  {
    id: 'trending-1',
    title: 'Daily Current Affairs - 16 March 2026',
    image: '/assets/current-affairs/daily-current-affairs/trending-video.png',
    href: FOOTER_SOCIAL_LINKS.youtube,
  },
  {
    id: 'trending-2',
    title: 'Daily Current Affairs - 16 March 2026',
    image: '/assets/current-affairs/daily-current-affairs/trending-video.png',
    href: FOOTER_SOCIAL_LINKS.youtube,
  },
];

type UseBlogSidebarTrendingVideoOptions = {
  language?: string | null;
  enabled?: boolean;
  /** Used when homepage has no featured/main blog id (e.g. on /blogs/all). */
  fallbackBlogId?: string | null;
  /** Prepended first (e.g. current blog on detail page). */
  additionalSources?: BlogVideoSource[];
  fallbackVideos?: BlogTrendingVideo[];
};

function resolveHomepageBlogId(
  bundle: BlogHomepageViewModel | undefined,
): string | null {
  if (!bundle) return null;

  if (bundle.featured?.id?.trim()) {
    return bundle.featured.id.trim();
  }

  const previewMain = bundle.previewBlogs.find((blog) => blog.isMainBlog && blog.id);
  if (previewMain?.id) return previewMain.id.trim();

  for (const blogs of Object.values(bundle.gsPaperWise ?? {})) {
    const mainBlog = blogs.find((blog) => blog.isMainBlog && blog.id);
    if (mainBlog?.id) return mainBlog.id.trim();
  }

  return null;
}

function mapInlineBlogSources(
  bundle: BlogHomepageViewModel | undefined,
): BlogVideoSource[] {
  if (!bundle) return [];

  const sources: BlogVideoSource[] = [];
  const seenUrls = new Set<string>();

  const addBlog = (blog: { id?: string; title?: string; youtubeVideoUrl?: string | null } | null | undefined) => {
    const url = blog?.youtubeVideoUrl?.trim();
    if (!url || seenUrls.has(url)) return;
    seenUrls.add(url);
    sources.push({ youtubeVideoUrl: url, title: blog?.title });
  };

  addBlog(bundle.featured);

  const allBlogs = [
    ...bundle.previewBlogs,
    ...Object.values(bundle.gsPaperWise ?? {}).flat(),
  ];

  allBlogs.filter((blog) => blog.isMainBlog).forEach(addBlog);
  allBlogs.forEach(addBlog);

  return sources;
}

export function useBlogSidebarTrendingVideo({
  language,
  enabled = true,
  fallbackBlogId,
  additionalSources = [],
  fallbackVideos = BLOG_SIDEBAR_FALLBACK_VIDEOS,
}: UseBlogSidebarTrendingVideoOptions = {}) {
  const trimmedLanguage = language?.trim() ?? '';
  const languageReady = enabled && Boolean(trimmedLanguage);

  const { data: homepageBundle } = useBlogHomepage({
    language: trimmedLanguage,
    enabled: languageReady,
  });

  const homepageBlogId = useMemo(
    () => resolveHomepageBlogId(homepageBundle),
    [homepageBundle],
  );

  const detailsBlogId =
    homepageBlogId || fallbackBlogId?.trim() || '';

  const blogIds = useMemo(
    () => collectHomepageBlogIds(homepageBundle, fallbackBlogId),
    [homepageBundle, fallbackBlogId],
  );

  const detailQueries = useQueries({
    queries: blogIds.map((id) => ({
      queryKey: blogDetailsKeys.detail(id),
      queryFn: () => blogDetailsService.getBlogDetails(id),
      enabled: languageReady && Boolean(id),
      staleTime: 2 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    })),
  });

  const { data: primaryBlogDetails } = useBlogDetails({
    id: detailsBlogId,
    enabled: languageReady && Boolean(detailsBlogId) && blogIds.length === 0,
  });

  const videoSources = useMemo(() => {
    const merged: BlogVideoSource[] = [];
    const seenUrls = new Set<string>();

    const addSource = (source: BlogVideoSource | null | undefined) => {
      const url = source?.youtubeVideoUrl?.trim();
      if (!url || seenUrls.has(url)) return;
      seenUrls.add(url);
      merged.push({ youtubeVideoUrl: url, title: source?.title });
    };

    additionalSources.forEach(addSource);
    mapInlineBlogSources(homepageBundle).forEach(addSource);

    detailQueries.forEach((query) => {
      const blog = query.data;
      if (!blog?.youtubeVideoUrl) return;
      addSource({ youtubeVideoUrl: blog.youtubeVideoUrl, title: blog.title });
    });

    if (primaryBlogDetails?.youtubeVideoUrl) {
      addSource({
        youtubeVideoUrl: primaryBlogDetails.youtubeVideoUrl,
        title: primaryBlogDetails.title,
      });
    }

    return merged;
  }, [additionalSources, homepageBundle, detailQueries, primaryBlogDetails]);

  const trendingVideos = useMemo(
    () => buildBlogTrendingVideoPreview(videoSources, fallbackVideos),
    [videoSources, fallbackVideos],
  );

  const viewAllHref = getBlogTrendingViewAllHref();

  const primarySource = videoSources[0];

  return {
    trendingVideos,
    viewAllHref,
    youtubeVideoUrl: primarySource?.youtubeVideoUrl ?? null,
    videoTitle: primarySource?.title,
    detailsBlogId: detailsBlogId || null,
  };
}
