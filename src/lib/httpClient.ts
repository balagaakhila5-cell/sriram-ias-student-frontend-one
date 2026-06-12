import axios from "axios";
import { getStoredToken } from "@/services/authToken";

/**
 * Single configured axios instance used for all real backend calls.
 *
 * Requests are made same-origin (relative `/api/...`) and proxied to the real
 * backend by Next.js rewrites (see next.config.ts). This avoids browser CORS
 * entirely — the backend's allow-list no longer has to match the dev origin.
 */
export const httpClient = axios.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});

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
    const data = error?.response?.data;
    const message =
      data?.message ??
      data?.error ??
      error?.message ??
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  },
);
