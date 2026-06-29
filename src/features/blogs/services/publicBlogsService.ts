import { http } from '@/lib/http';
import { ApiError, isApiSuccess } from '@/lib/apiResult';
import type {
  BlogListApiResponse,
  PublicBlog,
  PublicBlogListParams,
  PublicBlogListPagination,
  PublicBlogListResult,
} from '@/features/blogs/types/publicBlog';
import { resolveBlogDateTime } from '@/features/blogs/utils/blogDateTime';

const BASE = '/blog/public';
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

function normalizePublicBlog(
  raw: Partial<PublicBlog> & {
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
  },
  index: number,
): PublicBlog {
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
    youtubeVideoUrl:
      typeof raw.youtubeVideoUrl === 'string' && raw.youtubeVideoUrl.trim()
        ? raw.youtubeVideoUrl.trim()
        : null,
  };
}

function buildPagination(
  page: number,
  limit: number,
  total: number,
  totalPages: number,
): PublicBlogListPagination {
  const safeTotalPages = Math.max(0, totalPages);
  const safePage = Math.max(1, page);

  return {
    page: safePage,
    limit,
    total: Math.max(0, total),
    totalPages: safeTotalPages,
    hasNextPage: safePage < safeTotalPages,
    hasPrevPage: safePage > 1,
  };
}

export const publicBlogsService = {
  getPublicBlogs: async ({
    language,
    category,
    isFeatured,
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
  }: PublicBlogListParams): Promise<PublicBlogListResult> => {
    const trimmedLanguage = language.trim();
    if (!trimmedLanguage) {
      throw new ApiError('Language is required to fetch blogs.');
    }

    const trimmedCategory = category?.trim();

    try {
      const requestBody: Record<string, string | number> = {
        language: trimmedLanguage,
        page,
        limit,
      };

      if (trimmedCategory) {
        requestBody.category = trimmedCategory;
      }

      if (isFeatured === true) {
        requestBody.isFeatured = true;
      }

      const { data } = await http.post<BlogListApiResponse>(
        `${BASE}/list`,
        requestBody,
        { timeout: 60_000 },
      );

      if (!isApiSuccess(data.statusCode) || data.success !== true) {
        throw new ApiError(data.message || 'Unable to fetch blogs.', {
          statusCode: data.statusCode,
        });
      }

      const blogs = Array.isArray(data.data)
        ? data.data.map((blog, index) => normalizePublicBlog(blog, index))
        : [];

      return {
        blogs,
        pagination: buildPagination(
          data.page ?? page,
          data.limit ?? limit,
          data.total ?? blogs.length,
          data.totalPages ?? (blogs.length > 0 ? 1 : 0),
        ),
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unable to fetch blogs. Please try again.');
    }
  },
};
