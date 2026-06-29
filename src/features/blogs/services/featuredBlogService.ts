import { http } from '@/lib/http';
import { ApiError, isApiSuccess } from '@/lib/apiResult';
import type {
  FeaturedBlog,
  FeaturedBlogApiResponse,
  FeaturedBlogParams,
} from '@/features/blogs/types/featuredBlog';
import { resolveBlogDateTime } from '@/features/blogs/utils/blogDateTime';

const BASE = '/blog/public';

function normalizeFeaturedBlog(
  raw: Partial<FeaturedBlog> & {
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
  },
): FeaturedBlog {
  const id = String(raw.id || raw.blogId || 'featured-blog').trim();
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
    description: raw.description?.trim() || undefined,
    isFeatured: raw.isFeatured !== false,
    youtubeVideoUrl:
      typeof raw.youtubeVideoUrl === 'string' && raw.youtubeVideoUrl.trim()
        ? raw.youtubeVideoUrl.trim()
        : null,
  };
}

export const featuredBlogService = {
  getFeaturedBlog: async ({ language }: FeaturedBlogParams): Promise<FeaturedBlog | null> => {
    const trimmedLanguage = language.trim();
    if (!trimmedLanguage) {
      throw new ApiError('Language is required to fetch the featured blog.');
    }

    try {
      const { data } = await http.post<FeaturedBlogApiResponse>(
        `${BASE}/featured`,
        { language: trimmedLanguage },
        { timeout: 60_000 },
      );

      if (!isApiSuccess(data.statusCode) || data.success !== true) {
        throw new ApiError(data.message || 'Unable to fetch featured blog.', {
          statusCode: data.statusCode,
        });
      }

      if (!data.data) {
        return null;
      }

      return normalizeFeaturedBlog(data.data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unable to fetch featured blog. Please try again.');
    }
  },
};
