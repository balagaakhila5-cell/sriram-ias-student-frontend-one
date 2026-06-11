import type { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  bg: string;
  valueColor: string;
  icon: ReactNode;
}

export default function StatCard({
  value,
  label,
  bg,
  valueColor,
  icon,
}: StatCardProps) {
  return (
    <div
      className="relative flex h-[170px] flex-col justify-between rounded-[18px] p-5"
      style={{ background: bg }}
    >
      <div
        className="text-[32px] font-extrabold leading-none"
        style={{ fontFamily: "Montserrat, sans-serif", color: valueColor }}
      >
        {value}
      </div>

      <div className="flex items-end justify-between">
        <p
          className="text-[16px] font-extrabold text-[#00000066]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {label}
        </p>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden">
          {icon}
        </div>
      </div>
    </div>
  );
}
