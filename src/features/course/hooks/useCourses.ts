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
  bySlug: (slug: string) => ["courses", "slug", slug] as const,
};

export function useCenters() {
  return useQuery({
    queryKey: coursesKeys.centers,
    queryFn: coursesService.listCenters,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategories(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: coursesKeys.categories,
    queryFn: coursesService.listCategories,
    enabled: options.enabled ?? true,
    staleTime: 10 * 60 * 1000,
    retry: false,
    refetchOnMount: false,
  });
}

export function useCourses(
  filters: CourseFilters = {},
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: coursesKeys.list(filters),
    queryFn: () => coursesService.listCourses(filters),
    enabled: options.enabled ?? true,
    staleTime: 10 * 60 * 1000,
    retry: false,
    refetchOnMount: false,
  });
}

export function useCourse(id: string | undefined) {
  return useQuery({
    queryKey: coursesKeys.detail(id ?? ""),
    queryFn: () => coursesService.getCourse(id as string),
    enabled: !!id,
  });
}

export function useCourseBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: coursesKeys.bySlug(slug ?? ""),
    queryFn: () => coursesService.getCourseDetailBySlug(slug as string),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Enquiry submission lives in its own feature module; re-exported here so the
// existing modal imports (@/features/course/hooks/useCourses) keep working.
export { useSubmitEnquiry } from "@/features/enquiry/hooks/useEnquiry";
