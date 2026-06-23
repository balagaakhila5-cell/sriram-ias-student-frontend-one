/**
 * Enquiry form types used across demo and course enquiry surfaces.
 *
 * Only `name` and `phone` are required. The two form shapes are both covered:
 *  - Book Free Demo  → center / category / course as ObjectIds + targetYear + expectation
 *  - Main / Course page → centerName / courseTitle as plain strings
 */
export type EnquirySource = "demo" | "main" | "course";

export interface EnquiryCenter {
  _id: string;
  name: string;
}

export interface EnquiryCourse {
  _id: string;
  title: string;
}

export interface PublicCourseCenter {
  _id: string;
  centerName: string;
  city: string;
  centerCode: string;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  /** ObjectId refs (Book Free Demo). */
  center?: string;
  category?: string;
  course?: string;
  /** Plain-string fallbacks (main / course page enquiry). */
  centerName?: string;
  courseTitle?: string;
  targetYear?: string;
  expectation?: string;
  /** Which surface the enquiry came from. */
  source?: EnquirySource;
}

export interface EnquiryResponse {
  message: string;
}
