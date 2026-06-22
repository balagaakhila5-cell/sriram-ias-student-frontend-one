import type { GalleryTopper } from '@/features/ourToppers/types';

const BASE_TOPPERS: Omit<GalleryTopper, 'id' | 'year'>[] = [
  {
    name: 'AAKASH GARG',
    rank: 'AIR 5',
    description: 'GS Foundation Course',
    img: 'AAKASH GARG(AIR-5) .png',
    y: 35,
    scale: 1,
  },
  {
    name: 'ABHI JAIN',
    rank: 'AIR 34',
    description: 'GS Foundation Course',
    img: 'ABHI-JAIN(AIR-34).png',
    y: 45,
    scale: 1.03,
  },
  {
    name: 'ABHISHEK SHARMA',
    rank: 'AIR 38',
    description: 'GS Foundation Course',
    img: 'ABHISHEK-SHARMA-(AIR-38) .png',
    y: 35,
    scale: 1.01,
  },
  {
    name: 'DIKSHA RAI',
    rank: 'AIR 40',
    description: 'GS Foundation Course',
    img: 'DIKSHA-RAI(AIR-40).png',
    y: 41,
    scale: 0.98,
  },
  {
    name: 'NABIYA PARVEZ',
    rank: 'AIR 29',
    description: 'GS Foundation Course',
    img: 'NABIYA-PARVEZ(AIR-29).png',
    y: 45,
    scale: 0.92,
  },
  {
    name: 'RAGHAV JHUNJHUNWALA',
    rank: 'AIR 4',
    description: 'GS Foundation Course',
    img: 'RAGHAV-JHUNJWALA(AIR-4).png',
    y: 10,
    scale: 1,
  },
  {
    name: 'RAJ KRISHNA JHA',
    rank: 'AIR 8',
    description: 'GS Foundation Course',
    img: 'RAJ-KRISHNA JHA(AIR-8).png',
    y: 5,
    scale: 1,
  },
  {
    name: 'ROHIN KUMAR',
    rank: 'AIR 39',
    description: 'GS Foundation Course',
    img: 'ROHIN-KUMAR(AIR-39).png',
    y: 12,
    scale: 1,
  },
  {
    name: 'ADITYA VIKRAM AGARWAL',
    rank: 'AIR 9',
    description: 'GS Foundation Course',
    img: 'Aditya-Vikram-Agarwal (AIR - 9).png',
    y: 13,
    scale: 0.97,
  },
  {
    name: 'ETTABOINA SAI SHIVANI',
    rank: 'AIR 11',
    description: 'GS Foundation Course',
    img: 'ETTABOINA-SAI-SHIVANI(AIR-11).png',
    y: 35,
    scale: 0.84,
  },
];

function buildYearToppers(year: number, repeatCount: number): GalleryTopper[] {
  const items: GalleryTopper[] = [];

  for (let repeat = 0; repeat < repeatCount; repeat += 1) {
    BASE_TOPPERS.forEach((topper, index) => {
      items.push({
        ...topper,
        id: `${year}-${repeat}-${index}`,
        year,
        name: repeat === 0 ? topper.name : `${topper.name} ${repeat + 1}`,
      });
    });
  }

  return items;
}

export const FALLBACK_GALLERY_TOPPERS: GalleryTopper[] = [
  ...buildYearToppers(2026, 1),
  ...buildYearToppers(2025, 5),
  ...buildYearToppers(2024, 1).slice(0, 8),
];

export const FALLBACK_GALLERY_YEARS = [2026, 2025, 2024, 2023] as const;
