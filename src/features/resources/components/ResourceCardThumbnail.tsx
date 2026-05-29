"use client";

import Image from "next/image";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { RESOURCE_THUMB } from "./cardStyles";

interface ResourceCardThumbnailProps {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
  className?: string;
}

export default function ResourceCardThumbnail({
  src,
  alt,
  fit = "contain",
  className = "",
}: ResourceCardThumbnailProps) {
  return (
    <div className={`${RESOURCE_THUMB.box} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={
          fit === "cover" ? RESOURCE_THUMB.imageCover : RESOURCE_THUMB.image
        }
        sizes="72px"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes(RESOURCE_ASSETS.PDF_ICON)) return;
          if (fit === "cover" && target.src.includes(RESOURCE_ASSETS.MOCK_TEST_CARD))
            return;
          target.src =
            fit === "cover"
              ? RESOURCE_ASSETS.MOCK_TEST_CARD
              : RESOURCE_ASSETS.PDF_ICON;
        }}
      />
    </div>
  );
}
