import Link from "next/link";
import type { ClubEvent } from "@/data/events";
import { countdownLabel, daysBetween, formatLongDate, formatTimeRange } from "./eventDates";
import s from "./events.module.css";

/** Highlights the next dated event with a countdown */
export default function NextUpBanner({ events, today }: { events: ClubEvent[]; today: string }) {
  const next = events.find((e) => e.date !== null);
  if (!next || !next.date) return null;

  const days = daysBetween(today, next.date);
  const time = formatTimeRange(next);

  return (
    <div className={s.nextUp}>
      <div className={`${s.container} ${s.nextUpInner}`}>
        <span className={`${s.eyebrow} ${s.nextUpPill}`}>Next up · {countdownLabel(days)}</span>
        <p className={s.nextUpText}>
          <strong>{next.title}</strong>
          <span className={s.nextUpMeta}>
            {formatLongDate(next.date)}
            {time ? ` · ${time}` : ""}
          </span>
        </p>
        <Link href={`/events/${next.id}`} className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}>
          {next.ticketUrl ? "Book now" : "See details"}
        </Link>
      </div>
    </div>
  );
}
