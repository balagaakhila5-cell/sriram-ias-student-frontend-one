import { homepageCoursesFallback } from "@/features/homepage/data/homepageCoursesFallback";
import {
  hasAllExploreCourseTabs,
  orderExploreCourseCategories,
} from "@/features/homepage/data/exploreCourseCatalog";
import type { HomepageCourseCategory } from "@/features/homepage/types";
import {
  categoryHasCourses,
  normalizeHomepageCourse,
  normalizeSectionCourses,
} from "@/features/homepage/utils/normalizeExploreCourses";
import type { CourseSummary } from "@/features/course/services/coursesService";

/** CMS/API often returns 1 placeholder course — use full catalog instead. */
function isAdequateExploreCatalog(
  categories: HomepageCourseCategory[],
): boolean {
  if (!categoryHasCourses(categories)) return false;

  const filled = categories.filter((c) => c.courses.length > 0);
  const total = filled.reduce((sum, c) => sum + c.courses.length, 0);

  if (total < 3) return false;

  const singleAllCoursesTab =
    filled.length === 1 &&
    filled[0].name.toLowerCase().replace(/\s+/g, " ").includes("all course");

  if (singleAllCoursesTab && total < 6) return false;

  if (filled.length >= 2 && total >= 3) return true;

  return total >= 6;
}

function coursesFromApi(
  apiCourses: CourseSummary[],
  apiCategories: { _id: string; name: string }[],
): HomepageCourseCategory[] {
  const toHomepage = (course: CourseSummary) =>
    normalizeHomepageCourse({
      _id: course._id,
      title: course.title,
      slug: course.slug,
      bannerImage: course.banner,
    });

  const grouped = apiCategories
    .map((category) => ({
      name: category.name,
      courses: apiCourses
        .filter((course) => {
          const courseCategory = course.category;
          const categoryName =
            typeof courseCategory === "object"
              ? courseCategory?.name
              : courseCategory;
          return categoryName === category.name;
        })
        .map(toHomepage)
        .filter(
          (course): course is NonNullable<typeof course> => course !== null,
        ),
    }))
    .filter((category) => category.courses.length > 0);

  const normalizedCourses = apiCourses
    .map(toHomepage)
    .filter((course): course is NonNullable<typeof course> => course !== null);

  if (grouped.length > 0) return grouped;

  if (normalizedCourses.length > 0) {
    return [{ name: "All Courses", courses: normalizedCourses }];
  }

  return [];
}

export function buildExploreCourseCategories(input: {
  sectionCourses: unknown;
  apiCourses?: CourseSummary[];
  apiCategories?: { _id: string; name: string }[];
}): HomepageCourseCategory[] {
  const fromHomepage = normalizeSectionCourses(input.sectionCourses);
  if (
    isAdequateExploreCatalog(fromHomepage) &&
    hasAllExploreCourseTabs(fromHomepage)
  ) {
    return mergeApiBannersIntoCatalog(
      orderExploreCourseCategories(fromHomepage),
      input.apiCourses,
    );
  }

  if (input.apiCourses?.length) {
    const fromApi = coursesFromApi(
      input.apiCourses,
      input.apiCategories?.length ? input.apiCategories : [],
    );
    if (isAdequateExploreCatalog(fromApi) && hasAllExploreCourseTabs(fromApi)) {
      return mergeApiBannersIntoCatalog(
        orderExploreCourseCategories(fromApi),
        input.apiCourses,
      );
    }
  }

  return mergeApiBannersIntoCatalog(
    homepageCoursesFallback,
    input.apiCourses,
  );
}

function mergeApiBannersIntoCatalog(
  catalog: HomepageCourseCategory[],
  apiCourses?: CourseSummary[],
): HomepageCourseCategory[] {
  if (!apiCourses?.length) return catalog;

  const bannerBySlug = new Map<string, string>();
  for (const course of apiCourses) {
    const slug = course.slug?.trim();
    const banner = course.banner?.trim();
    if (slug && banner) bannerBySlug.set(slug, banner);
  }

  if (bannerBySlug.size === 0) return catalog;

  return catalog.map((category) => ({
    ...category,
    courses: category.courses.map((course) => {
      const apiBanner = course.slug
        ? bannerBySlug.get(course.slug.trim())
        : undefined;
      return apiBanner ? { ...course, bannerImage: apiBanner } : course;
    }),
  }));
}
