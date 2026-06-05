"use client";

import Link from "next/link";
import type { DemoMockTestCard } from "@/features/resources/catalog/demoMockTests";
import { getMockTestCardDisplay } from "@/features/resources/catalog/demoMockTests";
import type { MockTestSummary } from "@/features/resources/services/resourcesService";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import PremiumCardBanner from "./PremiumCardBanner";
import { PREMIUM_CARD, RESOURCE_BUTTON } from "./cardStyles";

type MockTestCardItem = MockTestSummary | DemoMockTestCard;

interface MockTestCardProps {
  test: MockTestCardItem;
  variant?: "public" | "portal";
  className?: string;
  examType?: "prelims" | "mains";
  index?: number;
}

export default function MockTestCard({
  test,
  className = "",
  examType,
  index,
}: MockTestCardProps) {
  const image =
    "image" in test && test.image
      ? test.image
      : RESOURCE_ASSETS.MOCK_TEST_CARD;

  const attemptHref = `/free_resources/free-mocktests/${test._id}`;

  const { title, subtitle } = getMockTestCardDisplay(test, examType, index);

  return (
    <div className={`${PREMIUM_CARD.shell} ${className}`}>
      <PremiumCardBanner src={image} alt={title} fit="cover" />
      <div className={PREMIUM_CARD.body}>
        <h3 className={PREMIUM_CARD.title}>{title}</h3>
        {subtitle ? (
          <p className={PREMIUM_CARD.description}>{subtitle}</p>
        ) : null}
        <div className={PREMIUM_CARD.actions}>
          <Link href={attemptHref} className={RESOURCE_BUTTON.attempt}>
            Attempt Test
          </Link>
        </div>
      </div>
    </div>
  );
}
