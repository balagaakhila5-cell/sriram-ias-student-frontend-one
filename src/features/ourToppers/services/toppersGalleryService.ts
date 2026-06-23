import {
  FALLBACK_GALLERY_TOPPERS,
  FALLBACK_GALLERY_YEARS,
} from '@/features/ourToppers/data/galleryToppersFallback';
import type {
  ToppersGalleryQuery,
  ToppersGalleryResult,
} from '@/features/ourToppers/types';
import { TOPPERS_GALLERY_PAGE_SIZE } from '@/features/ourToppers/types';

function getLocalToppersGallery(
  query: Required<ToppersGalleryQuery>,
): ToppersGalleryResult {
  const { year, page, limit } = query;

  const filtered =
    year === 'all'
      ? FALLBACK_GALLERY_TOPPERS
      : FALLBACK_GALLERY_TOPPERS.filter((topper) => topper.year === year);

  const total = filtered.length;
  const start = (page - 1) * limit;
  const toppers = filtered.slice(start, start + limit);

  const yearsFromData = Array.from(
    new Set(FALLBACK_GALLERY_TOPPERS.map((topper) => topper.year)),
  ).sort((a, b) => b - a);

  const years = [
    ...yearsFromData,
    ...FALLBACK_GALLERY_YEARS.filter((yearValue) => !yearsFromData.includes(yearValue)),
  ].sort((a, b) => b - a);

  return {
    years,
    toppers,
    total,
    page,
    limit,
  };
}

export const toppersGalleryService = {
  async getGallery(query: ToppersGalleryQuery): Promise<ToppersGalleryResult> {
    const normalizedQuery = {
      year: query.year,
      page: Math.max(1, query.page),
      limit: query.limit ?? TOPPERS_GALLERY_PAGE_SIZE,
    };

    return getLocalToppersGallery(normalizedQuery);
  },
};
