'use client';

import { getYoutubeEmbedUrl } from '@/features/blogs/services/blogDetailsService';

type BlogYoutubeEmbedProps = {
  youtubeVideoUrl?: string | null;
  title: string;
  className?: string;
};

export default function BlogYoutubeEmbed({
  youtubeVideoUrl,
  title,
  className = '',
}: BlogYoutubeEmbedProps) {
  const embedUrl = getYoutubeEmbedUrl(youtubeVideoUrl);
  if (!embedUrl) return null;

  return (
    <div
      className={`blog-section-card mb-10 aspect-video overflow-hidden rounded-[10px] ${className}`}
    >
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
