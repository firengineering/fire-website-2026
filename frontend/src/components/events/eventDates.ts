import type { ClubEvent } from "@/data/events";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "YYYY-MM-DD" -> { year, month (0-11), day, weekday } without timezone drift */
export function parseISODate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { year: y, month: m - 1, day: d, weekday };
}

/** Today's date as "YYYY-MM-DD" in Melbourne, regardless of server/browser timezone */
export function todayInMelbourne(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatLongDate(iso: string | null): string {
  if (!iso) return "Date TBC";
  const { year, month, day, weekday } = parseISODate(iso);
  return `${WEEKDAYS[weekday]} ${day} ${MONTHS[month]} ${year}`;
}

export function dateBadge(iso: string | null) {
  if (!iso) return { top: "Date", bottom: "TBC" };
  const { month, day } = parseISODate(iso);
  return { top: MONTHS[month], bottom: String(day) };
}

/**
 * Splits events into upcoming (today or later, or undated) and previous.
 * ISO date strings compare correctly as plain strings.
 */
export function splitEvents(events: ClubEvent[], today: string) {
  const upcoming = events
    .filter((e) => e.date === null || e.date >= today)
    .sort((a, b) => {
      if (a.date === b.date) return 0;
      if (a.date === null) return 1; // TBC goes last
      if (b.date === null) return -1;
      return a.date < b.date ? -1 : 1;
    });

  const previous = events
    .filter((e) => e.date !== null && e.date < today)
    .sort((a, b) => (a.date! < b.date! ? 1 : -1));

  return { upcoming, previous };
}
