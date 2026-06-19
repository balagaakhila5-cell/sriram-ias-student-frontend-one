'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
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
  { id: '1', title: 'UPSC Book sciences - 1', summary: 'Atomic Habits by James Clear', priceLabel: 'Rs.10,000/-', image: '/assets/books.png' },
  { id: '2', title: 'UPSC Book sciences - 2', summary: 'Deep Work by Cal Newport', priceLabel: 'Rs.12,000/-', image: '/assets/books.png' },
  { id: '3', title: 'UPSC Book sciences - 3', summary: 'Thinking Fast and Slow', priceLabel: 'Rs.15,000/-', image: '/assets/books.png' },
  { id: '4', title: 'UPSC Book sciences - 4', summary: 'The Lean Startup', priceLabel: 'Rs.11,000/-', image: '/assets/books.png' },
  { id: '5', title: 'UPSC Book sciences - 5', summary: 'Zero to One', priceLabel: 'Rs.13,000/-', image: '/assets/books.png' },
  { id: '6', title: 'UPSC Book sciences - 6', summary: 'The Four Hour Workweek', priceLabel: 'Rs.14,000/-', image: '/assets/books.png' },
];

const BUY_NOW_BUTTON_GRADIENT =
  'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)';

const OUTLINE_BOOK_BUTTON_CLASS =
  'book-card-outline-btn cursor-pointer rounded-full border border-[#249EDC] bg-white text-[#007BB5]';

const formatPrice = (value?: number) =>
  typeof value === 'number'
    ? `Rs. ${value.toLocaleString('en-IN')} /-`
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
      <div className="book-card-image-container relative h-[280px] w-full shrink-0 overflow-hidden bg-[#F5D060] sm:h-[300px] md:h-[320px] lg:h-[350px]">
        <Image
          src={book.image}
          alt={book.title}
          fill
          unoptimized
          sizes="320px"
          className="book-card-image"
        />
      </div>

      <div className="flex flex-col items-center p-5 text-center">
        <h3 className="line-clamp-2 w-full font-bold text-lg text-gray-800">
          {book.title}
        </h3>

        <span
          className="mt-2 font-bold text-base text-transparent bg-clip-text sm:text-lg"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
          }}
        >
          {book.priceLabel}
        </span>

        <p className="mt-1 text-[9px] leading-tight text-gray-400 sm:text-[10px]">
          * Excluding GST
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
          className={`${OUTLINE_BOOK_BUTTON_CLASS} mt-3 w-full max-w-[180px] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide sm:text-xs`}
        >
          VIEW SAMPLE
        </button>

        <div className="mt-4 flex w-full gap-3">
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

  const openSamplePopup = (book: SampleBook) => {
    setSelectedSampleBook(book);
    setShowSamplePopup(true);
  };

  const closeSamplePopup = () => {
    setShowSamplePopup(false);
    setSelectedSampleBook(null);
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
    <section ref={sectionRef} className="relative z-30 py-18 overflow-hidden">
      <DiamondLayer config={buyBooksDiamondConfig} />
      <BooksCartButton />

      <div className="relative z-10 mx-auto w-full overflow-hidden">
        <div className="buy-books-header text-center">
          <h2 className="global-section-heading">
            {sectionBooks?.title ?? 'BUY OUR BOOKS'}
          </h2>
        </div>

        <div className="w-full relative flex mt-10 pb-16">
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
      <div className="fixed inset-0 z-[9999] bg-black/55 flex items-center justify-center px-4 py-6">
        <div className="relative w-full max-w-[860px] rounded-[20px] bg-[#F5F5F5] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="px-8 pt-6 pb-4 relative">
            <h2 className="text-[34px] md:text-[42px] font-extrabold uppercase leading-none tracking-[0.5px]">
              <span className="bg-[linear-gradient(90deg,#6AA9D8_0%,#C88EA0_100%)] bg-clip-text text-transparent">
                SAMPLE
              </span>
            </h2>

            <button
              type="button"
              onClick={closeSamplePopup}
              className="absolute top-6 right-8 w-[30px] h-[30px] md:w-[32px] md:h-[32px] rounded-full bg-[#FF0000] flex items-center justify-center cursor-pointer"
            >
              <X size={20} className="text-white" strokeWidth={3} />
            </button>
          </div>

          <div className="px-8 pb-8">
            <div className="bg-[#01285A] rounded-[16px] min-h-[470px] relative px-6 md:px-10 py-6 md:py-8 flex flex-col">
              <FlipBook coverImage={selectedSampleBook.image} />

              <div className="flex justify-center mt-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    router.push(`/books/${selectedSampleBook.slug}`);
                    closeSamplePopup();
                  }}
                  className="min-w-[160px] h-[46px] md:h-[48px] px-7 rounded-full border border-white bg-transparent text-white text-[18px] md:text-[20px] font-semibold leading-none transition-all duration-300 hover:bg-[#0F8EDB] hover:border-[#0F8EDB] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Buy Now
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default BuyBooks;
