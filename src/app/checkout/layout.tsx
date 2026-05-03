import React from 'react';
import Image from 'next/image';
import Footer from '@/components/common/Footer';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-['Montserrat'] bg-white">

      {/* Header — exact same logo block as Header.tsx */}
      <header className="w-full border-b border-gray-200 bg-white px-6 md:px-10 py-3 flex items-center shrink-0">
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
      </header>

      {/* Page content — fills remaining space */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
    </div>
  );
}
