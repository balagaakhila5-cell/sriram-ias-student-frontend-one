import {
  getEnquiryCenters,
  getEnquiryCourses,
  type EnquiryCenter,
  type EnquiryCourse,
} from "@/lib/allApi";

export type { EnquiryCenter, EnquiryCourse };

export const enquiryLookupService = {
  listCenters: getEnquiryCenters,
  listCourses: getEnquiryCourses,
};
