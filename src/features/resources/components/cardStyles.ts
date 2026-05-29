/** Shared layout tokens for resource cards (CA, Free Resources, Student Portal). */

export const RESOURCE_CARD_GRID =
  "grid grid-cols-1 gap-5 md:grid-cols-2";

export const RESOURCE_CARD = {
  /** Horizontal document / mock / PYQ cards */
  shell:
    "flex h-[132px] w-full items-center gap-4 rounded-[14px] p-4 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300",
  shellPublic:
    "bg-[#FAF8F3] origin-bottom-left hover:-translate-y-1 hover:bg-[#FEF2E5] hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)]",
  shellPortal:
    "bg-[#FAF8F3] hover:translate-x-1 hover:bg-[#F2F8FC] hover:shadow-[0_8px_22px_rgba(31,122,184,0.1)]",
  body: "flex min-w-0 flex-1 flex-col justify-center",
  title: "line-clamp-2 text-[15px] font-semibold leading-snug text-[#1F2A37]",
  titleOnDark: "line-clamp-2 text-[15px] font-semibold leading-snug text-[#111]",
  meta: "mt-1 line-clamp-1 text-[13px] font-medium text-[#5A6573]",
  actions: "mt-3 flex flex-nowrap items-center gap-2",
  actionsWrap: "mt-3 flex flex-wrap items-center gap-2",
} as const;

export const RESOURCE_THUMB = {
  box: "relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[12px] bg-transparent",
  image: "object-contain",
  imageCover: "object-cover",
} as const;

export const RESOURCE_BUTTON = {
  base: "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-[#57B0F2] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]",
  primary:
    "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] border border-[#57B0F2] bg-white px-5 py-2 text-[13px] font-semibold text-[#46A7ED] transition-all hover:bg-[linear-gradient(90deg,#2aa7df_0%,#03283b_100%)] hover:border-transparent hover:text-white",
  attempt:
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-[#57B0F2] bg-white px-3 py-1.5 text-[13px] font-semibold text-[#46A7ED] transition-colors hover:bg-[#F2FAFF]",
} as const;

/** Centered study-material cards (View PDF only) */
export const STUDY_MATERIAL_CARD = {
  shell:
    "flex h-[160px] w-full flex-col items-center justify-center rounded-[14px] bg-white p-5 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)]",
  title:
    "line-clamp-2 max-w-full text-center text-[15px] font-semibold leading-snug text-[#1F2A37]",
  button: RESOURCE_BUTTON.primary,
} as const;

export const RESOURCE_EMPTY =
  "rounded-[14px] bg-[#FAF8F3] px-6 py-10 text-center text-[15px] font-semibold text-[#5A6573]";

/** Text-only NCERT book cards (no thumbnail) */
export const NCERT_BOOK_CARD = {
  shell:
    "flex h-[132px] w-full flex-col items-center justify-center gap-1 rounded-[14px] px-4 py-3 text-center shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300",
  shellPublic:
    "bg-[#FAF8F3] hover:-translate-y-1 hover:bg-[#FEF2E5] hover:shadow-[0_10px_24px_rgba(0,0,0,0.1)]",
  shellPortal:
    "bg-[#FAF8F3] hover:bg-[#F2F8FC] hover:shadow-[0_8px_22px_rgba(31,122,184,0.1)]",
  content: "flex w-full min-w-0 flex-col items-center justify-center gap-0.5 px-1",
  title:
    "line-clamp-2 w-full text-[15px] font-semibold leading-snug text-[#1F2A37]",
  subject: "line-clamp-1 w-full text-[13px] font-medium text-[#5A6573]",
  classInfo: "line-clamp-1 w-full text-[13px] font-medium text-[#5A6573]",
  description: "line-clamp-1 w-full text-[13px] font-medium text-[#5A6573]",
  actions:
    "mt-1.5 flex w-full flex-wrap items-center justify-center gap-2",
} as const;
