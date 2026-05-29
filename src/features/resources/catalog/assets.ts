/** Shared asset paths for resource cards */
export const RESOURCE_ASSETS = {
  PDF_ICON: "/assets/current-affairs/daily-current-affairs/pdf-icon.png",
  PDF_THUMBNAIL: "/assets/current-affairs/daily-current-affairs/pdf-icon.png",
  PDF_FALLBACK: "/assets/current-affairs/daily-current-affairs/pdf-icon.png",
  MOCK_TEST_CARD: "/assets/free-resources/free-mocktests/mocktest-card-image.png",
  MAGAZINE: "/assets/current-affairs/monthly-magazine/magazine.png",
  PRACTICE_TEST:
    "/assets/current-affairs/daily-practice-questions/prelims-practice-test.png",
  DEFAULT_PDF: "/assets/samples/sriram-sample.pdf",
} as const;

export function pdfThumbnailSrc(): string {
  return RESOURCE_ASSETS.PDF_ICON;
}
