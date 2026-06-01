"use client";

type ExamTab = "prelims" | "mains";

interface ExamTypeTabsProps {
  activeTab: ExamTab;
  onChange: (tab: ExamTab) => void;
  className?: string;
  /** lite = white active tab inside gray panel (mock tests figma) */
  variant?: "default" | "lite";
  /** omit outer gray wrapper when nested inside filter panel */
  embedded?: boolean;
}

const docIcon = (active: boolean, lite: boolean) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={
      lite
        ? active
          ? "stroke-[#333]"
          : "stroke-[#666]"
        : active
          ? "stroke-white"
          : "stroke-[#444]"
    }
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

export default function ExamTypeTabs({
  activeTab,
  onChange,
  className = "",
  variant = "default",
  embedded = false,
}: ExamTypeTabsProps) {
  const lite = variant === "lite";

  const tabs = (
    <div className="flex w-full overflow-hidden">
      <button
        type="button"
        onClick={() => onChange("prelims")}
        className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-[16px] py-4 transition-all duration-300 ${
          activeTab === "prelims"
            ? lite
              ? "bg-white text-[#333] shadow-sm"
              : "bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] text-white shadow-lg"
            : lite
              ? "bg-transparent text-[#666] hover:bg-white/60"
              : "bg-transparent text-[#444] hover:bg-[#ebebeb]"
        }`}
      >
        {docIcon(activeTab === "prelims", lite)}
        <span className="text-[16px] font-semibold md:text-[18px]">Prelims</span>
      </button>

      <div className="mx-2 my-2 w-[1px] bg-[#d9d9d9]" />

      <button
        type="button"
        onClick={() => onChange("mains")}
        className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-[16px] py-4 transition-all duration-300 ${
          activeTab === "mains"
            ? lite
              ? "bg-white text-[#333] shadow-sm"
              : "bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] text-white shadow-lg"
            : lite
              ? "bg-transparent text-[#666] hover:bg-white/60"
              : "bg-transparent text-[#444] hover:bg-[#ebebeb]"
        }`}
      >
        {docIcon(activeTab === "mains", lite)}
        <span className="text-[16px] font-medium md:text-[18px]">Mains</span>
      </button>
    </div>
  );

  if (embedded) {
    return <div className={className}>{tabs}</div>;
  }

  return (
    <div
      className={`mx-auto max-w-[800px] rounded-[24px] bg-[#F4F4F4] p-4 shadow-sm ${className}`}
    >
      {tabs}
    </div>
  );
}
