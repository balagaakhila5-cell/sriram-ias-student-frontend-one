"use client";

import Link from "@/shims/next/link";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HeaderLogoOnly from "@/components/common/HeaderLogoOnly";
import DpqTestLeaderboardTable from "@/components/current-affairs/DpqTestLeaderboardTable";
import DpqTopPerformersSkeleton from "@/components/current-affairs/DpqTopPerformersSkeleton";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import {
  buildTestResultsHref,
  fetchTestLeaderboard,
  parseDpqExamType,
  type DpqTestLeaderboardEntry,
  type DpqTestResultSummary,
} from "@/features/currentAffairs/data/dpqTestResultsMock";

type PageProps = {
  params: Promise<{ testId: string }>;
};

export default function DpqTestLeaderboardPage({ params }: PageProps) {
  const resolved = use(params);
  const testId = resolved.testId;
  const [searchParams] = useSearchParams();
  const examType = parseDpqExamType(searchParams.get("examType"));
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DpqTestResultSummary | null>(null);
  const [entries, setEntries] = useState<DpqTestLeaderboardEntry[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchTestLeaderboard(testId, examType)
      .then((data) => {
        if (!active) return;
        setSummary(data.summary);
        setEntries(data.entries);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [testId, examType]);

  return (
    <>
      <HeaderLogoOnly />

      <main className="min-h-screen bg-[#F8F9FB]">
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[980px]">
            <Link
              href={buildTestResultsHref(examType)}
              className="mb-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#044062] transition hover:text-[#065A8C]"
            >
              <ArrowLeft size={18} />
              Back to Test Results
            </Link>

            <div className="mb-8 text-center">
              <h1 className="text-[32px] font-black uppercase leading-none md:text-[42px]">
                <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                  {summary?.testName ?? "Test Leaderboard"}
                </span>
              </h1>
              {summary ? (
                <p className="mt-4 text-[16px] font-medium text-[#666]">
                  Test Date: {summary.testDate} · {summary.totalAttempts} attempts
                </p>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] md:px-8 md:py-8">
              {loading ? (
                <DpqTopPerformersSkeleton />
              ) : (
                <DpqTestLeaderboardTable entries={entries} variant="full" />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
