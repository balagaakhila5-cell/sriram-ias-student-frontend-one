"use client";

import { type ReactNode } from "react";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { RESOURCE_CARD_GRID } from "@/features/resources/components/cardStyles";

interface PaginatedPdfGridProps<T> {
  items: T[];
  /** @deprecated Pagination removed — all items are shown */
  pageSize?: number;
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  gridClassName?: string;
  className?: string;
  /** @deprecated Pagination removed */
  resetKey?: string | number;
}

export default function PaginatedPdfGrid<T>({
  items,
  getKey,
  renderItem,
  gridClassName = RESOURCE_CARD_GRID,
  className = "",
}: PaginatedPdfGridProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <ResourceCardGrid className={gridClassName}>
        {items.map((item, index) => (
          <div key={getKey(item, index)}>{renderItem(item, index)}</div>
        ))}
      </ResourceCardGrid>
    </div>
  );
}
