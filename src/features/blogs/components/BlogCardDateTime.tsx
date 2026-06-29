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
      ? 'text-[16px] font-bold leading-snug text-white sm:text-[18px]'
      : 'text-[11px] font-normal leading-snug text-white/95 sm:text-[12px]';

  return (
    <div className={cn(className)}>
      {dateLabel ? (
        <p className={cn(lineClassName, variant === 'featured' ? 'mb-3' : 'mb-0.5')}>
          {dateLabel}
        </p>
      ) : null}
      {timeLabel ? (
        <p className={cn(lineClassName, variant === 'grid' ? 'mb-0' : undefined)}>
          {timeLabel}
        </p>
      ) : null}
    </div>
  );
}
