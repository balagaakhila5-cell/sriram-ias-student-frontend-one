"use client";

import { useQuery } from "@tanstack/react-query";
import { enquiryLookupService } from "../services/lookupService";

/** Real (public) centers for the enquiry form's Center dropdown. */
export function useEnquiryCenters() {
  return useQuery({
    queryKey: ["enquiry", "centers"],
    queryFn: enquiryLookupService.listCenters,
    staleTime: 10 * 60 * 1000,
  });
}

/** Real (public) courses for a center — drives the Course dropdown. */
export function useEnquiryCourses(centerName?: string) {
  return useQuery({
    queryKey: ["enquiry", "courses", centerName ?? ""],
    queryFn: () => enquiryLookupService.listCourses(centerName),
    enabled: Boolean(centerName),
    staleTime: 5 * 60 * 1000,
  });
}
