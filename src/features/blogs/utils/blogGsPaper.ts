const GS_PAPER_LABELS = new Set(['GS I', 'GS II', 'GS III', 'GS IV', 'STRATEGY']);

export function isGsPaperLabel(value: string | undefined | null): boolean {
  if (!value?.trim()) return false;
  return GS_PAPER_LABELS.has(value.trim());
}

export function filterGsPaperLabels(labels: string[] | undefined): string[] {
  if (!Array.isArray(labels)) return [];
  return labels.map((label) => label.trim()).filter(Boolean).filter((label) => !isGsPaperLabel(label));
}

export function resolveBlogDisplayCategory(
  category: string | undefined,
  tags: string[] | undefined,
): string | undefined {
  const trimmedCategory = category?.trim();
  if (trimmedCategory && !isGsPaperLabel(trimmedCategory)) {
    return trimmedCategory;
  }

  return filterGsPaperLabels(tags)[0];
}
