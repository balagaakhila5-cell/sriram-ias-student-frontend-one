import type { CatalogDocument, ResourceModule } from "./types";

type ResourceLinkFields = Pick<
  CatalogDocument,
  "id" | "pdfUrl" | "title" | "module" | "subtopic" | "hasSample"
>;

export type ResourceLinkOrigin = "portal" | "public";

export type StudentResourceTab = "current-affairs" | "free-resources";

const SUBTOPIC_OPTIONS: { id: string; tab: StudentResourceTab }[] = [
  { id: "daily-current-affairs", tab: "current-affairs" },
  { id: "daily-practice-questions", tab: "current-affairs" },
  { id: "infographics", tab: "current-affairs" },
  { id: "monthly-magazine", tab: "current-affairs" },
  { id: "monthly-recap", tab: "current-affairs" },
  { id: "free-mocktests", tab: "free-resources" },
  { id: "ncert-books", tab: "free-resources" },
  { id: "previous-year", tab: "free-resources" },
  { id: "study-materials", tab: "free-resources" },
];

const DEFAULT_SUBTOPIC_BY_TAB: Record<StudentResourceTab, string> = {
  "current-affairs": "daily-current-affairs",
  "free-resources": "free-mocktests",
};

const PUBLIC_SUBTOPIC_PATHS: Record<string, string> = {
  "daily-current-affairs": "/current-affairs/daily-current-affairs",
  "daily-practice-questions": "/current-affairs/daily-practice-questions",
  infographics: "/current-affairs/infographics",
  "monthly-magazine": "/current-affairs/monthly-magazine",
  "monthly-recap": "/current-affairs/monthly-recap",
  "free-mocktests": "/free_resources/free-mocktests",
  "ncert-books": "/free_resources/ncert-books",
  "previous-year": "/free_resources/previous-year",
  "study-materials": "/free_resources/study-materials",
};

function normalizePdfUrl(pdfUrl: unknown): string {
  if (typeof pdfUrl === "string") return pdfUrl.trim();
  if (pdfUrl == null) return "";
  return String(pdfUrl).trim();
}

function buildResourceQuery(
  item: ResourceLinkFields,
  origin?: ResourceLinkOrigin,
) {
  const params = new URLSearchParams();
  params.set("pdf", normalizePdfUrl(item.pdfUrl));
  params.set("title", item.title);
  params.set("module", item.module);
  params.set("subtopic", String(item.subtopic));
  if (origin) params.set("origin", origin);
  return params.toString();
}

export function isStudentResourceTab(
  value: string | null | undefined,
): value is StudentResourceTab {
  return value === "current-affairs" || value === "free-resources";
}

export function resolvePortalSubtopic(
  tab: StudentResourceTab,
  subtopic: string | null | undefined,
): string {
  if (
    subtopic &&
    SUBTOPIC_OPTIONS.some((option) => option.id === subtopic && option.tab === tab)
  ) {
    return subtopic;
  }
  return DEFAULT_SUBTOPIC_BY_TAB[tab];
}

export function resourcePortalBackPath(
  module: ResourceModule,
  subtopic: string,
): string {
  const tab: StudentResourceTab =
    module === "current-affairs" ? "current-affairs" : "free-resources";
  const params = new URLSearchParams();
  params.set("tab", tab);
  params.set("subtopic", resolvePortalSubtopic(tab, subtopic));
  return `/student/free-resources?${params.toString()}`;
}

export function resourceBackPath(input: {
  module?: ResourceModule;
  subtopic?: string;
  origin?: ResourceLinkOrigin;
}): string {
  const { module, subtopic, origin } = input;
  const effectiveOrigin =
    origin ?? (module && subtopic ? ("portal" as ResourceLinkOrigin) : undefined);

  if (effectiveOrigin === "portal" && module && subtopic) {
    return resourcePortalBackPath(module, subtopic);
  }

  if (subtopic && PUBLIC_SUBTOPIC_PATHS[subtopic]) {
    return PUBLIC_SUBTOPIC_PATHS[subtopic];
  }

  if (module === "current-affairs") {
    return "/current-affairs";
  }

  return "/free_resources";
}

export function resourceViewPath(
  item: ResourceLinkFields,
  origin?: ResourceLinkOrigin,
) {
  return `/resources/view/${encodeURIComponent(item.id)}?${buildResourceQuery(item, origin)}`;
}

export function resourceSamplePath(
  item: ResourceLinkFields,
  origin?: ResourceLinkOrigin,
) {
  return `/resources/sample/${encodeURIComponent(item.id)}?${buildResourceQuery(item, origin)}`;
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
