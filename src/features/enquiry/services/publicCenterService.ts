import { listMockPublicCourseCenters } from '@/features/enquiry/data/mockEnquiryData';
import type { PublicCourseCenter } from '@/features/enquiry/types';

export type { PublicCourseCenter };

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const publicCenterService = {
  listCourseCenters: async (): Promise<PublicCourseCenter[]> => {
    await delay();
    return listMockPublicCourseCenters();
  },
};
