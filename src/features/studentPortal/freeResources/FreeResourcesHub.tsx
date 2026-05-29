"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/features/studentPortal/components/FilterBar";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import type { CurrentAffairsSubtopicId } from "@/features/currentAffairs/data/portalResources";
import ResourcesGridSkeleton from "./components/ResourcesGridSkeleton";
import {
  DEFAULT_SUBTOPIC_BY_TAB,
  FILTER_MONTHS,
  FILTER_YEARS,
  RESOURCE_TABS,
  getSubtopicsForTab,
} from "./config";
import type { FreeResourcesSubtopicId, StudentResourceTab, StudentSubtopicId } from "./types";

const CurrentAffairsResourceGrid = dynamic(
  () => import("./components/CurrentAffairsResourceGrid"),
  { loading: () => <ResourcesGridSkeleton /> },
);

const FreeResourcesSubtopicPanel = dynamic(
  () => import("./components/FreeResourcesSubtopicPanel"),
  { loading: () => <ResourcesGridSkeleton /> },
);

export default function FreeResourcesHub() {
  const [tab, setTab] = useState<StudentResourceTab>("current-affairs");
  const [year, setYear] = useState<string>(FILTER_YEARS[0]);
  const [month, setMonth] = useState<string>("April");
  const [subtopic, setSubtopic] = useState<StudentSubtopicId>(
    DEFAULT_SUBTOPIC_BY_TAB["current-affairs"],
  );

  const subtopicOptions = useMemo(() => getSubtopicsForTab(tab), [tab]);

  useEffect(() => {
    const isValid = subtopicOptions.some((option) => option.id === subtopic);
    if (!isValid) {
      setSubtopic(DEFAULT_SUBTOPIC_BY_TAB[tab]);
    }
  }, [tab, subtopic, subtopicOptions]);

  const handleTabChange = (nextTab: StudentResourceTab) => {
    setTab(nextTab);
    setSubtopic(DEFAULT_SUBTOPIC_BY_TAB[nextTab]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SubNavToggle
          options={RESOURCE_TABS}
          active={tab}
          onChange={handleTabChange}
        />
      </div>

      <div className="flex justify-center">
        <FilterBar
          filters={[
            {
              id: "year",
              value: year,
              onChange: setYear,
              options: [...FILTER_YEARS],
            },
            {
              id: "month",
              value: month,
              onChange: setMonth,
              options: [...FILTER_MONTHS],
            },
            {
              id: "subtopic",
              value:
                subtopicOptions.find((option) => option.id === subtopic)?.label ??
                subtopicOptions[0]?.label ??
                "",
              onChange: (label) => {
                const match = subtopicOptions.find(
                  (option) => option.label === label,
                );
                if (match) setSubtopic(match.id);
              },
              options: subtopicOptions.map((option) => option.label),
            },
          ]}
        />
      </div>

      {tab === "current-affairs" ? (
        <CurrentAffairsResourceGrid
          subtopic={subtopic as CurrentAffairsSubtopicId}
          year={year}
          month={month}
        />
      ) : (
        <FreeResourcesSubtopicPanel subtopic={subtopic as FreeResourcesSubtopicId} />
      )}
    </div>
  );
}
