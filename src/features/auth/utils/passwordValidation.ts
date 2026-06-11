import { z } from "zod";
import { AUTH_FIELD_LIMITS } from "../constants";

const HAS_LETTER = /[A-Za-z]/;
const HAS_NUMBER = /\d/;
const HAS_SPECIAL = /[^A-Za-z0-9]/;
const CONTAINS_SPACE = /\s/;

export const NO_SPACES_MESSAGE = "Spaces are not allowed";

export const STRONG_PASSWORD_MESSAGE =
  "Password must include letters, numbers, and special characters";

export function stripSpaces(value: string) {
  return value.replace(/\s/g, "");
}

export function hasNoSpaces(value: string) {
  return !CONTAINS_SPACE.test(value);
}

export function isStrongPassword(value: string) {
  return (
    HAS_LETTER.test(value) && HAS_NUMBER.test(value) && HAS_SPECIAL.test(value)
  );
}

export function passwordSchema() {
  return z
    .string()
    .min(
      AUTH_FIELD_LIMITS.passwordMin,
      `Password must be at least ${AUTH_FIELD_LIMITS.passwordMin} characters`,
    )
    .max(
      AUTH_FIELD_LIMITS.passwordMax,
      `Password must be ${AUTH_FIELD_LIMITS.passwordMax} characters or fewer`,
    )
    .refine(hasNoSpaces, NO_SPACES_MESSAGE)
    .refine(isStrongPassword, STRONG_PASSWORD_MESSAGE);
}

export function loginStringNoSpaces<T extends z.ZodString>(schema: T) {
  return schema.refine(hasNoSpaces, NO_SPACES_MESSAGE);
}
