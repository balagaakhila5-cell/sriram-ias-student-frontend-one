import { RESOURCE_ASSETS } from "../catalog/assets";
import { registerDocuments } from "../catalog/registry";
import type { CatalogDocument, FreeResourcesSubtopicId } from "../catalog/types";
import type { ResourceFile } from "../services/resourcesService";

export function mapApiFilesToCatalog(
  files: ResourceFile[],
  subtopic: FreeResourcesSubtopicId,
  fallback: CatalogDocument[],
  limit = 6,
): CatalogDocument[] {
  const mapped =
    files.length > 0
      ? files.slice(0, limit).map((file, index) => {
          const base = fallback[index % fallback.length];
          const image = base.hideImage
            ? ""
            : base.image ||
              (subtopic === "previous-year"
                ? RESOURCE_ASSETS.PDF_ICON
                : RESOURCE_ASSETS.PDF_THUMBNAIL);

          return {
            ...base,
            id: file._id,
            subtopic,
            title: file.title,
            pdfUrl: file.fileUrl || base.pdfUrl || RESOURCE_ASSETS.DEFAULT_PDF,
            image,
            hideImage: base.hideImage,
          };
        })
      : fallback.slice(0, limit);

  registerDocuments(mapped);
  return mapped;
}
