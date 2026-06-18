/** Shared asset paths for resource cards */
export const RESOURCE_ASSETS = {
  PDF_ICON: "/assets/current-affairs/daily-current-affairs/pdf-icon.png",
  PDF_THUMBNAIL: "/assets/current-affairs/daily-current-affairs/pdf-icon.png",
  PDF_FALLBACK: "/assets/current-affairs/daily-current-affairs/pdf-icon.png",
  MOCK_TEST_CARD: "/assets/free-resources/free-mocktests/mocktest-card-image.png",
  MAGAZINE: "/assets/current-affairs/monthly-magazine.png",
  PRACTICE_TEST:
    "/assets/current-affairs/daily-practice-questions/prelims-practice-test.png",
  DEFAULT_PDF: "/assets/samples/sriram-sample.pdf",
  /** Category banner images */
  CA_DAILY: "/assets/current-affairs/daily-current-affairs.png",
  CA_DPQ: "/assets/current-affairs/daily-practice-questions.png",
  CA_INFOGRAPHICS: "/assets/current-affairs/infographics.png",
  CA_MAGAZINE: "/assets/current-affairs/monthly-magazine.png",
  CA_RECAP: "/assets/current-affairs/monthly-recap.png",
  FR_NCERT: "/assets/free-resources/NCERT/NCERT-books.png",
  FR_MOCK: "/assets/free-resources/NCERT/free-mocktest.png",
  FR_PYQ: "/assets/free-resources/NCERT/Previous-year-questionpaper.png",
  FR_STUDY: "/assets/free-resources/NCERT/studymaterials.png",
} as const;

export function pdfThumbnailSrc(): string {
  return RESOURCE_ASSETS.PDF_ICON;
}
