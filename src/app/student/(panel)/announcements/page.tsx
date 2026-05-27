import AnnouncementCard from "@/features/studentPortal/components/AnnouncementCard";
import SectionTitle from "@/features/studentPortal/components/SectionTitle";
import { announcements } from "@/features/studentPortal/data/announcements";

export default function AnnouncementsPage() {
  return (
    <div>
      {/* <SectionTitle first="ANNOUNCE" second="MENTS" /> */}

      <div className="mt-6 space-y-4">
        {announcements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} />
        ))}
      </div>
    </div>
  );
}
