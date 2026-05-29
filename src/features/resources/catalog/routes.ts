import type { CatalogDocument } from "./types";

type ResourceLinkFields = Pick<
  CatalogDocument,
  "id" | "pdfUrl" | "title" | "module" | "subtopic" | "hasSample"
>;

function buildResourceQuery(item: ResourceLinkFields) {
  const params = new URLSearchParams();
  params.set("pdf", item.pdfUrl);
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
  const url = item.pdfUrl?.trim();
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
