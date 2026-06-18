"use client";

import { useState } from "react";
import { Download, UploadCloud } from "lucide-react";
import GoBackButton from "@/features/studentPortal/components/GoBackButton";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";

type AnswerMode = "write" | "upload";

const MODES: { id: AnswerMode; label: string }[] = [
  { id: "write", label: "Write Answer Here" },
  { id: "upload", label: "Write and Upload" },
];

export default function MainsAttemptPage() {
  const [mode, setMode] = useState<AnswerMode>("write");
  const [answer, setAnswer] = useState("");

  return (
    <div className="space-y-6">
      <GoBackButton href="/student/answer-writing-mains" />

      <div className="rounded-[18px] bg-[#EBF1F6] p-5 md:p-6">
        <div className="rounded-[14px] bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <p
              className=" text-[18px] leading-relaxed text-[#000000] font-semibold"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Discuss the role of civil services in a democratic polity. How
              can administrative neutrality and accountability be balanced to
              ensure effective governance?
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 self-end rounded-full px-5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)] md:self-auto"
              style={{
                background:
                  "linear-gradient(90deg, #00679C 0%, #002436 100%)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <Download size={14} />
              Download
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-[18px] bg-[#EBF1F6] p-5 md:p-6">
        <div className="rounded-[14px] bg-white p-6 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
          <div className="flex justify-center">
            <SubNavToggle options={MODES} active={mode} onChange={setMode} />
          </div>

          <div className="mt-6 min-h-[280px]">
            {mode === "write" ? (
              <div className="space-y-6">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type Here ...."
                  className="h-[260px] w-full resize-none rounded-[10px] bg-white p-3 text-[18px] text-[#00000099] outline-none font-bold"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                />

                <div className="flex justify-center">
                  <button
                    type="button"
                    className="rounded-full px-10 py-2.5 text-[17px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
                    style={{
                      background:
                        "linear-gradient(90deg, #00679C 0%, #002436 100%)",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <UploadZone />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadZone() {
  return (
    <label className="flex h-[280px] cursor-pointer flex-col items-center justify-center gap-5">
      <svg width="175" height="144" viewBox="0 0 175 144" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.712 57.084C21.1 61.272 8 77.108 8 96C8 118.092 25.908 136 48 136C51.788 136 55.456 135.472 58.932 134.488M136.22 57.084C153.832 61.272 166.928 77.108 166.928 96C166.928 118.092 149.02 136 126.928 136C123.14 136 119.472 135.472 116 134.488M136 56C136 29.492 114.508 8 88 8C61.492 8 40 29.492 40 56M60.26 87.524L88 59.696L116.528 88M88 128V73.848" stroke="#8CBBFB" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p
        className="text-[18px] text-[#1F7AB8] font-semibold"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Drop or Browse Files{" "}
        <span className="font-semibold">from here</span>
      </p>
      <input type="file" className="hidden" />
    </label>
  );
}
