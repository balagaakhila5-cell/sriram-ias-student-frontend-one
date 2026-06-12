"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DpqTopPerformersSkeleton from "@/components/current-affairs/DpqTopPerformersSkeleton";
import DpqTestLeaderboardTable from "@/components/current-affairs/DpqTestLeaderboardTable";
import { DpqTopPerformersHeading } from "@/components/current-affairs/DpqTopPerformersList";
import {
  buildTestResultsHref,
  fetchLatestTestLeaderboard,
  type DpqExamType,
  type DpqLatestTestLeaderboard,
} from "@/features/currentAffairs/data/dpqTestResultsMock";

type DpqTopPerformersProps = {
  examType: DpqExamType;
};

export default function DpqTopPerformers({ examType }: DpqTopPerformersProps) {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<DpqLatestTestLeaderboard | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchLatestTestLeaderboard(examType)
      .then((data) => {
        if (active) setLeaderboard(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [examType]);

  return (
    <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
      <DpqTopPerformersHeading />

      {loading ? (
        <DpqTopPerformersSkeleton />
      ) : (
        <>
          {leaderboard?.testName ? (
            <p className="mb-4 text-center text-[15px] font-semibold text-[#4D5660]">
              Latest Test: {leaderboard.testName}
            </p>
          ) : null}

          <DpqTestLeaderboardTable
            entries={leaderboard?.entries ?? []}
            variant="compact"
          />
        </>
      )}

      <div className="mt-6 text-center">
        <Link
          href={buildTestResultsHref(examType)}
          className="text-[14px] font-bold text-[#4D90D2] hover:underline"
        >
          View All Results
        </Link>
      </div>
    </div>
  );
}
