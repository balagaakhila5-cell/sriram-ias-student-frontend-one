'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { EmailLink } from '@/components/common/ContactLinks';
import { getCenterBranchContact } from '@/utils/centerContact';
import {
  formatCenterDisplayName,
  type CenterCity,
} from '@/features/center/data/centerCourseCategories';

interface Props {
  city: string;
}

const CENTER_HERO_IMAGES: Record<CenterCity, string> = {
  delhi: '/assets/our-centers/new-delhi-image.jpeg',
  hyderabad: '/assets/our-centers/charminar-image.jpeg',
  pune: '/assets/our-centers/pune-historical-icon-1.png',
};

const CENTER_HERO_COPY: Record<CenterCity, string> = {
  delhi:
    "Powering North India's UPSC aspirations, SRIRAM's IAS New Delhi center brings our signature mentorship, academic rigor, and proven results closer to the region's civil services aspirants.",
  hyderabad:
    "Supporting South India's brightest minds, SRIRAM's IAS Hyderabad center offers trusted guidance, structured preparation, and expert faculty for your UPSC Civil Services journey.",
  pune:
    "Guiding aspirants across Western India, SRIRAM's IAS Pune center delivers focused mentorship, comprehensive programs, and a proven path to UPSC success.",
};

function CenterHeroDecorations({ cityKey }: { cityKey: CenterCity }) {
  const isPune = cityKey === 'pune';

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {isPune && (
        <>
          <div className="center-hero-monument-shimmer absolute inset-y-0 right-0 w-[58%] opacity-0" />
          <div className="center-hero-monument-glow absolute bottom-[8%] right-[4%] h-[min(42vw,320px)] w-[min(42vw,320px)] rounded-full opacity-0" />
        </>
      )}
      <div
        className="center-hero-glow absolute -right-[8%] top-[10%] h-[min(52vw,420px)] w-[min(52vw,420px)] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(126,184,232,0.2) 0%, rgba(162,164,251,0.1) 45%, transparent 72%)',
        }}
      />
      <div
        className="center-hero-glow absolute bottom-[14%] right-[6%] h-[min(34vw,240px)] w-[min(34vw,240px)] rounded-full opacity-70"
        style={{
          background:
            'linear-gradient(135deg, rgba(24,151,216,0.14) 0%, rgba(162,164,251,0.12) 55%, transparent 100%)',
          boxShadow: '0 0 60px rgba(126,184,232,0.15)',
        }}
      />
      <div className="center-hero-glow absolute bottom-[38%] right-[20%] h-20 w-20 rounded-full bg-[#7eb8e8]/15 blur-2xl sm:h-28 sm:w-28" />
      <div className="center-hero-glow absolute right-[30%] top-[24%] h-10 w-10 rounded-full bg-[#A2A4FB]/25 blur-xl sm:h-14 sm:w-14" />
      <div
        className="center-hero-glow absolute bottom-[6%] right-[22%] h-[min(30vw,180px)] w-[min(30vw,180px)] rounded-full opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
          WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 72%)',
          maskImage: 'radial-gradient(circle, black 55%, transparent 72%)',
        }}
      />
    </div>
  );
}

const Hero: React.FC<Props> = ({ city }) => {
  const cityKey = city.toLowerCase() as CenterCity;
  const cityName = formatCenterDisplayName(city);
  const branchContact = getCenterBranchContact(city);
  const heroImage = CENTER_HERO_IMAGES[cityKey] ?? CENTER_HERO_IMAGES.delhi;
  const heroCopy = CENTER_HERO_COPY[cityKey] ?? CENTER_HERO_COPY.delhi;
  const isPune = cityKey === 'pune';
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        if (isPune) {
          gsap.set('.center-hero-monument-shimmer', { opacity: 0.35, xPercent: 0 });
          gsap.set('.center-hero-monument-glow', { opacity: 0.7, scale: 1 });
        }
        return;
      }

      gsap.from('.center-hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
      });

      gsap.from('.center-hero-description', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.35,
      });

      gsap.from('.center-hero-contact', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
      });

      gsap.from('.center-hero-bg-image', {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.25,
      });

      if (isPune) {
        gsap.fromTo(
          '.center-hero-monument-shimmer',
          { opacity: 0, xPercent: -12 },
          {
            opacity: 0.55,
            xPercent: 0,
            duration: 2.2,
            ease: 'power2.inOut',
            delay: 0.35,
          },
        );

        gsap.fromTo(
          '.center-hero-monument-glow',
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
            delay: 0.5,
          },
        );

        gsap.to('.center-hero-monument-glow', {
          opacity: 0.65,
          scale: 1.06,
          duration: 5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2.2,
        });
      }

      gsap.from('.center-hero-glow', {
        scale: 0.9,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.2,
      });
    },
    { dependencies: [prefersReducedMotion, isPune], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#121212] pt-[88px] md:pt-[92px]"
    >
      <div className="center-hero-bg-image pointer-events-none absolute inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="center-hero-bg-photo object-cover object-right"
            aria-hidden
          />
        </div>

        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(to right, #121212 0%, #121212 42%, rgba(18,18,18,0.85) 58%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'linear-gradient(to right, #121212 0%, rgba(18,18,18,0.92) 38%, rgba(18,18,18,0.45) 55%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #121212 0%, rgba(18,18,18,0.55) 18%, transparent 40%)',
          }}
        />

        <CenterHeroDecorations cityKey={cityKey} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(88vh,860px)] w-full max-w-[1440px] items-center px-4 py-10 sm:px-6 md:px-10 lg:px-12 lg:py-14 xl:px-16">
        <div className="flex w-full max-w-[720px] flex-col justify-center text-left">
          <h1 className="center-hero-title whitespace-nowrap font-['Montserrat'] text-[30px] font-[900] uppercase leading-[1.05] tracking-[0.02em] text-white sm:text-[40px] md:text-[46px] lg:text-[52px]">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#7eb8e8] via-[#A2A4FB] to-[#c8c9ff] bg-clip-text text-transparent">
              {cityName}
            </span>
          </h1>

          <p className="center-hero-description mt-5 max-w-[620px] font-['Montserrat'] text-[15px] font-medium leading-[1.75] text-white/78 sm:text-[16px] md:mt-6 md:text-[17px] md:leading-[1.8]">
            {heroCopy}
          </p>

          <div className="center-hero-contact mt-7 flex flex-col gap-4 font-['Montserrat'] text-[16px] font-bold text-white sm:flex-row sm:flex-wrap sm:gap-8 md:mt-8 md:text-[17px]">
            <span className="flex items-center gap-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M22 16.92V21C22 21.5523 21.5523 22 21 22C10.5066 22 2 13.4934 2 3C2 2.44772 2.44772 2 3 2H7.08C7.58739 2 8.01602 2.37877 8.0732 2.88392C8.16377 3.68449 8.35467 4.46467 8.63878 5.20573C8.80373 5.63604 8.70775 6.12467 8.38466 6.44776L6.5 8.33235C7.94273 11.2372 10.3204 13.6149 13.2253 15.0576L15.1099 13.173C15.433 12.8499 15.9216 12.7539 16.3519 12.9189C17.093 13.203 17.8732 13.3939 18.6737 13.4845C19.1789 13.5416 19.5576 13.9703 19.5576 14.4776V18.5576C19.5576 19.11 19.11 19.5576 18.5576 19.5576H22V16.92Z" />
              </svg>
              {branchContact.phone}
            </span>

            <EmailLink
              value={branchContact.email}
              className="flex items-center gap-3 hover:text-[#A2A4FB] hover:underline"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#121212"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {branchContact.email}
            </EmailLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
