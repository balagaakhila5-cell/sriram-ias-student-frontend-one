"use client";

import { useEffect, useMemo, useState } from "react";
import CompactDropdown from "@/features/studentPortal/components/CompactDropdown";
import {
  MONTHS,
  DAY_LABELS,
  buildCalendarCells,
  buildYearOptions,
  formatCalendarDate,
  getTodayParts,
} from "@/lib/calendarUtils";

type DynamicCalendarProps = {
  variant?: "sidebar" | "compact";
  selectedDate?: string | null;
  onDateSelect?: (date: string) => void;
  className?: string;
  initialYear?: number;
  initialMonth?: number;
};

export default function DynamicCalendar({
  variant = "sidebar",
  selectedDate,
  onDateSelect,
  className = "",
  initialYear,
  initialMonth,
}: DynamicCalendarProps) {
  const isControlled = selectedDate !== undefined;

  const [ready, setReady] = useState(false);
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(0);
  const [internalSelectedDate, setInternalSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const today = getTodayParts();
    const todayDate = formatCalendarDate(today.year, today.month, today.day);

    setYear(initialYear ?? today.year);
    setMonth(initialMonth ?? today.month);

    if (!isControlled) {
      setInternalSelectedDate(todayDate);
    }

    setReady(true);
  }, [initialYear, initialMonth, isControlled]);

  const activeSelectedDate = isControlled ? selectedDate : internalSelectedDate;
  const todayParts = ready ? getTodayParts() : null;
  const years = useMemo(
    () => buildYearOptions(todayParts?.year ?? year),
    [todayParts?.year, year],
  );
  const cells = useMemo(() => buildCalendarCells(year, month), [year, month]);

  const handleDateSelect = (cellYear: number, cellMonth: number, day: number) => {
    const formattedDate = formatCalendarDate(cellYear, cellMonth, day);

    if (!isControlled) {
      setInternalSelectedDate(formattedDate);
    }

    onDateSelect?.(formattedDate);
  };

  const getCellClassName = (isSelected: boolean, isToday: boolean, isCurrentMonth: boolean) => {
    if (isSelected || isToday) {
      return "bg-[#1897D8] font-bold text-white shadow-[0_4px_12px_rgba(24,151,216,0.25)]";
    }

    if (isCurrentMonth) {
      return variant === "compact"
        ? "text-[#1F2A37] hover:bg-[#F1F7FB]"
        : "font-bold text-black hover:bg-[#EFF3FF]";
    }

    return variant === "compact"
      ? "text-[#A9A9A9] opacity-70 hover:bg-[#F8FAFC]"
      : "cursor-default font-bold text-[#A9A9A9] opacity-60";
  };

  if (!ready) {
    return (
      <div
        className={`rounded-[10px] bg-white px-5 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${
          variant === "compact" ? "w-[340px]" : ""
        } ${className}`}
        aria-hidden="true"
      >
        <div className="mb-6 flex gap-3">
          <div className="h-[44px] flex-1 rounded-full bg-[#EFF3FF]" />
          <div className="h-[44px] flex-1 rounded-full bg-[#EFF3FF]" />
        </div>
        <div className="grid grid-cols-7 gap-y-4">
          {Array.from({ length: 42 }).map((_, index) => (
            <div key={index} className="mx-auto h-[34px] w-[34px] rounded-[6px] bg-[#F3F5FA]" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={`w-[340px] rounded-[20px] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] ${className}`}
      >
        <div className="mb-5 flex items-center gap-3">
          <CompactDropdown
            className="flex-1"
            options={years}
            value={String(year)}
            onChange={(value) => setYear(Number(value))}
          />
          <CompactDropdown
            className="flex-1"
            options={[...MONTHS]}
            value={MONTHS[month]}
            onChange={(value) => setMonth(MONTHS.indexOf(value as (typeof MONTHS)[number]))}
          />
        </div>

        <div className="grid grid-cols-7 gap-y-3 text-center">
          {DAY_LABELS.map((label) => (
            <div key={label} className="text-[12px] font-medium text-[#A6AEB5]">
              {label}
            </div>
          ))}

          {cells.map((cell, index) => {
            const formattedDate = formatCalendarDate(cell.year, cell.month, cell.day);
            const isSelected = activeSelectedDate === formattedDate;

            return (
              <button
                key={`${cell.year}-${cell.month}-${cell.day}-${index}`}
                type="button"
                onClick={() => handleDateSelect(cell.year, cell.month, cell.day)}
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold transition-colors ${getCellClassName(
                  isSelected,
                  cell.isToday,
                  cell.isCurrentMonth,
                )}`}
              >
                {String(cell.day).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-[10px] bg-white px-5 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="mb-6 flex gap-3">
        <CompactDropdown
          className="flex-1"
          options={years}
          value={String(year)}
          onChange={(value) => setYear(Number(value))}
        />
        <CompactDropdown
          className="flex-1"
          options={[...MONTHS]}
          value={MONTHS[month]}
          onChange={(value) => setMonth(MONTHS.indexOf(value as (typeof MONTHS)[number]))}
        />
      </div>

      <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center text-[15px] font-bold">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="flex h-[34px] items-center justify-center font-semibold text-[#A7A7A7]"
          >
            {label}
          </div>
        ))}

        {cells.map((cell, index) => {
          const formattedDate = formatCalendarDate(cell.year, cell.month, cell.day);
          const isSelected = activeSelectedDate === formattedDate;

          return (
            <button
              key={`${cell.year}-${cell.month}-${cell.day}-${index}`}
              type="button"
              onClick={() => handleDateSelect(cell.year, cell.month, cell.day)}
              className={`flex h-[34px] items-center justify-center rounded-[6px] text-[15px] transition-all duration-300 ${getCellClassName(
                isSelected,
                cell.isToday,
                cell.isCurrentMonth,
              )}`}
            >
              {String(cell.day).padStart(2, "0")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
