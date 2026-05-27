import { Calendar } from "lucide-react";

interface TestScheduleCardProps {
  title: string;
  dateLabel: string;
}

export default function TestScheduleCard({
  title,
  dateLabel,
}: TestScheduleCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#F2F8FC] hover:shadow-[0_8px_24px_rgba(31,122,184,0.12)]">
      
      {/* Image Section */}
      <div
        className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-[14px]"
        style={{
          background:
            "linear-gradient(135deg, #DCEEF7 0%, #B5DAEE 100%)",
        }}
      >
        <img
          src="/assets/student/test-image.png"
          alt="test"
          className="h-[100px] w-[100px] object-contain"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4
          className="text-[15px] font-semibold leading-snug text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h4>

        <div className="mt-3 flex items-center gap-2 text-[14px] font-semibold text-[#00000080]">
          <Calendar size={14} />
          {dateLabel}
        </div>
      </div>
    </article>
  );
}