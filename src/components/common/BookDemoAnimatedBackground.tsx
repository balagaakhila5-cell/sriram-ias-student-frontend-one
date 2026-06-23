'use client';

import Image from '@/components/common/AppImage';

export const BOOK_DEMO_BG_GRADIENT =
  'linear-gradient(180deg, #20A0E0 0%, #1897D8 50%, #005B88 100%)';

type BookDemoAnimatedBackgroundProps = {
  className?: string;
  imageClassName?: string;
  /** `gradient` = blue fill + lines (Book Demo / Our Centers). `lines-only` = white base + animated lines. */
  variant?: 'gradient' | 'lines-only';
  /** Skip solid base fill so parent panel opacity shows through. */
  transparentBase?: boolean;
};

export default function BookDemoAnimatedBackground({
  className = '',
  imageClassName,
  variant = 'gradient',
  transparentBase = false,
}: BookDemoAnimatedBackgroundProps) {
  const isLinesOnly = variant === 'lines-only';
  const resolvedImageClass =
    imageClassName ??
    (isLinesOnly
      ? 'object-cover opacity-[0.55] mix-blend-multiply'
      : 'object-cover opacity-80');

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 isolate overflow-hidden ${className}`}
      aria-hidden
    >
      {isLinesOnly && !transparentBase ? (
        <div className="absolute inset-0 bg-white" aria-hidden />
      ) : !isLinesOnly ? (
        <div
          className="absolute inset-0"
          style={{ background: BOOK_DEMO_BG_GRADIENT }}
          aria-hidden
        />
      ) : null}
      <div className="book-demo-panel-bg-motion absolute left-[-12%] top-[-12%] h-[124%] w-[124%] will-change-transform">
        <Image
          src="/assets/free-demo-bgs.png"
          alt=""
          fill
          unoptimized
          className={resolvedImageClass}
          aria-hidden
        />
      </div>
    </div>
  );
}
