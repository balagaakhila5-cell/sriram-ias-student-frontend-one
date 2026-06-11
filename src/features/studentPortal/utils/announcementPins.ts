const storageKey = (userId: string) => `student_announcement_pins_${userId}`;

export function getPinnedAnnouncementIds(userId: string): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function savePinnedAnnouncementIds(userId: string, ids: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey(userId), JSON.stringify(ids));
}

export function togglePinnedAnnouncement(userId: string, announcementId: string): string[] {
  const current = new Set(getPinnedAnnouncementIds(userId));

  if (current.has(announcementId)) {
    current.delete(announcementId);
  } else {
    current.add(announcementId);
  }

  const next = Array.from(current);
  savePinnedAnnouncementIds(userId, next);
  return next;
}

export function isAnnouncementPinned(userId: string, announcementId: string) {
  return getPinnedAnnouncementIds(userId).includes(announcementId);
}
