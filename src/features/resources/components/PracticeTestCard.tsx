"use client";

import Link from "next/link";
import type { CatalogPracticeTest } from "@/features/resources/catalog/types";
import ResourceCardThumbnail from "./ResourceCardThumbnail";
import { RESOURCE_BUTTON, RESOURCE_CARD } from "./cardStyles";

interface PracticeTestCardProps {
  test: CatalogPracticeTest;
  variant?: "public" | "portal";
  className?: string;
}

export default function PracticeTestCard({
  test,
  variant = "public",
  className = "",
}: PracticeTestCardProps) {
  const shellHover =
    variant === "portal" ? RESOURCE_CARD.shellPortal : RESOURCE_CARD.shellPublic;

  return (
    <Link
      href={test.attemptPath}
      className={`group animate-card ${RESOURCE_CARD.shell} ${shellHover} ${className}`}
    >
      <ResourceCardThumbnail src={test.image} alt={test.title} fit="contain" />
      <div className={RESOURCE_CARD.body}>
        <h3 className={RESOURCE_CARD.titleOnDark}>{test.title}</h3>
        <span className={`${RESOURCE_BUTTON.attempt} mt-3`}>Attempt Test</span>
      </div>
    </Link>
  );
}
