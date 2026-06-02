type IconProps = {
  active: boolean;
  size?: number;
};

function strokeColor(active: boolean) {
  return active ? "#ffffff" : "#444444";
}

/** Clipboard + checklist (✓) + pencil — Prelims */
export function PrelimsStudyTabIcon({ active, size = 28 }: IconProps) {
  const stroke = strokeColor(active);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      {/* Clipboard */}
      <path
        d="M10 4.5h4a1 1 0 0 1 1 1V7H9V5.5a1 1 0 0 1 1-1z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect
        x="7"
        y="7"
        width="11"
        height="15"
        rx="1.5"
        stroke={stroke}
        strokeWidth="1.6"
      />
      {/* Checklist rows */}
      <path
        d="M9.2 11.2l1 1 2.1-2.2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 11h4.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M9.2 14.2l1 1 2.1-2.2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 14h4.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M9.2 17.2l1 1 2.1-2.2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 17h3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      {/* Pencil */}
      <path
        d="M18.5 9.5l4.5 4.5"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18.5 9.5l1.8-1.8a.9.9 0 0 1 1.3 0l1 1a.9.9 0 0 1 0 1.3l-1.8 1.8"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 12.2l1.3 1.3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Clipboard + text lines + pencil — Mains (no checkmarks) */
export function MainsStudyTabIcon({ active, size = 28 }: IconProps) {
  const stroke = strokeColor(active);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 4.5h4a1 1 0 0 1 1 1V7H9V5.5a1 1 0 0 1 1-1z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect
        x="7"
        y="7"
        width="11"
        height="15"
        rx="1.5"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <path d="M9.5 11h7.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 14h7.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 17h5.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M18.5 9.5l4.5 4.5"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18.5 9.5l1.8-1.8a.9.9 0 0 1 1.3 0l1 1a.9.9 0 0 1 0 1.3l-1.8 1.8"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 12.2l1.3 1.3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** ID / video frame with person — Interview */
export function InterviewStudyTabIcon({ active, size = 28 }: IconProps) {
  const stroke = strokeColor(active);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <rect
        x="5"
        y="6"
        width="14"
        height="16"
        rx="2"
        stroke={stroke}
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12.5" r="2.4" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M8.5 18.5c1.2-1.8 2.4-2.5 3.5-2.5s2.3.7 3.5 2.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type StudyMaterialsTabIconType = "prelims" | "mains" | "interview";

export function StudyMaterialsTabIcon({
  type,
  active,
  size = 28,
}: IconProps & { type: StudyMaterialsTabIconType }) {
  switch (type) {
    case "prelims":
      return <PrelimsStudyTabIcon active={active} size={size} />;
    case "mains":
      return <MainsStudyTabIcon active={active} size={size} />;
    case "interview":
      return <InterviewStudyTabIcon active={active} size={size} />;
  }
}
