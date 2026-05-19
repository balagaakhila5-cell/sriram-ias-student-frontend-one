import { Calendar, CheckSquare } from "lucide-react";

interface InfoSeriesCardProps {
  title: string;
  validUpto: string;
  batch: string;
  progressPercent: number;
  startsInLabel?: string;
}

export default function InfoSeriesCard({
  title,
  validUpto,
  batch,
  progressPercent,
  startsInLabel = "Starts in 01 : 00 : 00 Hrs",
}: InfoSeriesCardProps) {
  return (
    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div className="relative">
        <div
          className="h-[260px] w-full"
          style={{
            background:
              "linear-gradient(135deg, #F4F4F4 0%, #E2EEF5 60%, #CDE7F1 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-[120px] w-[180px] opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(24,151,216,0.0) 0%, rgba(24,151,216,0.35) 60%, rgba(10,115,183,0.55) 100%)",
            clipPath:
              "polygon(100% 0, 100% 100%, 0 100%, 35% 60%, 65% 30%, 80% 10%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-[#0F2030]/90 px-5 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm">
          {startsInLabel}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <h3
          className="text-[20px] font-bold text-[#1F2A37]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h3>

        <div className="space-y-2 text-[14px] text-[#5C6770]">
          <div className="flex items-center gap-2">
            <Calendar size={15} />
            <span>Valid Upto : {validUpto}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare size={15} />
            <span>Batch : {batch}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6EBEF]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                background:
                  "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 0%, #005B88 100%)",
              }}
            />
          </div>
          <p
            className="text-[13px] font-semibold text-[#1F7AB8]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {progressPercent} % Completed
          </p>
        </div>
      </div>
    </div>
  );
}
