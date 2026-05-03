import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://sriramias.onrender.com";

export const TOKEN_STORAGE_KEY = "sriram_access_token";

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setStoredToken = (token: string | null): void => {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiErrorPayload {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.status = payload.status;
    this.code = payload.code;
    this.errors = payload.errors;
  }
}

const extractMessage = (data: unknown): string | undefined => {
  if (!data || typeof data !== "object") return undefined;
  const d = data as Record<string, unknown>;
  if (typeof d.message === "string") return d.message;
  if (typeof d.error === "string") return d.error;
  return undefined;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (typeof window !== "undefined" && status === 401) {
      setStoredToken(null);
      // Avoid redirect loops from login itself
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    const message =
      extractMessage(error.response?.data) ??
      error.message ??
      "Something went wrong. Please try again.";

    return Promise.reject(
      new ApiError({
        message,
        status,
        code: error.code,
      }),
    );
  },
);

export default apiClient;
