"use client";

type StudyMaterialsExamType = "prelims" | "mains" | "interview";

interface StudyMaterialsExamTabsProps {
  activeTab: StudyMaterialsExamType;
  onChange: (tab: StudyMaterialsExamType) => void;
  className?: string;
}

const docIcon = (active: boolean) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={active ? "stroke-white" : "stroke-[#444]"}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const interviewIcon = (active: boolean) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={active ? "stroke-white" : "stroke-[#444]"}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="20" x2="22" y2="20" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
  </svg>
);

const TABS: { id: StudyMaterialsExamType; label: string; icon: "doc" | "person" }[] =
  [
    { id: "prelims", label: "Prelims", icon: "doc" },
    { id: "mains", label: "Mains", icon: "doc" },
    { id: "interview", label: "Interview", icon: "person" },
  ];

export default function StudyMaterialsExamTabs({
  activeTab,
  onChange,
  className = "",
}: StudyMaterialsExamTabsProps) {
  return (
    <div
      className={`mx-auto max-w-[900px] rounded-[24px] bg-[#F4F4F4] p-4 shadow-sm ${className}`}
    >
      <div className="flex w-full overflow-hidden">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;

          return (
            <div key={tab.id} className="flex flex-1 items-stretch">
              {index > 0 ? (
                <div className="mx-2 my-2 w-[1px] shrink-0 bg-[#d9d9d9]" />
              ) : null}
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-[16px] py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] text-white shadow-lg"
                    : "bg-transparent text-[#444] hover:bg-[#ebebeb]"
                }`}
              >
                {tab.icon === "doc"
                  ? docIcon(isActive)
                  : interviewIcon(isActive)}
                <span
                  className={`text-[16px] md:text-[18px] ${
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
    </div>
  );
}
