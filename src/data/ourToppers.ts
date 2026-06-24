export type OurTopper = {
  name: string;
  rank: string;
  year: number;
  course: string;
  img: string;
};

export const OUR_TOPPERS_SUBTITLE =
  "Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention to help them lead the way in every phase of the UPSC process.";

export const OUR_TOPPERS: OurTopper[] = [
  {
    name: "AAKASH GARG",
    rank: "AIR 5",
    year: 2023,
    course: "GS Foundation Course",
    img: "AAKASH GARG(AIR-5) .png",
  },
  {
    name: "ABHI JAIN",
    rank: "AIR 34",
    year: 2021,
    course: "GS Foundation Course",
    img: "ABHI-JAIN(AIR-34).png",
  },
  {
    name: "ABHISHEK SHARMA",
    rank: "AIR 38",
    year: 2024,
    course: "GS Foundation Course",
    img: "ABHISHEK-SHARMA-(AIR-38) .png",
  },
  {
    name: "DIKSHA RAI",
    rank: "AIR 40",
    year: 2020,
    course: "GS Foundation Course",
    img: "DIKSHA-RAI(AIR-40).png",
  },
  {
    name: "NABIYA PARVEZ",
    rank: "AIR 29",
    year: 2022,
    course: "GS Foundation Course",
    img: "NABIYA-PARVEZ(AIR-29).png",
  },
  {
    name: "RAGHAV JHUNJHUNWALA",
    rank: "AIR 4",
    year: 2019,
    course: "GS Foundation Course",
    img: "RAGHAV-JHUNJWALA(AIR-4).png",
  },
  {
    name: "RAJ KRISHNA JHA",
    rank: "AIR 8",
    year: 2024,
    course: "GS Foundation Course",
    img: "RAJ-KRISHNA JHA(AIR-8).png",
  },
  {
    name: "ROHIN KUMAR",
    rank: "AIR 39",
    year: 2021,
    course: "GS Foundation Course",
    img: "ROHIN-KUMAR(AIR-39).png",
  },
];

const CITY_TOPPER_OFFSET: Record<string, number> = {
  delhi: 0,
  hyderabad: 2,
  pune: 4,
};

export function getToppersForCity(city?: string, count = 4): OurTopper[] {
  const key = city?.toLowerCase() ?? "delhi";
  const offset = CITY_TOPPER_OFFSET[key] ?? 0;
  const rotated = [
    ...OUR_TOPPERS.slice(offset),
    ...OUR_TOPPERS.slice(0, offset),
  ];

  return rotated.slice(0, count);
}

export function topperImageSrc(img: string): string {
  const trimmed = img?.trim() ?? '';
  if (!trimmed) return '/assets/student/course-card.png';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  return `/assets/ourtoppers/_originals/${trimmed}`;
}

/** Native bounds of static topper PNGs in public/assets/ourtoppers/_originals/ */
export const TOPPER_IMAGE_NATIVE_WIDTH = 1536;
export const TOPPER_IMAGE_NATIVE_HEIGHT = 1104;
export const TOPPER_IMAGE_ASPECT_CLASS = 'aspect-[1536/1104]';

export function formatTopperRankLabel(
  rank: string,
  year?: number | string | null,
): string {
  const normalizedRank = rank.trim();
  if (!normalizedRank) return '';

  if (year != null && String(year).trim()) {
    const yearText = String(year).trim();
    if (normalizedRank.includes(yearText)) return normalizedRank;
    return `${normalizedRank} - ${yearText}`;
  }

  return normalizedRank;
}

export function buildHomepageDisplayToppers(
  apiToppers: Array<{
    _id?: string;
    name: string;
    rank: string;
    year?: string | number | null;
    description?: string;
    courseName?: string;
    image?: string;
  }>,
  minCarouselCount = 8,
): Array<{
  id: string;
  name: string;
  rank: string;
  year?: string | number | null;
  description: string;
  img: string;
  y: number;
  scale: number;
}> {
  const staticList = OUR_TOPPERS.map((topper, index) => ({
    id: `static-${index}`,
    name: topper.name,
    rank: topper.rank,
    year: topper.year,
    description: topper.course,
    img: topper.img,
    ...getTopperLayout(index),
  }));

  if (apiToppers.length === 0) return staticList;

  const merged = apiToppers.map((topper, index) => ({
    id: topper._id ?? `api-${index}`,
    name: topper.name,
    rank: topper.rank,
    year: topper.year ?? null,
    description: topper.description ?? topper.courseName ?? '',
    img: topper.image?.trim() ?? '',
    ...getTopperLayout(index),
  }));

  const usedNames = new Set(
    merged.map((topper) => topper.name.trim().toLowerCase()),
  );
  let layoutIndex = merged.length;

  for (const staticTopper of staticList) {
    if (merged.length >= minCarouselCount) break;

    const nameKey = staticTopper.name.trim().toLowerCase();
    if (usedNames.has(nameKey)) continue;

    usedNames.add(nameKey);
    merged.push({
      ...staticTopper,
      id: `static-fill-${staticTopper.id}`,
      ...getTopperLayout(layoutIndex++),
    });
  }

  return merged.length > 0 ? merged : staticList;
}

const TOPPER_Y_OFFSETS = [35, 15, 45, 28, 18, 10, 5, 12];
const TOPPER_SCALES = [1, 1.03, 1.01, 0.98, 0.92, 1, 1, 1];

export function getTopperLayout(index: number): { y: number; scale: number } {
  return {
    y: TOPPER_Y_OFFSETS[index % TOPPER_Y_OFFSETS.length] ?? 20,
    scale: TOPPER_SCALES[index % TOPPER_SCALES.length] ?? 1,
  };
}

export const CENTER_CITIES = ["delhi", "hyderabad", "pune"] as const;

export type CenterCity = (typeof CENTER_CITIES)[number];

export function isCenterCity(city?: string): city is CenterCity {
  return CENTER_CITIES.includes((city?.toLowerCase() ?? "") as CenterCity);
}
