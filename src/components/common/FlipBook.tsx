'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipBookProps {
  coverImage: string;
  totalLeaves?: number;
}

const FlipBook: React.FC<FlipBookProps> = ({ coverImage, totalLeaves = 8 }) => {
  const [flippedPages, setFlippedPages] = useState<number[]>([]);

  const turnNext = () => {
    if (flippedPages.length < totalLeaves) {
      setFlippedPages((prev) => [...prev, prev.length]);
    }
  };

  const turnPrev = () => {
    if (flippedPages.length > 0) {
      setFlippedPages((prev) => prev.slice(0, -1));
    }
  };

  const getBookTranslation = () => {
    if (flippedPages.length === 0) return '-translate-x-1/4';
    if (flippedPages.length === totalLeaves) return 'translate-x-1/4';
    return 'translate-x-0';
  };

  const getPageIndicator = () => {
    if (flippedPages.length === 0) return 'Cover';
    if (flippedPages.length === totalLeaves) return 'Back Cover';
    const leftPage = (flippedPages.length - 1) * 2;
    const rightPage = leftPage + 1;
    return `Pages ${leftPage} - ${rightPage} of ${(totalLeaves - 2) * 2}`;
  };

  return (
    <div className="flex-1 flex flex-col w-full">
      <style>{`
        .preserve-3d { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>

      <div className="text-center text-white text-[16px] md:text-[18px] font-bold shrink-0">
        {getPageIndicator()}
      </div>

      {/* Arrows live OUTSIDE the perspective container so 3D stacking never hides them */}
      <div className="flex-1 flex items-center justify-center relative w-full my-6">
        <button
          type="button"
          onClick={turnPrev}
          disabled={flippedPages.length === 0}
          className={`absolute left-0 md:left-4 w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center shrink-0 z-[100] transition-all shadow-md ${
            flippedPages.length === 0
              ? 'bg-white/20 opacity-30 cursor-not-allowed'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <ChevronLeft size={28} className="text-[#01285A]" />
        </button>

        {/* Book — perspective scoped here so it never affects button z-index */}
        <div className="perspective-[2000px]">
          <div className={`relative flex transition-transform duration-700 ease-in-out w-fit ${getBookTranslation()}`}>
            {/* Invisible Left Half */}
            <div className="w-[140px] h-[200px] sm:w-[190px] sm:h-[260px] md:w-[250px] md:h-[340px] bg-transparent shrink-0" />

            {/* Right Half – stacked leaves */}
            <div className="relative w-[140px] h-[200px] sm:w-[190px] sm:h-[260px] md:w-[250px] md:h-[340px] preserve-3d shrink-0">
              {Array.from({ length: totalLeaves }).map((_, index) => {
                const isFlipped = flippedPages.includes(index);
                const zIndex = isFlipped ? index : totalLeaves - index;

                return (
                  <div
                    key={index}
                    onClick={() => (isFlipped ? turnPrev() : turnNext())}
                    className="absolute top-0 left-0 w-full h-full origin-left transition-transform duration-700 ease-in-out cursor-pointer preserve-3d shadow-xl"
                    style={{
                      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                      zIndex,
                    }}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-r-[8px] md:rounded-r-[12px] border border-gray-200 overflow-hidden shadow-[inset_4px_0_10px_rgba(0,0,0,0.05)] flex items-center justify-center">
                      {index === 0 ? (
                        <Image src={coverImage} alt="Cover" fill className="object-cover" />
                      ) : (
                        <div className="p-4 md:p-6 text-[#01285A] w-full h-full text-left bg-[#FDFDFD]">
                          <h4 className="font-bold text-sm md:text-lg border-b pb-2 mb-2 border-gray-200">
                            Chapter {index}
                          </h4>
                          <div className="w-full h-2 bg-gray-200 rounded mb-2" />
                          <div className="w-5/6 h-2 bg-gray-200 rounded mb-2" />
                          <div className="w-full h-2 bg-gray-200 rounded mb-2" />
                          <div className="w-4/6 h-2 bg-gray-200 rounded" />
                        </div>
                      )}
                      <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                      {index !== 0 && index !== totalLeaves - 1 && (
                        <div className="absolute bottom-2 right-3 text-[10px] md:text-xs font-bold text-gray-400">
                          {index * 2 - 1}
                        </div>
                      )}
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 backface-hidden bg-white rounded-l-[8px] md:rounded-l-[12px] border border-gray-200 overflow-hidden shadow-[inset_-4px_0_10px_rgba(0,0,0,0.05)] flex items-center justify-center"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      {index === 0 ? (
                        <div className="w-full h-full bg-[#E2E6F8] flex items-center justify-center text-[#01285A] font-bold text-sm">
                          Inside Cover
                        </div>
                      ) : index === totalLeaves - 1 ? (
                        <Image src={coverImage} alt="Back Cover" fill className="object-cover opacity-90 blur-[2px]" />
                      ) : (
                        <div className="p-4 md:p-6 text-[#01285A] w-full h-full text-left bg-[#FDFDFD]">
                          <div className="w-full h-2 bg-gray-200 rounded mb-2 mt-4" />
                          <div className="w-full h-2 bg-gray-200 rounded mb-2" />
                          <div className="w-3/6 h-2 bg-gray-200 rounded mb-2" />
                          <div className="w-full h-2 bg-gray-200 rounded" />
                        </div>
                      )}
                      <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                      {index !== 0 && index !== totalLeaves - 1 && (
                        <div className="absolute bottom-2 left-3 text-[10px] md:text-xs font-bold text-gray-400">
                          {index * 2}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Control */}
        <button
          type="button"
          onClick={turnNext}
          disabled={flippedPages.length === totalLeaves}
          className={`absolute right-0 md:right-4 w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full flex items-center justify-center shrink-0 z-[100] transition-all shadow-md ${
            flippedPages.length === totalLeaves
              ? 'bg-white/20 opacity-30 cursor-not-allowed'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <ChevronRight size={28} className="text-[#01285A]" />
        </button>
      </div>
    </div>
  );
};

export default FlipBook;
