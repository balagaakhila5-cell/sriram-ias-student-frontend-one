"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogPracticeTest } from "@/features/resources/catalog/types";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";
import PremiumCardBanner from "./PremiumCardBanner";
import { PRACTICE_TEST_CARD } from "./cardStyles";

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
    <div className={`${PRACTICE_TEST_CARD.shell} ${className}`}>
      <PremiumCardBanner
        src={test.image || RESOURCE_ASSETS.PRACTICE_TEST}
        alt={test.title}
        fit="cover"
      />
      <div className={PRACTICE_TEST_CARD.body}>
        <h3 className={PRACTICE_TEST_CARD.title}>{test.title}</h3>
        <div className={PRACTICE_TEST_CARD.actions}>
          <Link href={test.attemptPath} className={PRACTICE_TEST_CARD.attemptButton}>
            Attempt Test
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
