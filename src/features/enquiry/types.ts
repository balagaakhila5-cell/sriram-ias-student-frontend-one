/**
 * Types for the public Enquiry API (POST /api/enquiries).
 *
 * Only `name` and `phone` are required by the backend. The two form shapes are
 * both covered here:
 *  - Book Free Demo  → center / category / course as ObjectIds + targetYear + expectation
 *  - Main / Course page → centerName / courseTitle as plain strings
 */
export type EnquirySource = "demo" | "main" | "course";

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
