"use client";

import Link from "@/components/common/AppLink";
import SectionTitle from "@/features/studentPortal/components/SectionTitle";
import EnrolledCourseCard from "@/features/studentPortal/components/EnrolledCourseCard";
import { useStudentDetails } from "@/features/studentPortal/hooks/useStudentProfile";
import { useAuthStore } from "@/store/authStore";

export default function EnrollmentsPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const { data, isLoading, isError, error } = useStudentDetails(
    isHydrated && isAuthenticated,
  );

  const courses = data?.courseEnrollments ?? [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <SectionTitle first="MY" second="COURSES" />

        <Link
          href="#"
          className="inline-flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,91,136,0.25)]"
          style={{
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 28,
            paddingRight: 28,
            borderRadius: 32,
            background:
              "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            lineHeight: "100%",
          }}
        >
          Upgrade Or Add Course
        </Link>
      </div>

      {isLoading ? (
        <p
          className="mt-8 text-[16px] font-medium text-[#00000080]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Loading your courses...
        </p>
      ) : isError ? (
        <p
          className="mt-8 text-[16px] font-medium text-[#E53935]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {error instanceof Error
            ? error.message
            : "Could not load your courses. Please try again."}
        </p>
      ) : courses.length === 0 ? (
        <p
          className="mt-8 text-[16px] font-medium text-[#00000080]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          You are not enrolled in any courses yet.
        </p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-6">
          {courses.map((c) => (
            <EnrolledCourseCard
              key={c.id}
              course={c}
              href={`/student/enrollments/${c.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
