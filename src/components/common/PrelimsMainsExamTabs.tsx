"use client";

export type PrelimsMainsTab = "prelims" | "mains";

interface PrelimsMainsExamTabsProps {
  activeTab: PrelimsMainsTab;
  onChange: (tab: PrelimsMainsTab) => void;
  className?: string;
}

const docIcon = (active: boolean) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#fff" : "#444"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const TABS: { id: PrelimsMainsTab; label: string }[] = [
  { id: "prelims", label: "Prelims" },
  { id: "mains", label: "Mains" },
];

/** Prelims / Mains bar — matches Study Materials page */
export default function PrelimsMainsExamTabs({
  activeTab,
  onChange,
  className = "",
}: PrelimsMainsExamTabsProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[900px] items-center rounded-[20px] bg-[#F4F4F4] p-2 shadow-inner ${className}`}
    >
      {TABS.map((tab, index, array) => {
        const isActive = activeTab === tab.id;

        return (
          <div key={tab.id} className="flex flex-1 items-stretch">
            {index > 0 ? (
              <div className="mx-1 w-[1px] shrink-0 self-stretch bg-[#d9d9d9] sm:mx-2" />
            ) : null}
            <button
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-1 flex-col items-center justify-center gap-2.5 py-5 transition-all duration-300 ${
                isActive
                  ? "rounded-[16px] bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] shadow-lg"
                  : "rounded-[16px] hover:bg-[#ebebeb]"
              }`}
            >
              {docIcon(isActive)}
              <span
                className={`text-[16px] md:text-[18px] ${
                  isActive ? "font-semibold text-white" : "font-medium text-[#444]"
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
