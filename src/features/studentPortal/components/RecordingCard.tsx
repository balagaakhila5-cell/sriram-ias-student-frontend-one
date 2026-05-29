"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Recording } from "../data/recordings";
import Image from "next/image";

interface RecordingCardProps {
  recording: Recording;
  viewClassHref: string;
}

export default function RecordingCard({
  recording,
  viewClassHref,
}: RecordingCardProps) {
  return (
    <article className="relative flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#F2F8FC] hover:shadow-[0_8px_24px_rgba(31,122,184,0.12)]">

      {/* Image Section */}
      <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full text-white shadow-[0_6px_18px_rgba(31,122,184,0.35)]">
        <Image
          src={"/assets/student/Recording.png"}
          alt="rec"
          width={78}
          height={78}
          className="rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h4
          className="text-[15px] font-semibold leading-snug text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {recording.title}
        </h4>

        <Link
          href={viewClassHref}
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#A8CEE6] bg-white px-3 py-1.5 text-[13px] font-extrabold text-[#009FEECC]"
        >
          View Class
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}