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
      className={`mx-auto flex w-full max-w-[900px] items-center rounded-full bg-[#F4F4F4] p-1.5 shadow-inner md:p-2 ${className}`}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex flex-1 flex-col items-center justify-center gap-2.5 rounded-full py-4 transition-all duration-300 md:py-5 ${
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
        );
      })}
    </div>
  );
}
