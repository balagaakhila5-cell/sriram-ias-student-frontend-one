import type { EnquiryPayload, EnquiryResponse } from '../types';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const enquiryService = {
  submit: async (_payload: EnquiryPayload): Promise<EnquiryResponse> => {
    await delay();
    return { message: 'Enquiry submitted successfully.' };
  },
};
