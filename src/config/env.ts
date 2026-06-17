/**
 * Central env config (Next.js equivalent of Vite `import.meta.env`).
 * Values come from `.env.uat` or `.env.production` via npm scripts.
 */

function normalizeBaseUrl(value: string | undefined): string {
  if (!value) return "";
  return value.trim().replace(/\/+$/, "");
}

/** Public API base URL — safe to use in client components. */
export const API_BASE_URL = import.meta.env.DEV
  ? ""
  : normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

/** Optional proxy target for Vite dev server or same-origin API routing. */
export const API_PROXY_TARGET = normalizeBaseUrl(
  import.meta.env.VITE_API_PROXY_TARGET ?? import.meta.env.VITE_API_BASE_URL,
);

export const APP_ENV =
  (import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE ?? "development").trim();

export const IS_UAT = APP_ENV === "uat";
export const IS_PRODUCTION = APP_ENV === "production";

export const env = {
  apiBaseUrl: API_BASE_URL,
  apiProxyTarget: API_PROXY_TARGET,
  appEnv: APP_ENV,
  isUat: IS_UAT,
  isProduction: IS_PRODUCTION,
} as const;

export default env;
