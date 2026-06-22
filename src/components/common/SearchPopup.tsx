'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { courses } from '@/features/course/data/courses';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBookMentorship?: () => void;
}

const PLACEHOLDER = 'Which Course are you interested in ?';

const formatCourseTitle = (title: string) => title.replace(/\s+/g, ' ').trim();

const ALL_COURSE_ITEMS = courses.map((course) => ({
  id: course.slug,
  title: formatCourseTitle(course.title),
  href: `/course/${course.slug}`,
}));

const TRENDING_ITEMS = [
  'prelims-test-series-2026',
  'geography-optional-foundation',
  'psir-optional-foundation',
  'mains-enrichment-2025',
  'prelims-test-series-mentorship',
  'psir-optional-foundational',
]
  .map((slug) => ALL_COURSE_ITEMS.find((item) => item.id === slug))
  .filter((item): item is (typeof ALL_COURSE_ITEMS)[number] => Boolean(item));

function useTypewriterPlaceholder(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      setIsDeleting(false);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 70);
    } else if (!isDeleting && displayed.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1));
      }, 35);
    } else {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [active, displayed, isDeleting, text]);

  return displayed;
}

export default function SearchPopup({
  isOpen,
  onClose,
  onBookMentorship,
}: SearchPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const showTypewriter = !query && !isInputFocused;
  const typewriterText = useTypewriterPlaceholder(PLACEHOLDER, isOpen && showTypewriter);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setActiveQuery('');
      setIsInputFocused(false);
    }
  }, [isOpen]);

  const visibleCourses = useMemo(() => {
    const normalized = activeQuery.trim().toLowerCase();

    if (!normalized) {
      return TRENDING_ITEMS.length > 0 ? TRENDING_ITEMS : ALL_COURSE_ITEMS.slice(0, 6);
    }

    return ALL_COURSE_ITEMS.filter((course) =>
      course.title.toLowerCase().includes(normalized),
    );
  }, [activeQuery]);

  const handleSearch = () => {
    setActiveQuery(query.trim());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 right-0 top-[90px] z-[999] h-[calc(100vh-90px)] overflow-hidden">
      <div className="absolute inset-0 bg-white">
        <img
          src="/assets/backgroundAnimation.png"
          alt=""
          aria-hidden="true"
          className="search-bg-anim absolute inset-0 h-full w-full object-cover opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <div className="relative z-10 h-full overflow-y-auto px-8 py-20 lg:px-28">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-black hover:bg-black/20"
          aria-label="Close search"
        >
          <X size={22} />
        </button>

        <form onSubmit={handleSubmit} className="flex items-center gap-6">
          <div className="flex h-[56px] flex-1 items-center gap-4 rounded-[10px] bg-[#F4EAF4] px-6">
            <Search size={22} className="shrink-0 text-[#8C8C8C]" />
            <div className="relative min-w-0 flex-1">
              {showTypewriter ? (
                <span
                  className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-nowrap font-['Montserrat'] text-[18px] font-medium text-[#8C8C8C]"
                  aria-hidden="true"
                >
                  {typewriterText}
                  <span className="search-type-cursor ml-[1px] inline-block h-[18px] w-[2px] bg-[#8C8C8C]" />
                </span>
              ) : null}
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={isInputFocused ? PLACEHOLDER : ''}
                className="relative z-10 w-full border-none bg-transparent font-['Montserrat'] text-[18px] font-medium text-black outline-none placeholder:text-[#8C8C8C]"
                aria-label="Search courses"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-[56px] w-[185px] shrink-0 rounded-[8px] bg-[linear-gradient(90deg,#42A9D7_0%,#002D3E_100%)] text-[20px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="mb-8 font-['Montserrat'] text-[32px] font-[900] uppercase leading-none">
              <span className="bg-[linear-gradient(90deg,#20A0E0_0%,rgba(225,97,101,0.8)_100%)] bg-clip-text text-transparent">
                {activeQuery.trim() ? 'Search Results' : 'Trending Courses'}
              </span>
            </h2>

            <div className="w-full max-w-[740px] bg-white px-10 py-12 shadow-[0px_8px_35px_rgba(0,0,0,0.12)]">
              {visibleCourses.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                  {visibleCourses.map((course) => (
                    <Link
                      key={`${course.id}-${course.title}`}
                      href={course.href}
                      onClick={onClose}
                      className="group flex items-start gap-3 transition-opacity hover:opacity-80"
                    >
                      <img
                        src="/assets/course/course-icon.png"
                        alt=""
                        aria-hidden="true"
                        className="mt-[2px] h-[20px] w-[20px] shrink-0 object-contain"
                      />

                      <span className="max-w-[230px] font-['Montserrat'] text-[15px] font-medium leading-[22px] text-black group-hover:text-[#1897D8]">
                        {course.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="font-['Montserrat'] text-[16px] font-medium text-[#666666]">
                  No courses found for &quot;{activeQuery}&quot;. Try a different keyword.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-[330px] w-full overflow-hidden shadow-[0px_8px_25px_rgba(0,0,0,0.12)]">
              <Image
                src="/assets/our_story.png"
                alt="Sriram IAS"
                width={600}
                height={380}
                className="h-full w-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookMentorship?.();
              }}
              className="mt-12 h-[52px] w-full max-w-[455px] rounded-[6px] bg-[linear-gradient(90deg,#42A9D7_0%,#002D3E_100%)] text-[19px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Book Free 1:1 Mentorship Session
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bgFloat {
          0%   { transform: scale(1.08) translate(0px, 0px); }
          25%  { transform: scale(1.12) translate(-10px, -6px); }
          50%  { transform: scale(1.10) translate(8px, -12px); }
          75%  { transform: scale(1.13) translate(-6px, 6px); }
          100% { transform: scale(1.08) translate(0px, 0px); }
        }

        .search-bg-anim {
          animation: bgFloat 8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes searchCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .search-type-cursor {
          animation: searchCursorBlink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
