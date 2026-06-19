import { RESOURCE_ASSETS, pdfThumbnailSrc } from "./assets";
import { resourceDownloadPath } from "./routes";
import { registerDocuments } from "./registry";
import { RESOURCE_CARD_LIMIT } from "../components/cardStyles";
import { buildPyqCardTitle } from "../utils/pyqCardTitle";
import { RESOURCE_YEAR_OPTIONS } from "@/utils/yearFilterOptions";
import type { CatalogDocument, FreeResourcesSubtopicId } from "./types";

const PYQ_YEARS = RESOURCE_YEAR_OPTIONS;
const PYQ_EXAM_TYPES = ["prelims", "mains"] as const;

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
    PYQ_EXAM_TYPES.flatMap((examType, examIndex) =>
      Array.from({ length: 10 }, (_, i) =>
        freeDoc(
          "previous-year",
          yearIndex * 20 + examIndex * 10 + i,
          buildPyqCardTitle(examType, i + 1),
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
      if (subtopic === "previous-year" && examType) {
        const label = examType === "prelims" ? "Prelims" : "Mains";
        return item.title.includes(label);
      }
      if (subtopic === "previous-year" && paper) {
        return item.title.toLowerCase().includes(paper.toLowerCase());
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
