"use client";

import Link from "@/components/common/AppLink";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  resourceDownloadPath,
  resourceSamplePath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { catalogDocumentDescription } from "@/features/resources/utils/cardDescription";
import PremiumCardBanner from "./PremiumCardBanner";
import { PREMIUM_CARD, RESOURCE_BUTTON } from "./cardStyles";

interface ResourceDocumentCardProps {
  item: CatalogDocument;
  variant?: "public" | "portal";
  className?: string;
  singleRowActions?: boolean;
}

function primaryActionLabel(_item: CatalogDocument): string {
  return "View";
}

function resolveBanner(item: CatalogDocument) {
  if (item.hideImage) {
    return null;
  }

  const isMagazine = item.subtopic === "monthly-magazine";
  const isCurrentAffairs = item.module === "current-affairs";

  if (isMagazine) {
    return {
      src: RESOURCE_ASSETS.PDF_ICON,
      fit: "cover" as const,
    };
  }

  const src =
    item.image ||
    (isCurrentAffairs ||
    item.subtopic === "previous-year" ||
    item.module === "free-resources"
      ? RESOURCE_ASSETS.PDF_ICON
      : RESOURCE_ASSETS.PDF_THUMBNAIL);

  const isPdfIcon =
    src === RESOURCE_ASSETS.PDF_ICON || src === RESOURCE_ASSETS.PDF_THUMBNAIL;

  return {
    src,
    fit: (isPdfIcon || item.subtopic === "previous-year" ? "cover" : "contain") as
      | "cover"
      | "contain",
  };
}

export default function ResourceDocumentCard({
  item,
  variant = "public",
  className = "",
  singleRowActions = false,
}: ResourceDocumentCardProps) {
  const banner = resolveBanner(item);
  const Tag = variant === "portal" ? "article" : "div";
  const description = catalogDocumentDescription(item);
  const isMagazine = item.subtopic === "monthly-magazine";
  const actionCount = 2 + (item.hasSample ? 1 : 0);
  const useSingleRow =
    singleRowActions || isMagazine || actionCount >= 3;
  const useCompactButtons = useSingleRow && actionCount >= 3 && !isMagazine;
  const actionsClass = isMagazine
    ? PREMIUM_CARD.magazineActionsRow
    : useSingleRow
      ? PREMIUM_CARD.actionsRow
      : PREMIUM_CARD.actions;
  const buttonClass = isMagazine
    ? RESOURCE_BUTTON.magazine
    : useCompactButtons
      ? RESOURCE_BUTTON.compact
      : RESOURCE_BUTTON.base;

  return (
    <Tag className={`${PREMIUM_CARD.shell} ${className}`}>
      {banner ? (
        <PremiumCardBanner src={banner.src} alt={item.title} fit={banner.fit} />
      ) : null}
      <div
        className={banner ? PREMIUM_CARD.body : PREMIUM_CARD.bodyCentered}
      >
        <h3 className={PREMIUM_CARD.title}>
          {item.title}
        </h3>
        {description ? (
          <p className={PREMIUM_CARD.description}>{description}</p>
        ) : null}
        <div className={actionsClass}>
          <Link
            href={resourceViewPath(item, variant === "portal" ? "portal" : "public")}
            className={buttonClass}
            prefetch={false}
            target={variant === "portal" ? "_blank" : undefined}
            rel={variant === "portal" ? "noopener noreferrer" : undefined}
          >
            {primaryActionLabel(item)}
          </Link>
          {item.hasSample ? (
            <Link
              href={resourceSamplePath(item, variant === "portal" ? "portal" : "public")}
              className={buttonClass}
              prefetch={false}
            >
              Sample
            </Link>
          ) : null}
          <a
            href={resourceDownloadPath(item)}
            className={buttonClass}
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
