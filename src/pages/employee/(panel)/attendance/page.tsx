"use client";

import { useMemo, useState } from "react";
import Link from "@/components/common/AppLink";
import CompactDropdown from "@/features/studentPortal/components/CompactDropdown";
import HorizontalStatCard from "@/features/employeePortal/components/HorizontalStatCard";
import SearchInput from "@/features/employeePortal/components/SearchInput";
import {
  attendanceDateFilters,
  attendanceStudentFilters,
  employeeAttendanceOverview,
  employeeAttendanceRows,
} from "@/features/employeePortal/data/employeeAttendance";

export default function EmployeeAttendancePage() {
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState(attendanceDateFilters[0]);
  const [studentFilter, setStudentFilter] = useState(attendanceStudentFilters[0]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = employeeAttendanceRows;
    if (studentFilter !== "All Students") {
      list = list.filter((r) => r.name === studentFilter);
    }
    if (q) {
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }
    return list;
  }, [query, studentFilter]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <HorizontalStatCard
          label="Students Present Today"
          value={String(employeeAttendanceOverview.presentToday).padStart(2, "0")}
           bg="#FFD9EA"
          valueColor="#BC3974"
        />
        <HorizontalStatCard
          label="Students Absent Today"
          value={String(employeeAttendanceOverview.absentToday).padStart(2, "0")}
          bg="#E6F2E6"
          valueColor="#278327"
        />
        <HorizontalStatCard
          label="Students Yet To Come"
          value={String(employeeAttendanceOverview.yetToCome).padStart(2, "0")}
          bg="#FAF9E6"
          valueColor="#656110"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-[320px]">
          <SearchInput value={query} onChange={setQuery} />
        </div>
        <div className="flex w-full gap-3 md:w-auto">
          <div className="w-full md:w-[160px]">
            <CompactDropdown
              options={attendanceDateFilters}
              value={dateFilter}
              onChange={setDateFilter}
            />
          </div>
          <div className="w-full md:w-[200px]">
            <CompactDropdown
              options={attendanceStudentFilters}
              value={studentFilter}
              onChange={setStudentFilter}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div
          className="grid grid-cols-4 px-6 py-4 text-[18px] font-semibold text-white"
          style={{
            background: "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <div>Student</div>
          <div>Check In Time</div>
          <div>Check Out Time</div>
          <div>Reason ( If Absent )</div>
        </div>

        {rows.map((row, i) => (
          <div
            key={row.id}
            className={`grid grid-cols-4 px-6 py-4 text-[16px] font-medium text-[#000000] ${
              i < rows.length - 1 ? "border-b border-[#F0F3F6]" : ""
            }`}
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Link
              href={`/employee/attendance/${row.studentId}`}
              className="inline-flex items-center gap-3 text-[#2A9FDB] underline underline-offset-2"
            >
              <img
                src={encodeURI(row.image)}
                alt={row.name}
                className="h-10 w-10 shrink-0 rounded-full object-cover object-top"
              />
              {row.name}
            </Link>
            <div>{row.checkIn}</div>
            <div>{row.checkOut}</div>
            <div>{row.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
