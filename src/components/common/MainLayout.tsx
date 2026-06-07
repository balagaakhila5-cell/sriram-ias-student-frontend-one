'use client';

import React from 'react';
import Header from '@/components/common/Header';
import HeaderLogoOnly from '@/components/common/HeaderLogoOnly';
import Footer from '@/components/common/Footer';
import FloatingActions from '@/components/common/FloatingActions';

type MainLayoutProps = {
  children: React.ReactNode;
  logoOnlyHeader?: boolean;
  logoOnlyTransparent?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  logoOnlyHeader = false,
  logoOnlyTransparent = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {logoOnlyHeader ? (
        <HeaderLogoOnly transparent={logoOnlyTransparent} />
      ) : (
        <Header />
      )}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default MainLayout;
