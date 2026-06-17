'use client';

import React from 'react';
import MainLayout from '@/components/common/MainLayout';
import BooksHero from '@/features/books/components/BooksHero';
import BooksOverviewTabs from '@/features/books/components/BooksOverviewTabs';
import BooksGrid from '@/features/books/components/BooksGrid';
import CartSidebar from '@/features/books/components/CartSidebar';
import BooksCartButton from '@/features/books/components/BooksCartButton';
import { Book } from '@/features/books/types';

interface BooksPageClientProps {
  books: Book[];
}

const BooksPageClient: React.FC<BooksPageClientProps> = ({ books }) => {
  return (
    <MainLayout>
      <BooksHero />
      <BooksOverviewTabs />
      <BooksGrid books={books} />
      <BooksCartButton />
      <CartSidebar />
    </MainLayout>
  );
};

export default BooksPageClient;
