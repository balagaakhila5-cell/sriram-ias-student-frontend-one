'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Bookmark, Share2, ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    title: 'How to Stay Consistent Efficiently ?',
    date: 'Mar 23 , 2026',
    image: '/assets/blogs/book1.png',
  },
  {
    title: 'How to Stay Consistent Efficiently ?',
    date: 'Mar 23 , 2026',
    image: '/assets/blogs/book2.png',
  },
  {
    title: 'How to Stay Consistent Efficiently ?',
    date: 'Mar 23 , 2026',
    image: '/assets/blogs/cup-image.png',
  },
];

const gsPapers = [
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/cup-image.png',
  '/assets/blogs/hand-image.png',
  '/assets/blogs/image-4.png',
  '/assets/blogs/cup-image.png',
  '/assets/blogs/book1.png',
  '/assets/blogs/book2.png',
  '/assets/blogs/hand-image.png'
];

const dates = [
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ['28', '29', '30', '31', '01', '02', '03'],
  ['04', '05', '06', '07', '08', '09', '10'],
  ['11', '12', '13', '14', '15', '16', '17'],
  ['18', '19', '20', '21', '22', '23', '24'],
  ['25', '26', '27', '28', '29', '30', '01'],
];

export default function BlogsPage() {
  const [activeLang, setActiveLang] = useState('ENGLISH');
  const [selectedDate, setSelectedDate] = useState('13');
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main motivation card
      gsap.fromTo(
        '.blog-main-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.blog-main-card', start: 'top 85%', once: true },
        }
      );

      // Blog grid cards
      gsap.utils.toArray<HTMLElement>('.blog-grid-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)',
            delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }
        );
      });

      // GS paper cards
      gsap.utils.toArray<HTMLElement>('.gs-grid-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)',
            delay: i * 0.06,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header />

      <main ref={mainRef} className="min-h-screen bg-white font-['Montserrat',sans-serif]">
        {/* Banner */}
        <section className="relative h-[360px] w-full overflow-hidden">
          <Image
            src="/assets/blogs/blogs-banner.png"
            alt="Blogs Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <h1 className="absolute left-[28px] top-[200px] text-[48px] font-black uppercase leading-none">
            <span className="bg-gradient-to-r from-white via-[#c9c4ff] to-[#8f8cff] bg-clip-text text-transparent ml-10">
              BLOGS
            </span>
          </h1>
        </section>

        <section className="relative px-9 py-12">
          <div className="mx-auto grid max-w-[1420px] grid-cols-1 gap-10 lg:grid-cols-[1fr_335px]">
            {/* Left */}
            <div>
              {/* Language buttons */}
              <div className="mb-8 flex justify-center gap-3">
                {['ENGLISH', 'MARATHI', 'TELUGU'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`h-[46px] min-w-[130px] rounded-[8px] text-[18px] font-semibold transition-all duration-300 ${activeLang === lang
                      ? 'bg-gradient-to-r from-[#37AEEB] to-[#032C42] text-white shadow-md font-bold'
                      : 'bg-white text-[#111] shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:scale-[1.03]'
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Main Motivation Card */}
              <div
                className="blog-main-card group mb-8 flex rounded-[10px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                style={{ backgroundColor: '#FAF3EA', transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = '#FEF2E5'; el.style.transform = 'translateY(-8px) scale(1.02)'; el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = '#FAF3EA'; el.style.transform = ''; el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; }}
              >
                <div className="w-[210px] shrink-0">
                  <Image
                    src="/assets/blogs/laptop-image.png"
                    alt="Laptop"
                    width={210}
                    height={195}
                    className="h-[195px] w-[210px] rounded-[8px] object-cover"
                  />
                  <p className="mt-5 text-[15px] font-bold text-black">
                    Mar 23 , 2026
                  </p>
                </div>

                <div className="relative flex flex-1 flex-col px-8">
                  <Bookmark className="absolute right-0 top-0 h-8 w-8 text-[#5C5C5C]" />

                  <h2 className="mb-5 mt-5 text-[18px] font-extrabold leading-[1.3] text-[#333]">
                    Why Discipline Beats Motivation Every Time ?
                  </h2>

                  <p className="max-w-[620px] text-[16px] font-medium leading-[1.8] text-[#00000099]">
                    Motivation feels powerful, but it’s unreliable. It comes and goes
                    depending on mood, energy, and external circumstances. One day you
                    feel unstoppable, the next day even small tasks feel heavy. If you rely
                    only on motivation, your progress becomes
                  </p>

                  <div className="mt-3 flex items-end justify-end gap-12 pr-2">
                    <Link
                      href="/blogs/discipline-beats-motivation"
                      className="mb-3 flex h-[38px] min-w-[112px] items-center justify-center gap-2 rounded-full border border-[#159DE2] bg-white text-[16px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#159DE2] hover:text-white"
                    >
                      Read <ArrowRight size={16} />
                    </Link>

                    <button className="flex items-center gap-2 text-[15px] font-bold text-black">
                      <Share2 size={22} />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Only 3 blog cards */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog, index) => (
                  <div
                    key={index}
                    className="blog-grid-card group relative h-[245px] overflow-hidden rounded-[9px] shadow-md"
                    style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-8px) scale(1.02)'; el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.18)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; }}
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30 " />

                    <div className="absolute right-5 top-4 flex gap-3">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white">
                        <Bookmark size={24} />
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white">
                        <Share2 size={22} />
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-6 right-5">
                      <h3 className="mb-4 text-[18px] font-extrabold leading-[1.45] text-white">
                        {blog.title}
                      </h3>

                      <p className="mb-4 text-[14px] font-bold text-white">
                        {blog.date}
                      </p>

                      <button className="mt-2 flex h-[38px] min-w-[112px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-semibold text-[#148ED1] transition-all duration-300 hover:bg-[#148ED1] hover:text-white">
                        Read <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All */}
              <div className="mt-8 flex justify-end">
                <button className="h-[46px] min-w-[150px] rounded-full bg-gradient-to-r from-[#2BA7DF] to-[#052F44] text-[18px] font-semibold text-white shadow-md transition-all duration-300 hover:scale-105">
                  View All
                </button>
              </div>

              {/* Explore GS Paper Wise */}
              <section className="mt-16">
                <div className="w-full text-center mb-8">
                  <h2 className="font-black uppercase leading-none global-section-heading">
                    EXPLORE GS PAPER WISE
                  </h2>
                </div>

                <div className="mb-10 flex justify-center gap-4">
                  {['GS I', 'GS II', 'GS III', 'GS IV'].map((tab, index) => (
                    <button
                      key={tab}
                      className={`h-[46px] min-w-[130px] rounded-[8px] text-[18px] font-semibold shadow-md ${index === 0
                        ? 'bg-gradient-to-r from-[#37AEEB] to-[#032C42] text-white'
                        : 'bg-white text-black'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {gsPapers.map((image, index) => (
                    <div
                      key={index}
                      className="gs-grid-card group relative h-[245px] overflow-hidden rounded-[9px] shadow-md"
                      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-8px) scale(1.02)'; el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.18)'; }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.transform = ''; el.style.boxShadow = ''; }}
                    >
                      <Image
                        src={image}
                        alt="GS Paper"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-black/30 " />

                      <div className="absolute right-5 top-4 flex gap-3">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white">
                          <Bookmark size={24} />
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white">
                          <Share2 size={22} />
                        </button>
                      </div>

                      <div className="absolute bottom-6 left-6 right-5">
                        <h3 className="mb-4 text-[18px] font-extrabold leading-[1.45] text-white">
                          How to Stay Consistent Efficiently ?
                        </h3>

                        <p className="mb-4 text-[14px] font-bold text-white">
                          Mar 23 , 2026
                        </p>

                        <Link
                          href="/blogs/discipline-beats-motivation"
                          className="flex h-[38px] min-w-[112px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#148ED1]"
                        >
                          Read <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="space-y-5">
              {/* Calendar */}
              <div className="rounded-[10px] bg-white px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <div className="mb-6 flex gap-3">
                  <button className="flex h-[44px] flex-1 items-center justify-center gap-3 rounded-full bg-[#EFF3FF] text-[18px] font-bold shadow-md">
                    2026 <ChevronDown size={17} strokeWidth={3} />
                  </button>

                  <button className="flex h-[44px] flex-1 items-center justify-center gap-3 rounded-full bg-[#EFF3FF] text-[18px] font-bold shadow-md">
                    April <ChevronDown size={17} strokeWidth={3} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-x-2 gap-y-4 text-center text-[15px] font-bold">
                  {dates.flat().map((item, index) => {
                    const isDayName = index < 7;
                    const isOutsideMonth =
                      (index >= 7 && index <= 10) || index === 41;
                    const isSelected =
                      selectedDate === item && !isDayName && !isOutsideMonth;

                    return (
                      <button
                        key={index}
                        disabled={isDayName || isOutsideMonth}
                        onClick={() => setSelectedDate(item)}
                        className={`flex h-[34px] items-center justify-center rounded-[6px] text-[15px] transition-all duration-300 ${isSelected
                          ? 'bg-[#1EB6F1] text-white font-bold'
                          : isDayName
                            ? 'cursor-default text-[#A7A7A7] font-semibold'
                            : isOutsideMonth
                              ? 'cursor-default text-[#A9A9A9] font-bold opacity-60'
                              : 'text-black font-bold hover:bg-[#EFF3FF]'
                          }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Daily Learning */}
              <div className="rounded-[10px] bg-[#EEF3FF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h3 className="mb-3 text-center text-[28px] font-extrabold leading-none">
                  <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                    Daily Learning
                  </span>
                </h3>

                <div className="relative h-[210px] overflow-hidden rounded-[8px]">
                  <Image
                    src="/assets/blogs/timer-image.png"
                    alt="Daily Learning"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                    <button className="h-[36px] rounded-full border border-white px-7 text-[14px] font-semibold text-white">
                      Explore →
                    </button>
                  </div>
                </div>
              </div>

              {/* Daily Quiz */}
              <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h3 className="mb-5 text-center text-[28px] font-extrabold leading-none">
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
                    className={`mb-3 flex h-[49px] items-center rounded-[7px] border px-7 text-[14px] font-semibold ${i === 0 ? 'bg-[#EEF3FF]' : 'bg-white'
                      }`}
                  >
                    {String.fromCharCode(65 + i)} .&nbsp;&nbsp; {opt}
                  </div>
                ))}
              </div>

              {/* Courses */}
              <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h3 className="mb-3 text-center text-[26px] font-extrabold leading-none">
                  <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                    Courses
                  </span>
                </h3>

                <div className="relative h-[215px] overflow-hidden rounded-[8px]">
                  <Image
                    src="/assets/blogs/Course card.png"
                    alt="Course"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Trending Videos */}
              <div className="rounded-[10px] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h3 className="mb-5 text-center text-[26px] font-extrabold leading-none">
                  <span className="bg-gradient-to-r from-[#349EE3] to-[#D36B7B] bg-clip-text text-transparent">
                    Trending Videos
                  </span>
                </h3>

                {[1, 2].map((item) => (
                  <div key={item} className="mb-4 flex gap-4 border-b pb-4 last:border-b-0">
                    <Image
                      src="/assets/blogs/trending-video.png"
                      alt="Trending Video"
                      width={145}
                      height={78}
                      className="h-[78px] w-[145px] rounded-[4px] object-cover"
                    />
                    <div>
                      <p className="text-[13px] font-bold leading-[1.4] text-black">
                        Daily Current Affairs - 16 March 2026
                      </p>
                      <p className="mt-2 text-[13px] font-medium text-[#666]">
                        ▶ Youtube
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}