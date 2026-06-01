import { RESOURCE_ASSETS, pdfThumbnailSrc } from "./assets";
import { resourceDownloadPath } from "./routes";
import { registerDocuments } from "./registry";
import { RESOURCE_CARD_LIMIT } from "../components/cardStyles";
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
  options?: { hasSample?: boolean; hideImage?: boolean; image?: string },
): CatalogDocument {
  const hideImage = options?.hideImage ?? subtopic === "ncert-books";
  const image =
    options?.image ??
    (hideImage
      ? ""
      : subtopic === "previous-year"
        ? RESOURCE_ASSETS.PDF_ICON
        : pdfThumbnailSrc());

  return {
    id: `free-${subtopic}-${index + 1}`,
    module: "free-resources",
    subtopic,
    year: "2026",
    month: MONTHS[index % MONTHS.length],
    title,
    image,
    pdfUrl: RESOURCE_ASSETS.DEFAULT_PDF,
    hasSample: options?.hasSample ?? subtopic === "study-materials",
    hideImage,
  };
}

const freeResourceDocs: CatalogDocument[] = [
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc("ncert-books", i, `HISTORY-NCERT book${i + 1}`),
  ),
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc(
      "previous-year",
      i,
      "Prelims Exam Paper-2 Question Paper .",
    ),
  ),
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc(
      "previous-year",
      i + 6,
      "Mains Exam Paper-2 Question Paper .",
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
  ...Array.from({ length: 6 }, (_, i) =>
    freeDoc("study-materials", i + 12, `INTERVIEW - Study Material ${i + 1}`, {
      hasSample: true,
    }),
  ),
];

registerDocuments(freeResourceDocs);

export function listFreeResourceDocuments(
  subtopic: FreeResourcesSubtopicId,
  year?: string,
  month?: string,
  examType?: "prelims" | "mains" | "interview",
): CatalogDocument[] {
  return freeResourceDocs
    .filter((item) => {
      if (item.subtopic !== subtopic) return false;
      if (year && item.year !== year) return false;
      if (month && item.month !== month) return false;
      if (subtopic === "previous-year" && examType) {
        const isPrelims = item.title.toLowerCase().startsWith("prelims");
        return examType === "prelims" ? isPrelims : !isPrelims;
      }
      if (subtopic === "study-materials" && examType) {
        const title = item.title.toUpperCase();
        if (examType === "prelims") return title.includes("PRELIMS");
        if (examType === "mains") return title.includes("MAINS");
        if (examType === "interview") return title.includes("INTERVIEW");
        return true;
      }
      return true;
    })
    .slice(0, RESOURCE_CARD_LIMIT);
}

export function catalogDocumentToResourceFile(doc: CatalogDocument) {
  return {
    _id: doc.id,
    title: doc.title,
    fileUrl: resourceDownloadPath(doc),
  };
}
