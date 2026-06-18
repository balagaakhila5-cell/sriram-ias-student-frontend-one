import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "@/pages/loading";
import {
  HomePage,
  AboutPage,
  FoundersMessagePage,
  OurToppersGalleryPage,
  BooksPage,
  BookDetailsPage,
  CentersPage,
  CenterCourseCategoryPage,
  CoursePage,
  CheckoutPage,
  CheckoutPaymentPage,
  LoginPage,
  SignupPage,
  CurrentAffairsPage,
  CurrentAffairsDailyPage,
  CurrentAffairsMonthlyMagazinePage,
  CurrentAffairsDpqPage,
  CurrentAffairsInfographicsPage,
  CurrentAffairsMonthlyRecapPage,
  CurrentAffairsDpqTestResultsPage,
  CurrentAffairsDpqTopPerformersPage,
  CurrentAffairsDpqAttemptPage,
  CurrentAffairsDpqResultsPage,
  CurrentAffairsDpqCheckAnswersPage,
  CurrentAffairsDpqTestResultDetailPage,
  BlogsPage,
  AllBlogsPage,
  BlogDetailsPage,
  FreeResourcesPage,
  FreeResourcesNcertBooksPage,
  FreeResourcesNcertPagePage,
  FreeResourcesPreviousYearPage,
  FreeResourcesPrelimsPaperPage,
  FreeResourcesMainsPaperPage,
  FreeResourcesMocktestsPage,
  FreeResourcesMocktestPage,
  FreeResourcesMocktestResultsPage,
  FreeResourcesMocktestCheckAnswersPage,
  FreeResourcesStudyMaterialsPage,
} from "./lazyPages";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/founders-message" element={<FoundersMessagePage />} />
        <Route path="/our-toppers-gallery" element={<OurToppersGalleryPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:slug" element={<BookDetailsPage />} />
        <Route path="/centers/:city" element={<CentersPage />} />
        <Route
          path="/centers/:city/courses/:category"
          element={<CenterCourseCategoryPage />}
        />
        <Route path="/course/:slug" element={<CoursePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/current-affairs" element={<CurrentAffairsPage />} />
        <Route
          path="/current-affairs/daily-current-affairs"
          element={<CurrentAffairsDailyPage />}
        />
        <Route
          path="/current-affairs/monthly-magazine"
          element={<CurrentAffairsMonthlyMagazinePage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions"
          element={<CurrentAffairsDpqPage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions/top-performers"
          element={<CurrentAffairsDpqTopPerformersPage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions/test-results"
          element={<CurrentAffairsDpqTestResultsPage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions/test-results/:testId"
          element={<CurrentAffairsDpqTestResultDetailPage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions/:slug/results"
          element={<CurrentAffairsDpqResultsPage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions/:slug/check-answers"
          element={<CurrentAffairsDpqCheckAnswersPage />}
        />
        <Route
          path="/current-affairs/daily-practice-questions/:slug"
          element={<CurrentAffairsDpqAttemptPage />}
        />
        <Route
          path="/current-affairs/infographics"
          element={<CurrentAffairsInfographicsPage />}
        />
        <Route
          path="/current-affairs/monthly-recap"
          element={<CurrentAffairsMonthlyRecapPage />}
        />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/all" element={<AllBlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailsPage />} />

        <Route path="/free_resources" element={<FreeResourcesPage />} />
        <Route
          path="/free_resources/ncert-books"
          element={<FreeResourcesNcertBooksPage />}
        />
        <Route
          path="/free_resources/ncert-page"
          element={<FreeResourcesNcertPagePage />}
        />
        <Route
          path="/free_resources/previous-year"
          element={<FreeResourcesPreviousYearPage />}
        />
        <Route
          path="/free_resources/previous-year/prelims-paper"
          element={<FreeResourcesPrelimsPaperPage />}
        />
        <Route
          path="/free_resources/previous-year/mains-paper"
          element={<FreeResourcesMainsPaperPage />}
        />
        <Route
          path="/free_resources/free-mocktests"
          element={<FreeResourcesMocktestsPage />}
        />
        <Route
          path="/free_resources/free-mocktests/:slug"
          element={<FreeResourcesMocktestPage />}
        />
        <Route
          path="/free_resources/free-mocktests/:slug/results"
          element={<FreeResourcesMocktestResultsPage />}
        />
        <Route
          path="/free_resources/free-mocktests/:slug/check-answers"
          element={<FreeResourcesMocktestCheckAnswersPage />}
        />
        <Route
          path="/free_resources/study-materials"
          element={<FreeResourcesStudyMaterialsPage />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
