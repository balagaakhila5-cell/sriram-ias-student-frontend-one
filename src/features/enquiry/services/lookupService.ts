import { httpClient } from "@/lib/httpClient";

/** Minimal center shape the enquiry dropdowns need. */
export interface EnquiryCenter {
  _id: string;
  name: string;
}

/** Minimal course shape the enquiry dropdowns need. */
export interface EnquiryCourse {
  _id: string;
  title: string;
}

const CENTERS_ENDPOINT = "/api/centers";
const COURSES_ENDPOINT = "/api/courses/enquiry";

/**
 * Public lookups that back the enquiry form dropdowns. Kept separate from the
 * (auth-protected) admin endpoints. Only centers are public today; categories
 * require auth, so those stay on hardcoded names for the course cascade.
 */
export const enquiryLookupService = {
  listCenters: async (): Promise<EnquiryCenter[]> => {
    const { data } = await httpClient.get(CENTERS_ENDPOINT);
    const list = Array.isArray(data?.centers)
      ? data.centers
      : Array.isArray(data?.data)
        ? data.data
        : [];
    return (list as Array<Record<string, unknown>>)
      .map((c) => ({
        _id: String(c._id ?? c.id ?? ""),
        name: String(c.name ?? c.centerName ?? ""),
      }))
      .filter((c) => c._id && c.name);
  },

  /**
   * Courses for a center. The backend's `categoryName` filter is dropped on
   * purpose — categories are auth-protected, so filtering by name returns
   * nothing; center alone yields the real courses the enquiry can reference.
   */
  listCourses: async (centerName?: string): Promise<EnquiryCourse[]> => {
    const params: Record<string, string> = {};
    if (centerName) params.centerName = centerName;
    const { data } = await httpClient.get(COURSES_ENDPOINT, { params });
    const list = Array.isArray(data?.courses)
      ? data.courses
      : Array.isArray(data?.data)
        ? data.data
        : [];
    return (list as Array<Record<string, unknown>>)
      .map((c) => ({
        _id: String(c._id ?? c.id ?? ""),
        title: String(c.title ?? c.courseName ?? c.name ?? ""),
      }))
      .filter((c) => c._id && c.title);
  },
};
