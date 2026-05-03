'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

interface Props {
  city: string;
}

const Hero: React.FC<Props> = ({ city }) => {
  const cityName = city.toUpperCase();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from('.center-hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });

    gsap.from('.center-hero-contact', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.6,
    });

    gsap.from('.center-hero-enquire', {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 1,
    });
  }, { dependencies: [prefersReducedMotion], scope: containerRef });
  
  return (
    <section ref={containerRef} className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 z-10">
        <Image 
          src={`/assets/our-centers/cenetrs-bg.png`} 
          alt={`${cityName} Center Background`}
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
          onError={(e: any) => {
            e.currentTarget.style.display = 'none';
          }}
        />
       
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/70 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1000px]">
        <h1 className="center-hero-title text-white text-[42px] md:text-[46px] lg:text-[48px] font-[900] leading-tight mb-12 font-['Montserrat']">
          Welcome to <span className="text-[#A2A4FB]">Sri Ram's IAS</span>
          <br />
          {cityName}
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-14 text-white font-bold text-[18px] md:text-[20px] font-['Montserrat']">
          <div className="center-hero-contact flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V21C22 21.5523 21.5523 22 21 22C10.5066 22 2 13.4934 2 3C2 2.44772 2.44772 2 3 2H7.08C7.58739 2 8.01602 2.37877 8.0732 2.88392C8.16377 3.68449 8.35467 4.46467 8.63878 5.20573C8.80373 5.63604 8.70775 6.12467 8.38466 6.44776L6.5 8.33235C7.94273 11.2372 10.3204 13.6149 13.2253 15.0576L15.1099 13.173C15.433 12.8499 15.9216 12.7539 16.3519 12.9189C17.093 13.203 17.8732 13.3939 18.6737 13.4845C19.1789 13.5416 19.5576 13.9703 19.5576 14.4776V18.5576C19.5576 19.11 19.11 19.5576 18.5576 19.5576H22V16.92Z" />
            </svg>
            <span>9811489560</span>
          </div>
          <div className="center-hero-contact flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"/>
                <path d="M22 6L12 13L2 6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>sriram@gmail.com</span>
          </div>
        </div>
      </div>      
    </section>
  );
};

export default Hero;
