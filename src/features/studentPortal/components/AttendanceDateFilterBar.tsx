"use client";

import CompactDropdown from "@/features/studentPortal/components/CompactDropdown";
import {
  ATTENDANCE_DATE_FILTER_OPTIONS,
  type AttendanceDateFilterOption,
} from "@/features/attendance/utils/attendanceDateFilter";

interface AttendanceDateFilterBarProps {
  filter: AttendanceDateFilterOption;
  onFilterChange: (value: AttendanceDateFilterOption) => void;
  customStartDate: string;
  customEndDate: string;
  onCustomStartDateChange: (value: string) => void;
  onCustomEndDateChange: (value: string) => void;
  rangeLabel?: string;
  resultCount: number;
}

const dateInputClassName =
  "box-border h-[44px] w-full min-w-0 rounded-full border border-[#e7ebf3] bg-[#edf0fb] px-4 text-[15px] font-semibold text-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.05)] outline-none focus:shadow-[0_0_0_2px_rgba(42,156,218,0.35)]";

export default function AttendanceDateFilterBar({
  filter,
  onFilterChange,
  customStartDate,
  customEndDate,
  onCustomStartDateChange,
  onCustomEndDateChange,
  rangeLabel,
  resultCount,
}: AttendanceDateFilterBarProps) {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
          <div className="w-full sm:w-[180px]">
            <p
              className="mb-2 text-[13px] font-semibold text-[#00000080]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Date Range
            </p>
            <CompactDropdown
              options={[...ATTENDANCE_DATE_FILTER_OPTIONS]}
              value={filter}
              onChange={(value) =>
                onFilterChange(value as AttendanceDateFilterOption)
              }
            />
          </div>

          {filter === "Custom Dates" ? (
            <>
              <div className="w-full sm:w-[170px]">
                <label
                  htmlFor="attendance-filter-start"
                  className="mb-2 block text-[13px] font-semibold text-[#00000080]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  From
                </label>
                <input
                  id="attendance-filter-start"
                  type="date"
                  value={customStartDate}
                  max={customEndDate || undefined}
                  onChange={(event) => onCustomStartDateChange(event.target.value)}
                  className={dateInputClassName}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                />
              </div>

              <div className="w-full sm:w-[170px]">
                <label
                  htmlFor="attendance-filter-end"
                  className="mb-2 block text-[13px] font-semibold text-[#00000080]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  To
                </label>
                <input
                  id="attendance-filter-end"
                  type="date"
                  value={customEndDate}
                  min={customStartDate || undefined}
                  onChange={(event) => onCustomEndDateChange(event.target.value)}
                  className={dateInputClassName}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                />
              </div>
            </>
          ) : null}
        </div>

        <p
          className="text-[14px] font-semibold text-[#00000080] lg:text-right"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {rangeLabel ? `${rangeLabel} · ` : ""}
          {resultCount} {resultCount === 1 ? "day" : "days"}
        </p>
      </div>
    </div>
  );
}
