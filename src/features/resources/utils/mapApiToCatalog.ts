import { RESOURCE_ASSETS } from "../catalog/assets";
import { registerDocuments } from "../catalog/registry";
import type { CatalogDocument, FreeResourcesSubtopicId } from "../catalog/types";
import { RESOURCE_CARD_LIMIT } from "../components/cardStyles";
import type { ResourceFile } from "../services/resourcesService";

function mapFileToCatalog(
  file: ResourceFile,
  subtopic: FreeResourcesSubtopicId,
  index: number,
  fallback: CatalogDocument[],
): CatalogDocument {
  const base = fallback[index % fallback.length];
  const image =
    subtopic === "previous-year"
      ? RESOURCE_ASSETS.PDF_ICON
      : base?.image || RESOURCE_ASSETS.PDF_THUMBNAIL;

  return {
    ...base,
    id: file._id,
    subtopic,
    title: file.title || base?.title || "Resource",
    pdfUrl: String(file.fileUrl || base?.pdfUrl || RESOURCE_ASSETS.DEFAULT_PDF),
    image: base?.hideImage ? "" : image,
    hideImage: base?.hideImage,
    year:
      typeof file.year === "object" && file.year?.value
        ? file.year.value
        : base?.year,
  };
}

export function mapApiFilesToCatalog(
  files: ResourceFile[],
  subtopic: FreeResourcesSubtopicId,
  fallback: CatalogDocument[],
  limit = RESOURCE_CARD_LIMIT,
): CatalogDocument[] {
  if (files.length === 0) {
    return [];
  }

  const mapped = files.slice(0, limit).map((file, index) =>
    mapFileToCatalog(file, subtopic, index, fallback),
  );

  registerDocuments(mapped);
  return mapped;
}
