'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import FloatingActions from '@/components/common/FloatingActions';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default MainLayout;
