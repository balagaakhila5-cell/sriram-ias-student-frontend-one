'use client';

import React from 'react';

const toppers = [
  {
    name: 'AAKASH GARG',
    rank: 'AIR 5',
    course: 'GS Foundation Course',
    img: 'AAKASH GARG(AIR-5) .png',
    y: 35,
    scale: 1,
  },
  {
    name: 'ABHI JAIN',
    rank: 'AIR 34',
    course: 'GS Foundation Course',
    img: 'ABHI-JAIN(AIR-34).png',
    y: 15,
    scale: 1.03,
  },
  {
    name: 'ABHISHEK SHARMA',
    rank: 'AIR 38',
    course: 'GS Foundation Course',
    img: 'ABHISHEK-SHARMA-(AIR-38) .png',
    y: 45,
    scale: 1.01,
  },
  {
    name: 'DIKSHA RAI',
    rank: 'AIR 40',
    course: 'GS Foundation Course',
    img: 'DIKSHA-RAI(AIR-40).png',
    y: 28,
    scale: 0.98,
  },
  {
    name: 'NABIYA PARVEZ',
    rank: 'AIR 29',
    course: 'GS Foundation Course',
    img: 'NABIYA-PARVEZ(AIR-29).png',
    y: 18,
    scale: 0.92,
  },
  {
    name: 'RAGHAV JHUNJHUNWALA',
    rank: 'AIR 4',
    course: 'GS Foundation Course',
    img: 'RAGHAV-JHUNJWALA(AIR-4).png',
    y: 10,
    scale: 1,
  },
  {
    name: 'RAJ KRISHNA JHA',
    rank: 'AIR 8',
    course: 'GS Foundation Course',
    img: 'RAJ-KRISHNA JHA(AIR-8).png',
    y: 5,
    scale: 1,
  },
  {
    name: 'ROHIN KUMAR',
    rank: 'AIR 39',
    course: 'GS Foundation Course',
    img: 'ROHIN-KUMAR(AIR-39).png',
    y: 12,
    scale: 1,
  },
];

const duplicatedToppers = [...toppers, ...toppers];

const OurToppers: React.FC = () => {
  return (
    <section className="relative w-full min-h-[680px] flex flex-col items-center pt-0 pb-6 overflow-hidden">
      {/* BACKGROUND */}
      <img
        src="/assets/our-centers/centers-bg.png"
        alt="Background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 w-full max-w-[1900px] flex flex-col items-center">
        {/* HEADING - MOVED DOWN */}
        <div className="text-center mt-10">
          <h2 className="global-section-heading">OUR TOPPERS</h2>
        </div>

        <p className="text-center text-[#2A3742] font-medium max-w-[800px] mx-auto text-[14px] md:text-[16px] leading-relaxed px-6">
          Driven by a commitment to success, we stand behind our toppers with constant support,
          expert mentorship, and personalized attention.
        </p>

        {/* SCROLL - IMAGES + TEXT MOVED DOWN LITTLE BIT */}
        <div className="w-full mt-4 overflow-hidden -translate-y-2">
          <div className="toppers-track flex gap-0 w-max">
            {duplicatedToppers.map((topper, idx) => (
              <div
                key={`${topper.name}-${idx}`}
                className="w-[245px] md:w-[265px] lg:w-[285px] flex shrink-0 flex-col items-center overflow-visible"
              >
                {/* IMAGE AREA */}
                <div className="relative h-[405px] w-full flex items-end justify-center overflow-visible">
                  <img
                    src={`/assets/ourtoppers/_originals/${topper.img}`}
                    alt={topper.name}
                    loading={idx < 5 ? 'eager' : 'lazy'}
                    className="block select-none pointer-events-none object-contain object-bottom"
                    style={{
                      width: '445px',
                      height: '445px',
                      maxWidth: 'none',
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                      transform: `translateY(${topper.y - 18}px) scale(${topper.scale})`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                </div>

                {/* TEXT AREA */}
                <div className="mt-1 flex min-h-[110px] flex-col items-center justify-start text-center relative z-20 -translate-y-1">
                  <h3 className="text-white text-[15px] md:text-[16px] font-bold leading-tight min-h-[24px] whitespace-nowrap">
                    {topper.name}
                  </h3>

                  <span className="bg-[#FF9800] text-white text-[14px] font-semibold py-2 px-6 rounded-full mt-2">
                    {topper.rank}
                  </span>

                  <span className="text-white text-[13px] opacity-90 text-center mt-1">
                    {topper.course}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .toppers-track {
          animation: toppersScroll 55s linear infinite;
          will-change: transform;
        }

        .toppers-track:hover {
          animation-play-state: paused;
        }

        @keyframes toppersScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default OurToppers;