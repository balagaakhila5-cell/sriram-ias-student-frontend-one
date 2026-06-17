"use client";

import { use, useState } from "react";
import DetailTabs, {
  type DetailTab,
} from "@/features/studentPortal/components/DetailTabs";
import GoBackButton from "@/features/studentPortal/components/GoBackButton";
import LiveClassSection from "@/features/studentPortal/components/LiveClassSection";
import SubSidebar from "@/features/studentPortal/components/SubSidebar";
import RecordingCard from "@/features/studentPortal/components/RecordingCard";
import TestCard from "@/features/studentPortal/components/TestCard";
import {
  recordingSubjects,
  recordings,
  type RecordingSubject,
} from "@/features/studentPortal/data/recordings";
import {
  testCategories,
  tests,
  type TestCategory,
} from "@/features/studentPortal/data/tests";

type CourseTab =
  | "live-class"
  | "recordings"
  | "tests"
  | "book-marks"
  | "batch-information";

const COURSE_TABS: DetailTab<CourseTab>[] = [
  { id: "live-class", label: "Live Class" },
  { id: "recordings", label: "Recordings" },
  { id: "tests", label: "Tests" },
  { id: "book-marks", label: "Book Marks" },
  { id: "batch-information", label: "Batch Information" },
];

type BookmarkFilter = "All Bookmarks" | "Recording Bookmarks" | "Test Bookmarks";
const BOOKMARK_FILTERS: readonly BookmarkFilter[] = [
  "All Bookmarks",
  "Recording Bookmarks",
  "Test Bookmarks",
];

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { courseId } = use(params);
  const [tab, setTab] = useState<CourseTab>("live-class");

  return (
    <div className="space-y-4">
      <GoBackButton href="/student/enrollments" />

      <DetailTabs tabs={COURSE_TABS} active={tab} onChange={setTab} />

      <div className="pt-2">
        {tab === "live-class" && <LiveClassSection />}
        {tab === "recordings" && <RecordingsTab courseId={courseId} />}
        {tab === "tests" && <TestsTab />}
        {tab === "book-marks" && <BookmarksTab courseId={courseId} />}
        {tab === "batch-information" && <BatchInformationTab />}
      </div>
    </div>
  );
}

function RecordingsTab({ courseId }: { courseId: string }) {
  const [subject, setSubject] = useState<RecordingSubject>("Geography");
  const list = recordings.filter((r) => r.subject === subject);

  return (
    <div className="flex gap-8">
      <SubSidebar
        items={recordingSubjects}
        active={subject}
        onChange={setSubject}
      />

      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2">
        {list.map((r) => (
          <RecordingCard
            key={r.id}
            recording={r}
            viewClassHref={`/student/enrollments/${courseId}/recordings/${r.id}`}
          />
        ))}
      </div>
    </div>
  );
}

function TestsTab() {
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

function BookmarksTab({ courseId }: { courseId: string }) {
  const [filter, setFilter] = useState<BookmarkFilter>("All Bookmarks");

  const bookmarkedRecordings = recordings.filter((r) => r.bookmarked);
  const bookmarkedTests = tests.filter((t) => t.bookmarked);

  const showRecordings =
    filter === "All Bookmarks" || filter === "Recording Bookmarks";
  const showTests =
    filter === "All Bookmarks" || filter === "Test Bookmarks";

  return (
    <div className="flex gap-8">
      <SubSidebar
        items={BOOKMARK_FILTERS}
        active={filter}
        onChange={setFilter}
      />

      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2">
        {showRecordings &&
          bookmarkedRecordings.map((r) => (
            <RecordingCard
              key={r.id}
              recording={r}
              viewClassHref={`/student/enrollments/${courseId}/recordings/${r.id}`}
            />
          ))}
        {showTests &&
          bookmarkedTests.map((t) => <TestCard key={t.id} test={t} />)}
      </div>
    </div>
  );
}

function BatchInformationTab() {
  return (
    <div className="flex h-[280px] items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <p className="text-[14px] text-[#7A858E]">
        Batch information will be available here.
      </p>
    </div>
  );
}
