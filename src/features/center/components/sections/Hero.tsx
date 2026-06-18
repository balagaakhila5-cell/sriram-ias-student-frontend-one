'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { EmailLink, PhoneLink } from '@/components/common/ContactLinks';
import { getCenterBranchContact } from '@/utils/centerContact';
import {
  formatCenterDisplayName,
  type CenterCity,
} from '@/features/center/data/centerCourseCategories';

interface Props {
  city: string;
}

const CENTER_HERO_IMAGES: Record<CenterCity, string> = {
  delhi: '/assets/Delhi-img.png',
  hyderabad: '/assets/hyd.png',
  pune: '/assets/pune.png',
};

const CENTER_HERO_COPY: Record<CenterCity, string> = {
  delhi:
    "Powering North India's UPSC aspirations, SRIRAM's IAS New Delhi center brings our signature mentorship, academic rigor, and proven results closer to the region's civil services aspirants.",
  hyderabad:
    "Supporting South India's brightest minds, SRIRAM's IAS Hyderabad center offers trusted guidance, structured preparation, and expert faculty for your UPSC Civil Services journey.",
  pune:
    "Guiding aspirants across Western India, SRIRAM's IAS Pune center delivers focused mentorship, comprehensive programs, and a proven path to UPSC success.",
};

const Hero: React.FC<Props> = ({ city }) => {
  const cityKey = city.toLowerCase() as CenterCity;
  const cityName = formatCenterDisplayName(city);
  const branchContact = getCenterBranchContact(city);
  const heroImage = CENTER_HERO_IMAGES[cityKey] ?? CENTER_HERO_IMAGES.delhi;
  const heroCopy = CENTER_HERO_COPY[cityKey] ?? CENTER_HERO_COPY.delhi;
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

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

      gsap.from('.center-hero-image-wrap', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.25,
      });
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#121212] pt-[88px] md:pt-[92px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(32,160,224,0.12),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(162,164,251,0.08),transparent_38%)]" />

      <div className="relative z-10 mx-auto grid min-h-[min(88vh,860px)] w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:px-12 lg:py-14 xl:px-16">
        <div className="flex min-w-0 flex-col justify-center text-left">
          <p className="mb-3 font-['Montserrat'] text-[12px] font-bold uppercase tracking-[0.22em] text-[#7eb8e8] sm:text-[13px]">
            SRIRAM&apos;s IAS Center
          </p>

          <h1 className="center-hero-title font-['Montserrat'] text-[34px] font-[900] uppercase leading-[1.05] tracking-[0.02em] text-white sm:text-[42px] md:text-[48px] lg:text-[54px]">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#7eb8e8] via-[#A2A4FB] to-[#c8c9ff] bg-clip-text text-transparent">
              {cityName}
            </span>
          </h1>

          <p className="center-hero-description mt-5 max-w-[620px] font-['Montserrat'] text-[15px] font-medium leading-[1.75] text-white/78 sm:text-[16px] md:mt-6 md:text-[17px] md:leading-[1.8]">
            {heroCopy}
          </p>

          <div className="center-hero-contact mt-7 flex flex-col gap-4 font-['Montserrat'] text-[16px] font-bold text-white sm:flex-row sm:flex-wrap sm:gap-8 md:mt-8 md:text-[17px]">
            <PhoneLink
              value={branchContact.phone}
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
                <path d="M22 16.92V21C22 21.5523 21.5523 22 21 22C10.5066 22 2 13.4934 2 3C2 2.44772 2.44772 2 3 2H7.08C7.58739 2 8.01602 2.37877 8.0732 2.88392C8.16377 3.68449 8.35467 4.46467 8.63878 5.20573C8.80373 5.63604 8.70775 6.12467 8.38466 6.44776L6.5 8.33235C7.94273 11.2372 10.3204 13.6149 13.2253 15.0576L15.1099 13.173C15.433 12.8499 15.9216 12.7539 16.3519 12.9189C17.093 13.203 17.8732 13.3939 18.6737 13.4845C19.1789 13.5416 19.5576 13.9703 19.5576 14.4776V18.5576C19.5576 19.11 19.11 19.5576 18.5576 19.5576H22V16.92Z" />
              </svg>
              {branchContact.phone}
            </PhoneLink>

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

        <div className="center-hero-image-wrap relative mx-auto flex w-full max-w-[560px] items-end justify-end lg:mx-0 lg:max-w-none lg:justify-end lg:pl-4">
          <div className="relative h-[300px] w-full sm:h-[360px] md:h-[420px] lg:h-[min(72vh,620px)] lg:w-[92%] xl:w-[88%]">
            <div
              className="pointer-events-none absolute right-[8%] top-[6%] z-20 h-[72px] w-[72px] rounded-sm bg-[#20A0E0]/90 sm:h-[88px] sm:w-[88px]"
              aria-hidden
            >
              <div className="grid h-full w-full grid-cols-4 gap-1.5 p-3">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-white/85"
                  />
                ))}
              </div>
            </div>

            <div
              className="pointer-events-none absolute bottom-[18%] left-[4%] z-20 h-[10px] w-[120px] bg-[#20A0E0] sm:w-[150px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-[12%] left-[10%] z-20 h-[10px] w-[90px] bg-[#005B88] sm:w-[110px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-[24%] right-[6%] z-20 h-[10px] w-[70px] bg-white/90"
              aria-hidden
            />

            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={heroImage}
                alt={`${cityName} center`}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 48vw"
                className="object-contain object-bottom object-right grayscale-[18%] contrast-[1.05]"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121212] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
