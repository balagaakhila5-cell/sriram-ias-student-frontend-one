"use client";

import { useEffect, useState } from "react";

/** UPSC CSE Prelims 2026 — GS Paper I (9:30 AM IST, May 24, 2026) */
export const UPSC_PRELIMS_2026_TARGET = new Date("2026-05-24T09:30:00+05:30");

/** UPSC CSE Mains 2026 — first day (9:00 AM IST, Aug 21, 2026) */
export const UPSC_MAINS_2026_TARGET = new Date("2026-08-21T09:00:00+05:30");

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  activeTarget: "prelims" | "mains" | "complete";
};

/** Next UPSC 2026 milestone — Prelims first, then Mains (keeps sidebar ticking after Prelims day). */
export function getNextUpcomingTarget(now: Date = new Date()): Date {
  if (now.getTime() < UPSC_PRELIMS_2026_TARGET.getTime()) {
    return UPSC_PRELIMS_2026_TARGET;
  }
  if (now.getTime() < UPSC_MAINS_2026_TARGET.getTime()) {
    return UPSC_MAINS_2026_TARGET;
  }
  return UPSC_MAINS_2026_TARGET;
}

export function getActiveTargetPhase(
  target: Date,
): CountdownParts["activeTarget"] {
  if (target.getTime() === UPSC_PRELIMS_2026_TARGET.getTime()) {
    return "prelims";
  }
  if (target.getTime() === UPSC_MAINS_2026_TARGET.getTime()) {
    const now = new Date();
    if (now.getTime() >= UPSC_MAINS_2026_TARGET.getTime()) {
      return "complete";
    }
    return "mains";
  }
  return "complete";
}

export function getCountdownParts(
  target: Date,
  now: Date = new Date(),
): CountdownParts {
  const diff = target.getTime() - now.getTime();
  const phase = getActiveTargetPhase(target);

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: phase === "complete",
      activeTarget: phase,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: false,
    activeTarget: phase,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const UNITS: {
  key: keyof Pick<CountdownParts, "days" | "hours" | "minutes" | "seconds">;
  label: string;
}[] = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MINUTES" },
  { key: "seconds", label: "SECONDS" },
];

interface UpsPrelims2026CountdownProps {
  className?: string;
}

/** Sidebar countdown — live tick; matches PYQ / NCERT Figma block */
export default function UpsPrelims2026Countdown({
  className = "",
}: UpsPrelims2026CountdownProps) {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => {
      const target = getNextUpcomingTarget();
      setParts(getCountdownParts(target));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = parts ?? getCountdownParts(getNextUpcomingTarget());

  return (
    <div
      className={`rounded-[22px] bg-[#E2EDFE] px-4 py-7 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] ${className}`}
    >
      <h3 className="text-center text-[18px] font-extrabold leading-[1.35] md:text-[19px]">
        <span className="text-[#3A91D1]">UPSC Prelims 2026 </span>
        <span className="text-[#D47D86]">Examination</span>
      </h3>
      <p className="mt-1 text-center text-[17px] font-bold text-[#7E82A8] md:text-[19px]">
        Countdown
      </p>

      <div className="mt-5 flex justify-center gap-2 sm:gap-2.5">
        {UNITS.map(({ key, label }) => (
          <div
            key={label}
            className="flex h-[72px] w-[68px] flex-col items-center justify-center rounded-[10px] bg-[#0B1628] shadow-lg sm:h-[78px] sm:w-[72px]"
          >
            <div className="text-[20px] font-extrabold leading-none text-white sm:text-[22px]">
              {key === "days" ? display.days : pad(display[key])}
            </div>
            <span className="mt-2 text-[9px] font-extrabold uppercase tracking-wide text-[#A5DEFF] sm:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>

      {display.activeTarget === "mains" && !display.isComplete && (
        <p className="mt-4 text-center text-[13px] font-semibold text-[#5A6B8C]">
          Prelims complete — counting down to Mains 2026
        </p>
      )}

      {display.isComplete && (
        <p className="mt-4 text-center text-[13px] font-semibold text-[#5A6B8C]">
          UPSC 2026 examination cycle has concluded.
        </p>
      )}

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="rounded-full bg-[linear-gradient(90deg,#1699E0_0%,#032B3F_100%)] px-6 py-3 text-[14px] font-bold text-white shadow-md transition-transform hover:scale-[1.03]"
        >
          View Complete Schedule
        </button>
      </div>
    </div>
  );
}
