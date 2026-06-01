"use client";

import Link from "next/link";
import type { CatalogPracticeTest } from "@/features/resources/catalog/types";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import PremiumCardBanner from "./PremiumCardBanner";
import { PREMIUM_CARD, RESOURCE_BUTTON } from "./cardStyles";

interface PracticeTestCardProps {
  test: CatalogPracticeTest;
  variant?: "public" | "portal";
  className?: string;
}

export default function PracticeTestCard({
  test,
  className = "",
}: PracticeTestCardProps) {
  return (
    <div className={`${PREMIUM_CARD.shell} ${className}`}>
      <PremiumCardBanner
        src={test.image || RESOURCE_ASSETS.PRACTICE_TEST}
        alt={test.title}
        fit="cover"
      />
      <div className={PREMIUM_CARD.body}>
        <h3 className={PREMIUM_CARD.title}>{test.title}</h3>
        <div className={PREMIUM_CARD.actionsCentered}>
          <Link
            href={test.attemptPath}
            className={RESOURCE_BUTTON.attempt}
            prefetch={false}
          >
            Attempt Test
          </Link>
        </div>
      </div>
    </div>
  );
}
