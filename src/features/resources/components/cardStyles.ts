/** Shared layout tokens for resource cards (CA, Free Resources, Student Portal). */

/** Page h1 / section titles — blue → red (Free Resources & Current Affairs) */
export const RESOURCE_PAGE_HEADING_GRADIENT =
  "bg-[linear-gradient(90deg,#3E9CDB_0%,#8E9BC8_38%,#D57E89_72%,#E53935_100%)] bg-clip-text text-transparent";

/** Max cards shown per section */
export const RESOURCE_CARD_LIMIT = 10;

/** @deprecated Pagination removed — kept for any legacy imports */
export const RESOURCE_DOCUMENTS_PAGE_SIZE = 6;

/** Shared section backgrounds (Free Resources + Current Affairs) */
export const RESOURCE_SECTION_SHELL = "relative bg-[#f2f6fa]";
export const RESOURCE_SECTION_TEXTURE_OVERLAY =
  "pointer-events-none absolute inset-0 bg-[url('/assets/free-resources/free-resource-bg-1.png')] bg-cover bg-center bg-no-repeat opacity-90";
export const RESOURCE_SECTION_WAVE_OVERLAY =
  "pointer-events-none absolute inset-0 bg-[url('/assets/bg-wave.png')] bg-cover bg-center bg-no-repeat opacity-90";
/** Free Resources gateway (NCERT books hub) */
export const RESOURCE_SECTION_GATEWAY_OVERLAY =
  "pointer-events-none absolute inset-0 bg-[url('/assets/image-91.png')] bg-[position:center_35%] bg-cover bg-no-repeat opacity-90";

/** Responsive grid — matches Monthly Magazine reference (2 columns) */
export const RESOURCE_CARD_GRID =
  "grid w-full grid-cols-1 gap-6 overflow-visible px-1 py-2 md:grid-cols-2 md:gap-x-8 md:gap-y-6";

/** @deprecated use RESOURCE_CARD_GRID — kept for free-resources imports */
export const FREE_RESOURCE_CARD_GRID = RESOURCE_CARD_GRID;

/** Figma resource cards — off-white default, peach hover */
export const RESOURCE_CARD_BG_DEFAULT = "#F9F9F9";
export const RESOURCE_CARD_BG_HOVER = "#FFF2E6";
export const RESOURCE_CARD_BORDER_DEFAULT = "#EEEEEE";
export const RESOURCE_CARD_BORDER_HOVER = "#F5E4D4";

const CARD_SURFACE =
  "resource-card-surface relative z-0 rounded-[14px]";

/** Figma card title — single line, centered, ellipsis when long */
export const RESOURCE_CARD_TITLE =
  "truncate w-full text-center font-['Montserrat'] text-[14px] font-semibold leading-tight tracking-normal text-[#000000]";

const CARD_TITLE = RESOURCE_CARD_TITLE;

/** Title sits slightly below card top; small gap before action buttons */
const CARD_BODY_STACK =
  "flex min-w-0 flex-1 flex-col items-center justify-start gap-4 px-2.5 pt-2.5 pb-2 text-center";

const CARD_SHELL_COMPACT = "h-[96px] min-h-[96px]";

/** Unified horizontal card — image left, content right */
export const PREMIUM_CARD = {
  shell: `group flex ${CARD_SHELL_COMPACT} w-full min-w-0 flex-row overflow-visible ${CARD_SURFACE}`,
  thumb:
    "resource-card-thumb relative h-full w-[72px] shrink-0 overflow-hidden rounded-l-[14px]",
  thumbInner:
    "relative flex h-full w-full items-center justify-center bg-transparent p-1",
  body: CARD_BODY_STACK,
  bodyCentered:
    `flex h-full w-full flex-col items-center justify-start gap-4 px-2.5 pt-2.5 pb-2 text-center`,
  title: CARD_TITLE,
  description:
    "line-clamp-1 text-[11px] font-medium leading-relaxed text-[#5A6573]",
  meta: "line-clamp-1 text-[11px] font-medium text-[#5A6573]",
  actions: "flex flex-wrap items-center justify-center gap-1",
  actionsRow:
    "flex w-full min-w-0 flex-wrap items-center justify-center gap-1",
  /** Monthly magazine — centered 3-button row */
  magazineActionsRow:
    "flex w-full min-w-0 flex-wrap items-center justify-center gap-1",
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
  "inline-flex items-center justify-center text-center whitespace-nowrap rounded-full border border-[#57B0F2] bg-transparent font-semibold text-[#46A7ED] transition-all duration-300 ease-in-out";

export const RESOURCE_BUTTON = {
  /** Standard 2-button cards (View + Download, Read + Download) */
  base: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
  /** 3-button row (Read + Sample + Download PDF) — equal width, centered text */
  compact: `${BUTTON_CORE} min-w-0 flex-1 px-2.5 py-1.5 text-[12px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
  /** Monthly magazine — natural width, left-aligned row */
  magazine: `${BUTTON_CORE} shrink-0 px-2.5 py-1.5 text-[11px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
  primary: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#005B88] hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:text-white`,
  attempt: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#005B88] hover:bg-[#005B88] hover:text-white`,
  attemptLink: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#005B88] hover:bg-[#005B88] hover:text-white`,
  downloadSolid: `${BUTTON_CORE} shrink-0 px-4 py-1.5 text-[12px] hover:border-[#2AA7DF] hover:bg-[#2AA7DF] hover:text-white`,
} as const;

/** Study materials list — Figma cream cards (PDF icon left, title + actions) */
export const STUDY_MATERIAL_CARD = {
  shell: `study-material-card group flex ${CARD_SHELL_COMPACT} w-full min-w-0 flex-row overflow-visible rounded-[12px] resource-card-surface`,
  body: CARD_BODY_STACK,
  title: CARD_TITLE,
  actions: "flex w-full min-w-0 flex-wrap items-center justify-center gap-1.5",
  viewButton:
    "inline-flex shrink-0 items-center justify-center rounded-full border border-[#7EB4E2] bg-transparent px-4 py-1.5 text-center text-[12px] font-semibold text-[#7EB4E2] transition-all duration-300 hover:border-[#5BA3E0] hover:bg-[#7EB4E2] hover:text-white",
  downloadButton:
    "inline-flex shrink-0 items-center justify-center rounded-full border border-[#57B0F2] bg-transparent px-4 py-1.5 text-center text-[12px] font-semibold text-[#57B0F2] transition-all duration-300 hover:border-[#4599d9] hover:bg-[#57B0F2] hover:text-white",
} as const;

export const RESOURCE_EMPTY =
  "resource-card-surface rounded-[14px] px-6 py-8 text-center text-[14px] font-semibold text-[#5A6573]";

const NCERT_BUTTON =
  "inline-flex min-w-0 items-center justify-center rounded-full border border-[#7EB4E2] bg-transparent px-4 py-2 text-center text-[12px] font-semibold text-[#7EB4E2] transition-all duration-300 ease-in-out hover:border-[#5BA3E0] hover:bg-[#7EB4E2] hover:text-white sm:px-5 sm:text-[13px]";

/** Daily Practice Quiz — compact card, title then Attempt Test on the right */
export const PRACTICE_TEST_CARD = {
  shell:
    `practice-test-card group relative mx-auto flex ${CARD_SHELL_COMPACT} w-full max-w-[380px] min-w-0 flex-row overflow-visible rounded-[12px] resource-card-surface`,
  body:
    "flex min-w-0 flex-1 flex-col items-center justify-start gap-4 px-2.5 pt-2.5 pb-2 text-center",
  title: `${RESOURCE_CARD_TITLE} w-full`,
  attemptButton:
    "self-end inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#57B0F2] bg-white px-3 py-1 text-[11px] font-semibold text-[#46A7ED] shadow-sm transition-all duration-300 group-hover:border-[#2AA7DF] group-hover:bg-[#2AA7DF] group-hover:text-white",
} as const;

/** Grid for Daily Practice Quiz cards — centers narrower cards in each column */
export const PRACTICE_TEST_CARD_GRID =
  "grid w-full grid-cols-1 gap-6 overflow-visible px-1 py-2 justify-items-center md:grid-cols-2 md:gap-x-6 md:gap-y-6";

/** Free mock test cards — photo left, title top, Attempt Test bottom-right */
export const MOCK_TEST_CARD = {
  shell: `mock-test-card group flex ${CARD_SHELL_COMPACT} w-full min-w-0 flex-row overflow-visible rounded-[12px] ${CARD_SURFACE}`,
  thumb:
    "resource-card-thumb relative h-full w-[80px] shrink-0 overflow-hidden rounded-l-[12px]",
  body: CARD_BODY_STACK,
  title: `${RESOURCE_CARD_TITLE} w-full`,
  attemptButton:
    "self-end shrink-0 inline-flex items-center justify-center rounded-full border border-[#57B0F2] bg-transparent px-3 py-1 text-[11px] font-semibold text-[#46A7ED] transition-all duration-300 ease-in-out hover:border-[#005B88] hover:bg-[#005B88] hover:text-white",
} as const;

/** PYQ question paper cards — Figma horizontal layout (Prelims / Mains lists) */
export const PYQ_PAPER_CARD = {
  shell: `pyq-paper-card group flex ${CARD_SHELL_COMPACT} w-full min-w-0 flex-row overflow-visible rounded-[12px] ${CARD_SURFACE}`,
  thumb:
    "resource-card-thumb relative h-full w-[80px] shrink-0 overflow-hidden rounded-l-[12px]",
  thumbInner:
    "relative flex h-full w-full items-center justify-center bg-transparent p-1.5",
  body: CARD_BODY_STACK,
  title: CARD_TITLE,
  actions: "flex w-full min-w-0 flex-wrap items-center justify-center gap-1.5",
  viewButton:
    "inline-flex shrink-0 items-center justify-center rounded-full border border-[#7EB4E2] bg-transparent px-4 py-1.5 text-center text-[12px] font-semibold text-[#7EB4E2] transition-all duration-300 hover:border-[#5BA3E0] hover:bg-[#7EB4E2] hover:text-white",
  downloadButton:
    "inline-flex shrink-0 items-center justify-center rounded-full border border-[#57B0F2] bg-transparent px-4 py-1.5 text-center text-[12px] font-semibold text-[#57B0F2] transition-all duration-300 hover:border-[#4599d9] hover:bg-[#57B0F2] hover:text-white",
} as const;

export const NCERT_BOOK_CARD = {
  shell: `ncert-book-card group flex ${CARD_SHELL_COMPACT} w-full min-w-0 flex-row overflow-visible rounded-[12px] ${CARD_SURFACE}`,
  body: CARD_BODY_STACK,
  title: CARD_TITLE,
  actions: "flex w-full min-w-0 flex-wrap items-center justify-center gap-1.5",
  button: NCERT_BUTTON,
} as const;

/** @deprecated use PREMIUM_CARD.shell — kept for compatibility */
export function documentCardShell(
  _subtopic: string | undefined,
  _variant: "public" | "portal",
): string {
  return PREMIUM_CARD.shell;
}
