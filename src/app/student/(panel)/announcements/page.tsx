'use client';

import { useEffect, useMemo, useState } from 'react';
import AnnouncementCard from '@/features/studentPortal/components/AnnouncementCard';
import { announcements } from '@/features/studentPortal/data/announcements';
import { getPinnedAnnouncementIds, togglePinnedAnnouncement } from '@/features/studentPortal/utils/announcementPins';
import {
  getReadAnnouncementIds,
  markAnnouncementAsRead,
} from '@/features/studentPortal/utils/announcementRead';
import { useAuthStore } from '@/store/authStore';

export default function AnnouncementsPage() {
  const user = useAuthStore((state) => state.user);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setPinnedIds([]);
      setReadIds([]);
      setIsReady(true);
      return;
    }

    setPinnedIds(getPinnedAnnouncementIds(user.id));
    setReadIds(getReadAnnouncementIds(user.id));
    setIsReady(true);
  }, [user?.id]);

  const pinnedSet = useMemo(() => new Set(pinnedIds), [pinnedIds]);
  const readSet = useMemo(() => new Set(readIds), [readIds]);

  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort((a, b) => {
      const aPinned = pinnedSet.has(a.id);
      const bPinned = pinnedSet.has(b.id);

      if (aPinned === bPinned) return 0;
      return aPinned ? -1 : 1;
    });
  }, [pinnedSet]);

  const handleTogglePin = (announcementId: string) => {
    if (!user?.id) return;

    const next = togglePinnedAnnouncement(user.id, announcementId);
    setPinnedIds(next);
  };

  const handleMarkAsRead = (announcementId: string) => {
    if (!user?.id || readSet.has(announcementId)) return;

    const next = markAnnouncementAsRead(user.id, announcementId);
    setReadIds(next);
  };

  if (!isReady) {
    return (
      <div className="mt-6 rounded-[18px] bg-white px-6 py-10 text-center text-[16px] font-medium text-[#00000080]">
        Loading announcements...
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            pinned={pinnedSet.has(announcement.id)}
            read={readSet.has(announcement.id)}
            onTogglePin={() => handleTogglePin(announcement.id)}
            onMarkAsRead={() => handleMarkAsRead(announcement.id)}
          />
        ))}
      </div>
    </div>
  );
}
