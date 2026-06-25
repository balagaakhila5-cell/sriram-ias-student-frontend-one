const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export function isValidYouTubeVideoId(value?: string | null): value is string {
  return Boolean(value && YOUTUBE_VIDEO_ID_PATTERN.test(value));
}

export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;

  const trimmed = url.trim();
  if (isValidYouTubeVideoId(trimmed)) return trimmed;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0] || null;
      return isValidYouTubeVideoId(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = parsed.searchParams.get('v');
      if (isValidYouTubeVideoId(v)) return v;

      const pathMatch = parsed.pathname.match(
        /\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/,
      );
      if (pathMatch?.[1]) return pathMatch[1];
    }
  } catch {
    // Fall through to regex for non-standard URLs.
  }

  const match = trimmed.match(
    /(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

export function buildYouTubeEmbedUrl(
  videoId: string,
  options: { autoplay?: boolean } = {},
): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  if (options.autoplay) {
    params.set('autoplay', '1');
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
