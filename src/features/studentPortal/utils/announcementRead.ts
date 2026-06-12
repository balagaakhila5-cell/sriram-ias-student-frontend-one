const storageKey = (userId: string) => `student_announcement_read_${userId}`;

export function getReadAnnouncementIds(userId: string): string[] {
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

export function saveReadAnnouncementIds(userId: string, ids: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey(userId), JSON.stringify(ids));
}

export function markAnnouncementAsRead(userId: string, announcementId: string): string[] {
  const current = new Set(getReadAnnouncementIds(userId));
  current.add(announcementId);

  const next = Array.from(current);
  saveReadAnnouncementIds(userId, next);
  return next;
}

export function isAnnouncementRead(userId: string, announcementId: string) {
  return getReadAnnouncementIds(userId).includes(announcementId);
}
