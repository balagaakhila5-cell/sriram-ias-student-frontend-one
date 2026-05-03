'use client';

import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import NotFoundPage from '@/components/common/NotFound';
import BookDetailsHero from '@/features/books/components/BookDetailsHero';
import BookDetailsContent from '@/features/books/components/BookDetailsContent';
import StickyBottomBar from '@/features/books/components/StickyBottomBar';
import CartSidebar from '@/features/books/components/CartSidebar';
import { getBookBySlug } from '@/features/books/data/books';

interface BookDetailsClientProps {
  slug: string;
}

const BookDetailsClient: React.FC<BookDetailsClientProps> = ({ slug }) => {
  const book = getBookBySlug(slug);

  if (!book) {
    return <NotFoundPage />; // Assumes NotFoundPage exists under components/common/NotFound.tsx or similar
  }

  return (
    <MainLayout>
      <BookDetailsHero />
      <BookDetailsContent book={book} />
      <StickyBottomBar book={book} />
      <CartSidebar />
    </MainLayout>
  );
};

export default BookDetailsClient;
