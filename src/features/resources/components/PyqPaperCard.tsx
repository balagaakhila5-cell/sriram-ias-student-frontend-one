"use client";

import Image from "next/image";
import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import {
  resourceDownloadPath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { PYQ_PAPER_CARD } from "./cardStyles";

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
      <div className={PYQ_PAPER_CARD.thumb}>
        <div className={PYQ_PAPER_CARD.thumbInner}>
          <Image
            src={iconSrc}
            alt=""
            width={72}
            height={88}
            className="h-auto w-[72px] object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes(RESOURCE_ASSETS.PDF_ICON)) return;
              target.src = RESOURCE_ASSETS.PDF_ICON;
            }}
          />
        </div>
      </div>
      <div className={PYQ_PAPER_CARD.body}>
        <h3 className={PYQ_PAPER_CARD.title}>{item.title}</h3>
        <div className={PYQ_PAPER_CARD.actions}>
          <Link
            href={resourceViewPath(item)}
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
