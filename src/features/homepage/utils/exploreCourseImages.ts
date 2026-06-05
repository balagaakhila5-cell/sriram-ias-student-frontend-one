/** Default banner when API/static path is missing or broken */
export const DEFAULT_EXPLORE_COURSE_IMAGE =
  "/assets/course/course-hero-bg.png";

/** Rotating card images for the home Explore Our Courses grid */
export const EXPLORE_COURSE_CARD_IMAGES = [
  "/assets/our-centers/course-1.png",
  "/assets/our-centers/course-2.png",
  "/assets/our-centers/course-3.png",
  "/assets/our-centers/course-4.png",
] as const;

/** Primary image per course category tab */
export const EXPLORE_CATEGORY_IMAGES: Record<string, string> = {
  "GS Foundation": "/assets/our-centers/course-1.png",
  Mentorship: "/assets/our-centers/course-2.png",
  "Optional Foundation": "/assets/our-centers/course-3.png",
  "Test Series": "/assets/our-centers/course-4.png",
  CSAT: "/assets/course_image.png",
  "Enrichment Course": "/assets/offline_course.png",
};

const GENERIC_HERO_PATTERN = /course-hero-bg/i;

export function resolveExploreCourseImage(
  bannerImage?: string,
  index = 0,
  categoryName?: string,
): string {
  const trimmed = bannerImage?.trim();
  if (trimmed && !GENERIC_HERO_PATTERN.test(trimmed)) {
    return trimmed;
  }

  if (categoryName && EXPLORE_CATEGORY_IMAGES[categoryName]) {
    const pool = [
      EXPLORE_CATEGORY_IMAGES[categoryName],
      ...EXPLORE_COURSE_CARD_IMAGES,
    ];
    return pool[index % pool.length] ?? EXPLORE_CATEGORY_IMAGES[categoryName];
  }

  return (
    EXPLORE_COURSE_CARD_IMAGES[index % EXPLORE_COURSE_CARD_IMAGES.length] ??
    DEFAULT_EXPLORE_COURSE_IMAGE
  );
}
