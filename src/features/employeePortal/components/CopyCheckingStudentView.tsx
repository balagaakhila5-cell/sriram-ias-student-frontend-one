"use client";

import { useMemo, useState } from "react";
import CompactDropdown from "@/features/studentPortal/components/CompactDropdown";
import StudentDetailHeader from "@/features/employeePortal/components/StudentDetailHeader";
import SubmissionCard from "@/features/employeePortal/components/SubmissionCard";
import {
  studentSubmissions,
  submissionSubjects,
} from "@/features/employeePortal/data/submissions";

interface CopyCheckingStudentViewProps {
  studentName: string;
}

export default function CopyCheckingStudentView({
  studentName,
}: CopyCheckingStudentViewProps) {
  const [subject, setSubject] = useState(submissionSubjects[0]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>(
    {},
  );

  const filteredSubmissions = useMemo(() => {
    if (subject === "Subject") return studentSubmissions;
    return studentSubmissions.filter((item) => item.subject === subject);
  }, [subject]);

  const handleUpload = (submissionId: string, file: File) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [submissionId]: file.name,
    }));
  };

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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredSubmissions.map((submission) => (
          <SubmissionCard
            key={submission.id}
            title={submission.title}
            subtitle={submission.subtitle}
            downloadUrl={submission.downloadUrl}
            downloadName={submission.downloadName}
            uploadedFileName={uploadedFiles[submission.id]}
            onUpload={(file) => handleUpload(submission.id, file)}
          />
        ))}
      </div>
    </div>
  );
}
