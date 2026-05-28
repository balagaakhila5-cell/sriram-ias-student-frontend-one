"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import type { LiveSession } from "../data/liveClass";

interface NextClassCardProps {
  session: LiveSession;

  /** Read-only mode — hides the click-to-join interaction (used for parent portal). */
  viewOnly?: boolean;

  /** Bookmark support */
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

function formatHMS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");

  return `${hh} : ${mm} : ${ss}`;
}

export default function NextClassCard({
  session,
  viewOnly = false,
}: NextClassCardProps) {

  const [ended, setEnded] = useState(false);

  return (

    <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

      {/* HERO IMAGE */}
      <div className="relative h-[260px] w-full overflow-hidden rounded-t-[20px]">

        <Image
          src="/assets/student/course-card.png"
          alt="Course Card Hero"
          fill
          className="object-cover"
          priority
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10" />

        {/* CENTER BUTTON */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

          {ended ? (

            <Link
              href={`/student/session/${session.id}`}
              className="inline-flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,91,136,0.35)]"
              style={{
                width: 147,
                height: 48,
                borderRadius: 28.8,
                background:
                  "linear-gradient(90deg, rgba(0,159,238,0.8) 34.5%, #005B88 100%)",
              }}
            >
              Join Class
            </Link>

          ) : (

            <button
              type="button"
              onClick={viewOnly ? undefined : () => setEnded(true)}
              className="rounded-full bg-black/40 px-5 py-2 text-white"
            >
              Starts in {formatHMS(session.startsInSeconds)} Hrs
            </button>

          )}

        </div>

      </div>

      {/* CONTENT WITH DESIGN IMAGE */}
      <div
        className="relative overflow-hidden p-5 bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.02)), url('/assets/student/design-image1.png')",
          backgroundPosition: "right bottom",
          backgroundSize: "320px",
          backgroundBlendMode: "screen",
        }}
      >

        {/* WHITE OVERLAY */}
        <div className="absolute inset-0 bg-white/80" />

        {/* CONTENT */}
        <div className="relative z-10">

          {/* TOPIC */}
          <p className="text-[20px] text-[#000000] font-semibold">
            <span className="font-semibold text-[#000000]/50">
              Topic :
            </span>{" "}
            {session.topic}
          </p>

          {/* TIME */}
          <div className="mt-3 flex items-center gap-2 text-[16px] text-black/50 font-semibold">

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14.2 14.2L9 11V5H10.5V10.2L15 12.9L14.2 14.2Z"
                fill="black"
                fillOpacity={0.5}
              />
            </svg>

            <span className="text-black/80 leading-none">
              {session.timeLabel} | {session.dateLabel}
            </span>

          </div>

          {/* INSTRUCTOR + SUBJECT */}
          <div className="mt-3 flex items-center gap-x-6 gap-y-2 text-[16px] text-black/50 font-semibold overflow-hidden">

            <span className="flex items-center gap-2">

              <span className="text-black/80 leading-none">
                By {session.instructor}
              </span>

            </span>

            <span className="flex items-center gap-2 text-black/50 text-[16px] font-semibold whitespace-nowrap">

              <span className="text-black/80 leading-none">
                Subject : {session.subject}
              </span>

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}