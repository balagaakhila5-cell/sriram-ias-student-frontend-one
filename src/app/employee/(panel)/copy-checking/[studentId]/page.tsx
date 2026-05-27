"use client";

import { use, useState } from "react";
import CompactDropdown from "@/features/studentPortal/components/CompactDropdown";
import StudentDetailHeader from "@/features/employeePortal/components/StudentDetailHeader";
import SubmissionCard from "@/features/employeePortal/components/SubmissionCard";
import { getStudentById } from "@/features/employeePortal/data/students";
import {
  studentSubmissions,
  submissionSubjects,
} from "@/features/employeePortal/data/submissions";

interface PageProps {
  params: Promise<{ studentId: string }>;
}

export default function EmployeeCopyCheckingStudentPage({ params }: PageProps) {
  const { studentId } = use(params);
  const student = getStudentById(studentId);
  const studentName = student?.name ?? "Darshan Kotla";

  const [subject, setSubject] = useState(submissionSubjects[0]);

  return (
    <div className="space-y-8">
      <StudentDetailHeader
        studentName={studentName}
        backHref="/employee/copy-checking"
      />

      <div className="flex justify-center">
        <div className="w-full md:w-[300px]">
          <CompactDropdown
            options={submissionSubjects}
            value={subject}
            onChange={setSubject}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {studentSubmissions.map((s) => (
          <SubmissionCard key={s.id} title={s.title} />
        ))}
      </div>
    </div>
  );
}
