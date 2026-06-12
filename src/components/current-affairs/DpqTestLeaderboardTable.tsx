"use client";

import type { DpqTestLeaderboardEntry } from "@/features/currentAffairs/data/dpqTestResultsMock";

type DpqTestLeaderboardTableProps = {
  entries: DpqTestLeaderboardEntry[];
  variant?: "compact" | "full";
};

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-[linear-gradient(135deg,#3E9CDB_0%,#D57E89_100%)] text-[14px] font-bold text-white"
      aria-hidden
    >
      {initial}
    </div>
  );
}

export function DpqLeaderboardEmptyState({
  message = "No Results Available",
  description = "No leaderboard data is available for this test yet.",
}: {
  message?: string;
  description?: string;
}) {
  return (
    <div className="rounded-[18px] border border-dashed border-[#D7E2F2] bg-[#F8FBFF] px-5 py-10 text-center">
      <p className="text-[16px] font-semibold text-[#4D5660]">{message}</p>
      <p className="mt-2 text-[14px] font-medium text-[#7A858E]">{description}</p>
    </div>
  );
}

export default function DpqTestLeaderboardTable({
  entries,
  variant = "full",
}: DpqTestLeaderboardTableProps) {
  if (entries.length === 0) {
    return <DpqLeaderboardEmptyState />;
  }

  if (variant === "compact") {
    return (
      <>
        <div className="mb-4 flex items-center justify-between rounded-xl bg-[#EEF2FF] px-4 py-3 text-[16px] font-medium text-[#111111]">
          <span className="w-12 shrink-0">Rank</span>
          <span className="min-w-0 flex-1 text-center">Student</span>
          <span className="w-16 shrink-0 text-right">Points</span>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={`${entry.rank}-${entry.studentName}`}
              className="flex items-center justify-between rounded-xl border border-gray-50 bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="w-12 shrink-0 text-[18px] font-bold text-[#111111]">
                {entry.rank}.
              </div>

              <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
                <Avatar name={entry.studentName} />
                <span className="truncate text-[16px] font-semibold text-[#111111]">
                  {entry.studentName}
                </span>
              </div>

              <div className="w-16 shrink-0 text-right text-[16px] font-bold text-[#111111]">
                {entry.score}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-4 hidden items-center gap-3 rounded-xl bg-[#EEF2FF] px-4 py-3 text-[15px] font-medium text-[#111111] md:grid md:grid-cols-[72px_minmax(0,1.4fr)_88px_88px_120px]">
        <span>Rank</span>
        <span>Student Name</span>
        <span className="text-right">Score</span>
        <span className="text-right">%</span>
        <span className="text-right">Attempt Date</span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={`${entry.rank}-${entry.studentName}`}
            className="rounded-xl border border-gray-50 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.01] md:grid md:grid-cols-[72px_minmax(0,1.4fr)_88px_88px_120px] md:items-center md:gap-3"
          >
            <div className="text-[18px] font-bold text-[#111111]">
              {entry.rank}.
            </div>

            <div className="mt-3 flex min-w-0 items-center gap-3 md:mt-0">
              <Avatar name={entry.studentName} />
              <span className="truncate text-[16px] font-semibold text-[#111111]">
                {entry.studentName}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-[15px] font-semibold text-[#4D5660] md:mt-0 md:justify-end md:text-[#111111]">
              <span className="md:hidden">Score</span>
              <span>{entry.score}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[15px] font-semibold text-[#4D5660] md:mt-0 md:justify-end md:text-[#111111]">
              <span className="md:hidden">Percentage</span>
              <span>{entry.percentage}%</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[14px] font-medium text-[#7A858E] md:mt-0 md:justify-end">
              <span className="md:hidden">Attempt Date</span>
              <span>{entry.attemptDate}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
