"use client";

import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  resourceDownloadPath,
  resourceSamplePath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import { NCERT_BOOK_CARD, RESOURCE_BUTTON } from "./cardStyles";

interface NcertBookCardProps {
  item: CatalogDocument;
  variant?: "public" | "portal";
  className?: string;
}

function parseNcertTitle(title: string) {
  const sep = " - ";
  const index = title.indexOf(sep);
  if (index === -1) {
    return { bookTitle: title, subject: null as string | null };
  }
  return {
    bookTitle: title.slice(0, index).trim(),
    subject: title.slice(index + sep.length).trim(),
  };
}

export default function NcertBookCard({
  item,
  variant = "public",
  className = "",
}: NcertBookCardProps) {
  const { bookTitle, subject } = parseNcertTitle(item.title);
  const classInfo = [item.month, item.year].filter(Boolean).join(" · ");
  const shellHover =
    variant === "portal"
      ? NCERT_BOOK_CARD.shellPortal
      : NCERT_BOOK_CARD.shellPublic;
  const Tag = variant === "portal" ? "article" : "div";

  return (
    <Tag
      className={`group animate-card ${NCERT_BOOK_CARD.shell} ${shellHover} ${className}`}
    >
      <div className={NCERT_BOOK_CARD.content}>
        <h3 className={NCERT_BOOK_CARD.title}>{bookTitle}</h3>
        {subject ? (
          <p className={NCERT_BOOK_CARD.subject}>{subject}</p>
        ) : null}
        {classInfo ? (
          <p className={NCERT_BOOK_CARD.classInfo}>{classInfo}</p>
        ) : null}
        {item.description ? (
          <p className={NCERT_BOOK_CARD.description}>{item.description}</p>
        ) : null}
      </div>
      <div className={NCERT_BOOK_CARD.actions}>
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
    </Tag>
  );
}
