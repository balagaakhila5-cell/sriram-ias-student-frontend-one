import Link from "next/link";
import { Calendar } from "lucide-react";

interface CourseSummary {
  id: string;
  title: string;
  validUpto: string;
  progressPercent: number;
  status: "Active" | "Expired";
}

interface EnrolledCourseCardProps {
  course: CourseSummary;
  href: string;
}

export default function EnrolledCourseCard({
  course,
  href,
}: EnrolledCourseCardProps) {
  return (
    <Link
      href={href}
      className="block w-[330px] overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-transform hover:-translate-y-0.5"
    >
      <div className="relative">
        <div
          className="h-[210px] w-full"
          style={{
            background:
              "linear-gradient(135deg, #F4F4F4 0%, #E2EEF5 60%, #CDE7F1 100%)",
          }}
        />
        <span
          className="absolute right-3 top-3 inline-flex items-center rounded-full bg-[#1FA546] px-3 py-1 text-[12px] font-semibold text-white"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {course.status}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <h3
          className="text-[20px] font-bold leading-snug text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-[14px] text-[#000000] font-semibold">
          <Calendar size={14} />
          <span>Valid Upto - {course.validUpto}</span>
        </div>

        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6EBEF]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${course.progressPercent}%`,
                background:
                  "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 0%, #005B88 100%)",
              }}
            />
          </div>
          <p
            className="text-[14px] font-semibold text-[#1F7AB8]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {course.progressPercent} % Completed
          </p>
        </div>
      </div>
    </Link>
  );
}
