"use client";

import Image from "next/image";
import Link from "next/link";
import type { DemoMockTestCard } from "@/features/resources/catalog/demoMockTests";
import { getMockTestCardDisplay } from "@/features/resources/catalog/demoMockTests";
import type { MockTestSummary } from "@/features/resources/services/resourcesService";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import { MOCK_TEST_CARD } from "./cardStyles";

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
  const { title } = getMockTestCardDisplay(test, examType, index);

  return (
    <div className={`${MOCK_TEST_CARD.shell} ${className}`}>
      <div className={MOCK_TEST_CARD.thumb}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="96px"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes(RESOURCE_ASSETS.MOCK_TEST_CARD)) return;
            target.src = RESOURCE_ASSETS.MOCK_TEST_CARD;
          }}
        />
      </div>
      <div className={MOCK_TEST_CARD.body}>
        <h3 className={MOCK_TEST_CARD.title}>{title}</h3>
        <Link href={attemptHref} className={MOCK_TEST_CARD.attemptButton}>
          Attempt Test
        </Link>
      </div>
    </div>
  );
}
