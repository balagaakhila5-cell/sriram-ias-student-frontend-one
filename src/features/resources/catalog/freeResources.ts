import { RESOURCE_ASSETS, pdfThumbnailSrc } from "./assets";
import { resourceDownloadPath } from "./routes";
import { registerDocuments } from "./registry";
import type { CatalogDocument, FreeResourcesSubtopicId } from "./types";

const MONTHS = [
  "April",
  "March",
  "February",
  "January",
  "May",
  "June",
] as const;

function freeDoc(
  subtopic: FreeResourcesSubtopicId,
  index: number,
  title: string,
  options?: { hasSample?: boolean },
): CatalogDocument {
  return {
    id: `free-${subtopic}-${index + 1}`,
    module: "free-resources",
    subtopic,
    year: "2026",
    month: MONTHS[index % MONTHS.length],
    title,
    image: pdfThumbnailSrc(),
    pdfUrl: RESOURCE_ASSETS.DEFAULT_PDF,
    hasSample: options?.hasSample ?? subtopic === "study-materials",
  };
}

const freeResourceDocs: CatalogDocument[] = [
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc("ncert-books", i, `NCERT Book ${i + 1} - History`),
  ),
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc(
      "previous-year",
      i,
      `${i % 2 === 0 ? "Prelims" : "Mains"} Exam Paper ${i + 1} - 2024`,
    ),
  ),
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc("study-materials", i, `PRELIMS - Study Material ${i + 1}`, {
      hasSample: true,
    }),
  ),
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc("study-materials", i + 6, `MAINS - Study Material ${i + 1}`, {
      hasSample: true,
    }),
  ),
];

registerDocuments(freeResourceDocs);

export function listFreeResourceDocuments(
  subtopic: FreeResourcesSubtopicId,
  year?: string,
  month?: string,
): CatalogDocument[] {
  return freeResourceDocs.filter(
    (item) =>
      item.subtopic === subtopic &&
      (!year || item.year === year) &&
      (!month || item.month === month),
  );
}

export function catalogDocumentToResourceFile(doc: CatalogDocument) {
  return {
    _id: doc.id,
    title: doc.title,
    fileUrl: resourceDownloadPath(doc),
  };
}
