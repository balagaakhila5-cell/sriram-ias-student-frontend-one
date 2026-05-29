import Link from "next/link";
import type { Student } from "../data/students";

interface StudentGradeCardProps {
  student: Student;
  /** When set, the card becomes a link to this href. */
  href?: string;
  /** When provided, this label replaces the default "Batch ..." subtitle. */
  footer?: React.ReactNode;
}

export default function StudentGradeCard({
  student,
  href,
  footer,
}: StudentGradeCardProps) {
  const inner = (
    <article
      className="overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      style={{
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 32px 0px #0000000D",
      }}
    >
      <div
        className="relative flex h-[170px] items-center justify-center"
        style={{ background: student.avatarBg }}
      >
        <span
          className="text-[64px] font-bold text-white/80"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {student.initials}
        </span>
        <span
          className="absolute right-3 top-3 inline-flex h-[34px] items-center justify-center rounded-full bg-[#D25120] px-3 text-[14px] font-semibold text-white"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {student.grade}
        </span>
      </div>

      <div className="flex flex-col items-center px-5 py-4">
        <h3
          className="text-[16px] font-semibold text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {student.name}
        </h3>
        {footer ?? (
          <p
            className="mt-1 text-[14px] font-semibold text-[#00000099]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            • {student.batch}
          </p>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}
