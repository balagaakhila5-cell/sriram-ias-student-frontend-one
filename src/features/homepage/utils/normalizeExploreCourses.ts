import type {
  HomepageCourse,
  HomepageCourseCategory,
} from "@/features/homepage/types";
import { DEFAULT_EXPLORE_COURSE_IMAGE } from "@/features/homepage/utils/exploreCourseImages";

const asString = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
};

const imageUrl = (value: unknown): string | undefined => {
  if (typeof value === "string") return asString(value);
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return asString(obj.url) ?? asString(obj.secure_url);
  }
  return undefined;
};

export function normalizeHomepageCourse(raw: unknown): HomepageCourse | null {
  if (!raw || typeof raw !== "object") return null;

  const course = raw as Record<string, unknown>;
  const title = asString(course.title) ?? "Course";
  const slug = asString(course.slug);
  const _id =
    asString(course._id) ?? asString(course.id) ?? slug ?? title;
  const bannerImage =
    imageUrl(course.bannerImage) ??
    imageUrl(course.banner) ??
    imageUrl(course.heroImage) ??
    imageUrl(course.image) ??
    DEFAULT_EXPLORE_COURSE_IMAGE;

  return { _id, title, slug, bannerImage };
}

function normalizeCategory(raw: unknown): HomepageCourseCategory | null {
  if (!raw || typeof raw !== "object") return null;

  const category = raw as Record<string, unknown>;
  const name =
    asString(category.name) ??
    asString(category.categoryName) ??
    asString(category.title);

  if (!name) return null;

  const rawCourses = category.courses ?? category.courseList ?? category.items;
  const courses = Array.isArray(rawCourses)
    ? rawCourses
        .map(normalizeHomepageCourse)
        .filter((course): course is HomepageCourse => course !== null)
    : [];

  return { name, courses };
}

/** Normalize homepage `sectionCourses` from API (handles nested images and alternate keys). */
export function normalizeSectionCourses(
  section: unknown,
): HomepageCourseCategory[] {
  if (!section || typeof section !== "object") return [];

  const payload = section as Record<string, unknown>;
  const rawCategories = payload.categories ?? payload.categoryList ?? [];
  const categories = Array.isArray(rawCategories)
    ? rawCategories
        .map(normalizeCategory)
        .filter(
          (category): category is HomepageCourseCategory => category !== null,
        )
    : [];

  const flatRaw = payload.courses ?? payload.courseList ?? payload.items;
  const flatCourses = Array.isArray(flatRaw)
    ? flatRaw
        .map(normalizeHomepageCourse)
        .filter((course): course is HomepageCourse => course !== null)
    : [];

  if (flatCourses.length === 0) {
    return categories.filter((category) => category.courses.length > 0);
  }

  const hasAnyCourses = categories.some(
    (category) => category.courses.length > 0,
  );

  if (!hasAnyCourses) {
    if (categories.length > 0) {
      return categories.map((category, index) =>
        index === 0 ? { ...category, courses: flatCourses } : category,
      );
    }

    return [{ name: "All Courses", courses: flatCourses }];
  }

  return categories.filter((category) => category.courses.length > 0);
}

export function categoryHasCourses(
  categories: HomepageCourseCategory[],
): boolean {
  return categories.some((category) => (category.courses?.length ?? 0) > 0);
}
