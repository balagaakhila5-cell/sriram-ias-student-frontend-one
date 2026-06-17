import { submitEnquiry as submitEnquiryApi } from "@/lib/allApi";
import type { EnquiryPayload, EnquiryResponse } from "../types";

const isObjectId = (value: unknown): value is string =>
  typeof value === "string" && /^[a-f0-9]{24}$/i.test(value);

const trimmed = (value: unknown): string | undefined => {
  const v = typeof value === "string" ? value.trim() : "";
  return v.length > 0 ? v : undefined;
};

function buildBody(payload: EnquiryPayload): Record<string, unknown> {
  const body: Record<string, unknown> = {
    name: payload.name?.trim(),
    phone: payload.phone?.trim(),
  };

  const email = trimmed(payload.email);
  if (email) body.email = email;

  if (isObjectId(payload.category)) body.category = payload.category;

  const centerName = trimmed(payload.centerName);
  if (centerName) body.centerName = centerName;

  if (isObjectId(payload.course)) {
    body.course = payload.course;
    const courseTitle = trimmed(payload.courseTitle);
    if (courseTitle) body.courseTitle = courseTitle;
  }

  const targetYear = trimmed(payload.targetYear);
  if (targetYear) body.targetYear = targetYear;
  const expectation = trimmed(payload.expectation);
  if (expectation) body.expectation = expectation;
  if (payload.source) body.source = payload.source;

  return body;
}

export const enquiryService = {
  submit: async (payload: EnquiryPayload): Promise<EnquiryResponse> => {
    const data = await submitEnquiryApi(buildBody(payload));
    return { message: data?.message ?? "Enquiry submitted successfully." };
  },
};
