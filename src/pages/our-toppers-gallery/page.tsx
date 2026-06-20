'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ToppersGalleryTabs from '@/features/ourToppers/components/ToppersGalleryTabs';
import TestimonialsCarousel from '@/features/ourToppers/components/TestimonialsCarousel';
import type { YearWiseSelection } from '@/features/ourToppers/components/YearWiseDropdown';
import JoinCTA from '@/features/course/components/sections/JoinCTA';

type Topper = {
  name: string;
  rank: string;
  description: string;
  img: string;
  y: number;
  scale: number;
  course: 'GS Course' | 'Optional Course' | 'Test Series' | 'Other';
};

const fallbackToppers: Topper[] = [
  {
    name: 'AAKASH GARG',
    rank: 'AIR 5',
    description: 'GS Foundation Course',
    img: 'AAKASH GARG(AIR-5) .png',
    y: 35,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'ABHI JAIN',
    rank: 'AIR 34',
    description: 'GS Foundation Course',
    img: 'ABHI-JAIN(AIR-34).png',
    y: 45,
    scale: 1.03,
    course: 'GS Course',
  },
  {
    name: 'ABHISHEK SHARMA',
    rank: 'AIR 38',
    description: 'GS Foundation Course',
    img: 'ABHISHEK-SHARMA-(AIR-38) .png',
    y: 35,
    scale: 1.01,
    course: 'GS Course',
  },
  {
    name: 'DIKSHA RAI',
    rank: 'AIR 40',
    description: 'GS Foundation Course',
    img: 'DIKSHA-RAI(AIR-40).png',
    y: 41,
    scale: 0.98,
    course: 'GS Course',
  },
  {
    name: 'NABIYA PARVEZ',
    rank: 'AIR 29',
    description: 'GS Foundation Course',
    img: 'NABIYA-PARVEZ(AIR-29).png',
    y: 45,
    scale: 0.92,
    course: 'GS Course',
  },
  {
    name: 'RAGHAV JHUNJHUNWALA',
    rank: 'AIR 4',
    description: 'GS Foundation Course',
    img: 'RAGHAV-JHUNJWALA(AIR-4).png',
    y: 10,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'RAJ KRISHNA JHA',
    rank: 'AIR 8',
    description: 'GS Foundation Course',
    img: 'RAJ-KRISHNA JHA(AIR-8).png',
    y: 5,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'ROHIN KUMAR',
    rank: 'AIR 39',
    description: 'GS Foundation Course',
    img: 'ROHIN-KUMAR(AIR-39).png',
    y: 12,
    scale: 1,
    course: 'GS Course',
  },
  {
    name: 'ADITYA VIKRAM AGARWAL',
    rank: 'AIR 9',
    description: 'GS Foundation Course',
    img: 'Aditya-Vikram-Agarwal (AIR - 9).png',
    y: 13,
    scale: 0.97,
    course: 'GS Course',
  },
  {
    name: 'ETTABOINA SAI SHIVANI',
    rank: 'AIR 11',
    description: 'GS Foundation Course',
    img: 'ETTABOINA-SAI-SHIVANI(AIR-11).png',
    y: 35,
    scale: 0.84,
    course: 'GS Course',
  },

  /*
    Add more students here.

    For Top 10 tab, add ranks AIR 1, AIR 2, AIR 3, AIR 6, AIR 7, AIR 10 also.

    Example:

    {
      name: 'STUDENT NAME',
      rank: 'AIR 1',
      description: 'GS Foundation Course',
      img: 'student-image.png',
      y: 20,
      scale: 1,
      course: 'GS Course',
    },
  */
];

const imagePath = (fileName: string) =>
  `/assets/our-toppers-gallery/${fileName.replaceAll(' ', '%20')}`;

const OurToppersGalleryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Toppers' | 'Testimonials'>('Toppers');

  const handleTabChange = (tab: 'Toppers' | 'Testimonials') => {
    setActiveTab(tab);
  };

  const handleYearSelect = (selection: YearWiseSelection) => {
    navigate(`/our-toppers-gallery/year-wise/${selection}`);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white font-['Montserrat',sans-serif]">
      <Header />

      {/* HERO BANNER */}
      <section className="relative h-[260px] w-full overflow-hidden sm:h-[320px] md:h-[390px]">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Our Toppers Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black/90 via-black/60 to-transparent md:w-[48%]" />
        <div className="absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-black/25 to-transparent" />
      </section>

      {/* TOPPERS GALLERY */}
      <section className="relative overflow-hidden bg-[#B8E5FB] py-10 md:py-12">
        <Image
          src="/assets/our-toppers-gallery/our-toppers-bg.png"
          alt="Toppers gallery background"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative z-10 w-full">
          <div className="mb-8 flex w-full flex-col justify-between gap-5 px-4 sm:px-6 md:flex-row md:items-start md:px-[48px] lg:px-[42px]">
            <div className="text-center md:text-left">
              <h2 className="bg-gradient-to-r from-[#159fe3] via-[#8e91b5] to-[#d96f7d] bg-clip-text text-[34px] font-black uppercase leading-[1.05] tracking-[1px] text-transparent sm:text-[44px] md:text-[66px] lg:text-[74px]">
                {activeTab === 'Testimonials'
                  ? 'TESTIMONIALS'
                  : "TOPPERS' GALLERY"}
              </h2>

              <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-medium text-[#1f3442] sm:text-[16px] md:mx-0 md:text-[20px]">
                Celebrating the remarkable achievements of our students
              </p>
            </div>

            <ToppersGalleryTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onYearSelect={handleYearSelect}
            />
          </div>

          {/* Topper cards / Testimonials / Year wise */}
          <div className="w-full px-4 sm:px-6 lg:px-0">
            {activeTab === 'Testimonials' ? (
              <TestimonialsCarousel />
            ) : (
            <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {fallbackToppers.map((topper, index) => {
                const isSecondRow = index >= 5;

                return (
                  <article
                    key={`${topper.name}-${topper.rank}-${index}`}
                    className="group relative flex w-full flex-col items-center bg-transparent text-center"
                  >
                    {/* Image area */}
                    <div
                      className={`relative w-full overflow-visible bg-transparent ${
                        isSecondRow
                          ? 'h-[250px] sm:h-[280px] lg:h-[310px]'
                          : 'h-[280px] sm:h-[310px] lg:h-[360px]'
                      }`}
                    >
                      <div
                        className={`absolute left-1/2 h-[330px] w-[280px] -translate-x-1/2 bg-transparent sm:h-[380px] sm:w-[325px] lg:h-[455px] lg:w-[390px] lg:-translate-x-[55%] ${
                          isSecondRow
                            ? 'top-[-6px] lg:top-[-8px]'
                            : 'top-[-10px] lg:top-[-22px]'
                        }`}
                      >
                        <img
                          src={imagePath(topper.img)}
                          alt={`${topper.name} ${topper.rank}`}
                          className="mx-auto h-full w-full bg-transparent object-contain object-top drop-shadow-[0_20px_26px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105 lg:drop-shadow-[0_24px_30px_rgba(0,0,0,0.28)]"
                          style={{
                            transform: `translateY(${topper.y}px) scale(${
                              topper.scale * 1.08
                            })`,
                            transformOrigin: 'center top',
                          }}
                        />
                      </div>
                    </div>

                    {/* Text area */}
                    <div
                      className={`relative z-10 flex min-h-[90px] flex-col items-center bg-transparent ${
                        isSecondRow
                          ? '-mt-[44px] lg:-mt-[58px]'
                          : '-mt-[56px] lg:-mt-[72px]'
                      }`}
                    >
                      <h3 className="max-w-[250px] pt-2 text-center text-[14px] font-extrabold uppercase leading-[1.25] tracking-[0.2px] text-white drop-shadow-sm md:text-[16px]">
                        {topper.name}
                      </h3>

                      <span className="topper-air-badge mt-[6px] shadow-sm">
                        {topper.rank}
                      </span>

                      <p className="mt-[6px] text-[13px] font-semibold leading-[1.2] text-white/95">
                        {topper.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            )}
          </div>
        </div>
      </section>

      <JoinCTA />

      <Footer />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&display=swap');

        .testimonial-quote-text {
          font-family: 'Caveat', 'Segoe Script', 'Bradley Hand', cursive;
        }
      `}</style>
    </main>
  );
};

export default OurToppersGalleryPage;