/** Shared asset paths for resource cards */
export const RESOURCE_ASSETS = {
  /** Use assets that exist under public/ to avoid dev-server 404 storms */
  PDF_THUMBNAIL: "/assets/free-resources/free-mocktests/mocktest-card-image.png",
  PDF_ICON: "/assets/free-resources/free-mocktests/mocktest-card-image.png",
  PDF_FALLBACK: "/assets/Search-Icon.svg",
  MOCK_TEST_CARD: "/assets/free-resources/free-mocktests/mocktest-card-image.png",
  MAGAZINE: "/assets/current-affairs/monthly-magazine/magazine.png",
  PRACTICE_TEST:
    "/assets/current-affairs/daily-practice-questions/prelims-practice-test.png",
  DEFAULT_PDF: "/assets/samples/sriram-sample.pdf",
} as const;

export function pdfThumbnailSrc(): string {
  return RESOURCE_ASSETS.PDF_THUMBNAIL;
}
