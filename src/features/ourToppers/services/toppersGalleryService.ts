import { getTopperLayout } from '@/data/ourToppers';
import {
  FALLBACK_GALLERY_TOPPERS,
  FALLBACK_GALLERY_YEARS,
} from '@/features/ourToppers/data/galleryToppersFallback';
import type {
  GalleryTopper,
  ToppersGalleryQuery,
  ToppersGalleryResult,
} from '@/features/ourToppers/types';
import { TOPPERS_GALLERY_PAGE_SIZE } from '@/features/ourToppers/types';
import {
  toppersPortalService,
} from '@/features/ourToppers/services/toppersPortalService';
import type { PortalTopper } from '@/features/ourToppers/types/portalTopper';

function mapPortalTopperToGalleryTopper(
  topper: PortalTopper,
  index: number,
): GalleryTopper {
  return {
    id: topper._id,
    name: topper.studentName,
    rank: topper.rank,
    description: topper.courseOrProgram,
    img: topper.image?.url ?? '',
    year: topper.year ?? new Date().getFullYear(),
    ...getTopperLayout(index),
  };
}

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

function getGalleryFromPortal(
  allToppers: PortalTopper[],
  query: Required<ToppersGalleryQuery>,
): ToppersGalleryResult {
  const { year, page, limit } = query;

  const years = Array.from(
    new Set(
      allToppers
        .map((topper) => topper.year)
        .filter((value): value is number => typeof value === 'number'),
    ),
  ).sort((a, b) => b - a);

  const filtered =
    year === 'all'
      ? allToppers
      : allToppers.filter((topper) => topper.year === year);

  const total = filtered.length;
  const start = (page - 1) * limit;
  const toppers = filtered
    .slice(start, start + limit)
    .map((topper, index) => mapPortalTopperToGalleryTopper(topper, start + index));

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

    try {
      const portalResponse = await toppersPortalService.getDisplayedToppers();
      if (portalResponse.toppers.length > 0) {
        return getGalleryFromPortal(portalResponse.toppers, normalizedQuery);
      }
    } catch {
      /* fall back to local seed data when API is unavailable */
    }

    return getLocalToppersGallery(normalizedQuery);
  },
};
