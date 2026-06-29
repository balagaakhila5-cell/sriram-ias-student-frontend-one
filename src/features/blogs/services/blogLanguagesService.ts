import { http } from '@/lib/http';
import { ApiError, type ApiEnvelope, isApiSuccess } from '@/lib/apiResult';
import type { BlogLanguage } from '@/features/blogs/types/blogLanguage';

const BASE = '/blog/public';

function deriveLanguageSlug(languageName: string): string {
  const normalized = languageName.trim().toLowerCase();
  if (normalized === 'marathi') return 'marati';
  return normalized.replace(/\s+/g, '-');
}

function normalizeBlogLanguage(raw: Partial<BlogLanguage> & { label?: string }): BlogLanguage | null {
  const languageName = String(raw.languageName || raw.label || '').trim();
  if (!languageName) return null;

  const id = String(raw._id || raw.languageId || languageName).trim();
  const slug = String(raw.slug || '').trim() || deriveLanguageSlug(languageName);

  return {
    _id: id,
    languageId: String(raw.languageId || id).trim(),
    languageName,
    slug,
  };
}

export const blogLanguagesService = {
  getLanguages: async (): Promise<BlogLanguage[]> => {
    try {
      const { data } = await http.post<ApiEnvelope<BlogLanguage[]>>(
        `${BASE}/languages`,
        {},
        { timeout: 60_000 },
      );

      if (!isApiSuccess(data.statusCode) || data.success !== true) {
        throw new ApiError(data.message || 'Unable to fetch blog languages.', {
          statusCode: data.statusCode,
        });
      }

      if (!Array.isArray(data.data)) return [];

      return data.data
        .map((item) => normalizeBlogLanguage(item))
        .filter((item): item is BlogLanguage => Boolean(item));
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unable to fetch blog languages. Please try again.');
    }
  },
};
