import type { DashboardActivity, DashboardStats } from "../types";

const MOCK_STATS: DashboardStats = {
  totalUsers: 12840,
  activeUsers: 3420,
  revenue: 0,
  growth: 12.5,
};

const MOCK_ACTIVITY: DashboardActivity[] = [
  {
    id: "activity-1",
    type: "enrollment",
    message: "New student enrolled in GS Foundation",
    timestamp: new Date().toISOString(),
  },
  {
    id: "activity-2",
    type: "test",
    message: "Mock test attempt completed",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => MOCK_STATS,
  getActivity: async (): Promise<DashboardActivity[]> => MOCK_ACTIVITY,
};
