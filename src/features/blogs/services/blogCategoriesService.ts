import { http } from '@/lib/http';
import { ApiError, type ApiEnvelope, isApiSuccess } from '@/lib/apiResult';
import type { BlogCategory } from '@/features/blogs/types/blogCategory';

const BASE = '/blog/public';

export const blogCategoriesService = {
  getCategories: async (): Promise<BlogCategory[]> => {
    try {
      const { data } = await http.post<ApiEnvelope<BlogCategory[]>>(
        `${BASE}/categories`,
        {},
        { timeout: 60_000 },
      );

      if (!isApiSuccess(data.statusCode) || data.success !== true) {
        throw new ApiError(data.message || 'Unable to fetch blog categories.', {
          statusCode: data.statusCode,
        });
      }

      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unable to fetch blog categories. Please try again.');
    }
  },
};
