import { lazy } from "react";
import { withParams } from "@/lib/pageWrapper";

export const HomePage = lazy(() => import("@/pages/page"));
export const AboutPage = lazy(() => import("@/pages/about/page"));
export const FoundersMessagePage = lazy(() => import("@/pages/founders-message/page"));
export const OurToppersGalleryPage = lazy(() => import("@/pages/our-toppers-gallery/page"));
export const BooksPage = lazy(() => import("@/pages/books/page"));
export const CheckoutPage = lazy(() => import("@/pages/checkout/page"));
export const CheckoutPaymentPage = lazy(() => import("@/pages/checkout/payment/page"));
export const LoginPage = lazy(() => import("@/pages/login/page"));
export const SignupPage = lazy(() => import("@/pages/signup/page"));
export const CurrentAffairsPage = lazy(() => import("@/pages/current-affairs/page"));
export const CurrentAffairsDailyPage = lazy(
  () => import("@/pages/current-affairs/daily-current-affairs/page"),
);
export const CurrentAffairsMonthlyMagazinePage = lazy(
  () => import("@/pages/current-affairs/monthly-magazine/page"),
);
export const CurrentAffairsDpqPage = lazy(
  () => import("@/pages/current-affairs/daily-practice-questions/page"),
);
export const CurrentAffairsInfographicsPage = lazy(
  () => import("@/pages/current-affairs/infographics/page"),
);
export const CurrentAffairsMonthlyRecapPage = lazy(
  () => import("@/pages/current-affairs/monthly-recap/page"),
);
export const CurrentAffairsDpqTestResultsPage = lazy(
  () => import("@/pages/current-affairs/daily-practice-questions/test-results/page"),
);
export const CurrentAffairsDpqTopPerformersPage = lazy(
  () => import("@/pages/current-affairs/daily-practice-questions/top-performers/page"),
);
export const BlogsPage = lazy(() => import("@/pages/blogs/page"));
export const AllBlogsPage = lazy(() => import("@/pages/blogs/all/page"));
export const BlogDetailsPage = lazy(() => import("@/pages/blogs/[slug]/page"));

export const FreeResourcesPage = lazy(() => import("@/pages/free_resources/page"));
export const FreeResourcesNcertBooksPage = lazy(
  () => import("@/pages/free_resources/ncert-books/page"),
);
export const FreeResourcesNcertPagePage = lazy(
  () => import("@/pages/free_resources/ncert-page/page"),
);
export const FreeResourcesPreviousYearPage = lazy(
  () => import("@/pages/free_resources/previous-year/page"),
);
export const FreeResourcesPrelimsPaperPage = lazy(
  () => import("@/pages/free_resources/previous-year/prelims-paper/page"),
);
export const FreeResourcesMainsPaperPage = lazy(
  () => import("@/pages/free_resources/previous-year/mains-paper/page"),
);
export const FreeResourcesMocktestsPage = lazy(
  () => import("@/pages/free_resources/free-mocktests/page"),
);
export const FreeResourcesStudyMaterialsPage = lazy(
  () => import("@/pages/free_resources/study-materials/page"),
);

export const BookDetailsPage = withParams(
  lazy(() => import("@/pages/books/[slug]/page"))
);
export const CentersPage = withParams(
  lazy(() => import("@/pages/centers/[city]/page"))
);
export const CenterCourseCategoryPage = withParams(
  lazy(() => import("@/pages/centers/[city]/courses/[category]/page"))
);
export const CoursePage = withParams(
  lazy(() => import("@/pages/course/[slug]/page"))
);
export const FreeResourcesMocktestPage = withParams(
  lazy(() => import("@/pages/free_resources/free-mocktests/[slug]/page"))
);
export const FreeResourcesMocktestResultsPage = withParams(
  lazy(() => import("@/pages/free_resources/free-mocktests/[slug]/results/page"))
);
export const FreeResourcesMocktestCheckAnswersPage = withParams(
  lazy(() => import("@/pages/free_resources/free-mocktests/[slug]/check-answers/page"))
);
export const CurrentAffairsDpqAttemptPage = withParams(
  lazy(() => import("@/pages/current-affairs/daily-practice-questions/[slug]/page")),
);
export const CurrentAffairsDpqResultsPage = withParams(
  lazy(() => import("@/pages/current-affairs/daily-practice-questions/[slug]/results/page")),
);
export const CurrentAffairsDpqCheckAnswersPage = withParams(
  lazy(() => import("@/pages/current-affairs/daily-practice-questions/[slug]/check-answers/page")),
);
export const CurrentAffairsDpqTestResultDetailPage = withParams(
  lazy(() => import("@/pages/current-affairs/daily-practice-questions/test-results/[testId]/page")),
);
