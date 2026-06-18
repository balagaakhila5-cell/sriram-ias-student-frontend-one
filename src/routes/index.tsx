import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "@/pages/loading";
import {
  HomePage,
  AboutPage,
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
  BlogsPage,
  BlogDetailsPage,
} from "./lazyPages";

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
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
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
