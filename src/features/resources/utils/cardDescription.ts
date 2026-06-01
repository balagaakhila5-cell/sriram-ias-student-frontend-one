import type { CatalogDocument } from "@/features/resources/catalog/types";

export function catalogDocumentDescription(item: CatalogDocument): string {
  if (item.description) return item.description;

  switch (item.subtopic) {
    case "daily-current-affairs":
      return "";
    case "infographics":
      return "";
    case "monthly-magazine":
      return "";
    case "monthly-recap":
      return "";
    case "previous-year":
      return "";
    case "ncert-books":
      return "";
    case "study-materials":
      return "";
    case "daily-practice-questions":
      return "";
    default:
      return "";
  }
}
