import { getCourseBySlug } from "@/features/course/data/courses";
import {
  ALLOWED_CENTER_CITIES,
  CENTER_CATEGORIES_BY_CITY,
  TAB_TO_CATEGORY_KEY,
  formatCityLabel,
  formatCourseTitle,
} from "@/features/center/data/centerCourseCategories";
import type {
  HomepageCourse,
  HomepageCourseCategory,
} from "@/features/homepage/types";
import { resolveExploreCourseImage } from "@/features/homepage/utils/exploreCourseImages";

/** Homepage category tabs — union of all center course categories. */
export const EXPLORE_COURSE_TAB_NAMES = [
  "GS Foundation",
  "Mentorship",
  "Optional Foundation",
  "Test Series",
  "CSAT",
  "Enrichment Course",
] as const;

export type ExploreCourseTabName = (typeof EXPLORE_COURSE_TAB_NAMES)[number];

export type ExploreCatalogCourse = {
  _id: string;
  title: string;
  slug: string;
  center: string;
  category: string;
  bannerImage?: string;
};

function getCategoryKeyForTab(tab: string) {
  return TAB_TO_CATEGORY_KEY[tab];
}

/** All programs for a tab across New Delhi → Hyderabad → Pune. */
export function buildAllCentersExploreCoursesForTab(
  tab: string,
): ExploreCatalogCourse[] {
  const categoryKey = getCategoryKeyForTab(tab);
  if (!categoryKey) return [];

  const courses: ExploreCatalogCourse[] = [];

  for (const cityKey of ALLOWED_CENTER_CITIES) {
    const category = CENTER_CATEGORIES_BY_CITY[cityKey].find(
      (item) => item.key === categoryKey,
    );
    if (!category) continue;

    const centerLabel = formatCityLabel(cityKey);

    for (const slug of category.programSlugs) {
      const staticCourse = getCourseBySlug(slug);
      if (!staticCourse) continue;

      courses.push({
        _id: `${cityKey}-${slug}`,
        title: formatCourseTitle(staticCourse.title),
        slug,
        center: centerLabel,
        category: tab,
      });
    }
  }

  return courses;
}

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

/** Canonical home-page Explore Our Courses grid (all centers per tab). */
export function buildCanonicalExploreCategories(): HomepageCourseCategory[] {
  let imageIndex = 0;

  return EXPLORE_COURSE_TAB_NAMES.map((tabName) => ({
    name: tabName,
    courses: buildAllCentersExploreCoursesForTab(tabName).map((entry) => {
      const staticCourse = getCourseBySlug(entry.slug);
      const bannerImage = resolveExploreCourseImage(
        staticCourse?.heroImage,
        imageIndex,
        tabName,
      );
      imageIndex += 1;

      return {
        _id: entry._id,
        title: entry.title,
        slug: entry.slug,
        center: entry.center,
        bannerImage,
      } satisfies HomepageCourse & { center?: string };
    }),
  }));
}

export const homepageCoursesFallback = buildCanonicalExploreCategories();
