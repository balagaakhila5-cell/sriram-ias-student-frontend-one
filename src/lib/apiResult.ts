/**
 * Standard API envelope returned by the SRIRAM IAS backend.
 *
 * Success is defined ONLY by `statusCode === 10000`. Any other statusCode
 * (10001, 10002, ...) is a business failure even when the HTTP status is 2xx.
 */
export const API_SUCCESS_CODE = 10000;

export interface ApiEnvelope<TData = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
  error: unknown;
}

export function isApiSuccess(statusCode: number | undefined | null): boolean {
  return statusCode === API_SUCCESS_CODE;
}

/**
 * Normalized error thrown by the axios layer so callers (React Query) always
 * receive a predictable shape with a human-readable `message`.
 */
export class ApiError extends Error {
  readonly statusCode?: number;
  readonly httpStatus?: number;
  readonly data?: unknown;

  constructor(
    message: string,
    options: { statusCode?: number; httpStatus?: number; data?: unknown } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = options.statusCode;
    this.httpStatus = options.httpStatus;
    this.data = options.data;
  }
}

const GENERIC_ERROR_MESSAGE =
  "Something went wrong. Please try again in a moment.";

/**
 * Pull the most useful message out of a backend error envelope.
 * Priority: validation errors -> response message -> fallback.
 */
export function extractApiMessage(
  body: Partial<ApiEnvelope> | undefined,
  fallback: string = GENERIC_ERROR_MESSAGE,
): string {
  if (!body || typeof body !== "object") return fallback;

  const error = body.error as { errors?: unknown } | null | undefined;
  if (error && typeof error === "object" && "errors" in error) {
    const errors = (error as { errors?: unknown }).errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const first = errors[0];
      if (typeof first === "string") return first;
      if (first && typeof first === "object" && "message" in first) {
        const msg = (first as { message?: unknown }).message;
        if (typeof msg === "string" && msg.trim()) return msg;
      }
    }
  }

  if (typeof body.message === "string" && body.message.trim()) {
    return body.message;
  }

  return fallback;
}

export { GENERIC_ERROR_MESSAGE };
