import type { ClubEvent } from "@/data/events";

// Builds "add to calendar" links/files for an event. Times are Melbourne local.

const TZ = "Australia/Melbourne";

function compactDate(iso: string) {
  return iso.replaceAll("-", ""); // 2026-10-29 -> 20261029
}

function compactTime(hhmm: string) {
  return hhmm.replace(":", "") + "00"; // 18:30 -> 183000
}

function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

/** Start/end in calendar format. All-day if there's no start time; 2 hours if there's no end. */
function eventRange(event: ClubEvent & { date: string }) {
  const day = compactDate(event.date);
  if (!event.start) {
    return { allDay: true, start: day, end: compactDate(addDays(event.date, 1)) };
  }
  let end = event.end;
  if (!end) {
    const [h, m] = event.start.split(":").map(Number);
    end = `${String(Math.min(h + 2, 23)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  return {
    allDay: false,
    start: `${day}T${compactTime(event.start)}`,
    end: `${day}T${compactTime(end)}`,
  };
}

export function canAddToCalendar(event: ClubEvent): event is ClubEvent & { date: string } {
  return event.date !== null;
}

export function googleCalendarUrl(event: ClubEvent & { date: string }, pageUrl: string) {
  const r = eventRange(event);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `FiRE+ · ${event.title}`,
    dates: `${r.start}/${r.end}`,
    details: `${event.summary}\n\n${pageUrl}`,
    location: event.location ?? "",
    ctz: TZ,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeICS(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

// Victoria's daylight-saving rules, so calendar apps get the time right
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZ}`,
  "BEGIN:STANDARD",
  "DTSTART:19700405T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU",
  "TZOFFSETFROM:+1100",
  "TZOFFSETTO:+1000",
  "TZNAME:AEST",
  "END:STANDARD",
  "BEGIN:DAYLIGHT",
  "DTSTART:19701004T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU",
  "TZOFFSETFROM:+1000",
  "TZOFFSETTO:+1100",
  "TZNAME:AEDT",
  "END:DAYLIGHT",
  "END:VTIMEZONE",
];

export function buildICS(event: ClubEvent & { date: string }, pageUrl: string) {
  const r = eventRange(event);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//FiRE+ RMIT//Events//EN",
    "CALSCALE:GREGORIAN",
    ...(r.allDay ? [] : VTIMEZONE),
    "BEGIN:VEVENT",
    `UID:${event.id}@firengineering.club`,
    `DTSTAMP:${stamp}`,
    r.allDay ? `DTSTART;VALUE=DATE:${r.start}` : `DTSTART;TZID=${TZ}:${r.start}`,
    r.allDay ? `DTEND;VALUE=DATE:${r.end}` : `DTEND;TZID=${TZ}:${r.end}`,
    `SUMMARY:${escapeICS(`FiRE+ · ${event.title}`)}`,
    `DESCRIPTION:${escapeICS(`${event.summary}\n\n${pageUrl}`)}`,
    ...(event.location ? [`LOCATION:${escapeICS(event.location)}`] : []),
    `URL:${pageUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadICS(event: ClubEvent & { date: string }, pageUrl: string) {
  const blob = new Blob([buildICS(event, pageUrl)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
