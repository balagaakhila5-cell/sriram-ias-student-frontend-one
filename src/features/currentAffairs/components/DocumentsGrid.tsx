"use client";

import { type ReactNode } from "react";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import PaginatedPdfGrid from "@/features/resources/components/PaginatedPdfGrid";

interface DocumentsGridProps {
  documents: CatalogDocument[];
  isLoading: boolean;
  isError: boolean;
  error?: { message?: string } | null;
  emptyLabel?: string;
}

/** Renders the document-card grid with shared loading / error / empty states. */
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
    <PaginatedPdfGrid
      items={documents}
      getKey={(item) => item.id}
      renderItem={(item) => <ResourceDocumentCard item={item} />}
    />
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
