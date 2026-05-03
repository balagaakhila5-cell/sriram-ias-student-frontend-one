'use client';

import React, { use, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock3, FileText, House, X } from 'lucide-react';

import {
  useMockTest,
  useSubmitMockTest,
} from '@/features/resources/hooks/useResources';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const formatTime = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0'));
};

export default function MockTestRunnerPage({ params }: PageProps) {
  const resolved = use(params);
  const testId = resolved.slug;
  const router = useRouter();

  const { data: test, isLoading, error } = useMockTest(testId);
  const submitMutation = useSubmitMockTest(testId);

  const questions = test?.questions ?? [];
  const totalQuestions = questions.length;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    {},
  );
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const startedAtRef = useRef<string>(new Date().toISOString());
  const startTimeRef = useRef<number>(Date.now());
  const durationSeconds = (test?.duration ?? 60) * 60;
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    setSecondsLeft(durationSeconds);
    startedAtRef.current = new Date().toISOString();
    startTimeRef.current = Date.now();
  }, [durationSeconds]);

  useEffect(() => {
    if (!test) return;
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setSecondsLeft(Math.max(durationSeconds - elapsed, 0));
    }, 1000);
    return () => clearInterval(id);
  }, [test, durationSeconds]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const question = questions[currentQuestion];

  const handleOptionSelect = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSaveNext = () => {
    if (currentQuestion < totalQuestions - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinalSubmit = async () => {
    if (!test) return;
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    try {
      const result = await submitMutation.mutateAsync({
        startedAt: startedAtRef.current,
        timeTaken,
        answers: selectedAnswers,
      });

      if (typeof window !== 'undefined') {
        const payload = {
          testId,
          test,
          selectedAnswers,
          result,
          submittedAt: new Date().toISOString(),
        };
        window.localStorage.setItem(
          `test-review-${testId}`,
          JSON.stringify(payload),
        );
      }
      const resultId = result?._id;
      router.push(
        `/free_resources/free-mocktests/${testId}/results${
          resultId ? `?resultId=${resultId}` : ''
        }`,
      );
    } catch (err) {
      console.error('Failed to submit mock test', err);
    }
  };

  const [hh, mm, ss] = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f8]">
        <p className="text-[18px] font-semibold text-[#444]">Loading test...</p>
      </main>
    );
  }
  if (error || !test) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f8]">
        <div className="text-center">
          <p className="text-[18px] font-semibold text-red-600">
            Could not load this mock test.
          </p>
          <Link
            href="/free_resources/free-mocktests"
            className="mt-4 inline-block rounded-full bg-[#045A84] px-6 py-2 font-semibold text-white"
          >
            Back to Mock Tests
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#f8f8f8]">
      <section className="border-b border-[#E8E8E8] bg-white px-6 py-2">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/40_years_experience.png"
              alt="40 Years of Excellence"
              className="h-10 md:h-12 lg:h-[56px] object-contain hidden md:block transition-transform hover:scale-105 mr-1 md:mr-1.5"
            />
            <div className="w-[1px] md:w-[2px] h-8 md:h-10 lg:h-[48px] bg-[#FF6B00] hidden md:block"></div>
            <img
              src="/assets/Logo.png"
              alt="SRIRAM's IAS"
              className="h-10 md:h-12 lg:h-[68px] object-contain transition-transform hover:scale-105 -ml-1.5 md:-ml-4"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <div className="flex items-center gap-2 text-[17px] font-medium">
              <span className="rounded-md bg-[#EFF3FF] px-3 py-2 font-bold">{hh}:</span>
              <span className="rounded-md bg-[#EFF3FF] px-3 py-2 font-bold">{mm}:</span>
              <span className="rounded-md bg-[#EFF3FF] px-3 py-2 font-bold">{ss}</span>
              <span className="ml-2 text-[16px] font-semibold">Time Left</span>
            </div>

            <div className="h-7 w-[1px] bg-[#D8D8D8]" />

            <div className="flex items-center gap-2 text-[18px] font-semibold text-[#00000080]">
              <Clock3 size={18} />
              {test.duration} min
            </div>

            <div className="h-7 w-[1px] bg-[#D8D8D8]" />

            <div className="flex items-center gap-2 text-[18px] font-semibold text-[#00000080]">
              <FileText size={18} />
              {totalQuestions} Questions
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="rounded-full bg-gradient-to-r from-[#32B0F3] to-[#045A84] px-8 py-2 text-[18px] font-bold text-white"
          >
            Submit
          </button>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-4 flex flex-wrap justify-center gap-4 border-b border-[#ECECEC] pb-4">
            {questions.map((item, index) => {
              const active = currentQuestion === index;
              const isAnswered = selectedAnswers[item._id] !== undefined;
              return (
                <button
                  key={item._id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-[45px] min-w-[60px] rounded-[8px] text-[18px] font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#37ACEE] to-[#045B84] text-white shadow-lg'
                      : isAnswered
                        ? 'bg-[#EAF6FF] text-[#045B84] shadow'
                        : 'bg-white text-black shadow'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {question && (
            <div className="rounded-[24px] bg-white px-8 py-10 shadow-sm">
              <h3 className="mb-4 text-[18px] font-semibold">
                Question {currentQuestion + 1}
              </h3>

              <p className="mb-6 text-[18px] font-semibold">
                Q . {question.question}
              </p>

              <div className="space-y-4">
                {question.options.map((option, i) => {
                  const isSelected = selectedAnswers[question._id] === option;
                  return (
                    <button
                      key={`${question._id}-${i}`}
                      onClick={() => handleOptionSelect(question._id, option)}
                      className={`flex h-[60px] w-full items-center rounded-[16px] border px-8 text-left text-[18px] font-semibold transition-all ${
                        isSelected
                          ? 'border-[#BFD7FF] bg-[#EEF1FC]'
                          : 'border-[#DDD] bg-white hover:bg-[#F7F9FF]'
                      }`}
                    >
                      <span className="mr-5 inline-flex min-w-[48px] shrink-0 items-center">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <span className="flex-1 leading-[1.2]">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`rounded-[12px] px-6 py-2 text-[18px] font-bold text-white ${
                    currentQuestion === 0
                      ? 'cursor-not-allowed bg-[#B8C4CF]'
                      : 'bg-gradient-to-r from-[#40B7F6] to-[#045A84]'
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={handleSaveNext}
                  disabled={currentQuestion === totalQuestions - 1}
                  className={`rounded-[12px] px-6 py-2 text-[18px] font-bold text-white ${
                    currentQuestion === totalQuestions - 1
                      ? 'cursor-not-allowed bg-[#B8C4CF]'
                      : 'bg-gradient-to-r from-[#40B7F6] to-[#045A84]'
                  }`}
                >
                  Save & Next
                </button>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#EEF2F8] px-6 py-3 font-semibold"
                >
                  <House size={18} />
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="relative w-full max-w-[930px] rounded-[24px] bg-white px-8 py-10 shadow-2xl md:px-12 md:py-12">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F6FB] text-[#1A1A1A] transition hover:bg-[#E8EEF8]"
            >
              <X size={20} />
            </button>

            <h3 className="mb-8 text-center font-['Montserrat'] text-[18px] font-semibold leading-none text-[#111]">
              Submit your test
            </h3>

            <div className="grid grid-cols-4 rounded-[18px] bg-[#EBF0FF] px-4 py-6 text-center font-['Montserrat'] text-[18px] font-medium leading-[1.6] text-[#1E1E1E]">
              <div>Section</div>
              <div>No of questions</div>
              <div>Answered</div>
              <div>Not Answered</div>
            </div>

            <div className="mt-5 grid grid-cols-4 items-center rounded-[18px] bg-white px-4 py-5 text-center font-['Montserrat'] text-[16px] font-semibold leading-none text-[#000000CC] shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
              <div>Test</div>
              <div>{totalQuestions}</div>
              <div>{String(answeredCount).padStart(2, '0')}</div>
              <div>{String(unansweredCount).padStart(2, '0')}</div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={handleFinalSubmit}
                disabled={submitMutation.isPending}
                style={{ background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)' }}
                className="min-w-[150px] rounded-full px-8 py-4 font-['Poppins'] text-[18px] font-semibold leading-none text-white md:min-w-[180px] disabled:opacity-60"
              >
                {submitMutation.isPending ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            {submitMutation.isError && (
              <p className="mt-4 text-center text-[14px] text-red-600">
                Failed to submit. Please try again.
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
