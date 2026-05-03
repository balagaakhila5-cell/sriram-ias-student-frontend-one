'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  city: string;
}

const CenterGallery: React.FC<Props> = ({ city }) => {
  const cityName = city.toUpperCase();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.gallery-heading',
      { y: 60, opacity: 0 }, // 👈 stronger start
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%', // 👈 better visibility trigger
          once: true,
        }
      }
    );

    gsap.from('.gallery-image', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.gallery-image',
        start: 'top 85%',
        once: true,
      }
    });
  }, { dependencies: [prefersReducedMotion], scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-24 bg-white flex flex-col items-center px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Decorative Blob Left */}
      <svg className="absolute left-[-150px] top-[10%] opacity-30 w-[500px] h-[500px] z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FCEDD0" d="M38.1,-63C47.9,-54.2,53.4,-41.2,57.1,-28.9C60.8,-16.6,62.8,-5,63.1,8.1C63.4,21.2,62,35.8,54.4,47C46.8,58.2,33.1,65.9,18.3,71C3.5,76, -12.4,78.4, -26.9,73.9C-41.4,69.5, -54.5,58.1, -63.7,44.2C-72.9,30.3, -78.3,13.9, -76,-1.5C-73.8,-16.9, -64,-31.2, -52,-41.8C-40,-52.4, -25.7,-59.2, -11.9,-61.7C1.9,-64.1, 28.3,-71.8, 38.1,-63Z" transform="translate(100 100)" />
      </svg>
      {/* Decorative Blob Bottom */}
      <svg className="absolute bottom-[-150px] left-[40%] opacity-30 w-[500px] h-[500px] z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FCEDD0" d="M37,-71.4C44.6,-61.2,45,-43.3,47.9,-29.1C50.8,-14.9,56.2,-4.3,58.5,8C60.8,20.3,60.1,34.3,54.4,45.9C48.7,57.5,38.1,66.8,25.2,74.1C12.3,81.4,-2.8,86.7,-18.4,85.1C-34,83.5,-50,75,-60.8,62C-71.6,49,-77.2,31.6,-78.9,14.6C-80.6,-2.4,-78.4,-19,-71.1,-33.1C-63.8,-47.2,-51.4,-58.8,-37.5,-65.7C-23.6,-72.6,-8.1,-74.8,3.9,-79.6C15.9,-84.4,31.8,-91.8,37,-71.4Z" transform="translate(100 100)" />
      </svg>
      {/* Decorative Blob Right */}
      <svg className="absolute top-[-100px] right-[-100px] opacity-30 w-[400px] h-[400px] z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FCEDD0" d="M43.3,-74.4C56.6,-70.6,68.2,-59.5,75.9,-46.3C83.7,-33,87.6,-17.5,88.4,-1.8C89.3,13.9,87.1,29.9,79.5,43.4C71.8,56.9,58.8,67.8,44.2,75.1C29.6,82.4,13.5,86,-2.2,89.5C-17.9,93,-33.1,96.3,-47.1,91.3C-61.1,86.3,-73.9,72.9,-81.9,57.7C-89.9,42.5,-93,25.4,-92.4,8.8C-91.8,-7.8,-87.5,-23.9,-79.7,-38.3C-71.9,-52.7,-60.7,-65.4,-47.4,-69.3C-34.1,-73.1,-18.8,-68.2,-2.3,-64.5C14.2,-60.8,30,-64,43.3,-74.4Z" transform="translate(100 100)" />
      </svg>

      <h2 className="gallery-heading text-[32px] md:text-[50px] font-black uppercase tracking-wider mb-20 relative z-10 font-['Montserrat']"
        style={{
          background: 'linear-gradient(90deg, #D47B83 0%, #908CAF 45%, #46A1D4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      >
        OUR {cityName} GALLERY
      </h2>

      {/* Gallery Grid Container */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full max-w-[1250px] relative z-10">

        {/* Column 1 */}
        <div className="flex flex-col gap-6 lg:gap-8 flex-1">
          <div className="gallery-image w-full aspect-[4/3] relative overflow-hidden shadow-sm">
            <Image unoptimized src="https://picsum.photos/800/600?random=1" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 1" onError={(e: any) => e.currentTarget.style.display = 'none'} />
          </div>
          <div className="gallery-image w-full aspect-[3/4] relative overflow-hidden shadow-sm">
            <Image unoptimized src="https://picsum.photos/600/800?random=2" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 2" onError={(e: any) => e.currentTarget.style.display = 'none'} />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6 lg:gap-8 flex-[1.4]">
          <div className="gallery-image w-full aspect-[16/10] relative overflow-hidden shadow-sm">
            <Image unoptimized src="https://picsum.photos/800/500?random=3" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 3" onError={(e: any) => e.currentTarget.style.display = 'none'} />
          </div>
          <div className="gallery-image w-full aspect-[16/11] relative overflow-hidden shadow-sm">
            <Image unoptimized src="https://picsum.photos/800/550?random=4" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 4" onError={(e: any) => e.currentTarget.style.display = 'none'} />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6 lg:gap-8 flex-1">
          <div className="gallery-image w-full aspect-[4/3] relative overflow-hidden shadow-sm">
            <Image unoptimized src="https://picsum.photos/800/600?random=5" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 5" onError={(e: any) => e.currentTarget.style.display = 'none'} />
          </div>
          <div className="gallery-image w-full aspect-[1/1] relative overflow-hidden shadow-sm">
            <Image unoptimized src="https://picsum.photos/800/800?random=6" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 6" onError={(e: any) => e.currentTarget.style.display = 'none'} />
          </div>
        </div>

      </div>
    </section>
  );
}

export default CenterGallery;