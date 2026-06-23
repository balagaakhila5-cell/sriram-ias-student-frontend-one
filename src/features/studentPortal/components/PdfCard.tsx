"use client";

import Link from "@/components/common/AppLink";

interface PdfCardProps {
  title: string;
  readHref?: string;
  downloadHref?: string;
}

export default function PdfCard({
  title,
  readHref = "#",
  downloadHref = "#",
}: PdfCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#F2F8FC] hover:shadow-[0_8px_24px_rgba(31,122,184,0.12)]">
      <PdfIcon />

      <div className="min-w-0 flex-1">
        <h4
          className="text-[15px] font-semibold leading-snug text-[#1F2A37]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h4>

        <div className="mt-3 flex items-center gap-2">
          <Link
            href={readHref}
            className="rounded-md border border-[#A8CEE6] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#1F7AB8]"
          >
            Read
          </Link>
          <Link
            href={downloadHref}
            className="rounded-md border border-[#A8CEE6] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#1F7AB8]"
          >
            Download PDF
          </Link>
        </div>
      </div>
    </article>
  );
}

function PdfIcon() {
  return (
    <span className="relative flex h-[78px] w-[64px] shrink-0 items-center justify-center rounded-[6px] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
      <span className="absolute inset-x-2 top-3 h-1.5 rounded-sm bg-[#CBD5DC]" />
      <span className="absolute inset-x-2 top-6 h-1.5 rounded-sm bg-[#CBD5DC]" />
      <span className="absolute inset-x-2 top-9 h-1.5 rounded-sm bg-[#CBD5DC]" />
      <span
        className="absolute bottom-0 left-0 right-0 flex h-6 items-center justify-center rounded-b-[6px] text-[10px] font-bold text-white"
        style={{ background: "#E94B4B" }}
      >
        PDF
      </span>
    </span>
  );
}
