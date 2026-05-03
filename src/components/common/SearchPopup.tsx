'use client';

import Image from 'next/image';
import { Search, X } from 'lucide-react';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const courses = [
  'Prelims Test Series 2026',
  'Geography Optional Courses',
  'PSIR Optional foundational courses',
  'Mains Enrichment Program 2025',
  'PSIR Value Enrichment Course 2025',
  'Prelims Test Series 2026',
];

const typingText = 'Which Course are you interested in ?';

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 right-0 top-[90px] z-[999] h-[calc(100vh-90px)] overflow-hidden">
      {/* Full-height background layer */}
      <div className="absolute inset-0 bg-white">
        <img
          src="/assets/backgroundAnimation.png"
          alt=""
          aria-hidden="true"
          className="search-bg-anim absolute inset-0 h-full w-full object-cover opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Scrollable content on top of background */}
      <div className="relative z-10 h-full overflow-y-auto px-8 py-20 lg:px-28">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-8 top-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-black hover:bg-black/20"
        >
          <X size={22} />
        </button>

        {/* Search Bar */}
        <div className="flex items-center gap-6">
          <div className="flex h-[56px] flex-1 items-center gap-4 rounded-[10px] bg-[#F4EAF4] px-6">
            <Search size={22} className="text-[#8C8C8C]" />
            <p className="animate-typeLoop overflow-hidden whitespace-nowrap font-['Montserrat'] text-[18px] font-medium text-black">
              {typingText}
            </p>
          </div>

          <button className="h-[56px] w-[185px] rounded-[8px] bg-[linear-gradient(90deg,#42A9D7_0%,#002D3E_100%)] text-[20px] font-medium text-white">
            Search
          </button>
        </div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left */}
          <div>
            <h2 className="mb-8 font-['Montserrat'] text-[32px] font-[900] uppercase leading-none">
              <span className="bg-[linear-gradient(90deg,rgba(225,97,101,0.8)_0%,#20A0E0_100%)] bg-clip-text text-transparent">
                Trending Courses
              </span>
            </h2>

            <div className="w-full max-w-[740px] bg-white px-10 py-12 shadow-[0px_8px_35px_rgba(0,0,0,0.12)]">
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <img
                      src="/assets/arrow.png"
                      alt="arrow"
                      className="mt-[3px] h-[16px] w-[16px] shrink-0 object-contain"
                    />

                    <span className="max-w-[230px] font-['Montserrat'] text-[15px] font-medium leading-[22px] text-black">
                      {course}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center">
            <div className="h-[330px] w-full overflow-hidden shadow-[0px_8px_25px_rgba(0,0,0,0.12)]">
              <Image
                src="/assets/our_story.png"
                alt="Sriram IAS"
                width={600}
                height={380}
                className="h-full w-full object-cover"
              />
            </div>

            <button className="mt-12 h-[52px] w-full max-w-[455px] rounded-[6px] bg-[linear-gradient(90deg,#42A9D7_0%,#002D3E_100%)] text-[19px] font-medium text-white">
              Book Free 1:1 Mentorship Session
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bgFloat {
          0%   { transform: scale(1.08) translate(0px, 0px); }
          25%  { transform: scale(1.12) translate(-10px, -6px); }
          50%  { transform: scale(1.10) translate(8px, -12px); }
          75%  { transform: scale(1.13) translate(-6px, 6px); }
          100% { transform: scale(1.08) translate(0px, 0px); }
        }

        @keyframes typeLoop {
          0%   { width: 0ch; }
          45%  { width: 39ch; }
          65%  { width: 39ch; }
          100% { width: 0ch; }
        }

        .search-bg-anim {
          animation: bgFloat 8s ease-in-out infinite;
          will-change: transform;
        }

        .animate-typeLoop {
          display: inline-block;
          width: 0ch;
          max-width: max-content;
          overflow: hidden;
          white-space: nowrap;
          animation: typeLoop 4s steps(39) infinite;
        }
      `}</style>
    </div>
  );
}
