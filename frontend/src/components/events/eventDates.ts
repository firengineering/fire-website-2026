import type { ClubEvent, EventPrice } from "@/data/events";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "YYYY-MM-DD" -> parts, without timezone drift */
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

/** "18:30" -> "6:30pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")}${suffix}`;
}

export function formatTimeRange(event: Pick<ClubEvent, "start" | "end">): string | null {
  if (!event.start) return null;
  if (!event.end) return `${formatTime(event.start)} onwards`;
  return `${formatTime(event.start)} – ${formatTime(event.end)}`;
}

/** Whole days from `fromISO` to `toISO` (both "YYYY-MM-DD") */
export function daysBetween(fromISO: string, toISO: string): number {
  const a = parseISODate(fromISO);
  const b = parseISODate(toISO);
  const ms = Date.UTC(b.year, b.month, b.day) - Date.UTC(a.year, a.month, a.day);
  return Math.round(ms / 86_400_000);
}

export function countdownLabel(days: number): string {
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 14) return `In ${days} days`;
  const weeks = Math.round(days / 7);
  return `In ${weeks} weeks`;
}

export function isPastEvent(event: ClubEvent, today: string): boolean {
  return event.date !== null && event.date < today;
}

export function formatMoney(dollars: number): string {
  return dollars === 0 ? "Free" : `$${dollars}`;
}

export function priceLabel(price: EventPrice | undefined): string | null {
  if (!price) return null;
  if (price.member === 0 && price.nonMember === 0) return "Free entry";
  if (price.member === price.nonMember) return formatMoney(price.member);
  return `Members ${formatMoney(price.member)} · Non-members ${formatMoney(price.nonMember)}`;
}

/**
 * Splits events into upcoming (today or later, or undated) and previous.
 * ISO date strings compare correctly as plain strings.
 */
export function splitEvents(events: ClubEvent[], today: string) {
  const upcoming = events
    .filter((e) => !isPastEvent(e, today))
    .sort((a, b) => {
      if (a.date === b.date) return 0;
      if (a.date === null) return 1; // TBC goes last
      if (b.date === null) return -1;
      return a.date < b.date ? -1 : 1;
    });

  const previous = events
    .filter((e) => isPastEvent(e, today))
    .sort((a, b) => (a.date! < b.date! ? 1 : -1));

  return { upcoming, previous };
}
