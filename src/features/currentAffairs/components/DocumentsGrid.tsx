"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import ResourceCardGrid from "@/features/resources/components/ResourceCardGrid";
import { RESOURCE_DOCUMENTS_PAGE_SIZE } from "@/features/resources/components/cardStyles";

interface DocumentsGridProps {
  documents: CatalogDocument[];
  isLoading: boolean;
  isError: boolean;
  error?: { message?: string } | null;
  emptyLabel?: string;
  pageSize?: number;
}

/**
 * Renders the document-card grid with shared loading / error / empty states
 * and paginated View More / Next controls when there are more PDFs.
 */
export default function DocumentsGrid({
  documents,
  isLoading,
  isError,
  error,
  emptyLabel = "No documents found for the selected filters.",
  pageSize = RESOURCE_DOCUMENTS_PAGE_SIZE,
}: DocumentsGridProps) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [documents]);

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

  const totalPages = Math.ceil(documents.length / pageSize);
  const pageItems = documents.slice(page * pageSize, (page + 1) * pageSize);
  const hasMore = page < totalPages - 1;
  const hasPrevious = page > 0;

  return (
    <div>
      <ResourceCardGrid>
        {pageItems.map((item) => (
          <ResourceDocumentCard key={item.id} item={item} />
        ))}
      </ResourceCardGrid>

      {totalPages > 1 ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {hasPrevious ? (
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#57B0F2] bg-white px-6 py-2 text-[14px] font-semibold text-[#46A7ED] transition-all duration-300 hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white"
            >
              Previous
            </button>
          ) : null}

          {hasMore ? (
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages - 1, current + 1))
              }
              className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#2AA7DF_0%,#03283B_100%)] px-7 py-2 text-[14px] font-semibold text-white shadow-[0_4px_14px_rgba(3,40,59,0.2)] transition-transform hover:scale-[1.03]"
            >
              {page === 0 ? "View More" : "Next"}
            </button>
          ) : null}
        </div>
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
