import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import type {
  CatalogDocument,
  CatalogPracticeTest,
  CurrentAffairsSubtopicId,
} from "@/features/resources/catalog/types";
import type { CurrentAffairItem } from "./types";

/** Base route for the daily-practice-questions quiz player. */
export const DPQ_ATTEMPT_BASE = "/current-affairs/daily-practice-questions";

const CATEGORY_TO_SUBTOPIC: Record<string, CurrentAffairsSubtopicId> = {
  CURRENT_AFFAIRS: "daily-current-affairs",
  DAILY_PRACTICE_QUESTIONS: "daily-practice-questions",
  INFOGRAPHICS: "infographics",
  MONTHLY_MAGAZINE: "monthly-magazine",
  MONTHLY_RECAP: "monthly-recap",
};

/** Map an API record to the document-card shape used by ResourceDocumentCard. */
export function toCatalogDocument(item: CurrentAffairItem): CatalogDocument {
  const subtopic =
    CATEGORY_TO_SUBTOPIC[item.category] ?? "daily-current-affairs";
  const isMagazine = subtopic === "monthly-magazine";
  const fallbackImage = isMagazine
    ? RESOURCE_ASSETS.MAGAZINE
    : RESOURCE_ASSETS.PDF_ICON;

  return {
    id: item._id,
    module: "current-affairs",
    subtopic,
    year: item.year != null ? String(item.year) : "",
    month: item.month ?? "",
    title: item.title,
    image: item.imageUrl || fallbackImage,
    pdfUrl: item.pdfUrl ?? "",
    description: item.description || undefined,
  };
}

/** Map an API DPQ record to the practice-test-card shape; attemptPath carries the real id. */
export function toPracticeTestCard(item: CurrentAffairItem): CatalogPracticeTest {
  const examType = item.mainsCategory === "MAINS" ? "mains" : "prelims";

  return {
    id: item._id,
    subtopic: "daily-practice-questions",
    year: item.year != null ? String(item.year) : "",
    month: item.month ?? "",
    examType,
    title: item.title,
    image: item.imageUrl || RESOURCE_ASSETS.PRACTICE_TEST,
    attemptPath: `${DPQ_ATTEMPT_BASE}/${item._id}`,
  };
}
