export type ResourceModule =
  | "current-affairs"
  | "free-resources";

export type CurrentAffairsSubtopicId =
  | "daily-current-affairs"
  | "daily-practice-questions"
  | "infographics"
  | "monthly-magazine"
  | "monthly-recap";

export type FreeResourcesSubtopicId =
  | "free-mocktests"
  | "ncert-books"
  | "previous-year"
  | "study-materials";

export interface CatalogDocument {
  id: string;
  module: ResourceModule;
  subtopic: CurrentAffairsSubtopicId | FreeResourcesSubtopicId;
  year: string;
  month: string;
  title: string;
  image: string;
  pdfUrl: string;
  description?: string;
  hasSample?: boolean;
  /** Text-only cards (e.g. NCERT) — no thumbnail in the UI */
  hideImage?: boolean;
}

export interface CatalogPracticeTest {
  id: string;
  subtopic: "daily-practice-questions";
  year: string;
  month: string;
  examType: "prelims" | "mains";
  title: string;
  image: string;
  attemptPath: string;
}
