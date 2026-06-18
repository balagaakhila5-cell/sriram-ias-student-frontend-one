'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FoundersMessageSection from '@/components/sections/FoundersMessageSection';

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />

      <section className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[390px]">
        <Image
          src="/assets/about/about-us/About-banner.png"
          alt="Founder's Message Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-black/95 via-black/75 to-transparent md:w-[55%]" />
        <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-black/20 to-transparent" />
      </section>

      <div className="relative z-10 mx-auto w-full max-w-[1366px] px-4 pt-6 sm:px-6 md:px-8 lg:px-5 lg:pt-8">
        <h1 className="text-center font-['Montserrat'] text-[clamp(28px,6vw,52px)] font-extrabold uppercase leading-[1.1] tracking-[1px] text-[#1f3442] md:text-left">
          FOUNDER&apos;S <span className="text-[#6B8FD4]">MESSAGE</span>
        </h1>
      </div>

      <FoundersMessageSection />

      <Footer />
    </main>
  );
};

export default FoundersMessagePage;
