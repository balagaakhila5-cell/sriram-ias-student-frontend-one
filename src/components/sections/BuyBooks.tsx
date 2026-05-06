'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import DiamondLayer from '../DiamondLayer';
import { heroDiamondConfig } from '../diamondConfigs';

gsap.registerPlugin(ScrollTrigger);

const books = [
  { id: 1, title: 'UPSC Book sciences - 1', author: 'Atomic Habits by James Clear', price: 'Rs.10,000/-', image: '/assets/books.png' },
  { id: 2, title: 'UPSC Book sciences - 2', author: 'Deep Work by Cal Newport', price: 'Rs.12,000/-', image: '/assets/books.png' },
  { id: 3, title: 'UPSC Book sciences - 3', author: 'Thinking Fast and Slow', price: 'Rs.15,000/-', image: '/assets/books.png' },
  { id: 4, title: 'UPSC Book sciences - 4', author: 'The Lean Startup', price: 'Rs.11,000/-', image: '/assets/books.png' },
  { id: 5, title: 'UPSC Book sciences - 5', author: 'Zero to One', price: 'Rs.13,000/-', image: '/assets/books.png' },
  { id: 6, title: 'UPSC Book sciences - 6', author: 'The Four Hour Workweek', price: 'Rs.14,000/-', image: '/assets/books.png' },
];

const duplicatedBooks = [...books, ...books];

const BuyBooks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    const handlePageLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    return () => window.removeEventListener('load', handlePageLoad);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from('.buy-books-header', {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      const container = cardsContainerRef.current;
      if (!container) return;

      if (!prefersReducedMotion) {
        const marqueeTween = gsap.to(container, {
          xPercent: -50,
          repeat: -1,
          duration: 25,
          ease: 'none',
        });

        const handleMouseEnter = () => marqueeTween.pause();
        const handleMouseLeave = () => marqueeTween.play();

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
          marqueeTween.kill();
        };
      }
    },
    { dependencies: [prefersReducedMotion], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative z-30 py-18 overflow-hidden">
      <DiamondLayer config={heroDiamondConfig} />

      <div className="relative z-10 mx-auto w-full overflow-hidden">
        {/* HEADING */}
        <div className="buy-books-header text-center">
          <h2 className="global-section-heading">
            BUY OUR BOOKS
          </h2>
        </div>

        {/* BOOK CARDS - MOVED DOWN */}
      <div className="w-full relative flex mt-32 pb-16">
          <div
            ref={cardsContainerRef}
            className="flex gap-8 w-max will-change-transform pl-8"
          >
            {duplicatedBooks.map((book, index) => (
              <div
                key={`${book.id}-${index}`}
                className="book-card min-w-[320px] w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col p-6 space-y-4 group hover:shadow-2xl transition-shadow duration-300 transform-gpu backface-visibility-hidden"
              >
                <div className="relative rounded-xl overflow-hidden shadow-md aspect-6/5 w-full bg-gray-100">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="280px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                    {book.title}
                  </h3>

                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {book.author} is a bestselling self-improvement book that explains how small daily habits...
                  </p>

                  <div className="flex justify-between items-center pt-1">
                    <span
                      className="font-bold text-lg inline-block text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
                      }}
                    >
                      {book.price}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="py-2 text-xs text-white rounded-md transition-all hover:opacity-90 font-medium"
                    style={{
                      background:
                        'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
                      boxShadow: '0px 4px 32px 0px #0000001A',
                    }}
                  >
                    Buy Now
                  </button>

                  <button className="text-xs py-2 rounded-md font-medium transition-all hover:bg-gray-50 border border-[#249EDC] text-[#007BB5]">
                    Add To cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyBooks;