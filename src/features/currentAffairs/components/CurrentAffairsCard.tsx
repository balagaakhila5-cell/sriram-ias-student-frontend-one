"use client";

import type { CatalogDocument } from "@/features/resources/catalog/types";
import ResourceDocumentCard from "@/features/resources/components/ResourceDocumentCard";
import PdfActionButtons from "./PdfActionButtons";
import { PREMIUM_CARD } from "@/features/resources/components/cardStyles";
import PremiumCardBanner from "@/features/resources/components/PremiumCardBanner";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { catalogDocumentDescription } from "@/features/resources/utils/cardDescription";

type CurrentAffairsCardProps = {
  item: CatalogDocument;
  variant?: "public" | "portal";
};

function resolveBanner(item: CatalogDocument) {
  const isMagazine = item.subtopic === "monthly-magazine";
  const src =
    item.image ||
    (isMagazine ? RESOURCE_ASSETS.PDF_ICON : RESOURCE_ASSETS.PDF_ICON);

  return {
    src,
    fit: "cover" as const,
  };
}

/** API-backed current affairs card with view/download actions. */
export default function CurrentAffairsCard({
  item,
  variant = "public",
}: CurrentAffairsCardProps) {
  if (item.pdfUrl) {
    return <ResourceDocumentCard item={item} variant={variant} />;
  }

  const banner = resolveBanner(item);
  const description = catalogDocumentDescription(item);
  const Tag = variant === "portal" ? "article" : "div";

  return (
    <Tag className={PREMIUM_CARD.shell}>
      <PremiumCardBanner src={banner.src} alt={item.title} fit={banner.fit} />
      <div className={PREMIUM_CARD.body}>
        <h3 className={PREMIUM_CARD.title}>{item.title}</h3>
        {description ? (
          <p className={PREMIUM_CARD.description}>{description}</p>
        ) : null}
        <PdfActionButtons item={item} variant={variant} />
      </div>
    </Tag>
  );
}
