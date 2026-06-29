export function formatBlogDateLabel(value?: string | null): string {
  if (!value?.trim()) return '';
  const date = new Date(value.trim());
  if (Number.isNaN(date.getTime())) return value.trim();
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatBlogTimeLabel(value?: string | null): string {
  if (!value?.trim()) return '';
  const date = new Date(value.trim());
  if (Number.isNaN(date.getTime())) return value.trim();
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

type BlogDateTimeSource = {
  date?: string | null;
  time?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export function resolveBlogDateTime(source: BlogDateTimeSource): {
  date: string;
  time: string;
} {
  const timestamp =
    source.publishedAt?.trim() ||
    source.createdAt?.trim() ||
    source.updatedAt?.trim() ||
    '';

  return {
    date: source.date?.trim() || formatBlogDateLabel(timestamp),
    time: source.time?.trim() || formatBlogTimeLabel(timestamp),
  };
}

export function buildBlogMetaLine({
  date,
  time,
  readTime,
}: {
  date?: string;
  time?: string;
  readTime?: string;
}): string {
  const parts: string[] = [];

  if (date?.trim()) {
    parts.push(date.trim());
  }

  if (time?.trim()) {
    parts.push(time.trim());
  }

  if (readTime?.trim()) {
    parts.push(readTime.trim());
  }

  return parts.join('   ');
}

export function formatBlogCardDateLabel(value?: string | null): string {
  if (!value?.trim()) return '';
  const date = new Date(value.trim());
  if (Number.isNaN(date.getTime())) return value.trim();

  const month = date.toLocaleDateString(undefined, { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day} , ${year}`;
}

export function formatBlogCardTimeLabel(value?: string | null): string {
  if (!value?.trim()) return '';
  const date = new Date(value.trim());
  if (Number.isNaN(date.getTime())) return value.trim();

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function resolveBlogCardDateTime(source: BlogDateTimeSource): {
  date: string;
  time: string;
} {
  const timestamp =
    source.publishedAt?.trim() ||
    source.createdAt?.trim() ||
    source.updatedAt?.trim() ||
    '';

  return {
    date:
      formatBlogCardDateLabel(source.date) ||
      formatBlogCardDateLabel(timestamp) ||
      source.date?.trim() ||
      '',
    time:
      formatBlogCardTimeLabel(source.time) ||
      formatBlogCardTimeLabel(timestamp) ||
      source.time?.trim() ||
      '',
  };
}
