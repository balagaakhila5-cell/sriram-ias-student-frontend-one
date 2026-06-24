import { http } from "@/lib/http";
import type { ApiEnvelope } from "@/lib/apiResult";
import {
  buildCanonicalExploreCategories,
  EXPLORE_COURSE_TAB_NAMES,
} from "@/features/homepage/data/exploreCourseCatalog";
import { courses as staticCourses, getCourseBySlug } from "../data/courses";
import type { CoursePurchaseMeta } from "../types";

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
  purchase?: CoursePurchaseMeta;
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
  demoVideo?: string;
  extraFields?: Record<string, unknown>;
}

export interface CourseFilters {
  centerName?: string;
  categoryName?: string;
}

export type { EnquiryPayload } from "@/features/enquiry/types";

interface PublicCourseDetailApi {
  course: {
    _id: string;
    courseId?: string;
    courseName?: string;
    title?: string;
    slug?: string;
    courseOverview?: string;
    keyFeatures?: string[];
    keyFeatureImage?: string;
    whyChooseTitle?: string;
    helpSectionTitle?: string;
    helpSectionPoints?: string[];
    helpSectionImages?: string[];
    helpSectionVideo?: string;
    demoVideo?: string;
    featureCards?: unknown[];
    center?: { centerName?: string; city?: string };
    program?: { programName?: string };
  };
  batch: {
    _id: string;
    batchId?: string;
    batchName?: string;
    commencementDate?: string;
    durationInMonths?: number;
    bannerImage?: string;
    brochure?: string | { url?: string };
  };
  fees?: {
    currency?: string;
    onlineAmount?: number;
    offlineAmount?: number;
    discountAmount?: number;
    onlineBulletPoints?: string[];
    offlineBulletPoints?: string[];
  };
}

/* ------------------------------------------------------------------ */
/*  Mock data (fallback when API unavailable)                          */
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

function mapPublicCourseDetail(api: PublicCourseDetailApi): CourseDetail {
  const { course, batch, fees } = api;
  const brochure =
    typeof batch.brochure === "string"
      ? batch.brochure
      : batch.brochure?.url;

  const purchase: CoursePurchaseMeta = {
    courseId: course._id,
    batchId: batch._id,
    batchBusinessId: batch.batchId,
    onlineAmount: fees?.onlineAmount ?? 0,
    offlineAmount: fees?.offlineAmount ?? 0,
    discountAmount: fees?.discountAmount ?? 0,
    onlineBulletPoints: fees?.onlineBulletPoints,
    offlineBulletPoints: fees?.offlineBulletPoints,
  };

  return {
    _id: course._id,
    title: course.courseName || course.title || "",
    slug: course.slug,
    description: course.courseOverview,
    duration: batch.durationInMonths
      ? `${batch.durationInMonths} Months`
      : undefined,
    startDate: batch.commencementDate,
    onlineFees: fees?.onlineAmount,
    offlineFees: fees?.offlineAmount,
    modes: ["Online", "Offline"],
    banner: batch.bannerImage || course.keyFeatureImage,
    center: course.center?.centerName
      ? { _id: course.center.centerName, name: course.center.centerName }
      : undefined,
    category: course.program?.programName
      ? { _id: course.program.programName, name: course.program.programName }
      : undefined,
    keyHighlights: course.keyFeatures?.length
      ? { keyHighlightTexts: course.keyFeatures }
      : undefined,
    howItHelps: course.helpSectionPoints?.length
      ? { howItHelpsTexts: course.helpSectionPoints }
      : undefined,
    gallery: course.helpSectionImages,
    brochure,
    demoVideo: course.demoVideo,
    video: course.demoVideo,
    purchase,
  };
}

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

  getCourseDetailBySlug: async (slug: string): Promise<CourseDetail> => {
    const { data } = await http.post<ApiEnvelope<PublicCourseDetailApi>>(
      "/public/course-detail",
      { slug },
    );
    return mapPublicCourseDetail(data.data);
  },

  getCourse: async (id: string): Promise<CourseDetail> => {
    if (id.includes("-") && !id.startsWith("category-")) {
      try {
        return await coursesService.getCourseDetailBySlug(id);
      } catch {
        // fall through to mock lookup
      }
    }

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
