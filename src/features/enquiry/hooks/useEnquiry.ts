"use client";

import { useMutation } from "@tanstack/react-query";
import { enquiryService } from "../services/enquiryService";
import type { EnquiryPayload } from "../types";

/** Submit an enquiry (Book Free Demo, Enquire Now, Contact Us, Join CTA). */
export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: (payload: EnquiryPayload) => enquiryService.submit(payload),
  });
}
