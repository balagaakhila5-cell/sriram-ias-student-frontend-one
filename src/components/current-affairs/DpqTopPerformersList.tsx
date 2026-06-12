"use client";

import type { DpqLeaderboardRow } from "@/features/resources/utils/dpqLeaderboard";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";

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

type DpqTopPerformersListProps = {
  rows: DpqLeaderboardRow[];
  variant?: "compact" | "full";
  showExamColumn?: boolean;
};

export default function DpqTopPerformersList({
  rows,
  variant = "compact",
  showExamColumn = false,
}: DpqTopPerformersListProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#D7E2F2] bg-[#F8FBFF] px-5 py-10 text-center">
        <p className="text-[16px] font-semibold text-[#4D5660]">
          No results are present.
        </p>
        <p className="mt-2 text-[14px] font-medium text-[#7A858E]">
          Attempt a practice test to appear on the leaderboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`mb-4 flex items-center justify-between rounded-xl bg-[#EEF2FF] px-4 py-3 text-[16px] font-medium text-[#111111] ${
          showExamColumn ? "gap-3" : ""
        }`}
      >
        <span className="w-12 shrink-0">Rank</span>
        <span className="min-w-0 flex-1 text-center">Student</span>
        {showExamColumn ? (
          <span className="hidden min-w-0 flex-[1.4] text-center md:block">
            Exam
          </span>
        ) : null}
        <span className="w-16 shrink-0 text-right">Points</span>
      </div>

      <div className="space-y-3">
        {rows.map((student) => (
          <div
            key={`${student.studentId}-${student.testSlug}`}
            className={`flex items-center justify-between rounded-xl border border-gray-50 bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
              showExamColumn ? "gap-3" : ""
            } ${variant === "full" ? "transition-transform hover:scale-[1.01]" : ""}`}
          >
            <div className="w-12 shrink-0 text-[18px] font-bold text-[#111111]">
              {student.rank}.
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-center gap-3">
              <Avatar name={student.displayName} />
              <span className="truncate text-[16px] font-semibold text-[#111111]">
                {student.displayName}
              </span>
            </div>

            {showExamColumn ? (
              <div className="hidden min-w-0 flex-[1.4] text-center md:block">
                <p className="truncate text-[14px] font-semibold text-[#4D5660]">
                  {student.testTitle}
                </p>
                <p className="mt-1 text-[13px] font-medium text-[#7A858E]">
                  {student.correctCount}/{student.totalQuestions} correct (
                  {student.percentage}%)
                </p>
              </div>
            ) : null}

            <div className="w-16 shrink-0 text-right text-[16px] font-bold text-[#111111]">
              {student.points}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function DpqTopPerformersHeading() {
  return (
    <h2 className="mb-6 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
      <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Top Performers</span>
    </h2>
  );
}
