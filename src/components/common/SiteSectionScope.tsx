'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

function resolveSiteSection(pathname: string) {
  if (pathname.startsWith('/current-affairs')) return 'current-affairs';
  if (pathname.startsWith('/free_resources')) return 'free-resources';
  return 'default';
}

/** Sets `data-site-section` on `<html>` for route-aware layout hooks. */
export default function SiteSectionScope() {
  const pathname = usePathname() ?? '';

  useLayoutEffect(() => {
    const section = resolveSiteSection(pathname);
    document.documentElement.setAttribute('data-site-section', section);

    return () => {
      document.documentElement.removeAttribute('data-site-section');
    };
  }, [pathname]);

  return null;
}
