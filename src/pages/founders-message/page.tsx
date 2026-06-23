'use client';

import React from 'react';
import Image from '@/components/common/AppImage';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FoundersMessageSection from '@/components/sections/FoundersMessageSection';

const FoundersMessagePage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fbff]">
      <Header />

      <div className="relative">
        <section className="relative h-[220px] w-full overflow-hidden sm:h-[280px] md:h-[320px]">
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
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[45%] bg-gradient-to-b from-transparent via-[#fffaf2]/70 to-[#fffaf2]"
            aria-hidden
          />
        </section>

        <FoundersMessageSection showHeading overlapBanner />
      </div>

      <Footer />
    </main>
  );
};

export default FoundersMessagePage;
