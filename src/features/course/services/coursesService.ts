import {
  buildCanonicalExploreCategories,
  EXPLORE_COURSE_TAB_NAMES,
} from "@/features/homepage/data/exploreCourseCatalog";
import { courses as staticCourses, getCourseBySlug } from "../data/courses";

/* ------------------------------------------------------------------ */
/*  Public types (consumed by components / adapters)                   */
/* ------------------------------------------------------------------ */

export interface Center {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface CourseSummary {
  _id: string;
  title: string;
  description?: string;
  duration?: string;
  startDate?: string;
  onlineFees?: number;
  offlineFees?: number;
  modes?: string[];
  banner?: string;
  center?: Center | string;
  category?: Category | string;
  slug?: string;
}

export interface KeyHighlights {
  keyTitle?: string;
  keyHighlightTexts?: string[];
}

export interface WhyChooseItem {
  whyChooseText: string;
  whyChooseContent: string;
}

export interface WhyChoose {
  whyChooseTitle?: string;
  whyChooseItems?: WhyChooseItem[];
}

export interface HowItHelps {
  howItHelpsTitle?: string;
  howItHelpsTexts?: string[];
}

export interface CourseDetail extends CourseSummary {
  keyHighlights?: KeyHighlights;
  whyChoose?: WhyChoose;
  howItHelps?: HowItHelps;
  highlight?: string;
  section?: string;
  gallery?: string[];
  video?: string;
  brochure?: string;
  extraFields?: Record<string, unknown>;
}

export interface CourseFilters {
  centerName?: string;
  categoryName?: string;
}

// Canonical EnquiryPayload now lives in the enquiry feature module.
export type { EnquiryPayload } from "@/features/enquiry/types";

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const MOCK_CENTERS: Center[] = [
  { _id: "center-delhi", name: "New Delhi" },
  { _id: "center-hyderabad", name: "Hyderabad" },
  { _id: "center-pune", name: "Pune" },
];

const MOCK_CATEGORIES: Category[] = EXPLORE_COURSE_TAB_NAMES.map((name, i) => ({
  _id: `category-${i}`,
  name,
}));

const parseFee = (fee?: string): number | undefined => {
  if (!fee) return undefined;
  const digits = fee.replace(/\D/g, "");
  const value = Number.parseInt(digits, 10);
  return Number.isFinite(value) ? value : undefined;
};

const getCategoryName = (category: CourseSummary["category"]): string | undefined =>
  typeof category === "string" ? category : category?.name;

const getCenterName = (center: CourseSummary["center"]): string | undefined =>
  typeof center === "string" ? center : center?.name;

function buildMockCourses(): CourseSummary[] {
  const catalog = buildCanonicalExploreCategories();

  return catalog.flatMap((category) =>
    category.courses.map((course) => {
      const staticCourse = course.slug ? getCourseBySlug(course.slug) : undefined;

      return {
        _id: course._id,
        title: course.title,
        slug: course.slug,
        description: staticCourse?.subtitle,
        startDate: staticCourse?.startDate,
        duration: staticCourse?.duration,
        modes: staticCourse?.mode?.split(",").map((mode) => mode.trim()),
        onlineFees: parseFee(staticCourse?.feesOnline),
        offlineFees: parseFee(staticCourse?.feesOffline),
        banner: course.bannerImage ?? staticCourse?.heroImage,
        center: MOCK_CENTERS[0],
        category: {
          _id: `category-${category.name}`,
          name: category.name,
        },
      };
    }),
  );
}

const MOCK_COURSES = buildMockCourses();

function toCourseDetail(summary: CourseSummary): CourseDetail {
  const staticCourse = summary.slug ? getCourseBySlug(summary.slug) : undefined;

  return {
    ...summary,
    keyHighlights: staticCourse
      ? { keyHighlightTexts: staticCourse.highlights }
      : undefined,
    whyChoose: staticCourse
      ? {
          whyChooseItems: staticCourse.whyChooseFeatures.map((item) => ({
            whyChooseText: item.label,
            whyChooseContent: item.description ?? "",
          })),
        }
      : undefined,
    howItHelps: staticCourse
      ? { howItHelpsTexts: staticCourse.helpPoints }
      : undefined,
    gallery: staticCourse?.helpImages,
    brochure: staticCourse?.brochure,
  };
}

const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

/* ------------------------------------------------------------------ */
/*  Service                                                            */
/* ------------------------------------------------------------------ */

export const coursesService = {
  listCenters: async (): Promise<Center[]> => {
    await delay();
    return MOCK_CENTERS;
  },

  listCategories: async (): Promise<Category[]> => {
    await delay();
    return MOCK_CATEGORIES;
  },

  listCourses: async (filters: CourseFilters = {}): Promise<CourseSummary[]> => {
    await delay();
    return MOCK_COURSES.filter((course) => {
      if (
        filters.centerName &&
        getCenterName(course.center) !== filters.centerName
      ) {
        return false;
      }
      if (
        filters.categoryName &&
        getCategoryName(course.category) !== filters.categoryName
      ) {
        return false;
      }
      return true;
    });
  },

  getCourse: async (id: string): Promise<CourseDetail> => {
    await delay();
    const summary =
      MOCK_COURSES.find((course) => course._id === id) ??
      MOCK_COURSES.find((course) => course.slug === id);

    if (!summary) {
      const bySlug = staticCourses.find((course) => course.slug === id);
      if (!bySlug) throw new Error("Course not found");
      return toCourseDetail({
        _id: bySlug.slug,
        title: bySlug.title.replace(/\n/g, " "),
        slug: bySlug.slug,
        startDate: bySlug.startDate,
        duration: bySlug.duration,
        modes: bySlug.mode?.split(",").map((mode) => mode.trim()),
        onlineFees: parseFee(bySlug.feesOnline),
        offlineFees: parseFee(bySlug.feesOffline),
        banner: bySlug.heroImage,
        center: MOCK_CENTERS[0],
        category: MOCK_CATEGORIES[0],
      });
    }

    return toCourseDetail(summary);
  },
};

