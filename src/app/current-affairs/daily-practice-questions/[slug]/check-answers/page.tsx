'use client';

import React, { use, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, House } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Question = {
  id: number;
  question: string;
  options: string[];
};

type StoredData = {
  slug: string;
  title: string;
  questions: Question[];
  correctAnswers: Record<number, number>;
  selectedAnswers: Record<number, number>;
};

function formatTitle(slug: string) {
  return slug
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

export default function CheckAnswersPage({ params }: PageProps) {
  const resolved = use(params);
  const slug = resolved.slug;

  const [data, setData] = useState<StoredData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`test-review-${slug}`);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [slug]);

  const title = useMemo(() => {
    return data?.title || formatTitle(slug);
  }, [data, slug]);

  const questions = data?.questions || [];
  const correctAnswers = data?.correctAnswers || {};
  const selectedAnswers = data?.selectedAnswers || {};

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

          <Link
            href={`/current-affairs/daily-practice-questions/${slug}/results`}
            className="rounded-full bg-gradient-to-r from-[#32B0F3] to-[#045A84] px-8 py-2 text-[18px] font-bold text-white"
          >
            Back to Results
          </Link>
        </div>
      </section>

      <section className="px-4 pt-5 md:px-6 md:pt-6">
        <h2 className="mb-2 text-center text-[22px] font-semibold text-[#222] md:text-[28px]">
          {title}
        </h2>

        <h1 className="text-center text-[34px] font-black leading-none md:text-[54px]">
          <span className="bg-gradient-to-r from-[#E16165] to-[#20A0E0] bg-clip-text text-transparent">
            Your Answers
          </span>
        </h1>
      </section>

      <section className="px-4 py-4">
        <div className="mx-auto max-w-[1500px] space-y-6">
          {questions.map((question) => {
            const selectedIndex = selectedAnswers[question.id];
            const correctIndex = correctAnswers[question.id];
            const isUnanswered = selectedIndex === undefined;

            return (
              <div
                key={question.id}
                className="rounded-[24px] bg-white px-8 py-10 shadow-sm"
              >
                <h3 className="mb-4 text-[18px] font-semibold">
                  Question {question.id}
                </h3>

                <p className="mb-6 text-[18px] font-semibold">
                  Q . {question.question}
                </p>

                {isUnanswered && (
                  <div className="mb-5 rounded-[12px] bg-[#FFF4E5] px-6 py-4 text-[16px] font-semibold text-[#B26A00]">
                    You did not answer this question.
                  </div>
                )}

                <div className="space-y-4">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedIndex === optionIndex;
                    const isCorrect = correctIndex === optionIndex;
                    const isWrongSelected =
                      isSelected && selectedIndex !== correctIndex;

                    let optionClass = 'border-[#DDD] bg-white';
                    let rightText = null;

                    if (isCorrect && isSelected) {
                      optionClass = 'border-[#D5E8D2] bg-[#EAF4E8]';
                      rightText = (
                        <span className="flex items-center gap-2 text-[18px] font-semibold text-[#218521]">
                          <Check size={22} />
                          Your Answer
                        </span>
                      );
                    } else if (isWrongSelected) {
                      optionClass = 'border-[#F1C8C8] bg-[#FDEEEE]';
                      rightText = (
                        <span className="flex items-center gap-2 text-[18px] font-semibold text-[#D32020]">
                          <X size={22} />
                          Your Answer
                        </span>
                      );
                    } else if (isCorrect) {
                      optionClass = 'border-[#D5E8D2] bg-[#EAF4E8]';
                      rightText = (
                        <span className="text-[18px] font-semibold text-[#218521]">
                          Correct Answer
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`flex h-[60px] w-full items-center justify-between rounded-[16px] border px-8 text-left text-[18px] font-semibold transition-all ${optionClass}`}
                      >
                        <div className="flex items-center">
                          <span className="mr-5 inline-flex min-w-[48px] shrink-0 items-center">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className="flex-1 leading-[1.2]">{option}</span>
                        </div>

                        <div className="ml-4 shrink-0">{rightText}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-10 md:px-6">
        <div className="mx-auto flex max-w-[1350px] justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#EEF2F8] px-6 py-3 text-[18px] font-semibold text-[#111]"
          >
            <House size={18} />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}