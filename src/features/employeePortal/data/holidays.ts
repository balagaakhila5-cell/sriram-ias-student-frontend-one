import { holidaysMaster } from '@/features/attendance/data/holidaysMaster';

export type { HolidayMasterEntry as Holiday } from '@/features/attendance/data/holidaysMaster';
export { holidaysMaster, weeklyOffDays } from '@/features/attendance/data/holidaysMaster';

export const leaveBalance = {
  casualLeavesLeft: 14,
  sickLeavesLeft: 14,
};

/** Employee holidays listing (mapped from holidays master). */
export const holidays = holidaysMaster.map((holiday) => ({
  id: holiday.id,
  name: holiday.name,
  date: holiday.displayDate,
  type: holiday.type,
}));
