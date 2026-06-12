/**
 * Centralized endpoint registry for the public Enquiry API.
 *
 * Single source of truth for the path. Relative (same-origin) so it is proxied
 * to the backend by Next.js rewrites (see next.config.ts) — avoids browser CORS.
 */
export const enquiryEndpoints = {
  /** POST — submit an enquiry (Book Free Demo, Enquire Now, Contact Us, etc.). */
  submit: "/api/enquiries",
} as const;
