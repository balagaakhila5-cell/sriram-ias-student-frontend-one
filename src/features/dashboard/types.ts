export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface DashboardActivity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}
