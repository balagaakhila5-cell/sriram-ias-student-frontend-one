import { RESOURCE_ASSETS } from "../catalog/assets";
import { registerDocuments } from "../catalog/registry";
import type { CatalogDocument, FreeResourcesSubtopicId } from "../catalog/types";
import { RESOURCE_CARD_LIMIT } from "../components/cardStyles";
import type { ResourceFile } from "../services/resourcesService";

export function mapApiFilesToCatalog(
  files: ResourceFile[],
  subtopic: FreeResourcesSubtopicId,
  fallback: CatalogDocument[],
  limit = RESOURCE_CARD_LIMIT,
): CatalogDocument[] {
  if (subtopic === "ncert-books") {
    const mapped = fallback.slice(0, limit).map((base, index) => {
      const file = files[index];
      if (!file) return base;

      return {
        ...base,
        id: file._id,
        subtopic,
        title: base.title,
        pdfUrl: String(
          file.fileUrl || base.pdfUrl || RESOURCE_ASSETS.DEFAULT_PDF,
        ),
        image: "",
        hideImage: true,
      };
    });

    registerDocuments(mapped);
    return mapped;
  }

  if (subtopic === "study-materials") {
    const mapped = (files.length > 0
      ? files.slice(0, limit).map((file, index) => {
          const base = fallback[index % fallback.length];
          return {
            ...base,
            id: file._id,
            subtopic,
            title: file.title,
            pdfUrl: String(
              file.fileUrl || base.pdfUrl || RESOURCE_ASSETS.DEFAULT_PDF,
            ),
            image: "",
            hideImage: true,
          };
        })
      : fallback.slice(0, limit)
    ).map((item) => ({ ...item, image: "", hideImage: true }));

    registerDocuments(mapped);
    return mapped;
  }

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
            pdfUrl: String(
              file.fileUrl || base.pdfUrl || RESOURCE_ASSETS.DEFAULT_PDF,
            ),
            image,
            hideImage: base.hideImage,
          };
        })
      : fallback.slice(0, limit);

  registerDocuments(mapped);
  return mapped;
}
