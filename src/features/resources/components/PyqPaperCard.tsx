"use client";

import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import PremiumCardBanner from "./PremiumCardBanner";
import { PREMIUM_CARD, RESOURCE_BUTTON } from "./cardStyles";

interface PyqPaperCardProps {
  title: string;
  fileUrl?: string | null;
  className?: string;
}

export default function PyqPaperCard({
  title,
  fileUrl,
  className = "",
}: PyqPaperCardProps) {
  const url = fileUrl ?? "#";

  return (
    <div className={`${PREMIUM_CARD.shell} ${className}`}>
      <PremiumCardBanner src={RESOURCE_ASSETS.PDF_ICON} alt={title} fit="cover" />
      <div className={PREMIUM_CARD.body}>
        <h3 className={PREMIUM_CARD.title}>{title}</h3>
        <p className={PREMIUM_CARD.description}>
          Previous year question paper for practice.
        </p>
        <div className={PREMIUM_CARD.actions}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={RESOURCE_BUTTON.base}
          >
            View
          </a>
          <a href={url} download className={RESOURCE_BUTTON.base}>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
