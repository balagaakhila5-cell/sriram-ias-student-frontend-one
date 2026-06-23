'use client';

import { useRef } from 'react';
import Image from '@/components/common/AppImage';
import Link from '@/components/common/AppLink';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FloatingActions from '@/components/common/FloatingActions';
import TrendingVideosCard from '@/components/common/TrendingVideosCard';
import DailyLearningTopicCarousel, {
  DAILY_LEARNING_BANNER_IMAGE,
  DAILY_LEARNING_IMAGE_SLIDES,
} from '@/features/currentAffairs/components/DailyLearningTopicCarousel';
import {
  RESOURCE_PAGE_HEADING_GRADIENT,
  CURRENT_AFFAIRS_SECTION_SHELL,
  CURRENT_AFFAIRS_SECTION_TEXTURE_OVERLAY,
} from '@/features/resources/components/cardStyles';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  {
    title: 'Daily Current Affairs',
    href: '/current-affairs/daily-current-affairs',
    border: 'border-[#E29A9A]',
    hoverBg: 'hover:bg-[#E29A9A] hover:border-[#E29A9A]',
    text: 'text-[#C77878]',
  },
  {
    title: 'Daily Practice Quiz',
    href: '/current-affairs/daily-practice-questions',
    border: 'border-[#7B72C4]',
    hoverBg: 'hover:bg-[#7B72C4] hover:border-[#7B72C4]',
    text: 'text-[#625BB0]',
  },
  {
    title: 'Monthly Magazine',
    href: '/current-affairs/monthly-magazine',
    border: 'border-[#91B25F]',
    hoverBg: 'hover:bg-[#91B25F] hover:border-[#91B25F]',
    text: 'text-[#73923F]',
  },
  {
    title: 'Infographics',
    href: '/current-affairs/infographics',
    border: 'border-[#38AEE5]',
    hoverBg: 'hover:bg-[#38AEE5] hover:border-[#38AEE5]',
    text: 'text-[#3380C4]',
  },
];

function QuickLinksCard() {
  return (
    <div className="rounded-[26px] bg-white/95 p-6 shadow-[0px_12px_30px_rgba(0,0,0,0.06)]">
      <h2 className="mb-6 text-center text-[34px] font-extrabold leading-none">
        <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Quick Links</span>
      </h2>

      <div className="space-y-4">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group flex min-h-[60px] items-center justify-center rounded-full border bg-white px-6 transition-all duration-300 hover:shadow-sm ${item.border} ${item.hoverBg}`}
          >
            <span
              className={`text-[16px] font-semibold transition-colors duration-300 ${item.text} group-hover:text-white`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DailyLearningPage() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.animate-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.animate-heading', start: 'top 85%' },
        },
      );

      gsap.fromTo(
        '.animate-carousel',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: '.animate-carousel', start: 'top 85%' },
        },
      );

      gsap.fromTo(
        '.animate-carousel-secondary',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: '.animate-carousel-secondary', start: 'top 85%' },
        },
      );

      gsap.fromTo(
        '.animate-sidebar',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.animate-sidebar', start: 'top 85%' },
        },
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <>
      <Header />

      <main
        ref={containerRef}
        className="w-full overflow-hidden bg-[#f2f6fa] font-['Montserrat',sans-serif]"
      >
        <section className="relative h-[280px] w-full overflow-hidden md:h-[340px] lg:h-[390px]">
          <Image
            src={DAILY_LEARNING_BANNER_IMAGE}
            alt="Daily Learning Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0)_100%)]" />
        </section>

        <section className={`${CURRENT_AFFAIRS_SECTION_SHELL} px-5 py-12 md:px-8 lg:px-12 xl:px-16`}>
          <div className={CURRENT_AFFAIRS_SECTION_TEXTURE_OVERLAY} aria-hidden />
          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">
              <div>
                <h1 className="animate-heading mb-10 text-center text-[36px] font-extrabold uppercase leading-none md:text-[48px] lg:text-[56px]">
                  <span className={RESOURCE_PAGE_HEADING_GRADIENT}>Daily Learning</span>
                </h1>

                <div className="animate-carousel flex flex-col items-center gap-10 px-2">
                  <DailyLearningTopicCarousel />
                  <div className="animate-carousel-secondary w-full">
                    <DailyLearningTopicCarousel topics={DAILY_LEARNING_IMAGE_SLIDES} />
                  </div>
                </div>
              </div>

              <aside className="animate-sidebar w-full xl:mt-[65px]">
                <div className="space-y-8">
                  <TrendingVideosCard />
                  <QuickLinksCard />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
