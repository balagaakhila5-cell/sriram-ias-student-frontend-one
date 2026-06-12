/** 0 = Sunday, 6 = Saturday (JavaScript Date#getDay) */
export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface HolidayMasterEntry {
  id: string;
  name: string;
  /** ISO date YYYY-MM-DD for calendar matching */
  calendarDate: string;
  /** Human-readable label for listings */
  displayDate: string;
  type: string;
}

/**
 * Weekly off days from institute configuration.
 * Example: [0] = Sunday only, [6] = Saturday only, [0, 6] = both.
 */
export const weeklyOffDays: WeekDay[] = [0];

export const holidaysMaster: HolidayMasterEntry[] = [
  {
    id: 'h-1',
    name: 'Labour Day',
    calendarDate: '2026-05-01',
    displayDate: 'May 1, Friday',
    type: 'National Holiday',
  },
  {
    id: 'h-2',
    name: 'Independence Day',
    calendarDate: '2026-08-15',
    displayDate: 'August 15, Monday',
    type: 'National Holiday',
  },
  {
    id: 'h-3',
    name: 'Republic Day',
    calendarDate: '2027-01-26',
    displayDate: 'January 26, Tuesday',
    type: 'National Holiday',
  },
  {
    id: 'h-4',
    name: 'Gandhi Jayanti',
    calendarDate: '2026-10-02',
    displayDate: 'October 2, Friday',
    type: 'National Holiday',
  },
  {
    id: 'h-5',
    name: 'Diwali',
    calendarDate: '2026-11-08',
    displayDate: 'November 8, Sunday',
    type: 'Festival Holiday',
  },
];

export function getHolidayByDate(calendarDate: string) {
  return holidaysMaster.find((holiday) => holiday.calendarDate === calendarDate);
}

export function isWeeklyOff(dayIndex: number, configuredOffDays: WeekDay[] = weeklyOffDays) {
  return configuredOffDays.includes(dayIndex as WeekDay);
}
