import type { CatalogDocument } from "./types";

const registry = new Map<string, CatalogDocument>();

export function registerDocuments(items: CatalogDocument[]) {
  for (const item of items) {
    registry.set(item.id, item);
  }
}

export function getCatalogDocument(id: string): CatalogDocument | undefined {
  return registry.get(id);
}

export function getAllCatalogDocuments(): CatalogDocument[] {
  return Array.from(registry.values());
}

export type CatalogDocumentHints = {
  pdfUrl?: string | null;
  title?: string | null;
  module?: CatalogDocument["module"];
  subtopic?: CatalogDocument["subtopic"];
};

/** Resolve document from registry or URL hints (for API-backed cards). */
export function resolveCatalogDocument(
  id: string,
  hints?: CatalogDocumentHints,
): CatalogDocument | null {
  const registered = registry.get(id);
  if (registered) return registered;

  const pdfUrl = hints?.pdfUrl?.trim();
  const title = hints?.title?.trim();
  if (!pdfUrl || !title) return null;

  return {
    id,
    module: hints?.module ?? "free-resources",
    subtopic: hints?.subtopic ?? "study-materials",
    year: "2026",
    month: "April",
    title,
    image: "/assets/image_89.svg",
    pdfUrl,
  };
}
