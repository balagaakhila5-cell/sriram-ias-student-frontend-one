import { Calendar, ClipboardCheck } from "lucide-react";
import Image from "next/image";

interface TestScheduleCardProps {
  title: string;
  dateLabel: string;
}

export default function TestScheduleCard({
  title,
  dateLabel,
}: TestScheduleCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)]">

      {/* IMAGE CONTAINER */}
      <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[14px]">

        {/* Background image */}
        <Image
          src="/assets/student/test-image.png"
          alt="Test"
          fill
          className="object-cover"
        />

        {/* Optional icon overlay */}
       

      </div>

      {/* TEXT CONTENT */}
      <div className="min-w-0 flex-1">
        <h4
          className="text-[15px] font-semibold leading-snug text-black"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h4>

        <div className="mt-3 flex items-center gap-2 text-[14px] font-semibold text-black/50">
          <Calendar size={14} />
          {dateLabel}
        </div>
      </div>

    </article>
  );
}