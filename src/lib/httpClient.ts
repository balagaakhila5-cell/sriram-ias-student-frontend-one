import axios from "axios";
import { API_BASE_URL } from "@/config/env";
import { getStoredToken } from "@/services/authToken";

/**
 * Single configured axios instance used for all real backend calls.
 *
 * Browser requests use same-origin `/api/...` paths (proxied by Next.js).
 * `API_BASE_URL` is exported from env config for direct/server usage when needed.
 */
export const httpClient = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});

export { API_BASE_URL };

// Attach the bearer token (when present) to every request.
httpClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Surface the backend's error message so react-query's `mutation.error.message`
// renders something meaningful instead of "Request failed with status code 4xx".
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data as
      | {
          message?: string;
          error?: string;
          errors?: Array<{ field?: string; message?: string }>;
        }
      | undefined;

    const fieldMessages = Array.isArray(data?.errors)
      ? data.errors
          .map((item) => item.message?.trim())
          .filter((item): item is string => Boolean(item))
      : [];

    const message =
      fieldMessages.length > 0
        ? fieldMessages.join(" ")
        : (data?.message ??
          data?.error ??
          error?.message ??
          "Something went wrong. Please try again.");

    return Promise.reject(new Error(message));
  },
);
