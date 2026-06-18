import FreeResourcesCourseSlider from "@/components/common/FreeResourcesCourseSlider";
import FreeResourcesOurBooksSlider from "@/components/common/FreeResourcesOurBooksSlider";

/** Study materials sidebar — Our Books + Courses sliders */
export default function StudyMaterialsSidebar() {
  return (
    <aside className="study-materials-sidebar animate-sidebar mx-auto flex w-full max-w-[340px] shrink-0 flex-col gap-7 lg:mx-0 lg:max-w-[340px]">
      <section className="study-materials-sidebar__books w-full shrink-0">
        <FreeResourcesOurBooksSlider />
      </section>

      <section className="study-materials-sidebar__courses w-full shrink-0">
        <FreeResourcesCourseSlider showBackground hideStar />
      </section>
    </aside>
  );
}
