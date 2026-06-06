'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import DiamondLayer from '../DiamondLayer';
import { heroDiamondConfig } from '../diamondConfigs';
import { useHomepage } from '@/features/homepage/hooks/useHomepage';
import { useCartStore } from '@/store/cartStore';
import {
  mapHomepageBook,
  toCartBook,
  type HomeSectionBook,
} from '@/features/homepage/utils/homepageBook';
import BooksCartButton from '@/features/books/components/BooksCartButton';

gsap.registerPlugin(ScrollTrigger);

const fallbackBooks = [
  { id: '1', title: 'UPSC Book sciences - 1', summary: 'Atomic Habits by James Clear', priceLabel: 'Rs.10,000/-', image: '/assets/books.png' },
  { id: '2', title: 'UPSC Book sciences - 2', summary: 'Deep Work by Cal Newport', priceLabel: 'Rs.12,000/-', image: '/assets/books.png' },
  { id: '3', title: 'UPSC Book sciences - 3', summary: 'Thinking Fast and Slow', priceLabel: 'Rs.15,000/-', image: '/assets/books.png' },
  { id: '4', title: 'UPSC Book sciences - 4', summary: 'The Lean Startup', priceLabel: 'Rs.11,000/-', image: '/assets/books.png' },
  { id: '5', title: 'UPSC Book sciences - 5', summary: 'Zero to One', priceLabel: 'Rs.13,000/-', image: '/assets/books.png' },
  { id: '6', title: 'UPSC Book sciences - 6', summary: 'The Four Hour Workweek', priceLabel: 'Rs.14,000/-', image: '/assets/books.png' },
];

const formatPrice = (value?: number) =>
  typeof value === 'number'
    ? `Rs. ${value.toLocaleString('en-IN')} /-`
    : 'Rs. —';

const parseFallbackPrice = (label: string) => {
  const digits = label.replace(/[^\d]/g, '');
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 5999;
};

type BookCardProps = {
  book: HomeSectionBook;
};

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartBook = toCartBook(book);
  const cartQuantity = useCartStore(
    (state) =>
      state.items.find((item) => item.book.id === book.id)?.quantity ?? 0,
  );

  const handleAddToCart = () => {
    addItem(cartBook, { openSidebar: false });
  };

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
    <div className="book-card min-w-[85vw] w-[85vw] sm:min-w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col p-6 space-y-4 group hover:shadow-2xl transition-shadow duration-300 transform-gpu backface-visibility-hidden">
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
          {book.summary}
        </p>

        <div className="flex justify-between items-center pt-1">
          <span
            className="font-bold text-lg inline-block text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)',
            }}
          >
            {book.priceLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => router.push(`/books/${book.slug}`)}
          className="py-2 text-xs text-white rounded-md transition-all hover:opacity-90 font-medium cursor-pointer"
          style={{
            background:
              'linear-gradient(88.42deg, #249EDC 15.64%, #135576 93.77%)',
            boxShadow: '0px 4px 32px 0px #0000001A',
          }}
        >
          Buy Now
        </button>

        {cartQuantity > 0 ? (
          <div className="flex h-[34px] items-center justify-between rounded-md border border-[#249EDC] bg-[#EAF7FF] px-2">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white cursor-pointer"
            >
              −
            </button>
            <button
              type="button"
              onClick={handleGoToCheckout}
              aria-label="Go to checkout"
              className="min-w-[24px] cursor-pointer text-center text-sm font-bold text-[#007BB5] hover:underline"
            >
              {cartQuantity}
            </button>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center rounded-md text-lg font-bold leading-none text-[#007BB5] transition-colors hover:bg-white cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="cursor-pointer rounded-md border border-[#249EDC] py-2 text-xs font-medium text-[#007BB5] transition-all hover:bg-gray-50"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

const BuyBooks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { data: homepage } = useHomepage();
  const sectionBooks = homepage?.sectionBooks;

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
      <BooksCartButton />

      <div className="relative z-10 mx-auto w-full overflow-hidden">
        <div className="buy-books-header text-center">
          <h2 className="global-section-heading">
            {sectionBooks?.title ?? 'BUY OUR BOOKS'}
          </h2>
        </div>

        <div className="w-full relative flex mt-32 pb-16">
          <div
            ref={cardsContainerRef}
            className="flex gap-8 w-max will-change-transform pl-8"
          >
            {duplicatedBooks.map((book, index) => (
              <BookCard key={`${book.id}-${index}`} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyBooks;
