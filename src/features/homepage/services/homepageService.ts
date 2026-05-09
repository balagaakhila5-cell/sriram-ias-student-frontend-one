import apiClient from "@/services/apiClient";
import type { HomepageData, HomepageResponse } from "../types";

export const homepageService = {
  getHomepage: async (): Promise<HomepageData> => {
    const { data } = await apiClient.get<HomepageResponse>("/api/homepage");
    if (data?.data) return data.data;
    return data as unknown as HomepageData;
  },
};
