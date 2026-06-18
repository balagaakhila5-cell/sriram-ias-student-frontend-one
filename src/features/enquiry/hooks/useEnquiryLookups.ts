"use client";

import { useQuery } from "@tanstack/react-query";
import { enquiryLookupService } from "../services/lookupService";
import { useCourseCenters } from "./useCourseCenters";

/** @deprecated Prefer `useCourseCenters` — kept for legacy `{ _id, name }` shape. */
export function useEnquiryCenters() {
  const { centers, ...rest } = useCourseCenters();

  return {
    ...rest,
    data: centers.map((center) => ({
      _id: center._id,
      name: center.centerName,
    })),
  };
}

/** Real (public) courses for a center — drives the Course dropdown. */
export function useEnquiryCourses(
  centerName?: string,
  options: { enabled?: boolean } = {},
) {
  const enabled = (options.enabled ?? true) && Boolean(centerName);

  return useQuery({
    queryKey: ["enquiry", "courses", centerName ?? ""],
    queryFn: () => enquiryLookupService.listCourses(centerName),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnMount: false,
  });
}
