'use client';

import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import NotFoundPage from '@/components/common/NotFound';
import BookDetailsHero from '@/features/books/components/BookDetailsHero';
import BookDetailsContent from '@/features/books/components/BookDetailsContent';
import StickyBottomBar from '@/features/books/components/StickyBottomBar';
import CartSidebar from '@/features/books/components/CartSidebar';
import EmptyState from '@/features/currentAffairs/components/EmptyState';
import { useBookProductBySlug } from '@/features/books/hooks/useBookstoreProducts';

interface BookDetailsClientProps {
  slug: string;
}

const BookDetailsClient: React.FC<BookDetailsClientProps> = ({ slug }) => {
  const { data: book, isLoading, isError, error } = useBookProductBySlug(slug);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-[1200px] animate-pulse px-6 py-16">
          <div className="h-72 rounded-2xl bg-slate-200" />
          <div className="mt-8 h-40 rounded-2xl bg-slate-100" />
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-[1200px] px-6 py-16">
          <EmptyState
            title="Unable to load book"
            message={error?.message || 'Unable to fetch product details. Please try again.'}
          />
        </div>
      </MainLayout>
    );
  }

  if (!book) {
    return <NotFoundPage />;
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
