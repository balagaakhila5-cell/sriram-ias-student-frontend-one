import { getCourseBySlug } from "@/features/course/data/courses";
import type {
  HomepageCourse,
  HomepageCourseCategory,
} from "@/features/homepage/types";
import { resolveExploreCourseImage } from "@/features/homepage/utils/exploreCourseImages";

/** Same six tabs as the main site Courses mega menu (New Delhi). */
export const EXPLORE_COURSE_TAB_NAMES = [
  "GS Foundation",
  "Mentorship",
  "Optional Foundation",
  "Test Series",
  "CSAT",
  "Enrichment Course",
] as const;

export type ExploreCourseTabName = (typeof EXPLORE_COURSE_TAB_NAMES)[number];

type CatalogEntry = { slug: string; title?: string };

const CATALOG_BY_TAB: Record<ExploreCourseTabName, CatalogEntry[]> = {
  "GS Foundation": [
    { slug: "2-years-gs-foundation" },
    { slug: "1-year-gs-foundation" },
    { slug: "ncert-foundation" },
  ],
  Mentorship: [{ slug: "stride-mentorship-program" }],
  "Optional Foundation": [
    { slug: "anthropology-optional-foundation" },
    { slug: "geography-optional-foundation" },
    { slug: "psir-optional-foundation" },
    { slug: "sociology-optional-foundation" },
  ],
  "Test Series": [
    { slug: "prelims-test-series-mentorship" },
    { slug: "mains-test-series-mentorship" },
  ],
  CSAT: [{ slug: "csat-foundation" }],
  "Enrichment Course": [{ slug: "interview-guidance-program" }],
};

export function hasAllExploreCourseTabs(
  categories: HomepageCourseCategory[],
): boolean {
  const names = new Set(
    categories.map((c) => c.name.trim().toLowerCase()),
  );
  return EXPLORE_COURSE_TAB_NAMES.every((tab) =>
    names.has(tab.toLowerCase()),
  );
}

export function orderExploreCourseCategories(
  categories: HomepageCourseCategory[],
): HomepageCourseCategory[] {
  const byName = new Map(
    categories.map((c) => [c.name.trim().toLowerCase(), c]),
  );

  return EXPLORE_COURSE_TAB_NAMES.map((tab) => {
    const found = byName.get(tab.toLowerCase());
    return found ?? { name: tab, courses: [] };
  }).filter((c) => c.courses.length > 0);
}

/** Canonical home-page Explore Our Courses grid (6 tabs + course cards). */
export function buildCanonicalExploreCategories(): HomepageCourseCategory[] {
  let imageIndex = 0;

  return EXPLORE_COURSE_TAB_NAMES.map((tabName) => ({
    name: tabName,
    courses: CATALOG_BY_TAB[tabName].map((entry) => {
      const staticCourse = getCourseBySlug(entry.slug);
      const title =
        entry.title ??
        staticCourse?.title.replace(/\n/g, " ").trim() ??
        entry.slug;
      const bannerImage = resolveExploreCourseImage(
        staticCourse?.heroImage,
        imageIndex,
        tabName,
      );
      imageIndex += 1;

      return {
        _id: entry.slug,
        title,
        slug: entry.slug,
        bannerImage,
      } satisfies HomepageCourse;
    }),
  }));
}

export const homepageCoursesFallback = buildCanonicalExploreCategories();
