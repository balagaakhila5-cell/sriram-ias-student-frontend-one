"use client";

import Image from "@/components/common/AppImage";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { RESOURCE_THUMB } from "./cardStyles";

type ThumbnailVariant = "default" | "practice" | "magazine" | "mock";

interface ResourceCardThumbnailProps {
  src: string;
  alt: string;
  fit?: "contain" | "cover";
  variant?: ThumbnailVariant;
  className?: string;
}

const BOX_BY_VARIANT: Record<ThumbnailVariant, string> = {
  default: RESOURCE_THUMB.box,
  practice: RESOURCE_THUMB.boxPractice,
  magazine: RESOURCE_THUMB.boxMagazine,
  mock: RESOURCE_THUMB.box,
};

export default function ResourceCardThumbnail({
  src,
  alt,
  fit = "contain",
  variant = "default",
  className = "",
}: ResourceCardThumbnailProps) {
  const imageFit = fit === "cover" || variant === "magazine" ? "cover" : "contain";

  return (
    <div className={`${BOX_BY_VARIANT[variant]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={
          imageFit === "cover" ? RESOURCE_THUMB.imageCover : RESOURCE_THUMB.image
        }
        sizes="80px"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes(RESOURCE_ASSETS.PDF_ICON)) return;
          if (variant === "mock" && target.src.includes(RESOURCE_ASSETS.MOCK_TEST_CARD))
            return;
          target.src =
            variant === "mock"
              ? RESOURCE_ASSETS.MOCK_TEST_CARD
              : RESOURCE_ASSETS.PDF_ICON;
        }}
      />
    </div>
  );
}
