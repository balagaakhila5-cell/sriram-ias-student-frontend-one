"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/features/employeePortal/components/SearchInput";
import StudentGradeCard from "@/features/employeePortal/components/StudentGradeCard";
import { students } from "@/features/employeePortal/data/students";
import { ArrowRight } from "lucide-react";

export default function EmployeeCopyCheckingPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => s.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="w-full md:w-[320px]">
        <SearchInput value={query} onChange={setQuery} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s) => (
          <StudentGradeCard
            key={s.id}
            student={s}
            footer={
              <a
                href={`/employee/copy-checking/${s.id}`}
                className="mt-1 inline-flex items-center gap-1 text-[14px] font-bold text-[#2A9FDB] underline underline-offset-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Open Submissions <ArrowRight size={14} />
              </a>
            }
          />
        ))}
      </div>
    </div>
  );
}
