"use client";

import { use, useState } from "react";
import { Bookmark, Play } from "lucide-react";
import GoBackButton from "@/features/studentPortal/components/GoBackButton";
import LectureTabs from "@/features/studentPortal/components/LectureTabs";
import NotesPanel from "@/features/studentPortal/components/NotesPanel";
import { lectures } from "@/features/studentPortal/data/lectures";

interface PageProps {
  params: Promise<{ courseId: string; recordingId: string }>;
}

export default function RecordingDetailPage({ params }: PageProps) {
  const { courseId } = use(params);
  const [activeLecture, setActiveLecture] = useState(lectures[0].id);
  const [bookmarked, setBookmarked] = useState(false);

  const lecture = lectures.find((l) => l.id === activeLecture) ?? lectures[0];

  return (
    <div className="space-y-6">
      <GoBackButton href={`/student/enrollments/${courseId}`} />

      <LectureTabs
        lectures={lectures}
        activeId={activeLecture}
        onChange={setActiveLecture}
      />

      <div
        className="relative h-[360px] w-full overflow-hidden rounded-[14px]"
        style={{
          background:
            "linear-gradient(135deg, #C8D2DA 0%, #B7C2CB 50%, #A4B0BA 100%)",
        }}
      >
        <button
          type="button"
          aria-label="Play"
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
        >
          <Play size={24} className="ml-1" />
        </button>

        <div className="absolute right-4 top-3 flex items-center gap-3 text-[12px] text-white/90">
          <span>{lecture.startedAt}</span>
        </div>
        <div className="absolute right-4 bottom-3 flex items-center gap-3 text-[12px] text-white/90">
          <span>{lecture.duration}</span>
          <span>1x</span>
        </div>

        <div className="absolute inset-x-4 bottom-9 h-1 rounded-full bg-white/30">
          <div
            className="h-1 rounded-full bg-[#1F7AB8]"
            style={{ width: "60%" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2
          className="text-[24px] font-bold text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {lecture.title}
        </h2>

        <button
          type="button"
          onClick={() => setBookmarked((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border border-[#E6EBEF] bg-white px-3 py-1.5 text-[18px] font-semibold text-[#00000099]"
        >
          <Bookmark
            size={20}
            className={bookmarked ? "fill-current text-[#1F7AB8]" : ""}
          />
          Bookmark
        </button>
      </div>

      <NotesPanel />
    </div>
  );
}
