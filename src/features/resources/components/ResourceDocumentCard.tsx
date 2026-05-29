"use client";

import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  resourceDownloadPath,
  resourceSamplePath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import ResourceCardThumbnail from "./ResourceCardThumbnail";
import { RESOURCE_BUTTON, RESOURCE_CARD } from "./cardStyles";

interface ResourceDocumentCardProps {
  item: CatalogDocument;
  variant?: "public" | "portal";
  className?: string;
  /** Keeps Read + Download on one row (e.g. Previous Year in narrow columns) */
  singleRowActions?: boolean;
}

export default function ResourceDocumentCard({
  item,
  variant = "public",
  className = "",
  singleRowActions = false,
}: ResourceDocumentCardProps) {
  const showImage = !item.hideImage;
  const imageSrc = item.image || RESOURCE_ASSETS.PDF_ICON;
  const forceSingleRow =
    singleRowActions || item.subtopic === "previous-year";
  const actionsRowClass = forceSingleRow
    ? RESOURCE_CARD.actions
    : RESOURCE_CARD.actionsWrap;
  const shellHover =
    variant === "portal" ? RESOURCE_CARD.shellPortal : RESOURCE_CARD.shellPublic;
  const Tag = variant === "portal" ? "article" : "div";

  return (
    <Tag
      className={`group animate-card ${RESOURCE_CARD.shell} ${shellHover} ${className}`}
    >
      {showImage ? (
        <ResourceCardThumbnail src={imageSrc} alt={item.title} />
      ) : null}
      <div className={RESOURCE_CARD.body}>
        <h3 className={RESOURCE_CARD.title}>{item.title}</h3>
        <div className={actionsRowClass}>
          <Link
            href={resourceViewPath(item)}
            className={RESOURCE_BUTTON.base}
            prefetch={false}
            target={variant === "portal" ? "_blank" : undefined}
            rel={variant === "portal" ? "noopener noreferrer" : undefined}
          >
            Read
          </Link>
          {item.hasSample ? (
            <Link
              href={resourceSamplePath(item)}
              className={RESOURCE_BUTTON.base}
              prefetch={false}
            >
              Sample
            </Link>
          ) : null}
          <a
            href={resourceDownloadPath(item)}
            className={RESOURCE_BUTTON.base}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        </div>
      </div>
    </Tag>
  );
}
