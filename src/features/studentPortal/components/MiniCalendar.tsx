"use client";

import { useMemo, useState } from "react";
import CompactDropdown from "./CompactDropdown";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface MiniCalendarProps {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;

  initialYear?: number;
  initialMonth?: number;
}

export default function MiniCalendar({
  selectedDate,
  setSelectedDate,
  initialYear = 2026,
  initialMonth = 3,
}: MiniCalendarProps) {

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const years = useMemo(() => {
    const base = initialYear;
    return Array.from({ length: 6 }, (_, i) => String(base - 1 + i));
  }, [initialYear]);

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <div className="w-[340px] rounded-[20px] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

      {/* Dropdowns */}
      <div className="mb-5 flex items-center gap-3">
        <CompactDropdown
          className="flex-1"
          options={years}
          value={String(year)}
          onChange={(v) => setYear(Number(v))}
        />

        <CompactDropdown
          className="flex-1"
          options={MONTHS}
          value={MONTHS[month]}
          onChange={(v) => setMonth(MONTHS.indexOf(v))}
        />
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-3 text-center">

        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-[12px] font-medium text-[#A6AEB5]"
          >
            {d}
          </div>
        ))}

        {cells.map((day, i) => {

          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const isSelected = selectedDate === formattedDate;

          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                setSelectedDate(formattedDate);
              }}
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold transition-colors ${
                isSelected
                  ? "bg-[#1897D8] text-white shadow-[0_4px_12px_rgba(24,151,216,0.35)]"
                  : "text-[#1F2A37] hover:bg-[#F1F7FB]"
              }`}
            >
              {String(day).padStart(2, "0")}
            </button>
          );
        })}
      </div>
    </div>
  );
}