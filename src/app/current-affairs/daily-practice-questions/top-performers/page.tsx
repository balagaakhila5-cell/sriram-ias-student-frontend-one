"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import HeaderLogoOnly from "@/components/common/HeaderLogoOnly";
import DpqTopPerformersList, {
  DpqTopPerformersHeading,
} from "@/components/current-affairs/DpqTopPerformersList";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";
import {
  DPQ_LEADERBOARD_UPDATED_EVENT,
  getDpqLeaderboardRows,
  type DpqLeaderboardRow,
} from "@/features/resources/utils/dpqLeaderboard";

export default function DpqTopPerformersPage() {
  const [rows, setRows] = useState<DpqLeaderboardRow[]>([]);

  const loadRows = () => {
    setRows(getDpqLeaderboardRows());
  };

  useEffect(() => {
    loadRows();

    const sync = () => loadRows();
    window.addEventListener(DPQ_LEADERBOARD_UPDATED_EVENT, sync);
    return () => window.removeEventListener(DPQ_LEADERBOARD_UPDATED_EVENT, sync);
  }, []);

  return (
    <>
      <HeaderLogoOnly />

      <main className="min-h-screen bg-[#F8F9FB]">
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[980px]">
            <Link
              href="/current-affairs/daily-practice-questions"
              className="mb-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#044062] transition hover:text-[#065A8C]"
            >
              <ArrowLeft size={18} />
              Back to Daily Practice Questions
            </Link>

            <div className="mb-8 text-center">
              <h1 className="text-[32px] font-black uppercase leading-none md:text-[42px]">
                <span className={RESOURCE_PAGE_HEADING_GRADIENT}>
                  Exam Results
                </span>
              </h1>
              <p className="mt-4 text-[16px] font-medium text-[#666]">
                Students who attempted daily practice tests and their scores.
              </p>
            </div>

            <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] md:px-8 md:py-8">
              <DpqTopPerformersHeading />
              <DpqTopPerformersList rows={rows} variant="full" showExamColumn />

              {rows.length === 0 ? (
                <div className="mt-6 text-center">
                  <Link
                    href="/current-affairs/daily-practice-questions"
                    className="inline-flex h-[46px] items-center justify-center rounded-full bg-gradient-to-r from-[#42B8F6] to-[#044F74] px-8 text-[15px] font-bold text-white shadow-sm transition hover:opacity-90"
                  >
                    Attempt a Practice Test
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
