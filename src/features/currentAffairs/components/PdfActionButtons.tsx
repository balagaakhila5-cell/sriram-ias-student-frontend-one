"use client";

import { useState } from "react";
import Link from "@/components/common/AppLink";
import { resourceViewPath } from "@/features/resources/catalog/routes";
import type { CatalogDocument } from "@/features/resources/catalog/types";
import { currentAffairsService } from "../services/currentAffairsService";
import { RESOURCE_BUTTON } from "@/features/resources/components/cardStyles";

type PdfActionButtonsProps = {
  item: CatalogDocument;
  variant?: "public" | "portal";
  compact?: boolean;
};

export default function PdfActionButtons({
  item,
  variant = "public",
  compact = false,
}: PdfActionButtonsProps) {
  const [downloading, setDownloading] = useState(false);
  const buttonClass = compact ? RESOURCE_BUTTON.compact : RESOURCE_BUTTON.base;

  const handleDownload = async () => {
    if (item.pdfUrl) {
      window.open(item.pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      setDownloading(true);
      const result = await currentAffairsService.downloadResource(item.id);
      if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={resourceViewPath(item, variant === "portal" ? "portal" : "public")}
        className={buttonClass}
        prefetch={false}
        target={variant === "portal" ? "_blank" : undefined}
        rel={variant === "portal" ? "noopener noreferrer" : undefined}
      >
        View
      </Link>
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className={buttonClass}
      >
        {downloading ? "Downloading…" : "Download PDF"}
      </button>
    </div>
  );
}
