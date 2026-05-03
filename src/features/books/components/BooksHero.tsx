'use client';

import React from 'react';
import Image from 'next/image';

const BooksHero: React.FC = () => {
  return (
  <div className="relative w-full h-[60vh] md:h-[65vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0 z-0">
         <Image 
           src="/assets/books/Books-Hero-1.png" 
           alt="Books Header Background"
           fill
           priority
           className="object-cover object-center"
           onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiIC8+PC9zdmc+';
           }}
         />
         <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <h1 className="font-[Montserrat] font-extrabold  text-[48px] leading-[56px] tracking-normal uppercase text-left text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFFFFF_12.5%,#7575DF_47.6%,#9E9EFD_100%)] w-fit">
           BOOKS
        </h1>
      </div>
    </div>
  );
};

export default BooksHero;
