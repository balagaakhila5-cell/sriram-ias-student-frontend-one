import { lazy } from "react";
import { withParams } from "@/lib/pageWrapper";

export const HomePage = lazy(() => import("@/pages/page"));
export const AboutPage = lazy(() => import("@/pages/about/page"));
export const BooksPage = lazy(() => import("@/pages/books/page"));
export const CheckoutPage = lazy(() => import("@/pages/checkout/page"));
export const CheckoutPaymentPage = lazy(() => import("@/pages/checkout/payment/page"));
export const LoginPage = lazy(() => import("@/pages/login/page"));
export const SignupPage = lazy(() => import("@/pages/signup/page"));
export const CurrentAffairsPage = lazy(() => import("@/pages/current-affairs/page"));
export const BlogsPage = lazy(() => import("@/pages/blogs/page"));
export const BlogDetailsPage = lazy(() => import("@/pages/blogs/[slug]/page"));

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
