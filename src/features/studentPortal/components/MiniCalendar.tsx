"use client";

import DynamicCalendar from "@/components/common/DynamicCalendar";

interface MiniCalendarProps {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  initialYear?: number;
  initialMonth?: number;
}

export default function MiniCalendar({
  selectedDate,
  setSelectedDate,
  initialYear,
  initialMonth,
}: MiniCalendarProps) {
  return (
    <DynamicCalendar
      variant="compact"
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      initialYear={initialYear}
      initialMonth={initialMonth}
    />
  );
}
