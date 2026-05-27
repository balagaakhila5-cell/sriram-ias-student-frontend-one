"use client";

import { useState } from "react";
import MiniCalendar from "./MiniCalendar";
import NextClassCard from "./NextClassCard";
import UpcomingClassCard from "./UpcomingClassCard";
import EmptyLiveClass from "./EmptyLiveClass";
import SectionTitle from "./SectionTitle";
import { nextClass, upcomingSessions } from "../data/liveClass";

interface LiveClassSectionProps {
  /** Pass-through to NextClassCard — used by parent portal. */
  viewOnly?: boolean;
  /** Override the "UPCOMING CLASSES" section title. */
  upcomingTitle?: { first: string; second: string };
}

export default function LiveClassSection({
  viewOnly = false,
  upcomingTitle,
}: LiveClassSectionProps = {}) {
  const [hasSession, setHasSession] = useState(true);

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
      <div className="flex-1 min-w-0 space-y-10">
        <section>
          <SectionTitle first="NEXT" second="CLASS" />

          <div className="mt-5">
            {hasSession ? (
              <NextClassCard session={nextClass} viewOnly={viewOnly} />
            ) : (
              <div className="rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <EmptyLiveClass />
              </div>
            )}
          </div>
        </section>

        <section>
          <SectionTitle
            first={upcomingTitle?.first ?? "UPCOMING"}
            second={upcomingTitle?.second ?? "CLASSES"}
          />
          <div className="mt-5 space-y-3">
            {upcomingSessions.map((s) => (
              <UpcomingClassCard key={s.id} session={s} />
            ))}
          </div>
        </section>
      </div>

      <div className="lg:self-start">
        <MiniCalendar onSelect={() => setHasSession((v) => !v)} />
      </div>
    </div>
  );
}
