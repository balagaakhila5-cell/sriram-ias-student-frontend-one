"use client";

import FreeResourcesCourseSlider from "@/components/common/FreeResourcesCourseSlider";
import UpsPrelims2026Countdown from "@/components/common/UpsPrelims2026Countdown";

/** NCERT-page sidebar pattern: Courses hover slider + live Prelims 2026 countdown */
export default function PyqExamSidebar() {
  return (
    <div className="mx-auto w-full max-w-[310px] space-y-7">
      <FreeResourcesCourseSlider actionLabel="Explore" />
      <UpsPrelims2026Countdown />
    </div>
  );
}
