"use client";

import Image from "next/image";
import DonutChart from "./DonutChart";
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";
import {
  attendanceRows,
  overallAttendance,
} from "../data/attendance";

interface AttendanceViewProps {
  showCheckButtons?: boolean;
}

export default function AttendanceView({
  showCheckButtons = true,
}: AttendanceViewProps = {}) {
  return (
    <div className="space-y-10">
      {showCheckButtons && (
        <div className="flex justify-end gap-3">
          <CheckButton label="Check In" />
          <CheckButton label="Check Out" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[550px_1fr]">
        <OverallCard />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatCard
            value={String(overallAttendance.classesAttended)}
            label="Classes Attended"
            bg="#E2EEF7"
            valueColor="#42AE3C"
            icon={
              <Image
                src="/assets/student/atten-tik.png"
                alt="Check"
                width={60}
                height={60}
                className="mix-blend-multiply"
              />
            }
          />

          <StatCard
            value={String(overallAttendance.classesMissed)}
            label="Classes Missed"
            bg="#FBE2E2"
            valueColor="#E83E4E"
            icon={
              <Image
                src="/assets/student/atten-wrong.png"
                alt="Check"
                width={60}
                height={60}
                className="mix-blend-multiply"
              />
            }
          />

          <StatCard
            value={`${overallAttendance.monthlyPercent} %`}
            label={overallAttendance.monthlyLabel}
            bg="#E8F3C9"
            valueColor="#6E9331"
            icon={
              <Image
                src="/assets/student/atten-percent.png"
                alt="Check"
                width={60}
                height={60}
                className="mix-blend-multiply"
              />
            }
          />

          <StatCard
            value={String(overallAttendance.totalClasses)}
            label="Total Classes"
            bg="#EDE6F5"
            valueColor="#42AE3C"
            icon={
              <Image
                src="/assets/student/atten-hat.png"
                alt="Check"
                width={60}
                height={60}
                className="mix-blend-multiply"
              />
            }
          />
        </div>
      </div>

      <section>
        <div className="flex justify-center">
          <SectionTitle first="DAILY" second="ATTENDANCE" className="text-[24px] font-black" />
        </div>

        <div className="mt-6 overflow-hidden rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div
            className="grid grid-cols-4 px-6 py-4 text-[18px] font-semibold text-white"
            style={{
              background:
                "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <div>Date</div>
            <div>Check In Time</div>
            <div>Check Out Time</div>
            <div>Reason ( If Absent )</div>
          </div>

          {attendanceRows.map((row, i) => (
            <div
              key={row.date}
              className={`grid grid-cols-4 px-6 py-4 text-[16px] text-[#000000] font-medium ${
                i < attendanceRows.length - 1 ? "border-b border-[#F0F3F6]" : ""
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <div>{row.date}</div>
              <div>{row.checkIn}</div>
              <div>{row.checkOut}</div>
              <div>{row.reason}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function OverallCard() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="text-center">
        <SectionTitle first="OVER ALL" second="ATTENDANCE" className="text-[24px] font-black" />
      </div>

      <DonutChart percent={overallAttendance.percent} />

      <div className="flex items-center gap-6 text-[14px] font-bold text-[#00000080]">
        <Legend color="#3FB75A" label={`Present ( ${overallAttendance.presentCount} )`} />
        <Legend color="#E16165" label={`Absent ( ${overallAttendance.absentCount} )`} />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#1F2A37]">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function CheckButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-full px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)]"
      style={{
        background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {label}
    </button>
  );
}
