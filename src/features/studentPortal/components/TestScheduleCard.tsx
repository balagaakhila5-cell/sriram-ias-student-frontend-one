import { Calendar, ClipboardCheck } from "lucide-react";

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
      <div
        className="flex h-[108px] w-[108px] shrink-0  items-center justify-center rounded-[14px] text-[#1F7AB8]"
        style={{
          background:
            "linear-gradient(135deg, #DCEEF7 0%, #B5DAEE 100%)",
        }}
      >
        <ClipboardCheck size={48} strokeWidth={1.6} />
      </div>

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
