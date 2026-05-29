"use client";

import Link from "next/link";
import type { DemoMockTestCard } from "@/features/resources/catalog/demoMockTests";
import type { MockTestSummary } from "@/features/resources/services/resourcesService";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import ResourceCardThumbnail from "./ResourceCardThumbnail";
import { RESOURCE_BUTTON, RESOURCE_CARD } from "./cardStyles";

type MockTestCardItem = MockTestSummary | DemoMockTestCard;

interface MockTestCardProps {
  test: MockTestCardItem;
  subtitle?: string;
  variant?: "public" | "portal";
  className?: string;
}

export default function MockTestCard({
  test,
  subtitle,
  variant = "public",
  className = "",
}: MockTestCardProps) {
  const image =
    "image" in test && test.image
      ? test.image
      : RESOURCE_ASSETS.MOCK_TEST_CARD;
  const line2 =
    subtitle ??
    ("subtitle" in test ? test.subtitle : undefined) ??
    (test.duration
      ? `${test.duration} min${test.totalQuestions ? ` • ${test.totalQuestions} Qs` : ""}`
      : "");
  const shellHover =
    variant === "portal" ? RESOURCE_CARD.shellPortal : RESOURCE_CARD.shellPublic;

  return (
    <div
      className={`group animate-card ${RESOURCE_CARD.shell} ${shellHover} ${className}`}
    >
      <ResourceCardThumbnail src={image} alt={test.title} fit="cover" />
      <div className={RESOURCE_CARD.body}>
        <h3 className={RESOURCE_CARD.title}>{test.title}</h3>
        {line2 ? <p className={RESOURCE_CARD.meta}>{line2}</p> : null}
        <Link
          href={`/free_resources/free-mocktests/${test._id}`}
          className={`${RESOURCE_BUTTON.attempt} ${line2 ? "mt-2" : "mt-3"}`}
        >
          Attempt Test
        </Link>
      </div>
    </div>
  );
}
