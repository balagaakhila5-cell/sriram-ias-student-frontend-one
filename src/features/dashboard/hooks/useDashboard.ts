'use client';

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardService.getStats,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: dashboardService.getActivity,
    staleTime: 2 * 60 * 1000,
  });
}
