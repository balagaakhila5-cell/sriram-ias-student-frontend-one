"use client";

import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  resourceDownloadPath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { NCERT_BOOK_CARD } from "./cardStyles";

interface NcertBookCardProps {
  item: CatalogDocument;
  variant?: "public" | "portal";
  className?: string;
}

export default function NcertBookCard({
  item,
  variant = "public",
  className = "",
}: NcertBookCardProps) {
  const Tag = variant === "portal" ? "article" : "div";

  return (
    <Tag className={`${NCERT_BOOK_CARD.shell} ${className}`}>
      <div className={NCERT_BOOK_CARD.bodyCentered}>
        <h3 className={NCERT_BOOK_CARD.title}>{item.title}</h3>
        <div className={NCERT_BOOK_CARD.actionsCentered}>
          <Link
            href={resourceViewPath(item, variant === "portal" ? "portal" : "public")}
            className={NCERT_BOOK_CARD.button}
            prefetch={false}
            target={variant === "portal" ? "_blank" : undefined}
            rel={variant === "portal" ? "noopener noreferrer" : undefined}
          >
            View
          </Link>
          <a
            href={resourceDownloadPath(item)}
            className={NCERT_BOOK_CARD.button}
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
