/** Shared layout tokens for resource cards (CA, Free Resources, Student Portal). */

/** Page h1 / section titles — blue → red (Free Resources & Current Affairs) */
export const RESOURCE_PAGE_HEADING_GRADIENT =
  "bg-[linear-gradient(90deg,#3E9CDB_0%,#8E9BC8_38%,#D57E89_72%,#E53935_100%)] bg-clip-text text-transparent";

/** Max cards shown per section */
export const RESOURCE_CARD_LIMIT = 10;

/** Responsive grid — matches Monthly Magazine reference (2 columns) */
export const RESOURCE_CARD_GRID =
  "grid w-full grid-cols-1 gap-6 overflow-visible md:grid-cols-2 md:gap-x-8 md:gap-y-6";

/** @deprecated use RESOURCE_CARD_GRID — kept for free-resources imports */
export const FREE_RESOURCE_CARD_GRID = RESOURCE_CARD_GRID;

/** Figma resource cards — off-white default, peach hover */
export const RESOURCE_CARD_BG_DEFAULT = "#F9F9F9";
export const RESOURCE_CARD_BG_HOVER = "#FFF2E6";
export const RESOURCE_CARD_BORDER_DEFAULT = "#EEEEEE";
export const RESOURCE_CARD_BORDER_HOVER = "#F5E4D4";

const CARD_SURFACE =
  "resource-card-surface relative z-0 rounded-[14px]";

/** Card title — shared sizing */
const CARD_TITLE =
  "line-clamp-2 text-[14px] font-semibold leading-snug text-[#1F2A37]";

/** Unified horizontal card — image left, content right */
export const PREMIUM_CARD = {
  shell: `group flex h-[112px] min-h-[112px] w-full min-w-0 flex-row overflow-visible ${CARD_SURFACE}`,
  thumb:
    "resource-card-thumb relative h-full w-[88px] shrink-0 overflow-hidden rounded-l-[14px]",
  thumbInner:
    "relative flex h-full w-full items-center justify-center bg-transparent p-1.5",
  body:
    "flex min-w-0 flex-1 flex-col justify-center gap-1 px-3 py-2",
  bodyCentered:
    "flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 py-2 text-center",
  title: CARD_TITLE,
  description:
    "line-clamp-1 text-[11px] font-medium leading-relaxed text-[#5A6573]",
  meta: "line-clamp-1 text-[11px] font-medium text-[#5A6573]",
  actions: "mt-0.5 flex flex-wrap items-center gap-2",
  actionsRow:
    "mt-1 flex w-full min-w-0 flex-nowrap items-center gap-1.5",
  actionsCentered:
    "mt-1 flex w-full flex-nowrap items-center justify-center gap-2",
} as const;

export const RESOURCE_CARD = {
  shell: PREMIUM_CARD.shell,
  body: PREMIUM_CARD.body,
  title: PREMIUM_CARD.title,
  titleOnDark: PREMIUM_CARD.title,
  meta: PREMIUM_CARD.meta,
  actions: PREMIUM_CARD.actions,
  actionsWrap: PREMIUM_CARD.actions,
} as const;

export const RESOURCE_THUMB = {
  box: "relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[10px] bg-transparent",
  boxPractice: "relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[10px]",
  boxMagazine:
    "relative mx-auto h-[84px] w-[58px] shrink-0 overflow-hidden rounded-[6px] shadow-[0_2px_6px_rgba(0,0,0,0.08)]",
  image: "object-contain",
  imageCover: "object-cover",
} as const;

/** Card action buttons — shared across CA, Free Resources, Student Portal */
const BUTTON_CORE =
  "inline-flex items-center justify-center text-center whitespace-nowrap rounded-[7px] border border-[#57B0F2] bg-white font-semibold text-[#46A7ED] transition-all duration-300 ease-in-out";

export const RESOURCE_BUTTON = {
  /** Standard 2-button cards (View + Download, Read + Download) */
  base: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
  /** 3-button row (Read + Sample + Download PDF) — equal width, centered text */
  compact: `${BUTTON_CORE} min-w-0 flex-1 px-2.5 py-1.5 text-[12px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
  primary: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#005B88] hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white`,
  attempt: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#005B88] hover:bg-[#005B88] hover:text-white`,
  attemptLink: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#005B88] hover:bg-[#005B88] hover:text-white`,
  downloadSolid: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
} as const;

export const STUDY_MATERIAL_CARD = {
  shell: `group flex h-[112px] min-h-[112px] w-full flex-col overflow-visible ${CARD_SURFACE}`,
  bodyCentered:
    "flex h-full w-full flex-col items-center justify-center gap-1.5 px-4 py-2.5 text-center",
  title: CARD_TITLE,
  actionsCentered: "flex flex-nowrap items-center justify-center gap-2",
  button: RESOURCE_BUTTON.base,
} as const;

export const RESOURCE_EMPTY =
  "resource-card-surface rounded-[14px] px-6 py-8 text-center text-[14px] font-semibold text-[#5A6573]";

export const NCERT_BOOK_CARD = {
  shell: `group flex h-[118px] min-h-[118px] w-full flex-col overflow-visible ${CARD_SURFACE}`,
  bodyCentered:
    "flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-2.5 text-center",
  title: CARD_TITLE,
  actionsCentered: "flex flex-nowrap items-center justify-center gap-2",
} as const;

/** @deprecated use PREMIUM_CARD.shell — kept for compatibility */
export function documentCardShell(
  _subtopic: string | undefined,
  _variant: "public" | "portal",
): string {
  return PREMIUM_CARD.shell;
}
