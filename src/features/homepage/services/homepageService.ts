import { http } from '@/lib/http';
import type { ApiEnvelope } from '@/lib/apiResult';
import { mapHomepageDetailsResponse } from '../adapters/homepageAdapter';
import type { HomepageData, HomepageDetailsApiData } from '../types';

export const homepageService = {
  getHomepage: async (): Promise<HomepageData> => {
    const { data } = await http.post<ApiEnvelope<HomepageDetailsApiData>>(
      '/homepage/details',
      {},
    );
    return mapHomepageDetailsResponse(data.data);
  },
};
