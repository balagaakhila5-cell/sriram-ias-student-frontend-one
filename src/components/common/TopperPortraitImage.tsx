import React from 'react';
import {
  TOPPER_IMAGE_ASPECT_CLASS,
  isRemoteTopperImage,
  topperImageSrc,
} from '@/data/ourToppers';

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
  const src = topperImageSrc(img);
  const isRemote = isRemoteTopperImage(img);

  if (!isRemote) {
    return (
      <div
        className={`relative flex ${TOPPER_IMAGE_ASPECT_CLASS} ${heightClass} w-auto shrink-0 items-end justify-center overflow-visible`}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          className="pointer-events-none block h-full w-full select-none object-contain object-bottom"
          style={{
            transform: `translateY(${y - 28}px) scale(${scale})`,
            transformOrigin: 'bottom center',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${heightClass} w-[220px] shrink-0 overflow-hidden sm:w-[250px] lg:w-[280px]`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #e9f4fc 0%, #c8dff2 42%, #9ec8e6 72%, #7eb5dc 100%)',
        }}
      />

      <img
        src={src}
        alt={alt}
        loading={loading}
        className="relative z-10 h-full w-full select-none object-cover object-[center_12%]"
        style={{
          transform: `translateY(${y - 18}px) scale(${scale * 1.04})`,
          transformOrigin: 'bottom center',
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[38%]"
        style={{
          background:
            'linear-gradient(to top, rgba(110, 181, 220, 0.95) 0%, rgba(110, 181, 220, 0.55) 45%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default TopperPortraitImage;
