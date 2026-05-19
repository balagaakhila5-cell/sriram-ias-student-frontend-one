"use client";

import { useState } from "react";
import LiveClassSection from "@/features/studentPortal/components/LiveClassSection";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import PurchaseInfoCard from "@/features/parentPortal/components/PurchaseInfoCard";
import { parentCourse } from "@/features/parentPortal/data/parentCourse";

type CourseTab = "class-schedule" | "purchase-info";

const COURSE_TABS: { id: CourseTab; label: string }[] = [
  { id: "class-schedule", label: "Class Schedule" },
  { id: "purchase-info", label: "Purchase Information" },
];

export default function ParentCourseDetailsPage() {
  const [tab, setTab] = useState<CourseTab>("class-schedule");

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SubNavToggle options={COURSE_TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "class-schedule" ? (
        <LiveClassSection viewOnly />
      ) : (
        <PurchaseInfoCard course={parentCourse} />
      )}
    </div>
  );
}
