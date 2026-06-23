import { lazy } from "react";
import { withPageParams, withParams } from "@/lib/pageWrapper";

export const HomePage = lazy(() => import("@/pages/page"));
export const AboutPage = lazy(() => import("@/pages/about/page"));
export const FoundersMessagePage = lazy(() => import("@/pages/founders-message/page"));
export const OurToppersGalleryPage = lazy(() => import("@/pages/our-toppers-gallery/page"));
export const OurToppersYearWisePage = withParams(
  lazy(() => import("@/pages/our-toppers-gallery/year-wise/[year]/page")),
);
export const BooksPage = lazy(() => import("@/pages/books/page"));
export const CheckoutPage = lazy(() => import("@/pages/checkout/page"));
export const CheckoutPaymentPage = lazy(() => import("@/pages/checkout/payment/page"));
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
export const CurrentAffairsDailyLearningPage = lazy(
  () => import("@/pages/current-affairs/daily-learning/page"),
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

export const ResourceViewPage = lazy(
  () => import("@/pages/resources/view/[id]/page"),
);

export const ResourceSamplePage = lazy(
  () => import("@/pages/resources/sample/[id]/page"),
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

// ── Student portal ──────────────────────────────────────────────────────────
export const StudentLiveClassPage = lazy(
  () => import("@/pages/student/(panel)/live-class/page"),
);
export const StudentProfilePage = lazy(
  () => import("@/pages/student/(panel)/profile/page"),
);
export const StudentEnrollmentsPage = lazy(
  () => import("@/pages/student/(panel)/enrollments/page"),
);
export const StudentAttendancePage = lazy(
  () => import("@/pages/student/(panel)/attendance/page"),
);
export const StudentAnnouncementsPage = lazy(
  () => import("@/pages/student/(panel)/announcements/page"),
);
export const StudentBookmarksPage = lazy(
  () => import("@/pages/student/(panel)/bookmarks/page"),
);
export const StudentFreeResourcesPage = lazy(
  () => import("@/pages/student/(panel)/free-resources/page"),
);
export const StudentTestSeriesPrelimsListPage = lazy(
  () => import("@/pages/student/(panel)/test-series-prelims/page"),
);
export const StudentAnswerWritingMainsListPage = lazy(
  () => import("@/pages/student/(panel)/answer-writing-mains/page"),
);
export const StudentImportantContactsPage = lazy(
  () => import("@/pages/student/(panel)/important-contacts/page"),
);
export const StudentSessionPage = withParams(
  lazy(() => import("@/pages/student/session/[sessionId]/page")),
);
export const StudentCourseDetailPage = withParams(
  lazy(() => import("@/pages/student/enrollments/[courseId]/page")),
);
export const StudentRecordingDetailPage = withParams(
  lazy(
    () =>
      import("@/pages/student/enrollments/[courseId]/recordings/[recordingId]/page"),
  ),
);
export const StudentTestSeriesDetailPage = withParams(
  lazy(() => import("@/pages/student/test-series-prelims/[seriesId]/page")),
);
export const StudentMainsAttemptPage = lazy(
  () => import("@/pages/student/answer-writing-mains/[testId]/page"),
);

// ── Employee portal ─────────────────────────────────────────────────────────
export const EmployeeMyClassesPage = lazy(
  () => import("@/pages/employee/(panel)/my-classes/page"),
);
export const EmployeeProfilePage = lazy(
  () => import("@/pages/employee/(panel)/profile/page"),
);
export const EmployeeStudentListPage = lazy(
  () => import("@/pages/employee/(panel)/student-list/page"),
);
export const EmployeeStudentFeedbackPage = lazy(
  () => import("@/pages/employee/(panel)/student-feedback/page"),
);
export const EmployeeAttendancePage = lazy(
  () => import("@/pages/employee/(panel)/attendance/page"),
);
export const EmployeeContentUploadPage = lazy(
  () => import("@/pages/employee/(panel)/content-upload/page"),
);
export const EmployeeCopyCheckingPage = lazy(
  () => import("@/pages/employee/(panel)/copy-checking/page"),
);
export const EmployeeHolidaysPage = lazy(
  () => import("@/pages/employee/(panel)/holidays/page"),
);
export const EmployeeImportantContactsPage = lazy(
  () => import("@/pages/employee/(panel)/important-contacts/page"),
);
export const EmployeeCopyCheckingStudentPage = withParams(
  lazy(() => import("@/pages/employee/(panel)/copy-checking/[studentId]/page")),
);
export const EmployeeStudentAttendancePage = withParams(
  lazy(() => import("@/pages/employee/(panel)/attendance/[studentId]/page")),
);

// ── Parent portal ───────────────────────────────────────────────────────────
export const ParentCourseDetailsPage = lazy(
  () => import("@/pages/parent/(panel)/course-details/page"),
);
export const ParentPerformancePage = lazy(
  () => import("@/pages/parent/(panel)/performance/page"),
);
export const ParentAttendancePage = lazy(
  () => import("@/pages/parent/(panel)/attendance/page"),
);
export const ParentImportantContactsPage = lazy(
  () => import("@/pages/parent/(panel)/important-contacts/page"),
);
export const ParentTestResultPage = withPageParams(
  lazy(() => import("@/pages/parent/performance/[testId]/page")),
);
