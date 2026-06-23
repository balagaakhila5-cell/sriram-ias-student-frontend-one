"use client";

import { useState } from "react";
import { useRouter } from "@/lib/appRouter";
import { Hand, MessageSquare, PhoneOff, Users } from "lucide-react";
import LiveSessionChat from "./LiveSessionChat";

interface LiveSessionRoomProps {
  sessionId: string;
}

export default function LiveSessionRoom({ sessionId }: LiveSessionRoomProps) {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070A1C]">
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="relative flex h-[68vh] w-full max-w-[1100px] items-center justify-center rounded-[24px]"
          style={{ background: "#3F5EAD" }}
          aria-label={`Live session ${sessionId}`}
        >
          <span className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#5A77BF]">
            <svg
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="#A6BEDF" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#A6BEDF" />
            </svg>
          </span>
        </div>
      </div>

      <LiveSessionChat open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-6 rounded-full bg-[#0F1430]/85 px-6 py-3 text-[13px] text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <ControlButton icon={<Users size={16} />} label="200 Participants" />
          <Divider />
          <ControlButton
            icon={<MessageSquare size={16} />}
            label="Chat"
            active={chatOpen}
            onClick={() => setChatOpen((v) => !v)}
          />
          <Divider />
          <ControlButton
            icon={<Hand size={16} />}
            label="Raise your hand"
            active={handRaised}
            onClick={() => setHandRaised((v) => !v)}
          />
          <Divider />
          <ControlButton
            icon={<PhoneOff size={16} />}
            label="Leave Class"
            danger
            onClick={() => router.push("/student/live-class")}
          />
        </div>
      </div>
    </main>
  );
}

function Divider() {
  return <span className="h-5 w-px bg-white/20" />;
}

function ControlButton({
  icon,
  label,
  active,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-2 py-1 transition-colors ${
        danger
          ? "text-[#FF6B6B] hover:bg-white/5"
          : active
            ? "text-[#56C0F1]"
            : "text-white/85 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-[13px]">{label}</span>
    </button>
  );
}
