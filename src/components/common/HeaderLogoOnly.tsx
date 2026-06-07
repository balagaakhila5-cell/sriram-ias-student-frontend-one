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
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/assets/40_years_experience.png"
            alt="40 Years of Excellence"
            width={66}
            height={66}
            className="mr-[1px] hidden h-11 w-auto object-contain transition-transform hover:scale-105 md:block md:h-14 lg:h-[66px]"
          />
          <Image
            src="/assets/Logo.png"
            alt="SRIRAM's IAS"
            width={70}
            height={76}
            className="h-11 w-auto object-contain transition-transform hover:scale-105 md:h-14 lg:h-[76px]"
          />
        </Link>
      </div>
    </header>
  );
}
