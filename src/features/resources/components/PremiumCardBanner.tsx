"use client";

import Image from "next/image";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { PREMIUM_CARD, RESOURCE_THUMB } from "./cardStyles";

type BannerFit = "contain" | "cover" | "magazine";

interface PremiumCardBannerProps {
  src: string;
  alt: string;
  fit?: BannerFit;
  className?: string;
}

/** Left-side thumbnail inside horizontal resource cards */
export default function PremiumCardBanner({
  src,
  alt,
  fit = "contain",
  className = "",
}: PremiumCardBannerProps) {
  if (fit === "magazine") {
    return (
      <div className={`${PREMIUM_CARD.thumb} ${className}`}>
        <div className={PREMIUM_CARD.thumbInner}>
          <div className={RESOURCE_THUMB.boxMagazine}>
            <Image
              src={src}
              alt={alt}
              fill
              className={RESOURCE_THUMB.imageCover}
              sizes="78px"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes(RESOURCE_ASSETS.MAGAZINE)) return;
                target.src = RESOURCE_ASSETS.MAGAZINE;
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (fit === "contain") {
    return (
      <div className={`${PREMIUM_CARD.thumb} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className={RESOURCE_THUMB.image}
              sizes="88px"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes(RESOURCE_ASSETS.PDF_ICON)) return;
            target.src = RESOURCE_ASSETS.PDF_ICON;
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${PREMIUM_CARD.thumb} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={RESOURCE_THUMB.imageCover}
              sizes="88px"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes(RESOURCE_ASSETS.MAGAZINE)) return;
          target.src = RESOURCE_ASSETS.MAGAZINE;
        }}
      />
    </div>
  );
}
