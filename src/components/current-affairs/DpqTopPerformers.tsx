"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DpqTopPerformersList, {
  DpqTopPerformersHeading,
} from "@/components/current-affairs/DpqTopPerformersList";
import {
  DPQ_LEADERBOARD_UPDATED_EVENT,
  getDpqLeaderboardRows,
  type DpqLeaderboardRow,
} from "@/features/resources/utils/dpqLeaderboard";

const TOP_PERFORMERS_PAGE =
  "/current-affairs/daily-practice-questions/top-performers";

export default function DpqTopPerformers() {
  const [rows, setRows] = useState<DpqLeaderboardRow[]>([]);

  const loadRows = () => {
    setRows(getDpqLeaderboardRows(4));
  };

  useEffect(() => {
    loadRows();

    const sync = () => loadRows();
    window.addEventListener(DPQ_LEADERBOARD_UPDATED_EVENT, sync);
    return () => window.removeEventListener(DPQ_LEADERBOARD_UPDATED_EVENT, sync);
  }, []);

  return (
    <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
      <DpqTopPerformersHeading />
      <DpqTopPerformersList rows={rows} />

      <div className="mt-6 text-center">
        <Link
          href={TOP_PERFORMERS_PAGE}
          className="text-[14px] font-bold text-[#4D90D2] hover:underline"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
