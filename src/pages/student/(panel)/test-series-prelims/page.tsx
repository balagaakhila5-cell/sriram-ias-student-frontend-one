import SectionTitle from "@/features/studentPortal/components/SectionTitle";
import EnrolledCourseCard from "@/features/studentPortal/components/EnrolledCourseCard";
import { testSeriesList } from "@/features/studentPortal/data/testSeries";

export default function TestSeriesPrelimsPage() {
  return (
    <div>
      <SectionTitle first="TEST SERIES" second="- PRELIMS" />

      <div className="mt-8 flex flex-wrap gap-6">
        {testSeriesList.map((s) => (
          <EnrolledCourseCard
            key={s.id}
            course={s}
            href={`/student/test-series-prelims/${s.id}`}
          />
        ))}
      </div>
    </div>
  );
}
