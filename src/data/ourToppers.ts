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
  if (/^https?:\/\//i.test(trimmed)) return optimizeTopperImageUrl(trimmed);
  if (trimmed.startsWith('/')) return trimmed;
  return `/assets/ourtoppers/_originals/${trimmed}`;
}

export function isRemoteTopperImage(img: string): boolean {
  return /^https?:\/\//i.test(img?.trim() ?? '');
}

/** Native bounds of static topper PNGs in public/assets/ourtoppers/_originals/ */
export const TOPPER_IMAGE_NATIVE_WIDTH = 1536;
export const TOPPER_IMAGE_NATIVE_HEIGHT = 1104;
export const TOPPER_IMAGE_ASPECT_CLASS = 'aspect-[1536/1104]';

/** Scale CMS topper photos without cropping — preserve alpha without forced PNG re-encode. */
export function optimizeTopperImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed.includes('res.cloudinary.com') || !trimmed.includes('/upload/')) {
    return trimmed;
  }

  const uploadSegment = trimmed.match(/\/upload\/([^/]+)\//)?.[1];
  if (uploadSegment && !/^v\d+$/.test(uploadSegment)) {
    return trimmed;
  }

  return trimmed.replace(
    '/upload/',
    `/upload/c_limit,h_${TOPPER_IMAGE_NATIVE_HEIGHT},w_${TOPPER_IMAGE_NATIVE_WIDTH},f_auto,fl_preserve_transparency,q_auto:best/`,
  );
}

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

import type { DisplayTopperCard } from "@/features/ourToppers/types/portalTopper";
import { isPortalTopperDisplayed } from "@/features/ourToppers/utils/portalTopperHelpers";

export function mapDisplayedToppersToCarousel(
  apiToppers: Array<{
    _id?: string;
    studentId?: string;
    studentName?: string;
    name?: string;
    rank: string;
    year?: string | number | null;
    courseOrProgram?: string;
    courseName?: string;
    description?: string;
    image?: string | { url?: string } | null;
    isTop10?: boolean;
    isDisplayed?: boolean;
  }>,
): DisplayTopperCard[] {
  return apiToppers
    .filter((topper) => isPortalTopperDisplayed(topper.isDisplayed))
    .map((topper, index) => {
      const imageValue =
        typeof topper.image === "object"
          ? topper.image?.url ?? ""
          : topper.image?.trim() ?? "";

      return {
        id: topper._id ?? `api-${index}`,
        name: topper.studentName ?? topper.name ?? "",
        studentId: topper.studentId ?? "",
        rank: topper.rank,
        year: topper.year ?? null,
        course:
          topper.courseOrProgram ??
          topper.courseName ??
          topper.description ??
          "",
        img: imageValue,
        isTop10: Boolean(topper.isTop10),
        ...getTopperLayout(index),
      };
    });
}

export function buildHomepageDisplayToppers(
  apiToppers: Array<{
    _id?: string;
    name?: string;
    studentName?: string;
    rank: string;
    year?: string | number | null;
    description?: string;
    courseName?: string;
    courseOrProgram?: string;
    image?: string | { url?: string } | null;
  }>,
): ReturnType<typeof mapDisplayedToppersToCarousel> {
  return mapDisplayedToppersToCarousel(
    apiToppers.map((topper) => ({
      _id: topper._id,
      studentName: topper.studentName ?? topper.name,
      rank: topper.rank,
      year: topper.year,
      courseOrProgram: topper.courseOrProgram ?? topper.courseName,
      description: topper.description,
      image: topper.image,
    })),
  );
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
