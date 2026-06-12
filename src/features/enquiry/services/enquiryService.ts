import { httpClient } from "@/lib/httpClient";
import { enquiryEndpoints } from "../endpoints";
import type { EnquiryPayload, EnquiryResponse } from "../types";

const isObjectId = (value: unknown): value is string =>
  typeof value === "string" && /^[a-f0-9]{24}$/i.test(value);

const trimmed = (value: unknown): string | undefined => {
  const v = typeof value === "string" ? value.trim() : "";
  return v.length > 0 ? v : undefined;
};

/**
 * Build the request body, sending only meaningful fields.
 *
 * center/category/course are reference ids — included ONLY when they are valid
 * Mongo ObjectIds. The selection dropdowns may still fall back to placeholder
 * values (e.g. "new-delhi") until the centers/courses APIs are wired; sending
 * those would fail backend ObjectId casting, so we drop them and rely on the
 * human-readable centerName / courseTitle instead. name + phone are required.
 */
function buildBody(payload: EnquiryPayload): Record<string, unknown> {
  const body: Record<string, unknown> = {
    name: payload.name?.trim(),
    phone: payload.phone?.trim(),
  };

  const email = trimmed(payload.email);
  if (email) body.email = email;

  // NOTE: never send the center ObjectId. The backend derives the center from
  // the selected course; sending a center id that doesn't match the course's
  // center fails with "Center does not match selected course" (duplicate center
  // names make a guaranteed-correct id impossible here). centerName is a label.
  if (isObjectId(payload.category)) body.category = payload.category;

  const centerName = trimmed(payload.centerName);
  if (centerName) body.centerName = centerName;

  // Course identity: the backend resolves courseTitle against real courses and
  // 404s on unknown titles. Only send course + title when we have a real course
  // ObjectId (a genuine selection) — never a placeholder/mock title.
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
    const { data } = await httpClient.post(
      enquiryEndpoints.submit,
      buildBody(payload),
    );
    return { message: data?.message ?? "Enquiry submitted successfully." };
  },
};
