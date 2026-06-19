'use client';

import ResourcePdfIconThumb from '@/features/resources/components/ResourcePdfIconThumb';
import { STUDY_MATERIAL_CARD } from '@/features/resources/components/cardStyles';
import type { YearWiseTopperItem } from '@/features/ourToppers/data/yearWiseToppers';

type YearWiseToppersGridProps = {
  items: YearWiseTopperItem[];
};

function YearWiseTopperCard({ item }: { item: YearWiseTopperItem }) {
  return (
    <article className={`${STUDY_MATERIAL_CARD.shell} w-full`}>
      <ResourcePdfIconThumb />
      <div className={STUDY_MATERIAL_CARD.body}>
        <h3 className={STUDY_MATERIAL_CARD.title}>{item.title}</h3>

        <div className={STUDY_MATERIAL_CARD.actions}>
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={STUDY_MATERIAL_CARD.viewButton}
          >
            View
          </a>
          <a
            href={item.pdfUrl}
            download={item.downloadFileName}
            className={STUDY_MATERIAL_CARD.downloadButton}
          >
            Download PDF
          </a>
        </div>
      </div>
    </article>
  );
}

export default function YearWiseToppersGrid({ items }: YearWiseToppersGridProps) {
  const isSingle = items.length === 1;

  return (
    <div
      className={`mx-auto grid w-full max-w-[980px] justify-items-center gap-5 px-4 lg:px-0 ${
        isSingle
          ? 'grid-cols-1'
          : 'grid-cols-1 sm:grid-cols-2 sm:gap-6'
      }`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={isSingle ? 'w-full max-w-[480px]' : 'w-full'}
        >
          <YearWiseTopperCard item={item} />
        </div>
      ))}
    </div>
  );
}
