"use client";

import { StudyMaterialsTabIcon } from "@/components/common/icons/StudyMaterialsTabIcons";

export type StudyMaterialsExamType = "prelims" | "mains" | "interview";

interface StudyMaterialsExamTabsProps {
  activeTab: StudyMaterialsExamType;
  onChange: (tab: StudyMaterialsExamType) => void;
  className?: string;
  /** Match free-resources page (28px) vs portal default */
  iconSize?: number;
}

const TABS: { id: StudyMaterialsExamType; label: string }[] = [
  { id: "prelims", label: "Prelims" },
  { id: "mains", label: "Mains" },
  { id: "interview", label: "Interview" },
];

/** Prelims / Mains / Interview — Figma line-art icons (clipboard + interview frame) */
export default function StudyMaterialsExamTabs({
  activeTab,
  onChange,
  className = "",
  iconSize = 28,
}: StudyMaterialsExamTabsProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[900px] items-center rounded-[20px] bg-[#F4F4F4] p-2 shadow-inner md:rounded-[24px] md:p-3 ${className}`}
    >
      {TABS.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <div key={tab.id} className="flex flex-1 items-stretch">
            {index > 0 ? (
              <div
                className="mx-2 w-[1.5px] shrink-0 self-stretch bg-[#D9D9D9]"
                aria-hidden
              />
            ) : null}
            <button
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-1 flex-col items-center justify-center gap-2.5 rounded-[16px] py-5 transition-all duration-300 ${
                isActive
                  ? "bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] text-white shadow-lg"
                  : "bg-transparent text-[#444] hover:bg-[#ebebeb]"
              }`}
            >
              <StudyMaterialsTabIcon
                type={tab.id}
                active={isActive}
                size={iconSize}
              />
              <span
                className={`text-[17px] md:text-[19px] ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {tab.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
