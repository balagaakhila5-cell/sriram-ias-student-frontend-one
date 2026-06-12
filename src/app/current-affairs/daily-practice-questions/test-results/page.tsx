"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import HeaderLogoOnly from "@/components/common/HeaderLogoOnly";
import DpqTestResultCard from "@/components/current-affairs/DpqTestResultCard";
import DpqTestResultsSkeleton from "@/components/current-affairs/DpqTestResultsSkeleton";
import { DpqLeaderboardEmptyState } from "@/components/current-affairs/DpqTestLeaderboardTable";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import {
  fetchTestResultSummaries,
  parseDpqExamType,
  type DpqTestResultSummary,
} from "@/features/currentAffairs/data/dpqTestResultsMock";

export default function DpqTestResultsPage() {
  const searchParams = useSearchParams();
  const examType = parseDpqExamType(searchParams.get("examType"));
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<DpqTestResultSummary[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchTestResultSummaries(examType)
      .then((data) => {
        if (active) setSummaries(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [examType]);

  const categoryLabel = examType === "prelims" ? "Prelims" : "Mains";

  return (
    <>
      <HeaderLogoOnly />

      <main className="min-h-screen bg-[#F8F9FB]">
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[980px]">
            <Link
              href={`/current-affairs/daily-practice-questions?examType=${examType}`}
              className="mb-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#044062] transition hover:text-[#065A8C]"
            >
              <ArrowLeft size={18} />
              Back to Daily Practice Questions
            </Link>

            <div className="mb-8 text-center">
              <h1 className="text-[32px] font-black uppercase leading-none md:text-[42px]">
                <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Test Results</span>
              </h1>
              <p className="mt-4 text-[16px] font-medium text-[#666]">
                {categoryLabel} practice test results and leaderboards.
              </p>
            </div>

            <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] md:px-8 md:py-8">
              {loading ? (
                <DpqTestResultsSkeleton />
              ) : summaries.length === 0 ? (
                <DpqLeaderboardEmptyState message="No Results Available" />
              ) : (
                <div className="space-y-4">
                  {summaries.map((summary) => (
                    <DpqTestResultCard key={summary.id} summary={summary} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
