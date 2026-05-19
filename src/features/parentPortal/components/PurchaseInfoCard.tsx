import { Calendar } from "lucide-react";
import type { ParentCourseInfo } from "../data/parentCourse";

interface PurchaseInfoCardProps {
  course: ParentCourseInfo;
}

export default function PurchaseInfoCard({ course }: PurchaseInfoCardProps) {
  return (
    <div className="w-[360px] overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)]">
      <div className="relative">
        <div
          className="h-[230px] w-full"
          style={{
            background:
              "linear-gradient(135deg, #F4F4F4 0%, #E2EEF5 60%, #CDE7F1 100%)",
          }}
        />
      </div>

      <div className="space-y-3 p-5">
        <h3
          className="text-[20px] font-bold leading-snug text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#000000]">
          <Calendar size={14} />
          <span>Purchased On - {course.purchasedOn}</span>
        </div>

        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#000000]">
          <Calendar size={14} />
          <span>Valid Upto - {course.validUpto}</span>
        </div>

        <div className="space-y-2 pt-1">
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
    </div>
  );
}
