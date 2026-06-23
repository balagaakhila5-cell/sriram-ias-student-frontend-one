import {
  listMockEnquiryCenters,
  listMockEnquiryCourses,
} from '@/features/enquiry/data/mockEnquiryData';
import type { EnquiryCenter, EnquiryCourse } from '@/features/enquiry/types';

export type { EnquiryCenter, EnquiryCourse };

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const enquiryLookupService = {
  listCenters: async (): Promise<EnquiryCenter[]> => {
    await delay();
    return listMockEnquiryCenters();
  },

  listCourses: async (centerName?: string): Promise<EnquiryCourse[]> => {
    await delay();
    return listMockEnquiryCourses(centerName);
  },
};
