"use client";

import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import { resourceViewPath } from "@/features/resources/catalog/routes";
import ResourceCardGrid from "./ResourceCardGrid";
import { RESOURCE_EMPTY, STUDY_MATERIAL_CARD } from "./cardStyles";

interface StudyMaterialsGridProps {
  items: CatalogDocument[];
  variant?: "public" | "portal";
  emptyMessage?: string;
}

export default function StudyMaterialsGrid({
  items,
  variant = "public",
  emptyMessage = "No study materials found for the selected filters.",
}: StudyMaterialsGridProps) {
  if (items.length === 0) {
    return <p className={RESOURCE_EMPTY}>{emptyMessage}</p>;
  }

  return (
    <ResourceCardGrid>
      {items.map((item) => (
        <article
          key={item.id}
          className={`${STUDY_MATERIAL_CARD.shell} ${
            variant === "public" ? "animate-card" : ""
          }`}
        >
          <h3 className={STUDY_MATERIAL_CARD.title}>{item.title}</h3>
          <Link
            href={resourceViewPath(item)}
            className={`${STUDY_MATERIAL_CARD.button} mt-5`}
            prefetch={false}
            target={variant === "portal" ? "_blank" : undefined}
            rel={variant === "portal" ? "noopener noreferrer" : undefined}
          >
            View PDF
          </Link>
        </article>
      ))}
    </ResourceCardGrid>
  );
}
