import apiClient from "@/services/apiClient";
import type { HomepageData, HomepageResponse } from "../types";

export const homepageService = {
  getHomepage: async (): Promise<HomepageData> => {
    try {
      const { data } = await apiClient.get<HomepageResponse>("/api/homepage");
      if (data && typeof data === "object" && "data" in data && data.data) {
        return data.data;
      }
      return data as unknown as HomepageData;
    } catch {
      return {};
    }
  },
};
