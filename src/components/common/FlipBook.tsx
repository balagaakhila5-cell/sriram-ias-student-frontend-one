'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipBookProps {
  coverImage: string;
  totalLeaves?: number;
  /** Smaller layout for Buy Books sample popup */
  compact?: boolean;
}

const FlipBook: React.FC<FlipBookProps> = ({
  coverImage,
  totalLeaves = 8,
  compact = false,
}) => {
  const [flippedPages, setFlippedPages] = useState<number[]>([]);

  useEffect(() => {
    setFlippedPages([]);
  }, [coverImage]);

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
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <style>{`
        .preserve-3d { transform-style: preserve-3d; -webkit-transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>

      {!compact ? (
        <div className="shrink-0 text-center text-[14px] font-bold text-white md:text-[16px]">
          {getPageIndicator()}
        </div>
      ) : null}

      <div
        className={`relative mx-auto flex w-[90%] flex-1 items-center justify-center ${
          compact ? 'my-3 min-h-[260px] md:min-h-[300px]' : 'my-5 min-h-[380px] md:min-h-[440px]'
        }`}
      >
        <button
          type="button"
          onClick={turnPrev}
          disabled={flippedPages.length === 0}
          aria-label="Previous page"
          className={`absolute left-0 z-[100] flex shrink-0 items-center justify-center rounded-full shadow-md transition-all md:left-2 ${
            compact ? 'h-[38px] w-[38px] md:h-[42px] md:w-[42px]' : 'h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
          } ${
            flippedPages.length === 0
              ? 'cursor-not-allowed bg-white/20 opacity-30'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <ChevronLeft size={compact ? 22 : 28} className="text-[#01285A]" />
        </button>

        <div
          className={`flex w-full justify-center perspective-[2000px] ${
            compact ? 'max-w-[480px]' : 'max-w-[720px]'
          }`}
        >
          <div
            className={`relative flex w-full transition-transform duration-700 ease-in-out ${getBookTranslation()}`}
          >
            <div className="aspect-[2/3] w-1/2 shrink-0 bg-transparent" />

            <div className="relative aspect-[2/3] w-1/2 shrink-0 preserve-3d">
              {Array.from({ length: totalLeaves }).map((_, index) => {
                const isFlipped = flippedPages.includes(index);
                const zIndex = isFlipped ? index : totalLeaves - index;

                return (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    onClick={() => (isFlipped ? turnPrev() : turnNext())}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (isFlipped) turnPrev();
                        else turnNext();
                      }
                    }}
                    className="absolute left-0 top-0 h-full w-full origin-left cursor-pointer preserve-3d shadow-xl transition-transform duration-700 ease-in-out"
                    style={{
                      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                      zIndex,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-r-[8px] border border-gray-200 bg-white backface-hidden shadow-[inset_4px_0_10px_rgba(0,0,0,0.05)] md:rounded-r-[12px]">
                      {index === 0 ? (
                        <Image src={coverImage} alt="Cover" fill className="object-cover" />
                      ) : (
                        <div className="h-full w-full bg-[#FDFDFD] p-4 text-left text-[#01285A] md:p-6">
                          <h4 className="mb-2 border-b border-gray-200 pb-2 text-sm font-bold md:text-lg">
                            Chapter {index}
                          </h4>
                          <div className="mb-2 h-2 w-full rounded bg-gray-200" />
                          <div className="mb-2 h-2 w-5/6 rounded bg-gray-200" />
                          <div className="mb-2 h-2 w-full rounded bg-gray-200" />
                          <div className="h-2 w-4/6 rounded bg-gray-200" />
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
                      {index !== 0 && index !== totalLeaves - 1 && (
                        <div className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400 md:text-xs">
                          {index * 2 - 1}
                        </div>
                      )}
                    </div>

                    <div
                      className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-l-[8px] border border-gray-200 bg-white backface-hidden shadow-[inset_-4px_0_10px_rgba(0,0,0,0.05)] md:rounded-l-[12px]"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      {index === 0 ? (
                        <div className="flex h-full w-full items-center justify-center bg-[#E2E6F8] text-sm font-bold text-[#01285A]">
                          Inside Cover
                        </div>
                      ) : index === totalLeaves - 1 ? (
                        <Image
                          src={coverImage}
                          alt="Back Cover"
                          fill
                          className="object-cover opacity-90 blur-[2px]"
                        />
                      ) : (
                        <div className="h-full w-full bg-[#FDFDFD] p-4 text-left text-[#01285A] md:p-6">
                          <div className="mb-2 mt-4 h-2 w-full rounded bg-gray-200" />
                          <div className="mb-2 h-2 w-full rounded bg-gray-200" />
                          <div className="mb-2 h-2 w-3/6 rounded bg-gray-200" />
                          <div className="h-2 w-full rounded bg-gray-200" />
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent" />
                      {index !== 0 && index !== totalLeaves - 1 && (
                        <div className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-400 md:text-xs">
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

        <button
          type="button"
          onClick={turnNext}
          disabled={flippedPages.length === totalLeaves}
          aria-label="Next page"
          className={`absolute right-0 z-[100] flex shrink-0 items-center justify-center rounded-full shadow-md transition-all md:right-2 ${
            compact ? 'h-[38px] w-[38px] md:h-[42px] md:w-[42px]' : 'h-[45px] w-[45px] md:h-[50px] md:w-[50px]'
          } ${
            flippedPages.length === totalLeaves
              ? 'cursor-not-allowed bg-white/20 opacity-30'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <ChevronRight size={compact ? 22 : 28} className="text-[#01285A]" />
        </button>
      </div>
    </div>
  );
};

export default FlipBook;
