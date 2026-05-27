"use client";

import { useEffect, useState } from "react";
import { getCenters } from "@/lib/api";

export default function TestApiPage() {
  const [centers, setCenters] = useState<any[]>([]);

  useEffect(() => {
    getCenters()
      .then((data) => {
        console.log("Centers API response:", data);
        setCenters(data.centers || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Centers</h1>

      {centers.map((center) => (
        <p key={center._id}>{center.name}</p>
      ))}
    </div>
  );
}