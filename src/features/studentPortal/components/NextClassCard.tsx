"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, ListChecks } from "lucide-react";
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
      <div className="relative">
        <div
          className="h-[260px] w-full"
          style={{
            background:
              "linear-gradient(135deg, #F4F4F4 0%, #E2EEF5 60%, #CDE7F1 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute right-0 bottom-0 h-[120px] w-[180px] opacity-90"
          style={{
            background:
              "linear-gradient(135deg, rgba(24,151,216,0.0) 0%, rgba(24,151,216,0.35) 60%, rgba(10,115,183,0.55) 100%)",
            clipPath:
              "polygon(100% 0, 100% 100%, 0 100%, 35% 60%, 65% 30%, 80% 10%)",
          }}
        />

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
              onClick={viewOnly ? undefined : () => setEnded(true)}
              className={`flex items-center gap-2 rounded-full bg-[#000000]/50 px-5 py-2 text-[15px] font-medium text-white shadow-lg backdrop-blur-sm ${
                viewOnly ? "cursor-default" : "transition-transform hover:-translate-y-0.5"
              }`}
            >
              Starts in {formatHMS(session.startsInSeconds)} Hrs
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        <p className="text-[20px] text-[#000000] font-semibold">
          <span className="font-semibold text-[#000000]/50">Topic :</span> {session.topic}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[16px] text-black/50 font-semibold">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14.2 14.2L9 11V5H10.5V10.2L15 12.9L14.2 14.2Z" fill="black" fillOpacity={0.5} />
          </svg>
          <span className="text-black/80 leading-none">
            {session.timeLabel} | {session.dateLabel}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-x-6 gap-y-2 text-[16px] text-black/50 font-semibold overflow-hidden">
          <span className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M18.5 15C19.0304 15 19.5391 14.7893 19.9142 14.4142C20.2893 14.0391 20.5 13.5304 20.5 13V2C20.5 1.46957 20.2893 0.960859 19.9142 0.585786C19.5391 0.210714 19.0304 0 18.5 0H7.96C8.31 0.61 8.5 1.3 8.5 2H18.5V13H9.5V15M13.5 5V7H7.5V20H5.5V14H3.5V20H1.5V12H0V7C0 6.46957 0.210714 5.96086 0.585786 5.58579C0.960859 5.21071 1.46957 5 2 5H13.5ZM6.5 2C6.5 2.53043 6.28929 3.03914 5.91421 3.41421C5.53914 3.78929 5.03043 4 4.5 4C3.96957 4 3.46086 3.78929 3.08579 3.41421C2.71071 3.03914 2.5 2.53043 2.5 2C2.5 1.46957 2.71071 0.960859 3.08579 0.585786C3.46086 0.210714 3.96957 0 4.5 0C5.03043 0 5.53914 0.210714 5.91421 0.585786C6.28929 0.960859 6.5 1.46957 6.5 2Z" fill="black" fillOpacity={0.5} />
            </svg>
            <span className="text-black/80 leading-none">By {session.instructor}</span>
          </span>

          <span className="flex items-center gap-2 text-black/50 text-[16px] font-semibold whitespace-nowrap">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M1 14C0.71667 14 0.479337 13.904 0.288004 13.712C0.0966702 13.52 0.000670115 13.2827 3.44827e-06 13C-0.000663218 12.7173 0.0953369 12.48 0.288004 12.288C0.48067 12.096 0.718003 12 1 12H9C9.28334 12 9.521 12.096 9.713 12.288C9.905 12.48 10.0007 12.7173 10 13C9.99934 13.2827 9.90334 13.5203 9.712 13.713C9.52067 13.9057 9.28334 14.0013 9 14H1ZM1 10C0.71667 10 0.479337 9.904 0.288004 9.712C0.0966702 9.52 0.000670115 9.28267 3.44827e-06 9C-0.000663218 8.71733 0.0953369 8.48 0.288004 8.288C0.48067 8.096 0.718003 8 1 8H15C15.2833 8 15.521 8.096 15.713 8.288C15.905 8.48 16.0007 8.71733 16 9C15.9993 9.28267 15.9033 9.52033 15.712 9.713C15.5207 9.90567 15.2833 10.0013 15 10H1ZM1 6C0.71667 6 0.479337 5.904 0.288004 5.712C0.0966702 5.52 0.000670115 5.28267 3.44827e-06 5C-0.000663218 4.71733 0.0953369 4.48 0.288004 4.288C0.48067 4.096 0.718003 4 1 4H15C15.2833 4 15.521 4.096 15.713 4.288C15.905 4.48 16.0007 4.71733 16 5C15.9993 5.28267 15.9033 5.52033 15.712 5.713C15.5207 5.90567 15.2833 6.00133 15 6H1ZM1 2C0.71667 2 0.479337 1.904 0.288004 1.712C0.0966702 1.52 0.000670115 1.28267 3.44827e-06 1C-0.000663218 0.717333 0.0953369 0.48 0.288004 0.288C0.48067 0.0960001 0.718003 0 1 0H15C15.2833 0 15.521 0.0960001 15.713 0.288C15.905 0.48 16.0007 0.717333 16 1C15.9993 1.28267 15.9033 1.52033 15.712 1.713C15.5207 1.90567 15.2833 2.00133 15 2H1Z" fill="black" fillOpacity={0.5} transform="translate(0, 3)" />
            </svg>
            <span className="text-black/80 leading-none">Subject : {session.subject}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
