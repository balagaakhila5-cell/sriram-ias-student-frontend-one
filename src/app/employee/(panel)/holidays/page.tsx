import { Calendar } from "lucide-react";
import SectionTitle from "@/features/studentPortal/components/SectionTitle";
import { holidays, leaveBalance } from "@/features/employeePortal/data/holidays";

export default function EmployeeHolidaysPage() {
  return (
    <div className="space-y-10" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <LeaveCard
          icon={
            <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#FDE2EC] text-[#E16165]">
              <Calendar size={22} />
            </span>
          }
          label="Causal Leaves"
          remaining={`${leaveBalance.casualLeavesLeft} Days Left`}
          color="#E16165"
        />
        <LeaveCard
          icon={
            <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#DDEFDE] text-[#1B7A2E]">
              <Calendar size={22} />
            </span>
          }
          label="Sick Leaves"
          remaining={`${leaveBalance.sickLeavesLeft} Days Left`}
          color="#1B7A2E"
        />
        <PlanLeaveCard />
      </div>

      <section>
        <SectionTitle
          first="UPCOMING"
          second="ACADEMIC HOLIDAYS"
          className="text-[28px] font-black"
        />

        <div className="mt-6 overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div
            className="grid grid-cols-3 px-6 py-4 text-[18px] font-semibold text-white"
            style={{
              background: "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
            }}
          >
            <div>Holiday</div>
            <div>Date</div>
            <div>Type</div>
          </div>

          {holidays.map((h, i) => (
            <div
              key={h.id}
              className={`grid grid-cols-3 px-6 py-5 text-[16px] font-medium text-[#000000] ${
                i < holidays.length - 1 ? "border-b border-[#F0F3F6]" : ""
              }`}
            >
              <div>{h.name}</div>
              <div>{h.date}</div>
              <div>{h.type}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LeaveCard({
  icon,
  label,
  remaining,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  remaining: string;
  color: string;
}) {
  return (
    <div
      className="flex flex-col gap-6 rounded-[18px] bg-white p-6"
      style={{
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 32px 0px #0000000D",
      }}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[16px] font-semibold text-[#1F2A37]">
          {label}
        </span>
      </div>
      <div className="text-[22px] font-bold" style={{ color }}>
        {remaining}
      </div>
    </div>
  );
}

function PlanLeaveCard() {
  return (
    <div
      className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-[18px] bg-[#0F1822] p-6 text-white"
      style={{
        border: "1px solid #0000001A",
        boxShadow: "0px 4px 32px 0px #0000000D",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(225, 97, 101, 0.6) 0%, transparent 60%)",
        }}
      />
      <h3 className="relative z-10 text-[22px] font-bold leading-tight">
        Planning To Take a Leave
      </h3>
      <button
        type="button"
        className="relative z-10 w-fit rounded-[10px] bg-[#0095D6] px-5 py-2 text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(0,149,214,0.4)]"
      >
        Request Leave
      </button>
    </div>
  );
}
