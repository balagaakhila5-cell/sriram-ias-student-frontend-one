"use client";

import Image from "@/components/common/AppImage";
import Link from "@/components/common/AppLink";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import {
  resourceDownloadPath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { PYQ_PAPER_CARD, PREMIUM_CARD, RESOURCE_THUMB } from "./cardStyles";

interface PyqPaperCardProps {
  item: CatalogDocument;
  variant?: "public" | "portal";
  className?: string;
}

export default function PyqPaperCard({
  item,
  variant = "public",
  className = "",
}: PyqPaperCardProps) {
  const Tag = variant === "portal" ? "article" : "div";
  const iconSrc = item.image || RESOURCE_ASSETS.PDF_ICON;

  return (
    <Tag className={`${PYQ_PAPER_CARD.shell} ${className}`}>
      <div className={PREMIUM_CARD.thumb}>
        <Image
          src={iconSrc}
          alt=""
          fill
          className={RESOURCE_THUMB.imageCover}
          sizes="72px"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes(RESOURCE_ASSETS.PDF_ICON)) return;
            target.src = RESOURCE_ASSETS.PDF_ICON;
          }}
        />
      </div>
      <div className={PYQ_PAPER_CARD.body}>
        <h3 className={PYQ_PAPER_CARD.title}>{item.title}</h3>
        <div className={PYQ_PAPER_CARD.actions}>
          <Link
            href={resourceViewPath(item, variant === "portal" ? "portal" : "public")}
            className={PYQ_PAPER_CARD.viewButton}
            prefetch={false}
            target={variant === "portal" ? "_blank" : undefined}
            rel={variant === "portal" ? "noopener noreferrer" : undefined}
          >
            View
          </Link>
          <a
            href={resourceDownloadPath(item)}
            className={PYQ_PAPER_CARD.downloadButton}
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
