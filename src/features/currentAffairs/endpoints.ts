/**
 * Centralized endpoint registry for the Current Affairs portal API.
 *
 * Single source of truth for every path — endpoints stay decoupled from the
 * service logic that consumes them. Paths are relative (same-origin) and are
 * proxied to the backend by Next.js rewrites (see next.config.ts), so no host
 * is hard-coded here.
 */
const CURRENT_AFFAIRS_BASE = "/api/portal/current-affairs";

export const currentAffairsEndpoints = {
  /** GET — paginated, filterable list of current-affairs records. */
  list: CURRENT_AFFAIRS_BASE,
  /** GET — questions for a single paper. */
  questions: (id: string) =>
    `${CURRENT_AFFAIRS_BASE}/${encodeURIComponent(id)}/questions`,
  /** POST — submit answers for a paper and receive the evaluated review. */
  submit: (id: string) =>
    `${CURRENT_AFFAIRS_BASE}/${encodeURIComponent(id)}/submit`,
} as const;
