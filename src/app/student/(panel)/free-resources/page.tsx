"use client";

import { useState } from "react";
import FilterBar from "@/features/studentPortal/components/FilterBar";
import PdfCard from "@/features/studentPortal/components/PdfCard";
import RecordingCard from "@/features/studentPortal/components/RecordingCard";
import SubNavToggle from "@/features/studentPortal/components/SubNavToggle";
import {
  currentAffairsPdfs,
  testSeriesPdfs,
} from "@/features/studentPortal/data/pdfs";
import { recordings } from "@/features/studentPortal/data/recordings";

type ResourceTab = "current-affairs" | "test-series";

const RESOURCE_TABS: { id: ResourceTab; label: string }[] = [
  { id: "current-affairs", label: "Current Affairs" },
  { id: "test-series", label: "Test Series" },
];

export default function FreeResourcesPage() {
  const [tab, setTab] = useState<ResourceTab>("current-affairs");
  const [scope, setScope] = useState("All");
  const [when, setWhen] = useState("Today");

  const freeRecordings = recordings.slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <SubNavToggle options={RESOURCE_TABS} active={tab} onChange={setTab} />
      </div>

      <div className="flex justify-center">
        <FilterBar
          filters={[
            { id: "scope", value: scope, onChange: setScope, options: ["All", "Subject Wise", "Type Wise"] },
            { id: "when", value: when, onChange: setWhen, options: ["Today", "This Week", "This Month"] },
          ]}
        />
      </div>

      {tab === "current-affairs" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {freeRecordings.map((r) => (
            <RecordingCard
              key={r.id}
              recording={r}
              viewClassHref="#"
            />
          ))}
          {currentAffairsPdfs.map((p) => (
            <PdfCard key={p.id} title={p.title} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {testSeriesPdfs.map((p) => (
            <PdfCard key={p.id} title={p.title} />
          ))}
        </div>
      )}
    </div>
  );
}
