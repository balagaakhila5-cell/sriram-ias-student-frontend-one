"use client";

import Link from "next/link";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import {
  resourceDownloadPath,
  resourceViewPath,
} from "@/features/resources/catalog/routes";
import ResourceCardGrid from "./ResourceCardGrid";
import { RESOURCE_EMPTY, STUDY_MATERIAL_CARD } from "./cardStyles";

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
        const Tag = variant === "portal" ? "article" : "div";

        return (
          <Tag key={item.id} className={STUDY_MATERIAL_CARD.shell}>
            <div className={STUDY_MATERIAL_CARD.bodyCentered}>
              <h3 className={STUDY_MATERIAL_CARD.title}>{item.title}</h3>

              <div className={STUDY_MATERIAL_CARD.actionsCentered}>
                <Link
                  href={resourceViewPath(item)}
                  className={STUDY_MATERIAL_CARD.viewButton}
                  prefetch={false}
                  target={variant === "portal" ? "_blank" : undefined}
                  rel={
                    variant === "portal" ? "noopener noreferrer" : undefined
                  }
                >
                  View
                </Link>
                <a
                  href={resourceDownloadPath(item)}
                  className={STUDY_MATERIAL_CARD.downloadButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </Tag>
        );
      })}
    </ResourceCardGrid>
  );
}
