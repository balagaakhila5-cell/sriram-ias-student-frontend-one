"use client";

import { type ReactNode } from "react";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { RESOURCE_CARD_GRID } from "@/features/resources/components/cardStyles";
import CurrentAffairsCard from "./CurrentAffairsCard";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LoadingSkeleton from "./LoadingSkeleton";
import PaginationComponent from "./PaginationComponent";

interface DocumentsGridProps {
  documents: CatalogDocument[];
  isLoading: boolean;
  isError: boolean;
  error?: { message?: string } | null;
  emptyLabel?: string;
  pagination?: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    total?: number;
  };
  onPageChange?: (page: number) => void;
  onRetry?: () => void;
}

export default function DocumentsGrid({
  documents,
  isLoading,
  isError,
  error,
  emptyLabel = "No documents found for the selected filters.",
  pagination,
  onPageChange,
  onRetry,
}: DocumentsGridProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState message={error?.message} onRetry={onRetry} />
    );
  }

  if (documents.length === 0) {
    return <EmptyState message={emptyLabel} />;
  }

  return (
    <div>
      <ResourceCardGrid className={RESOURCE_CARD_GRID}>
        {documents.map((item) => (
          <CurrentAffairsCard key={item.id} item={item} />
        ))}
      </ResourceCardGrid>

      {pagination && onPageChange ? (
        <PaginationComponent
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          total={pagination.total}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}

function GridMessage({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "error";
}) {
  return (
    <p
      className={`py-10 text-center text-[16px] font-medium ${
        tone === "error" ? "text-red-600" : "text-[#555]"
      }`}
    >
      {children}
    </p>
  );
}

export { GridMessage };
