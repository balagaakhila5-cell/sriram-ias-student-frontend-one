import { resolveBlogCardDateTime } from '@/features/blogs/utils/blogDateTime';
import { cn } from '@/lib/utils';

type BlogCardDateTimeProps = {
  date?: string;
  time?: string;
  variant?: 'grid' | 'featured';
  className?: string;
};

export default function BlogCardDateTime({
  date,
  time,
  variant = 'grid',
  className = '',
}: BlogCardDateTimeProps) {
  const { date: dateLabel, time: timeLabel } = resolveBlogCardDateTime({ date, time });

  if (!dateLabel && !timeLabel) return null;

  const lineClassName =
    variant === 'featured'
      ? 'text-[16px] font-normal leading-snug text-white sm:text-[18px]'
      : 'text-[13px] font-normal leading-snug text-white sm:text-[14px]';

  return (
    <div className={cn('mb-3 space-y-0.5', className)}>
      {dateLabel ? <p className={lineClassName}>{dateLabel}</p> : null}
      {timeLabel ? <p className={lineClassName}>{timeLabel}</p> : null}
    </div>
  );
}
