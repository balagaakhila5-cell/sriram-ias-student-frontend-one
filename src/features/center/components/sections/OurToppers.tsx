'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  city: string;
}

const OurToppers: React.FC<Props> = ({ city }) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from('.our-toppers-heading', {
      y: 70,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        once: true,
      }
    });

    gsap.from('.our-toppers-card', {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      }
    });
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  const toppers = [
    { name: 'Anil Kumar', rank: 'AIR 08', course: 'GS Foundation Course', img: 'centers-person.png' },
    { name: 'Anil Kumar', rank: 'AIR 08', course: 'GS Foundation Course', img: 'centers-person.png' },
    { name: 'Anil Kumar', rank: 'AIR 08', course: 'GS Foundation Course', img: 'centers-person.png' },
    { name: 'Anil Kumar', rank: 'AIR 08', course: 'GS Foundation Course', img: 'centers-person.png' },
  ];

  return (
    <section ref={containerRef} className="relative w-full py-24 flex flex-col items-center px-6 md:px-12 lg:px-24 overflow-hidden">

      <div className="absolute top-1/4 right-[-160px] -translate-y-1/2 w-[240px] h-[240px] bg-white rounded-l-full z-10 pointer-events-none"
        style={{
          boxShadow: '0px 0px 120px 20px rgba(91, 178, 229, 0.7)'
        }}
      ></div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/our-centers/centers-bg.png"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

      </div>


      {/* Header */}
      <h2 className="our-toppers-heading text-[36px] md:text-[50px] font-[900] uppercase tracking-wider mb-6 relative z-10 font-['Montserrat']"
        style={{
          background: 'linear-gradient(90deg, #CE6A73 0%, #8788A5 45%, #3C9ED5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        OUR TOPPERS
      </h2>

      <p className="our-toppers-heading text-center text-[#2A3742] font-medium max-w-[900px] mx-auto text-[15px] md:text-[18px] leading-relaxed mb-20 relative z-10 font-['Montserrat']">
        Driven by a commitment to success, we stand behind our toppers with constant support, expert mentorship, and personalized attention to help them lead the way in every phase of the UPSC process.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 w-full max-w-[1400px] relative z-10">
        {toppers.map((topper, idx) => (
          <div key={idx} className="our-toppers-card flex flex-col items-center">

            {/* Photo frame */}
            <div className="w-[220px] h-[220px] relative mb-8 flex items-center justify-center drop-shadow-xl transition-transform duration-300">
              <svg viewBox="-20 -20 240 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <clipPath id={`blobClip-center-${idx}`}>
                    {/* The blob itself for the bottom/sides */}
                    <path d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />
                    {/* A large rectangle extending upwards from the middle of the blob to allow "pop-out" */}
                    <rect x="-50" y="-100" width="300" height="200" />
                  </clipPath>
                </defs>

                <path fill="#FFFFFF" d="M 100 0 C 120 0 125 25 143.3 35 C 161.6 45 186.6 40 195 58.3 C 203.4 76.6 185 91.6 185 110 C 185 128.4 203.4 143.4 195 161.7 C 186.6 180 161.6 175 143.3 185 C 125 195 120 220 100 220 C 80 220 75 195 56.7 185 C 38.4 175 13.4 180 5 161.7 C -3.4 143.4 15 128.4 15 110 C 15 91.6 -3.4 76.6 5 58.3 C 13.4 40 38.4 45 56.7 35 C 75 25 80 0 100 0 Z" />

                <image
                  href={`/assets/our-centers/${topper.img}`}
                  clipPath={`url(#blobClip-center-${idx})`}
                  x="-35px"
                  y="-50px"
                  width="270"
                  height="270"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>


            <h3 className="text-white text-[20px] font-bold font-['Montserrat'] mb-3 drop-shadow-sm">{topper.name}</h3>

            <span className="bg-[#FF9800] text-white text-[13px] font-bold py-1 px-4 rounded-full mb-3 shadow-sm font-['Montserrat']">
              {topper.rank}
            </span>

            <span className="text-white text-[15px] opacity-90 font-medium font-['Montserrat']">{topper.course}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurToppers;