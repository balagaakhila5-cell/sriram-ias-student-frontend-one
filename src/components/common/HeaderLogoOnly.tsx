'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type HeaderLogoOnlyProps = {
  transparent?: boolean;
};

export default function HeaderLogoOnly({ transparent = false }: HeaderLogoOnlyProps) {
  return (
    <header
      className={
        transparent
          ? "absolute top-0 left-0 right-0 z-50 w-full bg-transparent px-4 py-5 md:px-8 lg:px-12"
          : "sticky top-0 z-50 w-full border-b border-gray-100 bg-white px-4 py-3 shadow-sm md:px-8 lg:px-12"
      }
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center">
        <Link href="/" className="inline-flex w-fit shrink-0 items-center gap-0 leading-none">
          <Image
            src="/assets/40_years_experience.png"
            alt="40 Years of Excellence"
            width={66}
            height={66}
            className="hidden h-11 w-auto shrink-0 object-contain transition-transform hover:scale-105 md:block md:h-14 md:-mr-0.5 lg:h-[66px]"
          />
          <span
            className={`hidden h-[44px] w-[2px] shrink-0 md:ml-2 md:block md:h-[52px] lg:ml-2.5 lg:h-[60px] ${
              transparent ? 'bg-white' : 'bg-[#D1D5DB]'
            }`}
            aria-hidden
          />
          <Image
            src="/assets/Logo.png"
            alt="SRIRAM's IAS"
            width={70}
            height={76}
            className="-ml-2.5 h-11 w-auto shrink-0 object-contain transition-transform hover:scale-105 md:-ml-3.5 md:h-14 lg:-ml-4 lg:h-[76px]"
          />
        </Link>
      </div>
    </header>
  );
}
