"use client";

import { useQuery } from "@tanstack/react-query";
import {
  coursesService,
  type CourseFilters,
} from "../services/coursesService";

export const coursesKeys = {
  all: ["courses"] as const,
  centers: ["courses", "centers"] as const,
  categories: ["courses", "categories"] as const,
  list: (filters: CourseFilters) => ["courses", "list", filters] as const,
  detail: (id: string) => ["courses", "detail", id] as const,
};

export function useCenters() {
  return useQuery({
    queryKey: coursesKeys.centers,
    queryFn: coursesService.listCenters,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: coursesKeys.categories,
    queryFn: coursesService.listCategories,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCourses(filters: CourseFilters = {}) {
  return useQuery({
    queryKey: coursesKeys.list(filters),
    queryFn: () => coursesService.listCourses(filters),
  });
}

export function useCourse(id: string | undefined) {
  return useQuery({
    queryKey: coursesKeys.detail(id ?? ""),
    queryFn: () => coursesService.getCourse(id as string),
    enabled: !!id,
  });
}

// Enquiry submission lives in its own feature module; re-exported here so the
// existing modal imports (@/features/course/hooks/useCourses) keep working.
export { useSubmitEnquiry } from "@/features/enquiry/hooks/useEnquiry";
