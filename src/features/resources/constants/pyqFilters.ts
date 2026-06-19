/** PYQ public + portal — Select Paper / Year options (Figma) */

import { RESOURCE_YEAR_OPTIONS } from '@/utils/yearFilterOptions';

export const PYQ_SELECT_PAPER_OPTIONS = ["General Studies", "CSAT"] as const;

export const PYQ_YEAR_OPTIONS = RESOURCE_YEAR_OPTIONS;

export type PyqSelectPaper = (typeof PYQ_SELECT_PAPER_OPTIONS)[number];

export type PyqYear = string;

const PAPER_MATCH_KEYS: Record<PyqSelectPaper, string[]> = {
  "General Studies": ["general studies", "general", "gs"],
  CSAT: ["csat"],
};

/** Map Figma label → API paper filter id when backend uses different labels */
export function resolvePyqPaperId(
  papers: { _id?: string; value: string }[],
  selectedPaper: string,
): string | undefined {
  if (!selectedPaper) return undefined;

  const exact = papers.find((p) => p.value === selectedPaper);
  if (exact?._id) return exact._id;

  const keys =
    PAPER_MATCH_KEYS[selectedPaper as PyqSelectPaper] ?? [
      selectedPaper.toLowerCase(),
    ];

  const fuzzy = papers.find((p) =>
    keys.some((k) => p.value.toLowerCase().includes(k)),
  );
  return fuzzy?._id;
}

/** Client-side filter when API returns mixed papers (fallback / demo data) */
export function filterCatalogByPyqPaper<T extends { title: string }>(
  items: T[],
  paper: string,
): T[] {
  if (!paper) return items;

  if (paper === "CSAT") {
    const byTitle = items.filter((item) => /csat/i.test(item.title));
    if (byTitle.length > 0) return byTitle;
    return items.filter((_, i) => i % 2 === 1);
  }

  if (paper === "General Studies") {
    const byTitle = items.filter((item) =>
      /general studies|gs paper/i.test(item.title),
    );
    if (byTitle.length > 0) return byTitle;
    return items.filter((_, i) => i % 2 === 0);
  }

  return items;
}
