'use client';

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, Clock3, Medal } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type StoredData = {
  slug: string;
  title: string;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  grade: string;
  time: string;
  rank: string;
};

function formatTitle(slug: string) {
  return slug
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

export default function ResultsPage({ params }: PageProps) {
  const resolved = use(params);
  const slug = resolved.slug;

  const [data, setData] = useState<StoredData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`test-review-${slug}`);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [slug]);

  const title = data?.title || formatTitle(slug);

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <section className="border-b border-[#E8E8E8] bg-white px-6 py-2">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/40_years_experience.png"
              alt="40 Years of Excellence"
              className="h-10 md:h-12 lg:h-[56px] object-contain hidden md:block transition-transform hover:scale-105 mr-1 md:mr-1.5"
            />
            {/* Orange Divider imitating the emblem layout */}
            <div className="w-[1px] md:w-[2px] h-8 md:h-10 lg:h-[48px] bg-[#FF6B00] hidden md:block"></div>
            <img
              src="/assets/Logo.png"
              alt="SRIRAM's IAS"
              className="h-10 md:h-12 lg:h-[68px] object-contain transition-transform hover:scale-105 -ml-1.5 md:-ml-4"
            />
          </Link>
        </div>
      </section>

      <section className="px-4 py-6 md:px-6 md:py-10">
        <div className="mx-auto max-w-[1050px]">
          <div className="mb-6 flex items-center justify-center relative">
            <h1 className="text-center text-[24px] font-black uppercase md:text-[28px]">
              <span className="bg-gradient-to-r from-[#E16165] to-[#20A0E0] bg-clip-text text-transparent">
                OVER ALL RESULTS
              </span>
            </h1>
            <Link
              href={`/current-affairs/daily-practice-questions/${slug}/check-answers`}
              className="absolute right-0 rounded-full bg-gradient-to-r from-[#42B8F6] to-[#044F74] px-6 py-2.5 text-[14px] font-bold text-white shadow-sm"
            >
              Check Answers
            </Link>
          </div>

          <div className="rounded-[20px] bg-[#EFF3FB] px-6 py-10 md:px-12 md:py-12">
            <div className="mx-auto flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white shadow-sm md:h-[120px] md:w-[120px]">
              <span className="text-[34px] font-black text-[#0A9600] md:text-[42px]">
                {data?.percentage ?? 0} <span className="text-[24px] md:text-[30px]">%</span>
              </span>
            </div>

            <p className="mt-4 text-center text-[18px] font-semibold text-[#5A5A5A] md:text-[20px]">
              Grade : {data?.grade ?? 'D'}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Correct */}
              <div className="rounded-[20px] bg-white px-5 py-5 shadow-sm">
                <p className="text-[13px] font-semibold text-[#666]">Correct Answers</p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-[38px] font-bold text-[#6A922D] leading-none">
                    {data?.correctCount ?? 0}
                  </span>
                  <img
                    src="/assets/results/correct-icon.png"
                    alt="Correct answers"
                    className="h-[56px] w-[56px] object-contain"
                  />
                </div>
              </div>

              {/* Incorrect */}
              <div className="rounded-[20px] bg-white px-5 py-5 shadow-sm">
                <p className="text-[13px] font-semibold text-[#666]">Incorrect Answers</p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-[38px] font-bold text-[#F01818] leading-none">
                    {data?.incorrectCount ?? 0}
                  </span>
                  <img
                    src="/assets/results/incorrect-icon.png"
                    alt="Incorrect answers"
                    className="h-[56px] w-[56px] object-contain"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="rounded-[20px] bg-white px-5 py-5 shadow-sm">
                <p className="text-[13px] font-semibold text-[#666]">Time</p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="text-[38px] font-bold text-[#7669F2] leading-none">
                    {data?.time ?? '1 Hr'}
                  </span>
                  <img
                    src="/assets/results/time-icon.png"
                    alt="Time"
                    className="h-[56px] w-[56px] object-contain"
                  />
                </div>
              </div>

              {/* Rank */}
              <div className="rounded-[20px] bg-white px-5 py-5 shadow-sm">
                <p className="text-[13px] font-semibold text-[#666]">Rank</p>
                <div className="mt-2 flex items-end justify-between">
                  <div className="flex items-baseline">
                    <span className="text-[38px] font-bold text-[#9D9800] leading-none">
                      {data?.rank ?? '100'}
                    </span>
                    <span className="ml-1 text-[16px] font-bold text-[#9D9800]">
                      / 100
                    </span>
                  </div>
                  <img
                    src="/assets/results/rank-icon.png"
                    alt="Rank"
                    className="h-[56px] w-[56px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}