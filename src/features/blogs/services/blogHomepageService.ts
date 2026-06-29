import { http } from '@/lib/http';
import { ApiError, isApiSuccess } from '@/lib/apiResult';
import type {
  BlogHomepageApiResponse,
  BlogHomepageBundle,
  BlogHomepageParams,
  HomepageBundleBlog,
} from '@/features/blogs/types/blogHomepage';
import { resolveBlogDateTime } from '@/features/blogs/utils/blogDateTime';

const BASE = '/blog/public';

function normalizeBundleBlog(
  raw: Partial<HomepageBundleBlog> & {
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
  },
  index: number,
): HomepageBundleBlog {
  const id = String(raw.id || raw.blogId || `blog-${index}`).trim();
  const { date, time } = resolveBlogDateTime(raw);

  return {
    id,
    blogId: String(raw.blogId || id).trim(),
    title: String(raw.title || '').trim(),
    slug: String(raw.slug || id).trim(),
    image: String(raw.image || '').trim(),
    category: String(raw.category || '').trim(),
    date,
    time,
    readTime: String(raw.readTime || '').trim(),
    tags: Array.isArray(raw.tags)
      ? raw.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    isMainBlog: Boolean(raw.isMainBlog),
    description: raw.description?.trim() || undefined,
    youtubeVideoUrl:
      typeof raw.youtubeVideoUrl === 'string' && raw.youtubeVideoUrl.trim()
        ? raw.youtubeVideoUrl.trim()
        : null,
  };
}

function normalizeBlogList(
  blogs: Partial<HomepageBundleBlog>[] | undefined,
): HomepageBundleBlog[] {
  if (!Array.isArray(blogs)) return [];
  return blogs.map((blog, index) => normalizeBundleBlog(blog, index));
}

function normalizeGsPaperWise(
  gsPaperWise: Record<string, Partial<HomepageBundleBlog>[]> | undefined,
): Record<string, HomepageBundleBlog[]> {
  if (!gsPaperWise || typeof gsPaperWise !== 'object') return {};

  return Object.entries(gsPaperWise).reduce<Record<string, HomepageBundleBlog[]>>(
    (accumulator, [category, blogs]) => {
      accumulator[category] = normalizeBlogList(blogs);
      return accumulator;
    },
    {},
  );
}

function normalizeHomepageBundle(raw: Partial<BlogHomepageBundle>): BlogHomepageBundle {
  return {
    featured: raw.featured ? normalizeBundleBlog(raw.featured, 0) : null,
    previewBlogs: normalizeBlogList(raw.previewBlogs),
    categories: Array.isArray(raw.categories)
      ? raw.categories.map((category) => String(category).trim()).filter(Boolean)
      : [],
    gsPaperWise: normalizeGsPaperWise(
      raw.gsPaperWise as Record<string, Partial<HomepageBundleBlog>[]>,
    ),
  };
}

export const blogHomepageService = {
  getBlogHomepageBundle: async ({
    language,
  }: BlogHomepageParams): Promise<BlogHomepageBundle> => {
    const trimmedLanguage = language.trim();
    if (!trimmedLanguage) {
      throw new ApiError('Language is required to fetch the blog homepage.');
    }

    try {
      const { data } = await http.post<BlogHomepageApiResponse>(
        `${BASE}/homepage`,
        { language: trimmedLanguage },
        { timeout: 60_000 },
      );

      if (!isApiSuccess(data.statusCode) || data.success !== true) {
        throw new ApiError(data.message || 'Unable to fetch blog homepage.', {
          statusCode: data.statusCode,
        });
      }

      return normalizeHomepageBundle(data.data || {});
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unable to fetch blog homepage. Please try again.');
    }
  },
};
