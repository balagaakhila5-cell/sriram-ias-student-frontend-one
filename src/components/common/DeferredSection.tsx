'use client';

import React, { Suspense, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LazyExoticComponent, ComponentType } from 'react';
import useInViewport from '@/hooks/useInViewport';

type DeferredSectionProps = {
  component: LazyExoticComponent<ComponentType>;
  fallbackClassName?: string;
  rootMargin?: string;
};

const DeferredContent = ({
  component: Component,
}: {
  component: LazyExoticComponent<ComponentType>;
}) => {
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <Component />;
};

const DeferredSection: React.FC<DeferredSectionProps> = ({
  component: Component,
  fallbackClassName = 'min-h-[480px]',
  rootMargin = '400px 0px',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldRender = useInViewport(containerRef, {
    once: true,
    rootMargin,
    threshold: 0,
  });

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={<div className={fallbackClassName} aria-hidden="true" />}>
          <DeferredContent component={Component} />
        </Suspense>
      ) : (
        <div className={fallbackClassName} aria-hidden="true" />
      )}
    </div>
  );
};

export default DeferredSection;
