'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import DiamondLayer from '../DiamondLayer';
import { buyBooksDiamondConfig } from '../diamondConfigs';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import { useCartStore } from '@/store/cartStore';
import {
  mapHomepageBook,
  toCartBook,
  type HomeSectionBook,
} from '@/features/homepage/utils/homepageBook';
import BooksCartButton from '@/features/books/components/BooksCartButton';
import FlipBook from '@/components/common/FlipBook';

gsap.registerPlugin(ScrollTrigger);

const fallbackBooks = [
  { id: '1', title: 'UPSC Book sciences - 1', summary: 'Atomic Habits by James Clear', priceLabel: 'Rs. 10,000', image: '/assets/books.png' },
  { id: '2', title: 'UPSC Book sciences - 2', summary: 'Deep Work by Cal Newport', priceLabel: 'Rs. 12,000', image: '/assets/books.png' },
  { id: '3', title: 'UPSC Book sciences - 3', summary: 'Thinking Fast and Slow', priceLabel: 'Rs. 15,000', image: '/assets/books.png' },
  { id: '4', title: 'UPSC Book sciences - 4', summary: 'The Lean Startup', priceLabel: 'Rs. 11,000', image: '/assets/books.png' },
  { id: '5', title: 'UPSC Book sciences - 5', summary: 'Zero to One', priceLabel: 'Rs. 13,000', image: '/assets/books.png' },
  { id: '6', title: 'UPSC Book sciences - 6', summary: 'The Four Hour Workweek', priceLabel: 'Rs. 14,000', image: '/assets/books.png' },
];

const BUY_NOW_BUTTON_GRADIENT =
  'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)';

const OUTLINE_BOOK_BUTTON_CLASS =
  'book-card-outline-btn cursor-pointer rounded-full border border-[#249EDC] bg-white text-[#007BB5]';

const formatPrice = (value?: number) =>
  typeof value === 'number'
    ? `Rs. ${value.toLocaleString('en-IN')}`
    : 'Rs. —';

const parseFallbackPrice = (label: string) => {
  const digits = label.replace(/[^\d]/g, '');
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 5999;
};

type SampleBook = {
  title: string;
  image: string;
  slug: string;
};

type BookCardProps = {
  book: HomeSectionBook;
  onOpenSample: (book: SampleBook) => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, onOpenSample }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartBook = toCartBook(book);
  const cartQuantity = useCartStore(
    (state) =>
      state.items.find((item) => item.book.id === book.id)?.quantity ?? 0,
  );

  const handleIncrement = () => {
    addItem(cartBook, { openSidebar: false });
  };

  const handleDecrement = () => {
    if (cartQuantity <= 1) {
      removeItem(book.id);
      return;
    }

    updateQuantity(book.id, cartQuantity - 1);
  };

  const handleGoToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="book-card group flex w-[85vw] min-w-[85vw] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-shadow duration-300 transform-gpu backface-visibility-hidden hover:shadow-2xl sm:w-[320px] sm:min-w-[280px]">
      <div className="book-card-image">
        <img src={book.image} alt={book.title} />
      </div>

      <div className="book-card-content flex flex-col items-center px-4 py-4 text-center">
        <h3 className="line-clamp-2 w-full font-bold text-base text-gray-800 sm:text-lg">
          {book.title}
        </h3>

        <span
          className="mt-2 inline-flex items-baseline font-bold text-base sm:text-lg"
        >
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
            }}
          >
            {book.priceLabel}
          </span>
          <span className="text-[#249EDC]">*</span>
        </span>

        <p className="mt-1 text-[9px] leading-tight text-gray-400 sm:text-[10px]">
          <span className="text-black">*</span> Excluding GST
        </p>

        <button
          type="button"
          onClick={() =>
            onOpenSample({
              title: book.title,
              image: book.image,
              slug: book.slug,
            })
          }
          className={`${OUTLINE_BOOK_BUTTON_CLASS} mt-2 w-full max-w-[180px] px-5 py-2 text-[10px] font-semibold uppercase tracking-wide sm:text-xs`}
        >
          VIEW SAMPLE
        </button>

        <div className="mt-3 flex w-full gap-3">
          {cartQuantity > 0 ? (
            <div className="flex h-[38px] min-w-0 flex-1 items-center justify-between rounded-full border border-[#249EDC] bg-[#EAF7FF] px-2">
              <button
                type="button"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white"
              >
                −
              </button>
              <button
                type="button"
                onClick={handleGoToCheckout}
                aria-label="Go to checkout"
                className="min-w-[20px] cursor-pointer text-center text-sm font-bold text-[#007BB5] hover:underline"
              >
                {cartQuantity}
              </button>
              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleIncrement}
              className={`${OUTLINE_BOOK_BUTTON_CLASS} min-w-0 flex-1 px-3 py-2.5 text-xs font-medium`}
            >
              Add to Cart
            </button>
          )}

          <button
            type="button"
            onClick={() => router.push(`/books/${book.slug}`)}
            className="min-w-0 flex-1 cursor-pointer rounded-full px-3 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:opacity-90"
            style={{
              background: BUY_NOW_BUTTON_GRADIENT,
              boxShadow: '0px 4px 32px 0px #0000001A',
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const BuyBooks: React.FC = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { data: homepage } = useHomepage();
  const sectionBooks = homepage?.sectionBooks;
  const [showSamplePopup, setShowSamplePopup] = useState(false);
  const [selectedSampleBook, setSelectedSampleBook] = useState<SampleBook | null>(
    null,
  );
  const [sampleZoom, setSampleZoom] = useState(1);

  const openSamplePopup = (book: SampleBook) => {
    setSelectedSampleBook(book);
    setSampleZoom(1);
    setShowSamplePopup(true);
  };

  const closeSamplePopup = () => {
    setShowSamplePopup(false);
    setSelectedSampleBook(null);
    setSampleZoom(1);
  };

  const books = useMemo(() => {
    const apiBooks = sectionBooks?.books ?? [];
    if (apiBooks.length === 0) {
      return fallbackBooks.map((book) =>
        mapHomepageBook({
          id: book.id,
          title: book.title,
          summary: book.summary,
          priceLabel: book.priceLabel,
          image: book.image,
          discountedPrice: parseFallbackPrice(book.priceLabel),
        }),
      );
    }

    return apiBooks.map((book) =>
      mapHomepageBook({
        id: book._id,
        title: book.title,
        summary: book.summary,
        priceLabel: formatPrice(book.discountedPrice),
        image: book.image ?? '/assets/books.png',
        discountedPrice: book.discountedPrice,
      }),
    );
  }, [sectionBooks]);

  const duplicatedBooks = useMemo(() => [...books, ...books], [books]);

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
        immediateRender: false,
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
    <>
    <section ref={sectionRef} className="buy-books-section relative z-30 overflow-hidden pt-12 pb-6 md:pt-16 md:pb-8">
      <DiamondLayer config={buyBooksDiamondConfig} />
      <BooksCartButton />

      <div className="relative z-10 mx-auto w-full overflow-hidden">
        <div className="buy-books-header text-center">
          <h2 className="global-section-heading">
            {sectionBooks?.title ?? 'BUY OUR BOOKS'}
          </h2>
        </div>

        <div className="relative mt-14 flex w-full pb-4 md:mt-16 md:pb-6">
          <div
            ref={cardsContainerRef}
            className="flex gap-8 w-max will-change-transform pl-8"
          >
            {duplicatedBooks.map((book, index) => (
              <BookCard
                key={`${book.id}-${index}`}
                book={book}
                onOpenSample={openSamplePopup}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    {showSamplePopup && selectedSampleBook && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-4 py-6"
        onClick={closeSamplePopup}
      >
        <div
          className="relative w-full max-w-[920px] rounded-[16px] bg-[#01285A] px-4 pb-5 pt-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-8 md:pb-7 md:pt-5"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute right-3 top-3 z-20 flex items-center gap-2 md:right-4 md:top-4">
            <button
              type="button"
              onClick={() => setSampleZoom((value) => Math.max(0.8, Number((value - 0.1).toFixed(1))))}
              aria-label="Zoom out"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white shadow-md transition-all hover:bg-white/25 md:h-9 md:w-9"
            >
              <ZoomOut size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => setSampleZoom((value) => Math.min(1.4, Number((value + 0.1).toFixed(1))))}
              aria-label="Zoom in"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white shadow-md transition-all hover:bg-white/25 md:h-9 md:w-9"
            >
              <ZoomIn size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={closeSamplePopup}
              aria-label="Close sample preview"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#FF0000] shadow-md transition-transform hover:scale-105 md:h-9 md:w-9"
            >
              <X size={18} className="text-white" strokeWidth={3} />
            </button>
          </div>

          <h2 className="mb-3 px-12 text-center text-[24px] font-extrabold uppercase leading-none tracking-[0.5px] md:mb-4 md:text-[28px]">
            <span className="bg-[linear-gradient(90deg,#B8DDF5_0%,#E8B4BE_100%)] bg-clip-text text-transparent">
              Sample
            </span>
          </h2>

          <FlipBook
            key={selectedSampleBook.image}
            coverImage={selectedSampleBook.image}
            compact
            zoom={sampleZoom}
          />

          <div className="mt-1 flex shrink-0 justify-center">
            <button
              type="button"
              onClick={() => {
                router.push(`/books/${selectedSampleBook.slug}`);
                closeSamplePopup();
              }}
              className="flex h-[42px] min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-full border border-white bg-transparent px-6 text-[16px] font-semibold leading-none text-white transition-all duration-300 hover:border-[#0F8EDB] hover:bg-[#0F8EDB] md:h-[44px] md:min-w-[160px] md:text-[18px]"
            >
              Buy Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default BuyBooks;
