'use client';

import Image from 'next/image';
import Link from 'next/link';
import FreeResourcesCourseSlider from '@/components/common/FreeResourcesCourseSlider';
import { FREE_LEARNING_EXPLORE_HREFS } from '@/features/homepage/utils/homepageLinks';
import BlogsCalendar from '@/features/blogs/components/BlogsCalendar';
import { FOOTER_SOCIAL_LINKS } from '@/config/footerLinks';
import { BarChart3, BookOpenText, Lightbulb } from 'lucide-react';

type BlogsSidebarProps = {
  showTrendingVideos?: boolean;
  showCalendar?: boolean;
};

export default function BlogsSidebar({
  showTrendingVideos = false,
  showCalendar = true,
}: BlogsSidebarProps) {
  return (
    <div className="space-y-6">
      {showCalendar ? (
        <div className="hidden lg:block">
          <BlogsCalendar />
        </div>
      ) : null}

      <div className="rounded-[10px] bg-[#EEF3FF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-[1.02]">
        <h3 className="mb-3 text-center text-[30px] font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Daily Learning
          </span>
        </h3>

        <div className="relative h-[225px] overflow-hidden rounded-[8px]">
          <Image
            src="/assets/blogs/timer-image.png"
            alt="Daily Learning"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <Link
              href="/current-affairs/daily-practice-questions"
              className="inline-flex h-[38px] items-center justify-center rounded-full border border-white px-8 text-[14px] font-semibold text-white transition hover:bg-white/10"
            >
              Explore →
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <h3 className="mb-5 text-center text-[30px] font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Daily Quiz
          </span>
        </h3>

        <p className="mb-4 text-[18px] font-semibold text-black">
          Q . What is the capital of India?
        </p>

        {['Delhi', 'Mumbai', 'Hyderabad', 'Pune'].map((opt, i) => (
          <div
            key={opt}
            className={`mb-3 flex h-[49px] items-center rounded-[7px] border px-7 text-[14px] font-semibold ${
              i === 0 ? 'bg-[#EEF3FF]' : 'bg-white'
            }`}
          >
            {String.fromCharCode(65 + i)} .&nbsp;&nbsp; {opt}
          </div>
        ))}

        <div className="mt-8 flex justify-center">
          <Link
            href={FREE_LEARNING_EXPLORE_HREFS.dailyQuiz}
            className="inline-flex h-[45px] items-center justify-center rounded-full bg-gradient-to-r from-[#38AEE5] to-[#07344D] px-7 text-[18px] font-bold text-white transition hover:opacity-90"
          >
            Attempt Quiz →
          </Link>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <FreeResourcesCourseSlider />
      </div>

      {showTrendingVideos ? (
        <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
          <h3 className="mb-5 text-center text-[30px] font-extrabold leading-none">
            <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
              Trending Videos
            </span>
          </h3>

          {[1, 2].map((item) => (
            <div
              key={item}
              className="mb-4 flex gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="relative h-[96px] w-[160px] shrink-0 overflow-hidden rounded-[4px]">
                <Image
                  src="/assets/current-affairs/daily-current-affairs/trending-video.png"
                  alt="Daily Current Affairs"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-[16px] font-bold leading-[1.45] text-black sm:text-[17px]">
                  Daily Current Affairs - 16 March 2026
                </p>
              </div>
            </div>
          ))}

          <div className="mt-2 flex justify-center">
            <a
              href={FOOTER_SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[16px] font-semibold text-[#3380C4] underline underline-offset-2 transition-colors hover:text-[#1E6F9F]"
            >
              View All
            </a>
          </div>
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-[10px] bg-white px-5 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div
          className="pointer-events-none absolute right-[-30px] top-0 h-full w-[170px] opacity-60"
          style={{
            background:
              'repeating-radial-gradient(circle at top right, transparent 0, transparent 10px, rgba(203,166,95,0.35) 11px, transparent 12px)',
          }}
        />

        <h3 className="relative mb-8 text-center text-[30px] font-extrabold leading-none">
          <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
            Quick Links
          </span>
        </h3>

        <div className="relative space-y-5">
          <Link
            href="/current-affairs"
            className="group flex h-[58px] items-center justify-center gap-4 rounded-full border border-[#E47A7D] bg-white text-[17px] font-bold text-[#C76B70] transition-all duration-300 hover:bg-[#E47A7D] hover:text-white"
          >
            <Lightbulb
              size={26}
              className="transition-colors duration-300 group-hover:text-white"
            />
            Daily Current Affairs
          </Link>

          <Link
            href="/current-affairs/daily-practice-questions"
            className="group flex h-[58px] items-center justify-center gap-4 rounded-full border border-[#7F72C9] bg-white text-[17px] font-bold text-[#6962B4] transition-all duration-300 hover:bg-[#7F72C9] hover:text-white"
          >
            <BookOpenText
              size={26}
              className="transition-colors duration-300 group-hover:text-white"
            />
            Daily Practice Questions
          </Link>

          <Link
            href="/current-affairs/infographics"
            className="group flex h-[58px] items-center justify-center gap-4 rounded-full border border-[#7A9B42] bg-white text-[17px] font-bold text-[#5D842D] transition-all duration-300 hover:bg-[#7A9B42] hover:text-white"
          >
            <BarChart3
              size={26}
              className="transition-colors duration-300 group-hover:text-white"
            />
            Infographics
          </Link>
        </div>
      </div>
    </div>
  );
}
