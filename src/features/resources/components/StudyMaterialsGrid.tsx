"use client";

import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import { resourceViewPath } from "@/features/resources/catalog/routes";
import { catalogDocumentDescription } from "@/features/resources/utils/cardDescription";
import ResourceCardGrid from "./ResourceCardGrid";
import {
  PREMIUM_CARD,
  RESOURCE_EMPTY,
  STUDY_MATERIAL_CARD,
  RESOURCE_BUTTON,
} from "./cardStyles";

interface StudyMaterialsGridProps {
  items: CatalogDocument[];
  variant?: "public" | "portal";
  emptyMessage?: string;
  gridClassName?: string;
}

export default function StudyMaterialsGrid({
  items,
  variant = "public",
  emptyMessage = "No study materials found for the selected filters.",
  gridClassName,
}: StudyMaterialsGridProps) {
  if (items.length === 0) {
    return <p className={RESOURCE_EMPTY}>{emptyMessage}</p>;
  }

  return (
    <ResourceCardGrid className={gridClassName}>
      {items.map((item) => {
        const description = catalogDocumentDescription(item);

        return (
          <article key={item.id} className={STUDY_MATERIAL_CARD.shell}>
            <div className={STUDY_MATERIAL_CARD.bodyCentered}>
              <h3 className={STUDY_MATERIAL_CARD.title}>{item.title}</h3>
              {description ? (
                <p className={PREMIUM_CARD.description}>{description}</p>
              ) : null}
              <div className={STUDY_MATERIAL_CARD.actionsCentered}>
                <Link
                  href={resourceViewPath(item)}
                  className={RESOURCE_BUTTON.base}
                  prefetch={false}
                  target={variant === "portal" ? "_blank" : undefined}
                  rel={variant === "portal" ? "noopener noreferrer" : undefined}
                >
                  View PDF
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </ResourceCardGrid>
  );
}
