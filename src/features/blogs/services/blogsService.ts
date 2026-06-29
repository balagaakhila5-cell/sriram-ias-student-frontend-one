import { http } from '@/lib/http';
import { ApiError, type ApiEnvelope, isApiSuccess } from '@/lib/apiResult';
import type { BlogBookmarkInput } from '@/features/blogs/types';

export type BlogSearchPreview = {
  title?: string;
  url?: string;
  description?: string;
};

export type BlogTableOfContentsItem = {
  order: number;
  topic: string;
  image: string | null;
  content: string;
};

export type BlogLanguageInfo = {
  _id?: string;
  languageId?: string;
  languageName?: string;
};

export type BlogDetail = {
  _id?: string;
  id?: string;
  blogId?: string;
  title: string;
  slug?: string;
  category?: string;
  language?: string | BlogLanguageInfo;
  languageName?: string;
  readTime?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string[];
  tags?: string[];
  thumbnail?: { url?: string } | string;
  thumbnailUrl?: string;
  backgroundImage?: { url?: string } | string;
  status?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isMainBlog?: boolean;
  publishedAt?: string;
  date?: string;
  time?: string;
  createdAt?: string;
  updatedAt?: string;
  youtubeVideoUrl?: string;
  searchPreview?: BlogSearchPreview;
  tableOfContents?: BlogTableOfContentsItem[];
  contents?: BlogTableOfContentsItem[];
  sections?: BlogTableOfContentsItem[];
};

const PLACEHOLDER_IMAGE = '/assets/blogs/main-cup.png';

function resolveBlogImage(blog: BlogDetail): string {
  let url = PLACEHOLDER_IMAGE;

  if (typeof blog.thumbnail === 'string' && blog.thumbnail.trim()) {
    url = blog.thumbnail.trim();
  } else if (typeof blog.backgroundImage === 'string' && blog.backgroundImage.trim()) {
    url = blog.backgroundImage.trim();
  } else if (blog.thumbnail && typeof blog.thumbnail === 'object' && blog.thumbnail.url) {
    url = blog.thumbnail.url;
  } else if (blog.backgroundImage && typeof blog.backgroundImage === 'object' && blog.backgroundImage.url) {
    url = blog.backgroundImage.url;
  } else if (blog.thumbnailUrl?.trim()) {
    url = blog.thumbnailUrl.trim();
  }

  if (url === PLACEHOLDER_IMAGE) return url;

  const cacheKey = blog.updatedAt || blog.publishedAt || blog.createdAt;
  if (cacheKey && (url.startsWith('http') || url.startsWith('/'))) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${encodeURIComponent(String(cacheKey))}`;
  }

  return url;
}

function resolveLanguageName(blog: BlogDetail): string {
  if (typeof blog.language === 'object' && blog.language?.languageName) {
    return blog.language.languageName.trim();
  }
  if (typeof blog.language === 'string' && blog.language.trim()) {
    return blog.language.trim();
  }
  return blog.languageName?.trim() || '';
}

function normalizeTableOfContents(blog: BlogDetail): BlogTableOfContentsItem[] {
  const source = blog.tableOfContents || blog.sections || blog.contents || [];

  return [...source]
    .map((section, index) => {
      const rawImage = section.image;
      const imageValue =
        typeof rawImage === 'string' && rawImage.trim()
          ? rawImage.trim()
          : rawImage && typeof rawImage === 'object' && 'url' in rawImage && rawImage.url
            ? String(rawImage.url)
            : null;

      return {
        order: section.order ?? index + 1,
        topic: section.topic?.trim() || `Section ${index + 1}`,
        image: imageValue,
        content: section.content || '',
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function mapBlogDetailsResponse(data: BlogDetail): BlogDetail {
  return {
    ...data,
    languageName: resolveLanguageName(data),
    tableOfContents: normalizeTableOfContents(data),
    searchPreview: data.searchPreview || {},
    focusKeywords: Array.isArray(data.focusKeywords) ? data.focusKeywords : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
}

function formatBlogDateLabel(value?: string): string {
  if (!value?.trim()) return '';
  const trimmed = value.trim();
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return trimmed;
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatBlogTimeLabel(value?: string): string {
  if (!value?.trim()) return '';
  const trimmed = value.trim();
  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return trimmed;
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function mapPortalBlogToBookmarkInput(
  blog: BlogDetail,
  index = 0,
): BlogBookmarkInput {
  const slug = blog.slug?.trim() || `blog-${blog._id || blog.id || blog.blogId || index}`;
  const publishedAt = blog.publishedAt || blog.createdAt || '';

  return {
    id: blog._id || blog.id || blog.blogId || slug,
    slug,
    title: blog.title?.trim() || 'Blog',
    date: blog.date?.trim() || formatBlogDateLabel(publishedAt),
    time: blog.time?.trim() || formatBlogTimeLabel(publishedAt),
    image: resolveBlogImage(blog),
    category: blog.category?.trim() || '',
    language: resolveLanguageName(blog),
    readTime: blog.readTime?.trim() || '',
    isMainBlog: Boolean(blog.isMainBlog),
  };
}

function unwrapBlogList(data: ApiEnvelope<BlogDetail[] | { items?: BlogDetail[] }>) {
  if (!isApiSuccess(data.statusCode) || data.success !== true) {
    throw new ApiError(data.message || 'Unable to fetch blogs.', {
      statusCode: data.statusCode,
    });
  }

  const payload = data.data;
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.items)) return payload.items;
  return [];
}

function isPublishedBlog(blog: BlogDetail): boolean {
  if (blog.isDeleted === true) return false;
  const status = String(blog.status ?? '').toUpperCase();
  if (status === 'INACTIVE') return false;
  if (blog.isActive === false) return false;
  return true;
}

function resolveMongoBlogId(blog: BlogDetail): string | null {
  const mongoId = String(blog._id || '').trim();
  return /^[a-f\d]{24}$/i.test(mongoId) ? mongoId : null;
}

function blogHasContent(blog: BlogDetail): boolean {
  return (
    (blog.tableOfContents?.length ?? 0) > 0 ||
    (blog.sections?.length ?? 0) > 0 ||
    (blog.contents?.length ?? 0) > 0
  );
}

async function fetchPublicBlogList(params: Record<string, string | number> = {}) {
  const { data } = await http.get<ApiEnvelope<BlogDetail[]>>('/blog/blogs', {
    params: { limit: 100, ...params },
    timeout: 60_000,
  });

  return unwrapBlogList(data)
    .filter(isPublishedBlog)
    .map((blog) => mapBlogDetailsResponse(blog));
}

async function fetchPublicBlogByMongoId(mongoId: string): Promise<BlogDetail | null> {
  const { data } = await http.get<ApiEnvelope<BlogDetail>>(`/blog/blogs/${mongoId}`, {
    timeout: 60_000,
  });

  if (!isApiSuccess(data.statusCode) || data.success !== true || !data.data) {
    return null;
  }

  return mapBlogDetailsResponse(data.data);
}

export const blogsService = {
  getPublishedBlogs: async (): Promise<BlogDetail[]> => {
    return fetchPublicBlogList({ status: 'ACTIVE' });
  },

  getBlogBySlug: async (slug: string): Promise<BlogDetail | null> => {
    const trimmedSlug = slug.trim();
    if (!trimmedSlug) return null;

    const published = await fetchPublicBlogList({ status: 'ACTIVE' });
    let match =
      published.find((blog) => blog.slug === trimmedSlug) ??
      null;

    if (!match) {
      const slugMatches = await fetchPublicBlogList({
        status: 'ACTIVE',
        slug: trimmedSlug,
        limit: 1,
      });
      match = slugMatches.find((blog) => blog.slug === trimmedSlug) ?? slugMatches[0] ?? null;
    }

    if (!match || !isPublishedBlog(match)) return null;

    if (blogHasContent(match)) {
      return mapBlogDetailsResponse(match);
    }

    const mongoId = resolveMongoBlogId(match);
    if (mongoId) {
      try {
        const detail = await fetchPublicBlogByMongoId(mongoId);
        if (detail) {
          return mapBlogDetailsResponse({ ...match, ...detail });
        }
      } catch {
        // Fall back to list item when the public detail route is unavailable.
      }
    }

    return mapBlogDetailsResponse(match);
  },

  mapPortalBlogToBookmarkInput,
};

export function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();

  const watchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  );
  const videoId = watchMatch?.[1];
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}

export function getBlogSectionId(order: number): string {
  return `blog-section-${order}`;
}
