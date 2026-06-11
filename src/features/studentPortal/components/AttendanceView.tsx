"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DonutChart from "./DonutChart";
import SectionTitle from "./SectionTitle";
import StatCard from "./StatCard";
import AttendanceDateFilterBar from "./AttendanceDateFilterBar";
import {
  attendanceMonthlyLabel,
  attendanceRows,
  attendanceTermTotals,
  getWorkHours,
} from "../data/attendance";
import { computeAttendanceSummary } from "@/features/attendance/utils/computeAttendanceSummary";
import {
  getHolidayByDate,
  isWeeklyOff,
  weeklyOffDays,
} from "@/features/attendance/data/holidaysMaster";
import {
  buildDailyAttendanceRows,
  formatAttendanceDisplayDate,
  toCalendarDate,
  type AttendanceSessionRecord,
  type DailyAttendanceRow,
} from "@/features/attendance/utils/buildDailyAttendance";
import {
  loadAttendanceSessions,
  mergeAttendanceRecords,
  saveAttendanceSessions,
} from "@/features/attendance/utils/attendanceStorage";
import { formatAttendanceTime } from "@/features/attendance/utils/attendanceTime";
import {
  filterDailyAttendanceRows,
  formatAttendanceFilterRangeLabel,
  getAttendanceDateRange,
  type AttendanceDateFilterOption,
} from "@/features/attendance/utils/attendanceDateFilter";
import { useAuthStore } from "@/store/authStore";

interface AttendanceViewProps {
  showCheckButtons?: boolean;
}

function getDefaultCustomStartDate() {
  const today = new Date();
  return toCalendarDate(new Date(today.getFullYear(), today.getMonth(), 1));
}

function getDefaultCustomEndDate() {
  return toCalendarDate(new Date());
}

export default function AttendanceView({
  showCheckButtons = true,
}: AttendanceViewProps = {}) {
  const user = useAuthStore((s) => s.user);
  const storageUserId = user?.id ?? "guest";

  const [sessionRecords, setSessionRecords] = useState<AttendanceSessionRecord[]>(
    attendanceRows,
  );
  const [dateFilter, setDateFilter] =
    useState<AttendanceDateFilterOption>("Last 7 Days");
  const [customStartDate, setCustomStartDate] = useState(getDefaultCustomStartDate);
  const [customEndDate, setCustomEndDate] = useState(getDefaultCustomEndDate);

  useEffect(() => {
    const savedSessions = loadAttendanceSessions(storageUserId);
    setSessionRecords(mergeAttendanceRecords(attendanceRows, savedSessions));
  }, [storageUserId]);

  const allDailyAttendanceRows = useMemo(
    () => buildDailyAttendanceRows(sessionRecords, weeklyOffDays),
    [sessionRecords],
  );

  const activeDateRange = useMemo(
    () =>
      getAttendanceDateRange(dateFilter, customStartDate, customEndDate),
    [customEndDate, customStartDate, dateFilter],
  );

  const dailyAttendanceRows = useMemo(() => {
    if (dateFilter === "Custom Dates" && !activeDateRange) return [];
    return filterDailyAttendanceRows(allDailyAttendanceRows, activeDateRange);
  }, [activeDateRange, allDailyAttendanceRows, dateFilter]);

  const rangeLabel = activeDateRange
    ? formatAttendanceFilterRangeLabel(activeDateRange)
    : undefined;

  const attendanceSummary = useMemo(
    () =>
      computeAttendanceSummary(
        allDailyAttendanceRows,
        attendanceTermTotals,
        attendanceMonthlyLabel,
      ),
    [allDailyAttendanceRows],
  );

  const todayContext = useMemo(() => {
    const today = new Date();
    const displayDate = formatAttendanceDisplayDate(today);
    const holiday = getHolidayByDate(toCalendarDate(today));
    const weekoff = isWeeklyOff(today.getDay(), weeklyOffDays);

    return {
      displayDate,
      isBlocked: Boolean(holiday) || weekoff,
      blockedReason: holiday?.name ?? (weekoff ? "Weekoff" : ""),
    };
  }, []);

  const todaySession = useMemo(
    () => sessionRecords.find((record) => record.date === todayContext.displayDate),
    [sessionRecords, todayContext.displayDate],
  );

  const hasCheckedIn =
    Boolean(todaySession?.checkIn) && todaySession?.checkIn !== "-";
  const hasCheckedOut =
    Boolean(todaySession?.checkOut) && todaySession?.checkOut !== "-";

  const persistSessions = useCallback(
    (nextSessions: AttendanceSessionRecord[]) => {
      const savedOnly = nextSessions.filter((record) => {
        const base = attendanceRows.find((row) => row.date === record.date);
        return !base || JSON.stringify(base) !== JSON.stringify(record);
      });

      saveAttendanceSessions(storageUserId, savedOnly);
      setSessionRecords(nextSessions);
    },
    [storageUserId],
  );

  const handleCheckIn = useCallback(() => {
    if (todayContext.isBlocked) {
      window.alert(`Check-in is not available today (${todayContext.blockedReason}).`);
      return;
    }

    if (hasCheckedIn) {
      window.alert(`You already checked in today at ${todaySession?.checkIn}.`);
      return;
    }

    const checkInTime = formatAttendanceTime(new Date());
    const nextSessions = mergeAttendanceRecords(sessionRecords, [
      {
        date: todayContext.displayDate,
        checkIn: checkInTime,
        checkOut: "-",
        reason: "-",
      },
    ]);

    persistSessions(nextSessions);
    window.alert(`Checked in successfully at ${checkInTime}.`);
  }, [
    hasCheckedIn,
    persistSessions,
    sessionRecords,
    todayContext.blockedReason,
    todayContext.displayDate,
    todayContext.isBlocked,
    todaySession?.checkIn,
  ]);

  const handleCheckOut = useCallback(() => {
    if (todayContext.isBlocked) {
      window.alert(`Check-out is not available today (${todayContext.blockedReason}).`);
      return;
    }

    if (!hasCheckedIn) {
      window.alert("Please check in before checking out.");
      return;
    }

    if (hasCheckedOut) {
      window.alert(`You already checked out today at ${todaySession?.checkOut}.`);
      return;
    }

    const checkOutTime = formatAttendanceTime(new Date());
    const nextSessions = mergeAttendanceRecords(sessionRecords, [
      {
        date: todayContext.displayDate,
        checkIn: todaySession?.checkIn ?? "-",
        checkOut: checkOutTime,
        reason: "-",
      },
    ]);

    persistSessions(nextSessions);
    window.alert(`Checked out successfully at ${checkOutTime}.`);
  }, [
    hasCheckedIn,
    hasCheckedOut,
    persistSessions,
    sessionRecords,
    todayContext.blockedReason,
    todayContext.displayDate,
    todayContext.isBlocked,
    todaySession?.checkIn,
    todaySession?.checkOut,
  ]);

  return (
    <div className="space-y-10">
      {showCheckButtons && (
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-3">
            <CheckButton
              label="Check In"
              onClick={handleCheckIn}
              disabled={todayContext.isBlocked || hasCheckedIn}
            />
            <CheckButton
              label="Check Out"
              onClick={handleCheckOut}
              disabled={todayContext.isBlocked || !hasCheckedIn || hasCheckedOut}
            />
          </div>
          {todayContext.isBlocked ? (
            <p
              className="text-[13px] font-medium text-[#B45309]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Today is {todayContext.blockedReason}. Check-in/out is unavailable.
            </p>
          ) : null}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[550px_1fr]">
        <OverallCard summary={attendanceSummary} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <StatCard
            value={String(attendanceSummary.classesAttended)}
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
            value={String(attendanceSummary.classesMissed)}
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
            value={`${attendanceSummary.monthlyPercent} %`}
            label={attendanceSummary.monthlyLabel}
            bg="#E8F3C9"
            valueColor="#6E9331"
            icon={
              <Image
                src="/assets/student/atten-percent.png"
                alt="Percentage"
                width={44}
                height={44}
                className="h-full w-full object-contain mix-blend-multiply"
              />
            }
          />

          <StatCard
            value={String(attendanceSummary.totalClasses)}
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

        <AttendanceDateFilterBar
          filter={dateFilter}
          onFilterChange={setDateFilter}
          customStartDate={customStartDate}
          customEndDate={customEndDate}
          onCustomStartDateChange={setCustomStartDate}
          onCustomEndDateChange={setCustomEndDate}
          rangeLabel={rangeLabel}
          resultCount={dailyAttendanceRows.length}
        />

        <div className="mt-4 overflow-x-auto rounded-[18px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="min-w-[720px]">
            <div
              className="grid grid-cols-5 px-6 py-4 text-[18px] font-semibold text-white"
              style={{
                background:
                  "linear-gradient(90deg, #2A9FDB 0%, #15658D 100%)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <div>Date</div>
              <div>Check In Time</div>
              <div>Check Out Time</div>
              <div>Work Hours</div>
              <div>Reason / Status</div>
            </div>

            {dailyAttendanceRows.length === 0 ? (
              <div
                className="px-6 py-10 text-center text-[16px] font-medium text-[#00000080]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {dateFilter === "Custom Dates" && !activeDateRange
                  ? "Select a valid from and to date to view attendance."
                  : "No attendance records found for the selected date range."}
              </div>
            ) : (
              dailyAttendanceRows.map((row, i) => (
                <div
                  key={row.date}
                  className={`grid grid-cols-5 px-6 py-4 text-[16px] font-medium ${
                    i < dailyAttendanceRows.length - 1 ? "border-b border-[#F0F3F6]" : ""
                  } ${getDailyAttendanceRowClassName(row)}`}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <div className="text-[#000000]">{row.date}</div>
                  <div className={getDailyAttendanceValueClassName(row)}>{row.checkIn}</div>
                  <div className={getDailyAttendanceValueClassName(row)}>{row.checkOut}</div>
                  <div className={getDailyAttendanceValueClassName(row)}>
                    {getWorkHours(row.checkIn, row.checkOut)}
                  </div>
                  <div className={getDailyAttendanceReasonClassName(row)}>{row.reason}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function OverallCard({
  summary,
}: {
  summary: ReturnType<typeof computeAttendanceSummary>;
}) {
  const absentPercent = 100 - summary.percent;

  return (
    <div className="flex flex-col items-center gap-4 rounded-[18px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="text-center">
        <SectionTitle first="OVER ALL" second="ATTENDANCE" className="text-[24px] font-black" />
      </div>

      <DonutChart percent={summary.percent} />

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] font-bold text-[#00000080]">
        <Legend
          color="#3FB75A"
          label={`Present ( ${summary.presentCount} )`}
          segmentPercent={summary.percent}
        />
        <Legend
          color="#E16165"
          label={`Absent ( ${summary.absentCount} )`}
          segmentPercent={absentPercent}
        />
      </div>

      <p
        className="text-center text-[13px] font-medium text-[#00000080]"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {summary.classesPending} classes scheduled / not yet counted of{" "}
        {summary.totalClasses} total
      </p>
    </div>
  );
}

function Legend({
  color,
  label,
  segmentPercent,
}: {
  color: string;
  label: string;
  segmentPercent: number;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[#1F2A37]">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
      <span className="text-[#00000080]">· {segmentPercent}%</span>
    </span>
  );
}

function getDailyAttendanceRowClassName(row: DailyAttendanceRow) {
  if (row.status === 'holiday') return 'bg-[#FFF8E6]';
  if (row.status === 'weekoff') return 'bg-[#EEF4FA]';
  if (row.status === 'absent') return 'bg-[#FFF5F5]';
  return 'text-[#000000]';
}

function getDailyAttendanceValueClassName(row: DailyAttendanceRow) {
  if (row.status === 'holiday' || row.status === 'weekoff') {
    return 'text-[#6B7280]';
  }
  return 'text-[#000000]';
}

function getDailyAttendanceReasonClassName(row: DailyAttendanceRow) {
  if (row.status === 'holiday') return 'font-semibold text-[#B45309]';
  if (row.status === 'weekoff') return 'font-semibold text-[#1F7AB8]';
  if (row.status === 'absent') return 'font-semibold text-[#E16165]';
  return 'text-[#000000]';
}

function CheckButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(0,36,54,0.25)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        background: "linear-gradient(90deg, #00679C 0%, #002436 100%)",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {label}
    </button>
  );
}
