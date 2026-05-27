"use client";

import { useState } from "react";
import FilterBar from "@/features/studentPortal/components/FilterBar";
import TestCard from "@/features/studentPortal/components/TestCard";
import { mainsTests } from "@/features/studentPortal/data/mainsTests";

export default function AnswerWritingMainsPage() {
  const [subject, setSubject] = useState("Subject");
  const [frequency, setFrequency] = useState("Daily");
  const [status, setStatus] = useState("Upcoming");

  return (
    <div className="space-y-8">
      <FilterBar
        className="justify-center"
        filters={[
          { id: "subject", value: subject, onChange: setSubject, options: ["Subject", "Geography", "History", "Polity", "Science"] },
          { id: "frequency", value: frequency, onChange: setFrequency, options: ["Daily", "Weekly", "Monthly"] },
          { id: "status", value: status, onChange: setStatus, options: ["Upcoming", "Completed", "All"] },
        ]}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {mainsTests.map((t) => (
          <TestCard
            key={t.id}
            test={t}
            attemptHref={`/student/answer-writing-mains/${t.id}`}
          />
        ))}
      </div>
    </div>
  );
}
