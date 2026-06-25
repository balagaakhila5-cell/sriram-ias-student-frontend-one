'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { buildYouTubeEmbedUrl } from '@/lib/youtube';

interface YouTubeVideoModalProps {
  isOpen: boolean;
  videoId: string | null;
  title?: string;
  onClose: () => void;
}

const YouTubeVideoModal: React.FC<YouTubeVideoModalProps> = ({
  isOpen,
  videoId,
  title,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoId || !mounted) return null;

  const embedUrl = buildYouTubeEmbedUrl(videoId, { autoplay: true });

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close video"
      />

      <div
        className="relative z-10 w-full max-w-[min(100%,56rem)]"
        role="dialog"
        aria-modal="true"
        aria-label={title ? `Playing: ${title}` : 'YouTube video player'}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <iframe
            key={videoId}
            src={embedUrl}
            title={title ?? 'YouTube video'}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 sm:right-4 sm:top-4"
            aria-label="Close video"
          >
            <X size={22} />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default YouTubeVideoModal;
