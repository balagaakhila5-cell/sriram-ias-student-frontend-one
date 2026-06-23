"use client";

import Image from "@/components/common/AppImage";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { PREMIUM_CARD, RESOURCE_THUMB } from "./cardStyles";

interface ResourcePdfIconThumbProps {
  thumbClassName?: string;
}

/** PDF icon thumb — matches Current Affairs ResourceDocumentCard banner sizing */
export default function ResourcePdfIconThumb({
  thumbClassName = "",
}: ResourcePdfIconThumbProps) {
  return (
    <div className={`${PREMIUM_CARD.thumb} ${thumbClassName}`.trim()}>
      <Image
        src={RESOURCE_ASSETS.PDF_ICON}
        alt=""
        fill
        className={RESOURCE_THUMB.imageCover}
        sizes="72px"
      />
    </div>
  );
}
