import { FOOTER_SOCIAL_LINKS } from '@/config/footerLinks';
import { http } from '@/lib/http';
import { ApiError, isApiSuccess } from '@/lib/apiResult';
import type {
  BlogDetails,
  BlogDetailsApiResponse,
  BlogTableOfContent,
} from '@/features/blogs/types/blogDetails';
import type { BlogLanguage } from '@/features/blogs/types/blogLanguage';
import type { BlogHomepageViewModel } from '@/features/blogs/utils/mapBlogHomepageBundle';

const BASE = '/blog/public';
const PLACEHOLDER_IMAGE = '/assets/blogs/main-cup.png';

type RawBlogDetails = Partial<BlogDetails> & {
  _id?: string;
  backgroundImage?: string | { url?: string };
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  sections?: Partial<BlogTableOfContent>[];
  contents?: Partial<BlogTableOfContent>[];
  tableContent?: Partial<BlogTableOfContent>[];
};

function resolveBlogImage(raw: RawBlogDetails): string {
  if (typeof raw.image === 'string' && raw.image.trim()) {
    return raw.image.trim();
  }

  const backgroundImage = raw.backgroundImage;
  if (typeof backgroundImage === 'string' && backgroundImage.trim()) {
    return backgroundImage.trim();
  }
  if (
    backgroundImage &&
    typeof backgroundImage === 'object' &&
    backgroundImage.url?.trim()
  ) {
    return backgroundImage.url.trim();
  }

  return PLACEHOLDER_IMAGE;
}

function formatBlogDateLabel(value?: string): string {
  if (!value?.trim()) return '';
  const date = new Date(value.trim());
  if (Number.isNaN(date.getTime())) return value.trim();
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatBlogTimeLabel(value?: string): string {
  if (!value?.trim()) return '';
  const date = new Date(value.trim());
  if (Number.isNaN(date.getTime())) return value.trim();
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function normalizeLanguage(raw: Partial<BlogLanguage> | undefined): BlogLanguage {
  const id = String(raw?._id || '').trim();

  return {
    _id: id,
    languageId: String(raw?.languageId || '').trim(),
    languageName: String(raw?.languageName || '').trim(),
    slug: String(raw?.slug || '').trim(),
  };
}

function normalizeTableOfContent(
  raw: Partial<BlogTableOfContent>,
  index: number,
): BlogTableOfContent {
  const imageValue =
    typeof raw.image === 'string' && raw.image.trim() ? raw.image.trim() : null;

  return {
    order: raw.order ?? index + 1,
    topic: String(raw.topic || `Section ${index + 1}`).trim(),
    image: imageValue,
    content: String(raw.content || ''),
  };
}

function normalizeBlogDetails(raw: RawBlogDetails): BlogDetails {
  const id = String(raw.id || raw._id || raw.blogId || '').trim();
  const youtubeVideoUrl =
    typeof raw.youtubeVideoUrl === 'string' && raw.youtubeVideoUrl.trim()
      ? raw.youtubeVideoUrl.trim()
      : null;
  const publishedAt = String(raw.publishedAt || raw.createdAt || '').trim();
  const tableSource = Array.isArray(raw.tableOfContents)
    ? raw.tableOfContents
    : Array.isArray(raw.tableContent)
      ? raw.tableContent
      : Array.isArray(raw.sections)
        ? raw.sections
        : Array.isArray(raw.contents)
          ? raw.contents
          : [];

  return {
    id,
    blogId: String(raw.blogId || id).trim(),
    title: String(raw.title || '').trim(),
    slug: String(raw.slug || id).trim(),
    category: String(raw.category || '').trim(),
    image: resolveBlogImage(raw),
    youtubeVideoUrl,
    metaTitle: String(raw.metaTitle || raw.title || '').trim(),
    metaDescription: String(raw.metaDescription || '').trim(),
    readTime: String(raw.readTime || '').trim(),
    tags: Array.isArray(raw.tags)
      ? raw.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    tableOfContents: tableSource
      .map((section, index) => normalizeTableOfContent(section, index))
      .sort((a, b) => a.order - b.order),
    language: normalizeLanguage(raw.language),
    date: String(raw.date || '').trim() || formatBlogDateLabel(publishedAt),
    time: String(raw.time || '').trim() || formatBlogTimeLabel(publishedAt),
  };
}

async function fetchPublicBlogDetails(id: string): Promise<BlogDetails | null> {
  const { data } = await http.post<BlogDetailsApiResponse>(
    `${BASE}/details`,
    { id, blogId: id },
    { timeout: 60_000 },
  );

  if (!isApiSuccess(data.statusCode) || data.success !== true) {
    throw new ApiError(data.message || 'Unable to fetch blog details.', {
      statusCode: data.statusCode,
    });
  }

  if (!data.data) {
    return null;
  }

  return normalizeBlogDetails(data.data);
}

async function fetchLegacyBlogDetails(id: string): Promise<BlogDetails | null> {
  const { data } = await http.get<BlogDetailsApiResponse>(`/blog/blogs/${id}`, {
    timeout: 60_000,
  });

  if (!isApiSuccess(data.statusCode) || data.success !== true || !data.data) {
    return null;
  }

  return normalizeBlogDetails(data.data);
}

export const blogDetailsService = {
  getBlogDetails: async (id: string): Promise<BlogDetails | null> => {
    const trimmedId = id.trim();
    if (!trimmedId) {
      throw new ApiError('Blog ID is required to fetch blog details.');
    }

    try {
      try {
        const blog = await fetchPublicBlogDetails(trimmedId);
        if (blog) return blog;
      } catch (error) {
        if (!(error instanceof ApiError)) throw error;
      }

      return await fetchLegacyBlogDetails(trimmedId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unable to fetch blog details. Please try again.');
    }
  },
};

export function getBlogSectionId(order: number): string {
  return `blog-section-${order}`;
}

export function getYoutubeEmbedUrl(url?: string | null): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();

  const watchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  );
  const videoId = watchMatch?.[1];
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYoutubeVideoId(url?: string | null): string | null {
  if (!url?.trim()) return null;
  const watchMatch = url.trim().match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  );
  return watchMatch?.[1] ?? null;
}

export function getYoutubeWatchUrl(url?: string | null): string | null {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYoutubeThumbnailUrl(
  url?: string | null,
  fallback = '/assets/current-affairs/daily-current-affairs/trending-video.png',
): string {
  const videoId = getYoutubeVideoId(url);
  if (!videoId) return fallback;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export type BlogTrendingVideo = {
  id: string;
  title: string;
  image: string;
  href: string;
};

export type BlogVideoSource = {
  youtubeVideoUrl: string;
  title?: string;
};

export const BLOG_TRENDING_VIDEO_PREVIEW_LIMIT = 2;

export const BLOG_TRENDING_VIDEOS_SECTION_ID = 'trending-videos';

export function getBlogTrendingViewAllHref(languageSlug?: string | null): string {
  const params = new URLSearchParams();
  if (languageSlug?.trim()) {
    params.set('lang', languageSlug.trim());
  }
  const query = params.toString();
  return `/blogs/all${query ? `?${query}` : ''}#${BLOG_TRENDING_VIDEOS_SECTION_ID}`;
}

export function resolveBlogDetailHrefForViewAll(
  bundle: BlogHomepageViewModel | undefined,
  languageSlug?: string | null,
): string {
  return getBlogTrendingViewAllHref(languageSlug);
}

export function collectHomepageBlogIds(
  bundle: BlogHomepageViewModel | undefined,
  fallbackBlogId?: string | null,
): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();

  const addId = (id?: string | null) => {
    const trimmed = id?.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    ids.push(trimmed);
  };

  if (!bundle) {
    addId(fallbackBlogId);
    return ids;
  }

  addId(bundle.featured?.id);

  const allBlogs = [
    ...bundle.previewBlogs,
    ...Object.values(bundle.gsPaperWise ?? {}).flat(),
  ];

  allBlogs.filter((blog) => blog.isMainBlog).forEach((blog) => addId(blog.id));
  allBlogs.forEach((blog) => addId(blog.id));
  addId(fallbackBlogId);

  return ids.slice(0, 12);
}

export function buildBlogTrendingVideoPreview(
  sources: BlogVideoSource[],
  fallbackVideos: BlogTrendingVideo[] = [],
  previewLimit = BLOG_TRENDING_VIDEO_PREVIEW_LIMIT,
): BlogTrendingVideo[] {
  const videos: BlogTrendingVideo[] = [];
  const seenUrls = new Set<string>();

  for (const source of sources) {
    const watchUrl = getYoutubeWatchUrl(source.youtubeVideoUrl);
    if (!watchUrl || seenUrls.has(watchUrl)) continue;

    seenUrls.add(watchUrl);
    videos.push({
      id: `blog-trending-${videos.length + 1}`,
      title: source.title?.trim() || 'Featured Video',
      image: getYoutubeThumbnailUrl(source.youtubeVideoUrl),
      href: watchUrl,
    });

    if (videos.length >= previewLimit) break;
  }

  if (videos.length === 0) {
    return fallbackVideos.slice(0, previewLimit);
  }

  return videos;
}

export function buildBlogTrendingVideosAll(
  sources: BlogVideoSource[],
  fallbackVideos: BlogTrendingVideo[] = [],
): BlogTrendingVideo[] {
  return buildBlogTrendingVideoPreview(
    sources,
    fallbackVideos,
    Number.POSITIVE_INFINITY,
  );
}

export function buildBlogTrendingVideos(
  youtubeVideoUrl?: string | null,
  title?: string,
  fallbackVideos: BlogTrendingVideo[] = [],
): BlogTrendingVideo[] {
  if (!youtubeVideoUrl?.trim()) {
    return fallbackVideos.slice(0, BLOG_TRENDING_VIDEO_PREVIEW_LIMIT);
  }

  return buildBlogTrendingVideoPreview(
    [{ youtubeVideoUrl, title }],
    fallbackVideos,
    BLOG_TRENDING_VIDEO_PREVIEW_LIMIT,
  );
}
