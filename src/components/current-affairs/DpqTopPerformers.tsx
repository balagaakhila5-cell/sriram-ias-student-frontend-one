"use client";

import Link from "next/link";
import { RESOURCE_PAGE_HEADING_GRADIENT } from "@/features/resources/components/cardStyles";

const STUDENTS = [
  { name: "Darshan", points: 1200, rank: 1 },
  { name: "Darshan", points: 1100, rank: 2 },
  { name: "Darshan", points: 1000, rank: 3 },
  { name: "You", points: 900, rank: 10 },
] as const;

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-[linear-gradient(135deg,#3E9CDB_0%,#D57E89_100%)] text-[14px] font-bold text-white"
      aria-hidden
    >
      {initial}
    </div>
  );
}

export default function DpqTopPerformers() {
  return (
    <div className="overflow-hidden rounded-[22px] bg-white px-5 py-6 shadow-[0px_10px_30px_rgba(0,0,0,0.05)]">
      <h2 className="mb-6 text-center text-[30px] font-extrabold leading-none md:text-[34px]">
        <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Top Performers</span>
      </h2>

      <div className="mb-4 flex items-center justify-between rounded-xl bg-[#EEF2FF] px-4 py-3 text-[16px] font-medium text-[#111111]">
        <span className="w-12">Rank</span>
        <span className="flex-1 text-center">Student</span>
        <span className="w-16 text-right">Points</span>
      </div>

      <div className="space-y-3">
        {STUDENTS.map((student) => (
          <div
            key={student.rank}
            className="flex items-center justify-between rounded-xl border border-gray-50 bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            <div className="w-12 text-[18px] font-bold text-[#111111]">
              {student.rank}.
            </div>
            <div className="flex flex-1 items-center justify-center gap-3">
              <Avatar name={student.name} />
              <span className="text-[16px] font-semibold text-[#111111]">
                {student.name}
              </span>
            </div>
            <div className="w-16 text-right text-[16px] font-bold text-[#111111]">
              {student.points}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/performance"
          className="text-[14px] font-bold text-[#4D90D2] hover:underline"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
