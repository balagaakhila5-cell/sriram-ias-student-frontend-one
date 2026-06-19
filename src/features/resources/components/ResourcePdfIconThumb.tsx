"use client";

import Image from "next/image";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";

interface ResourcePdfIconThumbProps {
  thumbClassName?: string;
  imageClassName?: string;
}

export default function ResourcePdfIconThumb({
  thumbClassName = "",
  imageClassName = "h-auto w-[72px] object-contain",
}: ResourcePdfIconThumbProps) {
  return (
    <div
      className={`resource-card-thumb relative h-full w-[88px] shrink-0 overflow-hidden rounded-l-[12px] ${thumbClassName}`}
    >
      <div className="relative flex h-full w-full items-center justify-center bg-transparent p-2">
        <Image
          src={RESOURCE_ASSETS.PDF_ICON}
          alt=""
          width={72}
          height={88}
          className={imageClassName}
        />
      </div>
    </div>
  );
}
