import type { UpcomingSession } from "../data/liveClass";
import Image from "@/components/common/AppImage";

interface UpcomingClassCardProps {
  session: UpcomingSession;
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14.2 14.2L9 11V5H10.5V10.2L15 12.9L14.2 14.2Z"
        fill="black"
        fillOpacity={0.5}
      />
    </svg>
  );
}

export default function UpcomingClassCard({ session }: UpcomingClassCardProps) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-[16px] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
      <div className="relative h-[110px] w-[120px] shrink-0 sm:h-[120px] sm:w-[130px]">
        <Image
          src="/assets/student/upcoming-class.png"
          alt=""
          fill
          className="object-cover"
          sizes="130px"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-[15px] leading-snug sm:text-[16px]">
          <span className="font-semibold text-[#000000]/50">Topic :</span>{" "}
          <span className="font-bold text-[#1F2A37]">{session.topic}</span>
        </p>

        <div className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-[#000000]/80 sm:text-[16px]">
          <ClockIcon />
          <span className="leading-none">{session.timeLabel}</span>
        </div>
      </div>
    </div>
  );
}
