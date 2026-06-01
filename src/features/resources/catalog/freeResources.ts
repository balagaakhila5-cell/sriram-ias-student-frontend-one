import { RESOURCE_ASSETS, pdfThumbnailSrc } from "./assets";
import { resourceDownloadPath } from "./routes";
import { registerDocuments } from "./registry";
import { RESOURCE_CARD_LIMIT } from "../components/cardStyles";
import type { CatalogDocument, FreeResourcesSubtopicId } from "./types";

const PYQ_YEARS = ["2026", "2025", "2024"] as const;
const PYQ_PAPERS = ["CSAT", "General Studies"] as const;

function freeDoc(
  subtopic: FreeResourcesSubtopicId,
  index: number,
  title: string,
  options?: {
    hasSample?: boolean;
    hideImage?: boolean;
    image?: string;
    year?: string;
    month?: string;
  },
): CatalogDocument {
  const hideImage =
    options?.hideImage ??
    (subtopic === "ncert-books" || subtopic === "study-materials");
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
    year: options?.year ?? "2026",
    month: options?.month ?? "April",
    title,
    image,
    pdfUrl: RESOURCE_ASSETS.DEFAULT_PDF,
    hasSample: options?.hasSample ?? subtopic === "study-materials",
    hideImage,
  };
}

const freeResourceDocs: CatalogDocument[] = [
  ...Array.from({ length: 10 }, (_, i) =>
    freeDoc("ncert-books", i, `HISTORY-NCERT book${i + 1}`),
  ),
  ...PYQ_YEARS.flatMap((year, yearIndex) =>
    PYQ_PAPERS.flatMap((paper, paperIndex) =>
      Array.from({ length: 10 }, (_, i) =>
        freeDoc(
          "previous-year",
          yearIndex * 20 + paperIndex * 10 + i,
          `${paper} Exam Paper-${i + 1} Question Paper`,
          { year },
        ),
      ),
    ),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    freeDoc("study-materials", i, `PRELIMS - Study Material ${i + 1}`, {
      hasSample: true,
    }),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    freeDoc("study-materials", i + 10, `MAINS - Study Material ${i + 1}`, {
      hasSample: true,
    }),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    freeDoc("study-materials", i + 20, `INTERVIEW - Study Material ${i + 1}`, {
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
  paper?: string,
): CatalogDocument[] {
  return freeResourceDocs
    .filter((item) => {
      if (item.subtopic !== subtopic) return false;
      if (year && item.year !== year) return false;
      if (month && item.month !== month) return false;
      if (subtopic === "previous-year" && paper) {
        if (paper === "CSAT") return item.title.includes("CSAT");
        if (paper === "General Studies") {
          return item.title.includes("General Studies");
        }
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
