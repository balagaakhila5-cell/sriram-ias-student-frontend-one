"use client";

import { useState } from "react";
import { Send, X } from "lucide-react";
import { inCallMessages, questions, type ChatMessage } from "../data/liveSession";

type Tab = "messages" | "questions";

interface LiveSessionChatProps {
  open: boolean;
  onClose: () => void;
}

export default function LiveSessionChat({ open, onClose }: LiveSessionChatProps) {
  const [tab, setTab] = useState<Tab>("messages");
  const [draft, setDraft] = useState("");

  if (!open) return null;

  const list = tab === "messages" ? inCallMessages : questions;

  return (
    <aside className="absolute right-4 top-4 bottom-4 z-30 flex w-[360px] flex-col rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 rounded-full bg-[#F1F7FB] p-1">
          <TabButton
            active={tab === "messages"}
            onClick={() => setTab("messages")}
          >
            In Call Messages
          </TabButton>
          <TabButton
            active={tab === "questions"}
            onClick={() => setTab("questions")}
          >
            Questions
          </TabButton>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="text-[#5C6770] hover:text-[#1F2A37]"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4">
        {list.map((m) => (
          <ChatBubble key={m.id} msg={m} />
        ))}
      </div>

      {tab === "messages" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDraft("");
          }}
          className="m-4 flex items-center gap-2 rounded-full border border-[#E6EBEF] bg-white px-4 py-2"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent text-[13px] text-[#1F2A37] outline-none placeholder:text-[#9AA4AD]"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white disabled:opacity-50"
            style={{
              background:
                "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
            }}
            aria-label="Send"
          >
            <Send size={14} />
          </button>
        </form>
      )}
    </aside>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-colors ${
        active ? "text-white" : "text-[#5C6770]"
      }`}
      style={
        active
          ? {
              background:
                "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
            }
          : undefined
      }
    >
      {children}
    </button>
  );
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  if (msg.isSelf) {
    return (
      <div className="flex flex-col items-end">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[12px] font-medium text-[#1F2A37]">
            {msg.author}
          </span>
          <Avatar />
        </div>
        <div className="max-w-[80%] rounded-2xl bg-[#CDE7F1] px-4 py-2 text-[12px] text-[#1F2A37]">
          {msg.text}
        </div>
        <span className="mt-1 text-[10px] text-[#9AA4AD]">{msg.time}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start">
      <div className="mb-1 flex items-center gap-2">
        <Avatar />
        <span className="text-[12px] font-medium text-[#1F2A37]">
          {msg.author}
        </span>
      </div>
      <div className="max-w-[80%] rounded-2xl bg-[#CDE7F1] px-4 py-2 text-[12px] text-[#1F2A37]">
        {msg.text}
      </div>
      <span className="mt-1 text-[10px] text-[#9AA4AD]">{msg.time}</span>
    </div>
  );
}

function Avatar() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1F7AB8] text-[10px] font-semibold text-white">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="4" fill="#9EC9E3" />
        <path
          d="M4 20c0-4 4-6 8-6s8 2 8 6"
          fill="#9EC9E3"
        />
      </svg>
    </span>
  );
}
