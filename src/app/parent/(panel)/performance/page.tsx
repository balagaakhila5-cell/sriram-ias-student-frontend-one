"use client";

import { useState } from "react";
import DetailTabs, {
  type DetailTab,
} from "@/features/studentPortal/components/DetailTabs";
import TestCard from "@/features/studentPortal/components/TestCard";
import {
  mainsResults,
  mentorReviews,
  prelimsResults,
} from "@/features/parentPortal/data/testResults";
import {
  PERFORMANCE_TAB_TO_VIEW,
  type PerformanceListTab,
} from "@/features/parentPortal/performance/types";

type PerformanceTab = PerformanceListTab;

const PERFORMANCE_TABS: DetailTab<PerformanceTab>[] = [
  { id: "test-series-prelims", label: "Test Series - Prelims" },
  { id: "answer-writing-mains", label: "Answer Writing - Mains" },
  { id: "mentors-review", label: "Mentor's Review" },
];

export default function PerformanceAnalyticsPage() {
  const [tab, setTab] = useState<PerformanceTab>("test-series-prelims");

  const list =
    tab === "test-series-prelims"
      ? prelimsResults
      : tab === "answer-writing-mains"
        ? mainsResults
        : mentorReviews;

  return (
    <div className="space-y-6">
      <DetailTabs tabs={PERFORMANCE_TABS} active={tab} onChange={setTab} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {list.map((t) => (
          <TestCard
            key={t.id}
            test={t}
            actionLabel="View Results"
            attemptHref={`/parent/performance/${t.id}?view=${PERFORMANCE_TAB_TO_VIEW[tab]}`}
          />
        ))}
      </div>
    </div>
  );
}
