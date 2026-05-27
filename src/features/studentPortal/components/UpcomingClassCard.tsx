import { Clock, GraduationCap } from "lucide-react";
import type { UpcomingSession } from "../data/liveClass";
import Image from "next/image";

interface UpcomingClassCardProps {
  session: UpcomingSession;
}

export default function UpcomingClassCard({ session }: UpcomingClassCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-[16px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="relative h-[150px] w-[150px] shrink-0">
        <Image 
          src={"/assets/student/upcoming-class.png"} 
          alt="" 
          fill 
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="truncate text-[16px] text-[#1F2A37] font-semibold">
          <span className="font-semibold text-[#000000]/50">Topic :</span> {session.topic}
        </p>
        <div className="mt-2 flex items-center gap-2 text-[16px] text-[#000000]/80 font-semibold">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14.2 14.2L9 11V5H10.5V10.2L15 12.9L14.2 14.2Z" fill="black" fillOpacity={0.5} />
          </svg>
          {session.timeLabel}
        </div>
      </div>
    </div>
  );
}
