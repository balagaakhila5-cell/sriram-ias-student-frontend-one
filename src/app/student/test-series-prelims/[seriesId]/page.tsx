"use client";

import { use, useState } from "react";
import DetailTabs, {
  type DetailTab,
} from "@/features/studentPortal/components/DetailTabs";
import FilterBar from "@/features/studentPortal/components/FilterBar";
import GoBackButton from "@/features/studentPortal/components/GoBackButton";
import InfoSeriesCard from "@/features/studentPortal/components/InfoSeriesCard";
import SubSidebar from "@/features/studentPortal/components/SubSidebar";
import TestCard from "@/features/studentPortal/components/TestCard";
import TestScheduleCard from "@/features/studentPortal/components/TestScheduleCard";
import { getTestSeries } from "@/features/studentPortal/data/testSeries";
import {
  recordingSubjects,
  type RecordingSubject,
} from "@/features/studentPortal/data/recordings";
import {
  scheduledTests,
} from "@/features/studentPortal/data/testSchedule";
import {
  testCategories,
  tests,
  type TestCategory,
} from "@/features/studentPortal/data/tests";

type SeriesTab =
  | "test-schedule"
  | "test-files"
  | "discussions"
  | "book-marks"
  | "information";

const SERIES_TABS: DetailTab<SeriesTab>[] = [
  { id: "test-schedule", label: "Test Schedule" },
  { id: "test-files", label: "Test Files" },
  { id: "discussions", label: "Discussions" },
  { id: "book-marks", label: "Book Marks" },
  { id: "information", label: "Information" },
];

interface PageProps {
  params: Promise<{ seriesId: string }>;
}

export default function TestSeriesDetailPage({ params }: PageProps) {
  const { seriesId } = use(params);
  const [tab, setTab] = useState<SeriesTab>("test-schedule");
  const series = getTestSeries(seriesId);

  return (
    <div className="space-y-6">
      <GoBackButton href="/student/test-series-prelims" />

      <DetailTabs tabs={SERIES_TABS} active={tab} onChange={setTab} />

      <div className="pt-2">
        {tab === "test-schedule" && <TestScheduleTab />}
        {tab === "test-files" && <TestFilesTab />}
        {tab === "discussions" && (
          <PlaceholderPanel text="Discussion threads will appear here." />
        )}
        {tab === "book-marks" && <BookmarksTab />}
        {tab === "information" && series && (
          <div className="max-w-[640px]">
            <InfoSeriesCard
              title="Test Series Name"
              validUpto="April 22 , 2020"
              batch="Batch Name"
              progressPercent={series.progressPercent}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TestScheduleTab() {
  const [subject, setSubject] = useState<RecordingSubject>("Geography");
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("April");
  const [date, setDate] = useState("Date");

  const list = scheduledTests.filter((s) => s.subject === subject);

  return (
    <div className="flex gap-8">
      <SubSidebar
        items={recordingSubjects}
        active={subject}
        onChange={setSubject}
      />

      <div className="flex-1 space-y-6">
        <FilterBar
          className="justify-center"
          filters={[
            { id: "year", value: year, onChange: setYear, options: ["2025", "2026", "2027"] },
            { id: "month", value: month, onChange: setMonth, options: ["January", "February", "March", "April", "May", "June"] },
            { id: "date", value: date, onChange: setDate, options: ["Date", "01", "02", "03", "04", "05"] },
          ]}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {list.map((s) => (
            <TestScheduleCard
              key={s.id}
              title={s.title}
              dateLabel={s.dateLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TestFilesTab() {
  const [category, setCategory] = useState<TestCategory>("Weekly Test");
  const list = tests.filter((t) => t.category === category);

  return (
    <div className="flex gap-8">
      <SubSidebar
        items={testCategories}
        active={category}
        onChange={setCategory}
      />

      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2">
        {list.map((t) => (
          <TestCard key={t.id} test={t} />
        ))}
      </div>
    </div>
  );
}

function BookmarksTab() {
  const bookmarked = tests.filter((t) => t.bookmarked);
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {bookmarked.map((t) => (
        <TestCard key={t.id} test={t} />
      ))}
    </div>
  );
}

function PlaceholderPanel({ text }: { text: string }) {
  return (
    <div className="flex h-[280px] items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <p className="text-[14px] text-[#7A858E]">{text}</p>
    </div>
  );
}
