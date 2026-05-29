import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface StudentDetailHeaderProps {
  studentName: string;
  backHref: string;
}

export default function StudentDetailHeader({
  studentName,
  backHref,
}: StudentDetailHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={backHref}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2A9FDB] text-white shadow-[0_6px_16px_rgba(42,159,219,0.4)]"
      >
        <ChevronLeft size={20} />
      </Link>
      <h1
        className="text-[28px] font-semibold"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <span className="text-[#00000066]">Student :</span>{" "}
        <span className="text-[#000000]">{studentName}</span>
      </h1>
    </div>
  );
}
