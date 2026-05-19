"use client";

import type { Lecture } from "../data/lectures";

interface LectureTabsProps {
  lectures: Lecture[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function LectureTabs({
  lectures,
  activeId,
  onChange,
}: LectureTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {lectures.map((lec, idx) => {
        const isActive = lec.id === activeId;
        return (
          <button
            key={lec.id}
            type="button"
            onClick={() => onChange(lec.id)}
            className="rounded-[8px] px-5 py-2.5 transition-all"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "18px",
              lineHeight: "160%",
              ...(isActive
                ? {
                    fontWeight: 700,
                    background:
                      "linear-gradient(90deg, rgba(24, 151, 216, 0.8) 0%, #021C29 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 6px 14px rgba(0, 91, 136, 0.22)",
                  }
                : {
                    fontWeight: 500,
                    background: "#FFFFFF",
                    color: "#000000",
                    border: "1px solid #E6EBEF",
                  }),
            }}
          >
            Lecture {idx + 1}
          </button>
        );
      })}
    </div>
  );
}
