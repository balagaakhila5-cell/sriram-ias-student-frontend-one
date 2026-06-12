'use client';

import dynamic from 'next/dynamic';

const DynamicCalendar = dynamic(
  () => import('@/components/common/DynamicCalendar'),
  { ssr: false },
);

export default function BlogsCalendar() {
  return (
    <div className="w-full overflow-visible">
      <DynamicCalendar variant="sidebar" className="w-full" />
    </div>
  );
}
