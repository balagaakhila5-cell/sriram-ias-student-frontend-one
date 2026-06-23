"use client";

import Link from "@/components/common/AppLink";
import type { DpqTestResultSummary } from "@/features/currentAffairs/data/dpqTestResultsMock";
import { buildTestLeaderboardHref } from "@/features/currentAffairs/data/dpqTestResultsMock";

type DpqTestResultCardProps = {
  summary: DpqTestResultSummary;
};

export default function DpqTestResultCard({ summary }: DpqTestResultCardProps) {
  return (
    <article className="rounded-[18px] border border-gray-50 bg-white p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <h2 className="text-[18px] font-bold text-[#111111] md:text-[20px]">
        {summary.testName}
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <dt className="text-[13px] font-semibold uppercase tracking-wide text-[#7A858E]">
            Test Date
          </dt>
          <dd className="mt-1 text-[15px] font-semibold text-[#111111]">
            {summary.testDate}
          </dd>
        </div>
        <div>
          <dt className="text-[13px] font-semibold uppercase tracking-wide text-[#7A858E]">
            Total Attempts
          </dt>
          <dd className="mt-1 text-[15px] font-semibold text-[#111111]">
            {summary.totalAttempts}
          </dd>
        </div>
        <div>
          <dt className="text-[13px] font-semibold uppercase tracking-wide text-[#7A858E]">
            Highest Score
          </dt>
          <dd className="mt-1 text-[15px] font-semibold text-[#111111]">
            {summary.highestScore}
          </dd>
        </div>
        <div>
          <dt className="text-[13px] font-semibold uppercase tracking-wide text-[#7A858E]">
            Average Score
          </dt>
          <dd className="mt-1 text-[15px] font-semibold text-[#111111]">
            {summary.averageScore}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <Link
          href={buildTestLeaderboardHref(summary.id, summary.examType)}
          className="inline-flex h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-[#42B8F6] to-[#044F74] px-6 text-[14px] font-bold text-white shadow-sm transition hover:opacity-90"
        >
          View Leaderboard
        </Link>
      </div>
    </article>
  );
}
