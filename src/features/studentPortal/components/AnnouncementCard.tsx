"use client";

import { Pin } from "lucide-react";
import type { Announcement } from "../data/announcements";
import Image from "next/image";

interface AnnouncementCardProps {
  announcement: Announcement;
  pinned?: boolean;
  read?: boolean;
  onTogglePin?: () => void;
  onMarkAsRead?: () => void;
}

export default function AnnouncementCard({
  announcement,
  pinned = false,
  read = false,
  onTogglePin,
  onMarkAsRead,
}: AnnouncementCardProps) {

  return (
    <article className="notranslate flex items-stretch gap-5 rounded-[18px] bg-white shadow-[0_6px_22px_rgba(0,0,0,0.05)]" translate="no">
      <div
        className="flex h-[210px] w-[280px] shrink-0 items-center justify-center overflow-hidden rounded-[14px]"
      >
        <Image src={"/assets/student/announcement.png"} alt="announcement" width={280} height={200} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-4 px-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-[16px] text-[#00000080] font-semibold">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14.2 14.2L9 11V5H10.5V10.2L15 12.9L14.2 14.2Z" fill="black" fillOpacity={0.5} />
          </svg>
            {announcement.dateLabel}
          </div>

          <span
            className={`inline-flex items-center rounded-full px-4 py-1 text-[15px] font-medium text-white ${
              announcement.category === "Exam"
                ? "bg-[#97A9DA]"
                : "bg-[#7B6FCF]"
            }`}
          >
            {announcement.category}
          </span>
        </div>

        <h3 className="mt-3 text-[19px] font-semibold leading-snug text-[#000000]">
          {announcement.title}
        </h3>
        <p className="mt-1 text-[16px] text-[#00000099] font-medium">
          {announcement.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          {announcement.attachmentUrl ? (
            <a
              href={announcement.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-[10px] bg-[#F4F7FB] px-3 py-2 transition-colors hover:bg-[#E8EEF6]"
            >
              <PdfIcon />
              <span className="text-[14px] font-medium text-[#0000FF]">
                {announcement.attachmentName}
              </span>
            </a>
          ) : (
            <span />
          )}

          <div className="relative z-10 flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={onMarkAsRead}
              disabled={read}
              aria-disabled={read}
              className={`inline-flex items-center justify-center shadow-[0_6px_16px_rgba(0,91,136,0.25)] transition-transform ${
                read
                  ? "cursor-default bg-[#D7E5F0] text-[#5C6B7A]"
                  : "cursor-pointer text-white hover:-translate-y-0.5"
              }`}
              style={{
                height: 40,
                paddingLeft: 22,
                paddingRight: 22,
                borderRadius: 24,
                background: read
                  ? undefined
                  : "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "100%",
              }}
            >
              {read ? "Marked as read" : "Mark as read"}
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onTogglePin?.();
              }}
              onContextMenu={(event) => event.preventDefault()}
              aria-pressed={pinned}
              aria-label={pinned ? "Unpin announcement" : "Pin announcement"}
              translate="no"
              className={`notranslate flex h-9 w-9 shrink-0 select-none cursor-pointer items-center justify-center rounded-full border transition-colors ${
                pinned
                  ? "border-[#1F7AB8] bg-[#E2EEF7] text-[#1F7AB8]"
                  : "border-transparent text-[#7A858E] hover:border-[#D7E5F0] hover:bg-[#F4F7FB]"
              }`}
            >
              <Pin size={16} className={pinned ? "fill-current" : ""} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function PdfIcon() {
  return (
    <span className="relative inline-flex h-7 w-6 shrink-0 items-center justify-center rounded-[3px] bg-[#E94B4B] text-[8px] font-bold text-white">
      <span
        className="absolute top-0 right-0 h-2 w-2"
        style={{
          background:
            "linear-gradient(225deg, #FFFFFF 50%, transparent 50%)",
        }}
      />
      PDF
    </span>
  );
}
