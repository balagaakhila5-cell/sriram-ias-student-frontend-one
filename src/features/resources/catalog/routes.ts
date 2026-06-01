import type { CatalogDocument } from "./types";

type ResourceLinkFields = Pick<
  CatalogDocument,
  "id" | "pdfUrl" | "title" | "module" | "subtopic" | "hasSample"
>;

function normalizePdfUrl(pdfUrl: unknown): string {
  if (typeof pdfUrl === "string") return pdfUrl.trim();
  if (pdfUrl == null) return "";
  return String(pdfUrl).trim();
}

function buildResourceQuery(item: ResourceLinkFields) {
  const params = new URLSearchParams();
  params.set("pdf", normalizePdfUrl(item.pdfUrl));
  params.set("title", item.title);
  params.set("module", item.module);
  params.set("subtopic", String(item.subtopic));
  return params.toString();
}

export function resourceViewPath(item: ResourceLinkFields) {
  return `/resources/view/${encodeURIComponent(item.id)}?${buildResourceQuery(item)}`;
}

export function resourceSamplePath(item: ResourceLinkFields) {
  return `/resources/sample/${encodeURIComponent(item.id)}?${buildResourceQuery(item)}`;
}

export function resourceDownloadPath(item: ResourceLinkFields) {
  const url = normalizePdfUrl(item.pdfUrl);
  if (
    url &&
    (url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("/"))
  ) {
    return url;
  }
  return `/api/resources/download?id=${encodeURIComponent(item.id)}&${buildResourceQuery(item)}`;
}

/** @deprecated Use resourceViewPath(item) */
export function resourceViewPathById(id: string) {
  return `/resources/view/${encodeURIComponent(id)}`;
}
