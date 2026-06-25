import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getStoredToken } from "@/services/authToken";
import {
  ApiError,
  extractApiMessage,
  isApiSuccess,
  type ApiEnvelope,
} from "./apiResult";

function resolveApiBaseURL(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return raw;
  const trimmed = raw.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const baseURL =
  resolveApiBaseURL(import.meta.env.VITE_API_BASE_URL) ??
  (import.meta.env.DEV ? "/api" : undefined);

if (!baseURL) {
  // Fail loud in dev so a missing env var doesn't silently hit the wrong host.
  console.error(
    "[http] VITE_API_BASE_URL is not defined. Add it to your .env file.",
  );
}

const REQUEST_TIMEOUT_MS = 20000;

export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredToken();
    if (token) {
      const headers = AxiosHeaders.from(config.headers);
      headers.set("Authorization", `Bearer ${token}`);
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response: AxiosResponse<ApiEnvelope>) => {
    const body = response.data;

    // 2xx but business-failure statusCode (10001, 10002, ...) must be treated
    // as an error per the backend's custom statusCode contract.
    if (body && typeof body === "object" && "statusCode" in body) {
      if (!isApiSuccess(body.statusCode)) {
        throw new ApiError(extractApiMessage(body), {
          statusCode: body.statusCode,
          httpStatus: response.status,
          data: body.data,
        });
      }
    }

    return response;
  },
  (error: unknown) => {
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiEnvelope>;

      if (axiosError.code === "ECONNABORTED") {
        return Promise.reject(
          new ApiError("Request timed out. Please try again."),
        );
      }

      if (!axiosError.response) {
        return Promise.reject(
          new ApiError(
            "Network error. Please check your connection and try again.",
          ),
        );
      }

      const body = axiosError.response.data;
      return Promise.reject(
        new ApiError(extractApiMessage(body, axiosError.message), {
          statusCode: body?.statusCode,
          httpStatus: axiosError.response.status,
          data: body?.data,
        }),
      );
    }

    return Promise.reject(
      new ApiError("An unexpected error occurred. Please try again."),
    );
  },
);
