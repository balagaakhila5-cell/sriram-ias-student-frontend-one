"use client";

import { useMemo, useState } from "react";
import CompactDropdown from "@/features/studentPortal/components/CompactDropdown";
import HorizontalStatCard from "@/features/employeePortal/components/HorizontalStatCard";
import SearchInput from "@/features/employeePortal/components/SearchInput";
import StudentGradeCard from "@/features/employeePortal/components/StudentGradeCard";
import {
  gradeFilters,
  studentOverview,
  students,
} from "@/features/employeePortal/data/students";

export default function EmployeeStudentListPage() {
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState(gradeFilters[0]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => s.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <HorizontalStatCard
          label="Total Students"
          value={studentOverview.totalStudents}
          bg="#FFD9EA"
          valueColor="#BC3974"
        />
        <HorizontalStatCard
          label="Active Today"
          value={studentOverview.activeToday}
          bg="#E6F2E6"
          valueColor="#278327"
        />
        <HorizontalStatCard
          label="Inactive Today"
          value={studentOverview.inactiveToday}
          bg="#FAF9E6"
          valueColor="#656110"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-[320px]">
          <SearchInput value={query} onChange={setQuery} />
        </div>
        <div className="w-full md:w-[220px]">
          <CompactDropdown
            options={gradeFilters}
            value={grade}
            onChange={setGrade}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s) => (
          <StudentGradeCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  );
}
