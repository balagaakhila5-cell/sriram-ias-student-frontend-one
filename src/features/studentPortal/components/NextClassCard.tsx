"use client";

import { useState } from "react";
import Link from "next/link";
import type { LiveSession } from "../data/liveClass";

interface NextClassCardProps {
  session: LiveSession;
  /** Read-only mode — hides the click-to-join interaction (used for parent portal). */
  viewOnly?: boolean;
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
      
      {/* Hero Image */}
      <div className="relative">
        <div
          className="h-[260px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/student/Course-card-hero.png')",
          }}
        />

        {/* Center Button — hidden entirely in viewOnly mode (parent portal) */}
        {!viewOnly && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {ended ? (
              <Link
                href={`/student/session/${session.id}`}
                className="inline-flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,91,136,0.35)] transition-transform hover:-translate-y-0.5"
                style={{
                  width: 147,
                  height: 48,
                  borderRadius: 28.8,
                  paddingTop: 8.1,
                  paddingBottom: 8.1,
                  paddingLeft: 21.6,
                  paddingRight: 21.6,
                  gap: 11.34,
                  background:
                    "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: "100%",
                }}
              >
                Join Class
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setEnded(true)}
                className="flex items-center gap-2 rounded-full bg-[#000000]/50 px-5 py-2 text-[15px] font-medium text-white shadow-lg backdrop-blur-sm transition-transform hover:-translate-y-0.5"
              >
                Starts in {formatHMS(session.startsInSeconds)} Hrs
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content Section with Background Design Image */}
<div
  className="relative overflow-hidden p-5 bg-no-repeat"
  style={{
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), url('/assets/student/design-image1.png')",
    backgroundPosition: "right bottom",
    backgroundSize: "320px",
    backgroundBlendMode: "screen",
  }}
>
        {/* White Overlay */}
        <div className="absolute inset-0 bg-white/85" />

        {/* Actual Content */}
        <div className="relative z-10">
          
          {/* Topic */}
          <p className="text-[20px] text-[#000000] font-semibold">
            <span className="font-semibold text-[#000000]/50">
              Topic :
            </span>{" "}
            {session.topic}
          </p>

          {/* Time */}
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

          {/* Instructor + Subject */}
          <div className="mt-3 flex items-center gap-x-6 gap-y-2 text-[16px] text-black/50 font-semibold overflow-hidden">
            
            {/* Instructor */}
            <span className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M18.5 15C19.0304 15 19.5391 14.7893 19.9142 14.4142C20.2893 14.0391 20.5 13.5304 20.5 13V2C20.5 1.46957 20.2893 0.960859 19.9142 0.585786C19.5391 0.210714 19.0304 0 18.5 0H7.96C8.31 0.61 8.5 1.3 8.5 2H18.5V13H9.5V15M13.5 5V7H7.5V20H5.5V14H3.5V20H1.5V12H0V7C0 6.46957 0.210714 5.96086 0.585786 5.58579C0.960859 5.21071 1.46957 5 2 5H13.5ZM6.5 2C6.5 2.53043 6.28929 3.03914 5.91421 3.41421C5.53914 3.78929 5.03043 4 4.5 4C3.96957 4 3.46086 3.78929 3.08579 3.41421C2.71071 3.03914 2.5 2.53043 2.5 2C2.5 1.46957 2.71071 0.960859 3.08579 0.585786C3.46086 0.210714 3.96957 0 4.5 0C5.03043 0.210714 5.53914 0.210714 5.91421 0.585786C6.28929 0.960859 6.5 1.46957 6.5 2Z"
                  fill="black"
                  fillOpacity={0.5}
                />
              </svg>

              <span className="text-black/80 leading-none">
                By {session.instructor}
              </span>
            </span>

            {/* Subject */}
            <span className="flex items-center gap-2 text-black/50 text-[16px] font-semibold whitespace-nowrap">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M1 14C0.71667 14 0.479337 13.904 0.288004 13.712C0.0966702 13.52 0.000670115 13.2827 3.44827e-06 13C-0.000663218 12.7173 0.0953369 12.48 0.288004 12.288C0.48067 12.096 0.718003 12 1 12H9C9.28334 12 9.521 12.096 9.713 12.288C9.905 12.48 10.0007 12.7173 10 13C9.99934 13.2827 9.90334 13.5203 9.712 13.713C9.52067 13.9057 9.28334 14.0013 9 14H1Z"
                  fill="black"
                  fillOpacity={0.5}
                />
              </svg>

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