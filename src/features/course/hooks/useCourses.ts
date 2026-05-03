"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  coursesService,
  enquiryService,
  type CourseFilters,
  type EnquiryPayload,
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

export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: (payload: EnquiryPayload) => enquiryService.submit(payload),
  });
}
