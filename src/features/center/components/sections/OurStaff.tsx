'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface StaffMember {
  id: number;
  name: string;
  bg: string;
  image: string;
}

interface Props {
  city: string;
}

const STAFF_NAME = 'Kotla Darshan';

const FEATURED_INFO = {
  title: 'Center Head - Social Studies',
  experience: '20+ Years of Experience in Social',
  points: [
    'Mentored AIR Students',
    'PhD in Delhi University in Sociology',
    'Built strong conceptual foundation',
  ],
};

/** Four person images — slot 0 = featured (left), slots 1–3 = thumbnails (right) */
const STAFF_MEMBERS: StaffMember[] = [
  {
    id: 1,
    name: STAFF_NAME,
    bg: 'bg-[#D3DAE8]',
    image: '/assets/our-centers/person-2.png',
  },
  {
    id: 2,
    name: STAFF_NAME,
    bg: 'bg-[#ECA01D]',
    image: '/assets/our-centers/person-1.png',
  },
  {
    id: 3,
    name: STAFF_NAME,
    bg: 'bg-[#8E74A2]',
    image: '/assets/our-centers/person-3.png',
  },
  {
    id: 4,
    name: STAFF_NAME,
    bg: 'bg-[#B8A4C8]',
    image: '/assets/our-centers/person-4.png',
  },
];

const INITIAL_SLOT_ORDER = [0, 1, 2, 3];

const OurStaff: React.FC<Props> = ({ city: _city }) => {
  const containerRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [slotOrder, setSlotOrder] = useState<number[]>(INITIAL_SLOT_ORDER);

  const featuredStaff = STAFF_MEMBERS[slotOrder[0]];
  const thumbnailSlots = slotOrder.slice(1);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from('.our-staff-heading', {
        y: 70,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          once: true,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>('.our-staff-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: 'power3.out',
            delay: index * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          },
        );
      });
    },
    { dependencies: [prefersReducedMotion], scope: containerRef },
  );

  const animateFeaturedSwap = () => {
    if (prefersReducedMotion || !featuredRef.current) return;

    gsap.fromTo(
      featuredRef.current,
      { opacity: 0.5, x: -16 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
    );
  };

  const handleThumbnailClick = (thumbnailIndex: number) => {
    const slotIndex = thumbnailIndex + 1;

    setSlotOrder((prev) => {
      const next = [...prev];
      [next[0], next[slotIndex]] = [next[slotIndex], next[0]];
      return next;
    });
    animateFeaturedSwap();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-white py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-image-placeholder opacity-40"
        style={{
          backgroundImage: "url('/assets/our-centers/our-staff-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-4 sm:px-6 lg:px-12">
        <div className="our-staff-heading mx-auto mb-16 w-full max-w-4xl text-center">
          <h2 className="relative z-10 mb-6 font-['Montserrat'] text-[36px] font-[900] uppercase tracking-wider md:text-[50px]">
            <span className="bg-gradient-to-r from-[#20A0E0] to-[rgba(225,97,101,0.8)] bg-clip-text text-transparent">
              OUR STAFF
            </span>
          </h2>

          <p className="text-lg font-medium text-gray-700 md:text-xl">
            Backed by a team of committed professionals, we provide continuous
            support, expert guidance, and personalized attention to help you
            excel in every stage of the UPSC process.
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row lg:gap-8">
          {/* Featured card — slot 0 */}
          <div
            ref={featuredRef}
            key={`featured-${slotOrder[0]}`}
            className="our-staff-card flex w-full shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:flex-row lg:w-[46%]"
          >
            <div
              className={`relative h-[300px] w-full shrink-0 sm:h-[340px] sm:w-[240px] ${featuredStaff.bg}`}
            >
              <Image
                unoptimized
                src={featuredStaff.image}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-contain object-center p-4"
                alt={featuredStaff.name}
              />
            </div>

            <div className="flex w-full flex-col justify-center bg-white p-6 md:p-8">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                {STAFF_NAME}
              </h3>
              <p className="mb-4 text-sm font-medium text-gray-600">
                {FEATURED_INFO.title}
              </p>
              <p className="mb-8 text-sm font-medium text-gray-600">
                {FEATURED_INFO.experience}
              </p>

              <ul className="flex flex-col gap-4 text-sm font-medium text-gray-800">
                {FEATURED_INFO.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg
                      className="mt-[2px] h-5 w-5 shrink-0 text-[#519DC8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Thumbnails — slots 1–3, always side by side */}
          <div className="flex min-w-0 flex-1 flex-row items-stretch gap-4 sm:gap-5">
            {thumbnailSlots.map((staffIndex, thumbIndex) => {
              const staff = STAFF_MEMBERS[staffIndex];

              return (
                <button
                  key={`thumb-slot-${thumbIndex}`}
                  type="button"
                  onClick={() => handleThumbnailClick(thumbIndex)}
                  className="our-staff-card group flex min-w-0 flex-1 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_38px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#20A0E0]"
                  aria-label={`Show ${STAFF_NAME} photo ${thumbIndex + 2} as featured`}
                >
                  <div
                    className={`relative w-full flex-1 min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] ${staff.bg}`}
                  >
                    <Image
                      unoptimized
                      src={staff.image}
                      fill
                      sizes="(max-width: 1024px) 30vw, 200px"
                      className="object-contain object-center p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                      alt={staff.name}
                    />
                  </div>
                  <div className="shrink-0 bg-white px-2 py-4 text-center">
                    <h4 className="text-[14px] font-bold text-gray-900 sm:text-[16px]">
                      {STAFF_NAME}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStaff;
