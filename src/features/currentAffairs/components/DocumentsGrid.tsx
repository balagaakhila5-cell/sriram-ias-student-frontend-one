"use client";

import type { ReactNode } from "react";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";

interface DocumentsGridProps {
  documents: CatalogDocument[];
  isLoading: boolean;
  isError: boolean;
  error?: { message?: string } | null;
  emptyLabel?: string;
}

/**
 * Renders the document-card grid with shared loading / error / empty states.
 * Used by every current-affairs document list page (daily current affairs,
 * monthly magazine, infographics, monthly recap).
 */
export default function DocumentsGrid({
  documents,
  isLoading,
  isError,
  error,
  emptyLabel = "No documents found for the selected filters.",
}: DocumentsGridProps) {
  if (isLoading) {
    return <GridMessage>Loading…</GridMessage>;
  }

  if (isError) {
    return (
      <GridMessage tone="error">
        {error?.message ?? "Failed to load. Please try again."}
      </GridMessage>
    );
  }

  if (documents.length === 0) {
    return <GridMessage>{emptyLabel}</GridMessage>;
  }

  return (
    <ResourceCardGrid>
      {documents.map((item) => (
        <ResourceDocumentCard key={item.id} item={item} />
      ))}
    </ResourceCardGrid>
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
