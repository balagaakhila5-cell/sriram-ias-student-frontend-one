"use client";

import { useState } from "react";
import MiniCalendar from "./MiniCalendar";
import NextClassCard from "./NextClassCard";
import UpcomingClassCard from "./UpcomingClassCard";
import EmptyLiveClass from "./EmptyLiveClass";
import SectionTitle from "./SectionTitle";
import { nextClass, upcomingSessions } from "../data/liveClass";

interface LiveClassSectionProps {
  viewOnly?: boolean;
  upcomingTitle?: { first: string; second: string };
}

export default function LiveClassSection({
  viewOnly = false,
  upcomingTitle,
}: LiveClassSectionProps = {}) {

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // ✅ SAFE FALLBACK (prevents undefined crash)
  const safeUpcomingSessions = upcomingSessions ?? [];

  // FILTER SESSIONS BASED ON SELECTED DATE
  const filteredUpcoming = selectedDate
    ? safeUpcomingSessions.filter(
        (session) => session.date === selectedDate
      )
    : safeUpcomingSessions;

  // ✅ SAFE LENGTH CHECK
  const hasSessions = (filteredUpcoming?.length ?? 0) > 0;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">

      {/* LEFT SIDE */}
      <div className="flex-1 min-w-0 space-y-10">

        {hasSessions ? (
          <>
            {/* NEXT CLASS */}
            <section>
              <SectionTitle first="NEXT" second="CLASS" />

              <div className="mt-5">
                <NextClassCard
                  session={nextClass}
                  viewOnly={viewOnly}
                />
              </div>
            </section>

            {/* UPCOMING CLASSES */}
            <section>
              <SectionTitle
                first={upcomingTitle?.first ?? "UPCOMING"}
                second={upcomingTitle?.second ?? "CLASSES"}
              />

              <div className="mt-5 space-y-3">
                {filteredUpcoming.map((s) => (
                  <UpcomingClassCard key={s.id} session={s} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <EmptyLiveClass />
          </div>
        )}
      </div>

      {/* RIGHT SIDE CALENDAR */}
      <div className="lg:self-start">
        <MiniCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}