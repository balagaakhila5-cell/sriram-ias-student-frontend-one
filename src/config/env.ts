/**
 * Central env config (Next.js equivalent of Vite `import.meta.env`).
 * Values come from `.env.uat` or `.env.production` via npm scripts.
 */

function normalizeBaseUrl(value: string | undefined): string {
  if (!value) return "";
  return value.trim().replace(/\/+$/, "");
}

/** Public API base URL — safe to use in client components. */
export const API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL,
);

/** Server-side proxy target (Next.js rewrites in next.config.ts). */
export const API_PROXY_TARGET = normalizeBaseUrl(
  process.env.API_PROXY_TARGET ?? process.env.NEXT_PUBLIC_API_BASE_URL,
);

export const APP_ENV =
  process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "development";

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
