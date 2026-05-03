import apiClient from "@/services/apiClient";
import type { DashboardStats, DashboardActivity } from "../types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>("/dashboard/stats");
    return response.data;
  },

  getActivity: async (): Promise<DashboardActivity[]> => {
    const response = await apiClient.get<DashboardActivity[]>(
      "/dashboard/activity",
    );
    return response.data;
  },
};
