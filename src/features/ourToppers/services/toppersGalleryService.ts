import { fetchToppersGallery as fetchToppersGalleryApi } from '@/lib/allApi';
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

const hasApiBaseUrl = Boolean(import.meta.env.VITE_API_BASE_URL?.trim());

function toNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeTopper(
  item: Record<string, unknown>,
  index: number,
): GalleryTopper | null {
  const name = String(item.name ?? '').trim();
  const rank = String(item.rank ?? '').trim();
  const img = String(item.img ?? item.image ?? '').trim();

  if (!name || !rank) return null;

  return {
    id: String(item._id ?? item.id ?? `${name}-${rank}-${index}`),
    name,
    rank,
    description: String(
      item.description ?? item.course ?? 'GS Foundation Course',
    ).trim(),
    img,
    y: toNumber(item.y, 20),
    scale: toNumber(item.scale, 1),
    year: toNumber(item.year, new Date().getFullYear()),
  };
}

function normalizeApiResponse(
  raw: unknown,
  query: Required<Pick<ToppersGalleryQuery, 'page' | 'limit'>>,
): ToppersGalleryResult | null {
  const top = (raw ?? {}) as Record<string, unknown>;
  const payload = (
    top.data && typeof top.data === 'object' ? top.data : top
  ) as Record<string, unknown>;

  const toppersRaw = payload.toppers;
  if (!Array.isArray(toppersRaw)) return null;

  const toppers = toppersRaw
    .map((item, index) => normalizeTopper(item as Record<string, unknown>, index))
    .filter((item): item is GalleryTopper => item !== null);

  const yearsRaw = payload.years;
  const years = Array.isArray(yearsRaw)
    ? yearsRaw
        .map((year) => toNumber(year))
        .filter((year) => Number.isInteger(year) && year > 0)
        .sort((a, b) => b - a)
    : [];

  return {
    years,
    toppers,
    total: toNumber(payload.total, toppers.length),
    page: toNumber(payload.page, query.page),
    limit: toNumber(payload.limit, query.limit),
  };
}

function getFallbackToppersGallery(
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

    if (hasApiBaseUrl) {
      try {
        const raw = await fetchToppersGalleryApi({
          year: normalizedQuery.year,
          page: normalizedQuery.page,
          limit: normalizedQuery.limit,
        });
        const parsed = normalizeApiResponse(raw, normalizedQuery);

        if (parsed) {
          return {
            ...parsed,
            years:
              parsed.years.length > 0 ? parsed.years : FALLBACK_GALLERY_YEARS.slice(),
          };
        }
      } catch {
        // Fall back to local data when the API is unavailable.
      }
    }

    return getFallbackToppersGallery(normalizedQuery);
  },
};
