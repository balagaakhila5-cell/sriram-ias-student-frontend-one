"use client";

import Image from "next/image";
import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  resourceDownloadPath,
  resourceSamplePath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";

interface ResourceDocumentCardProps {
  item: CatalogDocument;
  variant?: "public" | "portal";
  className?: string;
}

const buttonBase =
  "rounded-[8px] border border-[#57B0F2] px-4 py-2 text-[14px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]";

export default function ResourceDocumentCard({
  item,
  variant = "public",
  className = "",
}: ResourceDocumentCardProps) {
  const imageSrc = item.image || RESOURCE_ASSETS.PDF_FALLBACK;
  const viewHref = resourceViewPath(item);
  const downloadHref = resourceDownloadPath(item);
  const sampleHref = resourceSamplePath(item);

  const actions = (
    <>
      <Link
        href={viewHref}
        className={buttonBase}
        prefetch={false}
        target={variant === "portal" ? "_blank" : undefined}
        rel={variant === "portal" ? "noopener noreferrer" : undefined}
      >
        Read
      </Link>
      {item.hasSample ? (
        <Link href={sampleHref} className={buttonBase} prefetch={false}>
          Sample
        </Link>
      ) : null}
      <a
        href={downloadHref}
        className={buttonBase}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download PDF
      </a>
    </>
  );

  if (variant === "portal") {
    return (
      <article
        className={`flex items-center gap-4 rounded-[14px] bg-[#FAF8F3] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:translate-x-2 hover:bg-[#F2F8FC] hover:shadow-[0_8px_24px_rgba(31,122,184,0.12)] ${className}`}
      >
        <CardThumbnail src={imageSrc} alt={item.title} size="sm" />
        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-semibold leading-snug text-[#1F2A37]">
            {item.title}
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">{actions}</div>
        </div>
      </article>
    );
  }

  return (
    <div
      className={`animate-card group flex min-h-[122px] items-center gap-5 rounded-[14px] bg-[#F5F2EE] px-6 py-4 shadow-[0px_6px_18px_rgba(0,0,0,0.08)] origin-bottom-left transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] ${className}`}
    >
      <CardThumbnail src={imageSrc} alt={item.title} size="lg" />
      <div className="min-w-0 flex-1">
        <h3 className="mb-4 max-w-[320px] text-[16px] font-semibold leading-[1.45] text-[#111]">
          {item.title}
        </h3>
        <div className="flex flex-wrap gap-3">{actions}</div>
      </div>
    </div>
  );
}

function CardThumbnail({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: "sm" | "lg";
}) {
  const dims = size === "sm" ? { w: 64, h: 78 } : { w: 84, h: 100 };

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[16px] bg-transparent"
      style={{ width: dims.w, height: dims.h }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-0 transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes(RESOURCE_ASSETS.PDF_FALLBACK)) return;
          target.src = RESOURCE_ASSETS.PDF_FALLBACK;
        }}
      />
    </div>
  );
}
