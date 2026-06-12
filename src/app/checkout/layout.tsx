import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-['Montserrat'] bg-white">

      <header className="sticky top-0 z-[110] flex w-full shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-3 md:px-10">
        <Link
          href="/"
          className="inline-flex cursor-pointer items-center transition-opacity hover:opacity-80"
          aria-label="Go to home"
        >
          <Image
            src="/assets/40_years_experience.png"
            alt="40 Years of Excellence"
            width={52}
            height={52}
            className="object-contain shrink-0"
            style={{ width: '52px', height: '52px' }}
          />
          <div className="w-[2px] h-[42px] bg-[#FF6B00] mx-1.5 shrink-0" />
          <Image
            src="/assets/Logo.png"
            alt="SRIRAM's IAS"
            width={200}
            height={52}
            className="object-contain"
            style={{ height: '48px', width: 'auto' }}
          />
        </Link>

        <Link
          href="/"
          className="text-[14px] font-semibold text-[#00679C] transition-colors hover:text-[#004d74] hover:underline"
        >
          Back to Home
        </Link>
      </header>

      {/* Page content — fills remaining space */}
      <main className="flex-1 flex flex-col">
        <Suspense fallback={<div className="flex-1 bg-[#F4F7FB]" />}>
          {children}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
