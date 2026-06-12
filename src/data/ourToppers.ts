export type OurTopper = {
  name: string;
  rank: string;
  course: string;
  img: string;
};

export const OUR_TOPPERS_SUBTITLE =
  "Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention to help them lead the way in every phase of the UPSC process.";

export const OUR_TOPPERS: OurTopper[] = [
  {
    name: "AAKASH GARG",
    rank: "AIR 5",
    course: "GS Foundation Course",
    img: "AAKASH GARG(AIR-5) .png",
  },
  {
    name: "ABHI JAIN",
    rank: "AIR 34",
    course: "GS Foundation Course",
    img: "ABHI-JAIN(AIR-34).png",
  },
  {
    name: "ABHISHEK SHARMA",
    rank: "AIR 38",
    course: "GS Foundation Course",
    img: "ABHISHEK-SHARMA-(AIR-38) .png",
  },
  {
    name: "DIKSHA RAI",
    rank: "AIR 40",
    course: "GS Foundation Course",
    img: "DIKSHA-RAI(AIR-40).png",
  },
  {
    name: "NABIYA PARVEZ",
    rank: "AIR 29",
    course: "GS Foundation Course",
    img: "NABIYA-PARVEZ(AIR-29).png",
  },
  {
    name: "RAGHAV JHUNJHUNWALA",
    rank: "AIR 4",
    course: "GS Foundation Course",
    img: "RAGHAV-JHUNJWALA(AIR-4).png",
  },
  {
    name: "RAJ KRISHNA JHA",
    rank: "AIR 8",
    course: "GS Foundation Course",
    img: "RAJ-KRISHNA JHA(AIR-8).png",
  },
  {
    name: "ROHIN KUMAR",
    rank: "AIR 39",
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
  return `/assets/ourtoppers/_originals/${img}`;
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
