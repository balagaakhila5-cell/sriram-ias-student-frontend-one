'use client';

import DynamicCalendar from '@/components/common/DynamicCalendar';

export default function BlogsCalendar() {
  return (
    <div className="w-full overflow-visible">
      <DynamicCalendar variant="sidebar" className="w-full" />
    </div>
  );
}
