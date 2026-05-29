"use client";

import Image from "next/image";
import Link from "next/link";
import type { DemoMockTestCard } from "@/features/resources/catalog/demoMockTests";
import type { MockTestSummary } from "@/features/resources/services/resourcesService";
import { RESOURCE_ASSETS } from "@/features/resources/catalog/assets";

type MockTestCardItem = MockTestSummary | DemoMockTestCard;

interface MockTestCardProps {
  test: MockTestCardItem;
  subtitle?: string;
}

export default function MockTestCard({ test, subtitle }: MockTestCardProps) {
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

  return (
    <div className="animate-card group flex items-center gap-4 rounded-[18px] bg-[#FAF8F3] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#FEF2E5] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
      <div className="shrink-0 overflow-hidden rounded-[10px]">
        <Image
          src={image}
          alt={test.title}
          width={100}
          height={90}
          className="h-[88px] w-[100px] object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes(RESOURCE_ASSETS.MOCK_TEST_CARD)) return;
            target.src = RESOURCE_ASSETS.MOCK_TEST_CARD;
          }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-[16px] font-extrabold leading-[1.25] text-[#111]">
          {test.title}
        </h3>
        {line2 ? (
          <p className="mb-3 text-[14px] font-semibold text-[#444]">{line2}</p>
        ) : null}
        <Link
          href={`/free_resources/free-mocktests/${test._id}`}
          className="inline-flex min-w-[118px] items-center justify-center rounded-[8px] border-[1.5px] border-[#58b7ea] bg-white px-4 py-1.5 text-[14px] font-bold text-[#2a9cda] transition-all duration-300 hover:border-transparent hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white"
        >
          Attempt Test
        </Link>
      </div>
    </div>
  );
}
