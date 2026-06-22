export type GalleryTopper = {
  id: string;
  name: string;
  rank: string;
  description: string;
  img: string;
  y: number;
  scale: number;
  year: number;
};

export type ToppersGalleryQuery = {
  year: number | 'all';
  page: number;
  limit?: number;
};

export type ToppersGalleryResult = {
  years: number[];
  toppers: GalleryTopper[];
  total: number;
  page: number;
  limit: number;
};

export const TOPPERS_GALLERY_PAGE_SIZE = 10;
