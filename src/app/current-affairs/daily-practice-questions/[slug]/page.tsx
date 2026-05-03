'use client';

import React, { use, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock3, FileText, House, X } from 'lucide-react';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type Question = {
  id: number;
  question: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the capital of India?',
    options: ['Delhi', 'Mumbai', 'Chennai', 'Pune'],
  },
  {
    id: 2,
    question: 'Who is known as the Father of Nation?',
    options: ['Mahatma Gandhi', 'Nehru', 'Subhash Chandra Bose', 'Patel'],
  },
  {
    id: 3,
    question: 'Which planet is called Red Planet?',
    options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
  },
  {
    id: 4,
    question: 'How many states are there in India?',
    options: ['28', '29', '30', '27'],
  },
  {
    id: 5,
    question: 'National animal of India?',
    options: ['Lion', 'Tiger', 'Elephant', 'Leopard'],
  },
  {
    id: 6,
    question: 'Who wrote Ramayana?',
    options: ['Valmiki', 'Tulsidas', 'Veda Vyasa', 'Kalidas'],
  },
  {
    id: 7,
    question: 'Which gas do plants absorb?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
  },
  {
    id: 8,
    question: 'Largest ocean in the world?',
    options: ['Indian', 'Pacific', 'Atlantic', 'Arctic'],
  },
  {
    id: 9,
    question: 'Currency of Japan?',
    options: ['Won', 'Yen', 'Dollar', 'Euro'],
  },
  {
    id: 10,
    question: 'Who invented bulb?',
    options: ['Newton', 'Edison', 'Tesla', 'Einstein'],
  },
  {
    id: 11,
    question: 'Fastest land animal?',
    options: ['Tiger', 'Cheetah', 'Horse', 'Leopard'],
  },
  {
    id: 12,
    question: 'Which is smallest continent?',
    options: ['Europe', 'Australia', 'Africa', 'Asia'],
  },
  {
    id: 13,
    question: 'Who is current PM of India?',
    options: ['Rahul Gandhi', 'Narendra Modi', 'Amit Shah', 'Yogi'],
  },
  {
    id: 14,
    question: 'Which is national flower of India?',
    options: ['Rose', 'Lotus', 'Sunflower', 'Lily'],
  },
  {
    id: 15,
    question: 'Which river is longest in India?',
    options: ['Yamuna', 'Ganga', 'Godavari', 'Krishna'],
  },
];

const correctAnswers: Record<number, number> = {
  1: 0,
  2: 0,
  3: 1,
  4: 0,
  5: 1,
  6: 0,
  7: 1,
  8: 1,
  9: 1,
  10: 1,
  11: 1,
  12: 1,
  13: 1,
  14: 1,
  15: 1,
};

function formatTitle(slug: string) {
  return slug
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

export default function DailyPracticeQuestionTestPage({
  params,
}: PageProps) {
  const resolved = use(params);
  const slug = resolved.slug;
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  );
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const title = useMemo(() => formatTitle(slug), [slug]);
  const question = questions[currentQuestion];

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSaveNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinalSubmit = () => {
    let correctCount = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] === correctAnswers[q.id]) {
        correctCount++;
      }
    });

    const incorrectCount = answeredCount - correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let grade = 'D';
    if (percentage >= 75) grade = 'A';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 45) grade = 'C';

    const testData = {
      slug,
      title,
      questions,
      correctAnswers,
      selectedAnswers,
      totalQuestions,
      answeredCount,
      unansweredCount,
      correctCount,
      incorrectCount,
      percentage,
      grade,
      time: '1 Hr',
      rank: getRankFromCorrectAnswers(correctCount),
    };

    localStorage.setItem(`test-review-${slug}`, JSON.stringify(testData));

    router.push(`/current-affairs/daily-practice-questions/${slug}/results`);
  };
  function getRankFromCorrectAnswers(correctCount: number) {
  if (correctCount >= 15) return '1';
  if (correctCount === 14) return '8';
  if (correctCount === 13) return '15';
  if (correctCount === 12) return '24';
  if (correctCount === 11) return '32';
  if (correctCount === 10) return '45';
  if (correctCount === 9) return '58';
  if (correctCount === 8) return '70';
  if (correctCount === 7) return '82';
  if (correctCount === 6) return '90';
  return '100';
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
            {/* Orange Divider imitating the emblem layout */}
            <div className="w-[1px] md:w-[2px] h-8 md:h-10 lg:h-[48px] bg-[#FF6B00] hidden md:block"></div>
            <img
              src="/assets/Logo.png"
              alt="SRIRAM's IAS"
              className="h-10 md:h-12 lg:h-[68px] object-contain transition-transform hover:scale-105 -ml-1.5 md:-ml-4"
            />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <div className="flex items-center gap-2 text-[17px] font-medium">
              <span className="rounded-md bg-[#EFF3FF] px-3 py-2 font-bold">01:</span>
              <span className="rounded-md bg-[#EFF3FF] px-3 py-2 font-bold">00:</span>
              <span className="rounded-md bg-[#EFF3FF] px-3 py-2 font-bold">00</span>

              <span className="ml-2 text-[16px] font-semibold">Time Left</span>
            </div>

            <div className="h-7 w-[1px] bg-[#D8D8D8]" />

            <div className="flex items-center gap-2 text-[18px] font-semibold text-[#00000080]">
              <Clock3 size={18} />
              1 Hour
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
          {/* <h2 className="mb-6 text-center text-[24px] font-bold">{title}</h2> */}

          <div className="mb-4 flex justify-center gap-4 border-b border-[#ECECEC] pb-4">
            {questions.map((item, index) => {
              const active = currentQuestion === index;
              const isAnswered = selectedAnswers[item.id] !== undefined;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentQuestion(index)}
               className={`h-[45px] min-w-[60px] rounded-[8px] text-[18px] font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#37ACEE] to-[#045B84] text-white shadow-lg'
                      : isAnswered
                      ? 'bg-[#EAF6FF] text-[#045B84] shadow'
                      : 'bg-white text-black shadow'
                  }`}
                >
                  {item.id}
                </button>
              );
            })}
          </div>

          <div className="rounded-[24px] bg-white px-8 py-10 shadow-sm">
            <h3 className="mb-4 text-[18px] font-semibold">Question {question.id}</h3>

            <p className="mb-6 text-[18px] font-semibold">
              Q . {question.question}
            </p>

            <div className="space-y-4">
              {question.options.map((option, i) => {
                const isSelected = selectedAnswers[question.id] === i;

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(question.id, i)}
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
                disabled={currentQuestion === questions.length - 1}
                className={`rounded-[12px] px-6 py-2 text-[18px] font-bold text-white ${
                  currentQuestion === questions.length - 1
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
                style={{ background: 'linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)' }}
                className="min-w-[150px] rounded-full px-8 py-4 font-['Poppins'] text-[18px] font-semibold leading-none text-white md:min-w-[180px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}