import React, { useState } from 'react';
import { TOPPER_IMAGE_ASPECT_CLASS, topperImageSrc } from '@/data/ourToppers';

const FALLBACK_TOPPER_IMAGE = '/assets/student/course-card.png';

type TopperPortraitImageProps = {
  img: string;
  alt: string;
  y: number;
  scale: number;
  loading?: 'eager' | 'lazy';
  heightClass?: string;
};

const TopperPortraitImage: React.FC<TopperPortraitImageProps> = ({
  img,
  alt,
  y,
  scale,
  loading = 'lazy',
  heightClass = 'h-[360px] sm:h-[400px] lg:h-[460px]',
}) => {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = hasError ? FALLBACK_TOPPER_IMAGE : topperImageSrc(img);

  return (
    <div
      className={`relative flex ${TOPPER_IMAGE_ASPECT_CLASS} ${heightClass} w-auto shrink-0 items-end justify-center overflow-visible`}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        loading={loading}
        onError={() => setHasError(true)}
        className="pointer-events-none block h-full w-full select-none bg-transparent object-contain object-bottom"
        style={{
          transform: `translateY(${y - 28}px) scale(${scale})`,
          transformOrigin: 'bottom center',
        }}
      />
    </div>
  );
};

export default TopperPortraitImage;
