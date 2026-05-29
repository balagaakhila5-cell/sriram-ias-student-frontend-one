"use client";

import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import ResourceCardThumbnail from "./ResourceCardThumbnail";
import { RESOURCE_BUTTON, RESOURCE_CARD } from "./cardStyles";

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
    <div
      className={`group animate-card ${RESOURCE_CARD.shell} ${RESOURCE_CARD.shellPublic} ${className}`}
    >
      <ResourceCardThumbnail src={RESOURCE_ASSETS.PDF_ICON} alt={title} />
      <div className={RESOURCE_CARD.body}>
        <h3 className={RESOURCE_CARD.title}>{title}</h3>
        <div className={RESOURCE_CARD.actions}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={RESOURCE_BUTTON.base}
          >
            Read
          </a>
          <a href={url} download className={RESOURCE_BUTTON.base}>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
