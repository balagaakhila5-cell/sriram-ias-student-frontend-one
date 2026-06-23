import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "@/pages/loading";
import LoginPage from "@/pages/login/page";
import SignupPage from "@/pages/signup/page";
import {
  HomePage,
  AboutPage,
  FoundersMessagePage,
  OurToppersGalleryPage,
  OurToppersYearWisePage,
  BooksPage,
  BookDetailsPage,
  CentersPage,
  CenterCourseCategoryPage,
  CoursePage,
  CheckoutPage,
  CheckoutPaymentPage,
  CurrentAffairsPage,
  CurrentAffairsDailyPage,
  CurrentAffairsMonthlyMagazinePage,
  CurrentAffairsDpqPage,
  CurrentAffairsInfographicsPage,
  CurrentAffairsMonthlyRecapPage,
  CurrentAffairsDailyLearningPage,
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
  ResourceViewPage,
  ResourceSamplePage,
  StudentLiveClassPage,
  StudentProfilePage,
  StudentEnrollmentsPage,
  StudentAttendancePage,
  StudentAnnouncementsPage,
  StudentBookmarksPage,
  StudentFreeResourcesPage,
  StudentTestSeriesPrelimsListPage,
  StudentAnswerWritingMainsListPage,
  StudentImportantContactsPage,
  StudentSessionPage,
  StudentCourseDetailPage,
  StudentRecordingDetailPage,
  StudentTestSeriesDetailPage,
  StudentMainsAttemptPage,
  EmployeeMyClassesPage,
  EmployeeProfilePage,
  EmployeeStudentListPage,
  EmployeeStudentFeedbackPage,
  EmployeeAttendancePage,
  EmployeeContentUploadPage,
  EmployeeCopyCheckingPage,
  EmployeeHolidaysPage,
  EmployeeImportantContactsPage,
  EmployeeCopyCheckingStudentPage,
  EmployeeStudentAttendancePage,
  ParentCourseDetailsPage,
  ParentPerformancePage,
  ParentAttendancePage,
  ParentImportantContactsPage,
  ParentTestResultPage,
} from "./lazyPages";
import {
  EmployeePortalLayout,
  ParentPortalLayout,
  StudentPortalLayout,
} from "./portalRouteLayouts";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/founders-message" element={<FoundersMessagePage />} />
        <Route path="/our-toppers-gallery" element={<OurToppersGalleryPage />} />
        <Route
          path="/our-toppers-gallery/year-wise/:year"
          element={<OurToppersYearWisePage />}
        />
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
        <Route
          path="/current-affairs/daily-learning"
          element={<CurrentAffairsDailyLearningPage />}
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

        <Route path="/resources/view/:id" element={<ResourceViewPage />} />
        <Route path="/resources/sample/:id" element={<ResourceSamplePage />} />

        {/* Student portal — panel layout */}
        <Route path="/student" element={<StudentPortalLayout />}>
          <Route index element={<Navigate to="live-class" replace />} />
          <Route path="live-class" element={<StudentLiveClassPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="enrollments" element={<StudentEnrollmentsPage />} />
          <Route path="attendance" element={<StudentAttendancePage />} />
          <Route path="announcements" element={<StudentAnnouncementsPage />} />
          <Route path="bookmarks" element={<StudentBookmarksPage />} />
          <Route path="free-resources" element={<StudentFreeResourcesPage />} />
          <Route
            path="test-series-prelims"
            element={<StudentTestSeriesPrelimsListPage />}
          />
          <Route
            path="answer-writing-mains"
            element={<StudentAnswerWritingMainsListPage />}
          />
          <Route
            path="important-contacts"
            element={<StudentImportantContactsPage />}
          />
        </Route>

        {/* Student portal — full-width pages (outside panel sidebar) */}
        <Route path="/student/session/:sessionId" element={<StudentSessionPage />} />
        <Route
          path="/student/enrollments/:courseId/recordings/:recordingId"
          element={<StudentRecordingDetailPage />}
        />
        <Route
          path="/student/enrollments/:courseId"
          element={<StudentCourseDetailPage />}
        />
        <Route
          path="/student/test-series-prelims/:seriesId"
          element={<StudentTestSeriesDetailPage />}
        />
        <Route
          path="/student/answer-writing-mains/:testId"
          element={<StudentMainsAttemptPage />}
        />

        {/* Employee portal — panel layout */}
        <Route path="/employee" element={<EmployeePortalLayout />}>
          <Route index element={<Navigate to="my-classes" replace />} />
          <Route path="my-classes" element={<EmployeeMyClassesPage />} />
          <Route path="profile" element={<EmployeeProfilePage />} />
          <Route path="student-list" element={<EmployeeStudentListPage />} />
          <Route
            path="student-feedback"
            element={<EmployeeStudentFeedbackPage />}
          />
          <Route path="attendance" element={<EmployeeAttendancePage />} />
          <Route
            path="attendance/:studentId"
            element={<EmployeeStudentAttendancePage />}
          />
          <Route path="content-upload" element={<EmployeeContentUploadPage />} />
          <Route path="copy-checking" element={<EmployeeCopyCheckingPage />} />
          <Route
            path="copy-checking/:studentId"
            element={<EmployeeCopyCheckingStudentPage />}
          />
          <Route path="holidays" element={<EmployeeHolidaysPage />} />
          <Route
            path="important-contacts"
            element={<EmployeeImportantContactsPage />}
          />
        </Route>

        {/* Parent portal — panel layout */}
        <Route path="/parent" element={<ParentPortalLayout />}>
          <Route index element={<Navigate to="course-details" replace />} />
          <Route path="course-details" element={<ParentCourseDetailsPage />} />
          <Route path="performance" element={<ParentPerformancePage />} />
          <Route path="attendance" element={<ParentAttendancePage />} />
          <Route
            path="important-contacts"
            element={<ParentImportantContactsPage />}
          />
        </Route>

        {/* Parent portal — detail pages outside panel */}
        <Route
          path="/parent/performance/:testId"
          element={<ParentTestResultPage />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
