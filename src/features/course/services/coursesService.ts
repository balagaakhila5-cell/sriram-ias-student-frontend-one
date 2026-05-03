import apiClient from "@/services/apiClient";

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

/** Cloudinary-style image/file object returned by the backend */
interface CloudinaryAsset {
  url: string;
  public_id: string;
}

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

/* ------------------------------------------------------------------ */
/*  Raw API response shapes (private – only used inside this file)    */
/* ------------------------------------------------------------------ */

/** Shape of a single course as returned by the backend */
interface ApiRawCourse {
  _id: string;
  title: string;
  description?: string;
  duration?: string;
  startDate?: string;
  slug?: string;
  modes?: string[];
  fees?: { online?: number; offline?: number };
  bannerImage?: CloudinaryAsset;
  highlightImage?: CloudinaryAsset;
  sectionImage?: CloudinaryAsset;
  promoVideo?: CloudinaryAsset;
  brochure?: CloudinaryAsset;
  galleryImages?: (CloudinaryAsset & { _id?: string })[];
  center?: Center | string;
  category?: Category | string;
  keyHighlights?: KeyHighlights;
  whyChoose?: WhyChoose;
  howItHelps?: HowItHelps;
  features?: unknown[];
  isActive?: boolean;
  isFeatured?: boolean;
  [key: string]: unknown;
}

interface ApiCoursesResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  courses: ApiRawCourse[];
}

interface ApiSingleCourseResponse {
  success: boolean;
  course: ApiRawCourse;
}

interface ApiCentersResponse {
  success: boolean;
  count: number;
  centers: Center[];
}

interface ApiCategoriesResponse {
  success: boolean;
  count: number;
  categories: Category[];
}

/* ------------------------------------------------------------------ */
/*  Normalisers                                                        */
/* ------------------------------------------------------------------ */

function normaliseSummary(raw: ApiRawCourse): CourseSummary {
  return {
    _id: raw._id,
    title: raw.title,
    description: raw.description,
    duration: raw.duration,
    startDate: raw.startDate,
    slug: raw.slug,
    modes: raw.modes,
    onlineFees: raw.fees?.online,
    offlineFees: raw.fees?.offline,
    banner: raw.bannerImage?.url,
    center: raw.center,
    category: raw.category,
  };
}

function normaliseDetail(raw: ApiRawCourse): CourseDetail {
  return {
    ...normaliseSummary(raw),
    keyHighlights: raw.keyHighlights,
    whyChoose: raw.whyChoose,
    howItHelps: raw.howItHelps,
    highlight: raw.highlightImage?.url,
    section: raw.sectionImage?.url,
    gallery: raw.galleryImages?.map((img) => img.url),
    video: raw.promoVideo?.url,
    brochure: raw.brochure?.url,
  };
}

/* ------------------------------------------------------------------ */
/*  Service                                                            */
/* ------------------------------------------------------------------ */

export const coursesService = {
  listCenters: async (): Promise<Center[]> => {
    const { data } = await apiClient.get<ApiCentersResponse>("/api/centers");
    return data.centers ?? [];
  },

  listCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<ApiCategoriesResponse>("/api/categories");
    return data.categories ?? [];
  },

  listCourses: async (filters: CourseFilters = {}): Promise<CourseSummary[]> => {
    const { data } = await apiClient.get<ApiCoursesResponse>("/api/courses", {
      params: filters,
    });
    return (data.courses ?? []).map(normaliseSummary);
  },

  getCourse: async (id: string): Promise<CourseDetail> => {
    const { data } = await apiClient.get<ApiSingleCourseResponse>(`/api/courses/${id}`);
    return normaliseDetail(data.course);
  },
};

/* ------------------------------------------------------------------ */
/*  Enquiry                                                            */
/* ------------------------------------------------------------------ */

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  centerName?: string;
  courseTitle?: string;
  center?: string;
  category?: string;
  course?: string;
  targetYear?: string;
  expectation?: string;
}

export const enquiryService = {
  submit: async (payload: EnquiryPayload): Promise<{ message: string }> => {
    const { data } = await apiClient.post<{ message: string }>(
      "/api/enquiries",
      payload,
    );
    return data;
  },
};
