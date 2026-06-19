'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import HeaderLogoOnly from '@/components/common/HeaderLogoOnly';
import Footer from '@/components/common/Footer';
import FloatingActions from '@/components/common/FloatingActions';

type MainLayoutProps = {
  children: React.ReactNode;
  logoOnlyHeader?: boolean;
  logoOnlyTransparent?: boolean;
  headerVariant?: 'transparent' | 'light';
};

function resolveSiteSection(pathname: string) {
  if (pathname.startsWith('/current-affairs')) return 'current-affairs';
  if (pathname.startsWith('/free_resources')) return 'free-resources';
  return 'default';
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  logoOnlyHeader = false,
  logoOnlyTransparent = false,
  headerVariant = 'transparent',
}) => {
  const pathname = usePathname() ?? '';
  const siteSection = resolveSiteSection(pathname);

  return (
    <div
      className="flex min-h-screen flex-col font-sans"
      data-site-section={siteSection}
    >
      {logoOnlyHeader ? (
        <HeaderLogoOnly transparent={logoOnlyTransparent} />
      ) : (
        <Header variant={headerVariant} />
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
