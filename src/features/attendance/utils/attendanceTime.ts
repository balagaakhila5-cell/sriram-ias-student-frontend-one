export function formatAttendanceTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  if (hours === 0) hours = 12;

  return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
}
