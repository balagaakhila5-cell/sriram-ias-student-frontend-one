"use client";

import { useState } from "react";

type NotesTab = "take-notes" | "cheat-sheet" | "topic-quiz" | "mains-question";

const TABS: { id: NotesTab; label: string }[] = [
  { id: "take-notes", label: "Take Notes" },
  { id: "cheat-sheet", label: "Cheat Sheet" },
  { id: "topic-quiz", label: "Topic Quiz" },
  { id: "mains-question", label: "Mains Question" },
];

export default function NotesPanel() {
  const [tab, setTab] = useState<NotesTab>("take-notes");
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center rounded-full bg-[#EEF2F6] p-2">
        {TABS.map((t) => {
          const isActive = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="flex-1 rounded-full px-5 py-4 text-center transition-all"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
               fontSize: "18px",
                ...(isActive
                  ? {
                     background:
                      "linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)",
                      color: "#FFFFFF",
                    }
                  : { color: "#1F2A37" }),
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        className={`rounded-[16px] p-6 ${
          tab === "take-notes" ? "bg-[#EBF0FF]" : "bg-[#FAF8F3]"
        }`}
      >
        {tab === "take-notes" && (
          <>
            <h4
              className="mb-3 text-[18px] font-medium text-[#000000]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Take Notes
            </h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-[180px] w-full resize-none rounded-[10px] bg-white p-3 text-[13px] outline-none"
              placeholder="Write your notes here..."
            />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setNotes("")}
                className="rounded-md border border-[#A8CEE6] bg-white px-4 py-2 text-[17px] font-medium text-[#1F7AB8]"
              >
                Reset page
              </button>
              <button
                type="button"
                className="rounded-md px-5 py-2 text-[18px] font-medium text-white"
                style={{
                  background:
                    "linear-gradient(90deg, #009FEECC 0%, #005B88 100%)",
                }}
              >
                Save
              </button>
            </div>
          </>
        )}

        {tab === "cheat-sheet" && <CheatSheetContent />}
        {tab === "topic-quiz" && <TopicQuizContent />}
        {tab === "mains-question" && <MainsQuestionContent />}
      </div>
    </div>
  );
}

function CheatSheetContent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2
          className="text-[24px] font-bold leading-[32px] text-[#000000]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Introduction to Geography
        </h2>
        <button
          type="button"
          className="rounded-full bg-[#29A4DF] px-6 py-2.5 text-[17px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Download PDF
        </button>
      </div>

      <ul
        className="space-y-6 text-[18px] font-medium leading-[200%] text-[#000000]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <li className="flex gap-3">
          <span>•</span>
          <span>
            Geography is the study of the Earth, its physical features, and the
            relationship between humans and their environment. It helps us
            understand how natural elements like landforms, climate, water, and
            vegetation interact with human activities such as settlements,
            agriculture, and industries. Geography is broadly divided into
            Physical Geography (study of natural features like mountains,
            rivers, climate), Human Geography (study of population, culture,
            economy),
          </span>
        </li>
        <li className="flex gap-3">
          <span>•</span>
          <span>
            Environmental Geography (interaction between humans and nature). It
            plays a crucial role in daily life by helping in disaster
            management, resource planning, environmental conservation, and
            sustainable development. Key concepts include location (latitude &amp;
            longitude), place, region, movement, and human-environment
            interaction, which form the foundation for all advanced geographical
            studies.
          </span>
        </li>
      </ul>
    </div>
  );
}

function TopicQuizContent() {
  return (
    <div className="space-y-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <h3 className="text-[18px] font-bold leading-[200%] text-[#000000]">
        1 . What is Geography primarily the study of?
      </h3>

      <div className="space-y-4">
        {[
          "A .  Only maps",
          "B .  Earth and its features",
          "C .  Only climate",
          "D .  Only population",
        ].map((opt, i) => (
          <div
            key={i}
            className={`rounded-[8px] p-4 text-[18px] font-medium leading-[200%] text-[#000000] ${
              i === 0 ? "bg-[#EBF2FA]" : "border border-[#E6EBEF] bg-white"
            }`}
          >
            {opt}
          </div>
        ))}
      </div>

      <p className="mt-8 flex gap-3 text-[18px] font-medium leading-[200%] text-[#000000]">
        <span>•</span>
        <span>Front End developer please add 5 questions i will provide</span>
      </p>
    </div>
  );
}

function MainsQuestionContent() {
  return (
    <div
      className="space-y-8 rounded-[12px]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <h3 className="text-[18px] font-medium leading-[200%] text-[#000000]">
        Q. “Geography is not merely the study of physical features but also the
        interaction between humans and their environment.” Discuss. (150 words)
      </h3>

      <p className="text-[18px] font-medium leading-[200%] text-[#000000]">
        Start by defining Geography briefly. Explain its two major branches—Physical
        Geography and Human Geography. Then highlight how both are
        interconnected with examples (like agriculture depending on climate,
        urbanization affecting environment). Conclude by stressing the importance
        of Geography in sustainable development and planning.
      </p>
    </div>
  );
}
