"use client";

import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  publicCenterService,
  type PublicCourseCenter,
} from "../services/publicCenterService";

export type CourseCenter = PublicCourseCenter;

export const courseCentersQueryKey = ["course-centers"] as const;

interface UseCourseCentersOptions {
  /** When false, the request is skipped (e.g. modal closed). Defaults to true. */
  enabled?: boolean;
}

export function formatCourseCenterLabel(center: CourseCenter): string {
  const name = center.centerName.trim();
  const city = center.city.trim();

  if (city && city.toLowerCase() !== name.toLowerCase()) {
    return `${name} — ${city}`;
  }

  return name;
}

export function toCourseCenterSelectOptions(centers: CourseCenter[]) {
  return centers.map((center) => ({
    value: center._id,
    label: formatCourseCenterLabel(center),
  }));
}

/** Shared hook for center dropdowns across demo / enquiry forms. */
export function useCourseCenters(options: UseCourseCentersOptions = {}) {
  const enabled = options.enabled ?? true;

  const query = useQuery({
    queryKey: courseCentersQueryKey,
    queryFn: () => publicCenterService.listCourseCenters(),
    enabled,
    staleTime: 10 * 60 * 1000,
    retry: false,
    refetchOnMount: false,
  });

  const optionsList = useMemo(
    () => toCourseCenterSelectOptions(query.data ?? []),
    [query.data],
  );

  const findById = useCallback(
    (centerId: string) => query.data?.find((center) => center._id === centerId),
    [query.data],
  );

  return {
    ...query,
    centers: query.data ?? [],
    options: optionsList,
    findById,
  };
}
