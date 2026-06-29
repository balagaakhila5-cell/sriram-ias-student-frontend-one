import Link from '@/components/common/AppLink';
import type { GalleryTopper } from '@/features/ourToppers/types';

export const topperGalleryImagePath = (fileName: string) =>
  `/assets/our-toppers-gallery/${fileName.replaceAll(' ', '%20')}`;

type TopperGalleryCardProps = {
  topper: GalleryTopper;
  index: number;
};

export default function TopperGalleryCard({ topper, index }: TopperGalleryCardProps) {
  const isSecondRow = index >= 5;
  const detailHref = topper.id ? `/our-toppers/${topper.id}` : null;

  const card = (
    <article className="group relative flex w-full flex-col items-center bg-transparent text-center">
      <div
        className={`relative w-full overflow-visible bg-transparent ${
          isSecondRow
            ? 'h-[250px] sm:h-[280px] lg:h-[310px]'
            : 'h-[280px] sm:h-[310px] lg:h-[360px]'
        }`}
      >
        <div
          className={`absolute left-1/2 h-[330px] w-[280px] -translate-x-1/2 bg-transparent sm:h-[380px] sm:w-[325px] lg:h-[455px] lg:w-[390px] lg:-translate-x-[55%] ${
            isSecondRow
              ? 'top-[-6px] lg:top-[-8px]'
              : 'top-[-10px] lg:top-[-22px]'
          }`}
        >
          <img
            src={topperGalleryImagePath(topper.img)}
            alt={`${topper.name} ${topper.rank}`}
            className="mx-auto h-full w-full bg-transparent object-contain object-top drop-shadow-[0_20px_26px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105 lg:drop-shadow-[0_24px_30px_rgba(0,0,0,0.28)]"
            style={{
              transform: `translateY(${topper.y}px) scale(${topper.scale * 1.08})`,
              transformOrigin: 'center top',
            }}
          />
        </div>
      </div>

      <div
        className={`relative z-10 flex min-h-[90px] flex-col items-center bg-transparent ${
          isSecondRow
            ? '-mt-[44px] lg:-mt-[58px]'
            : '-mt-[56px] lg:-mt-[72px]'
        }`}
      >
        <h3 className="max-w-[250px] pt-2 text-center text-[14px] font-extrabold uppercase leading-[1.25] tracking-[0.2px] text-white drop-shadow-sm md:text-[16px]">
          {topper.name}
        </h3>

        <span className="topper-air-badge mt-[6px] shadow-sm">
          {topper.rank}
        </span>

        <p className="mt-[6px] text-[13px] font-semibold leading-[1.2] text-white/95">
          {topper.description}
        </p>
      </div>
    </article>
  );

  if (!detailHref) {
    return card;
  }

  return (
    <Link href={detailHref} className="block w-full">
      {card}
    </Link>
  );
}
