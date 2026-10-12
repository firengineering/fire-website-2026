import Image from "next/image";
import Link from "next/link";
import { CATEGORY_INFO, type ClubEvent } from "@/data/events";
import { dateBadge, formatLongDate, formatTimeRange, priceLabel } from "./eventDates";
import s from "./events.module.css";

interface EventCardProps {
  event: ClubEvent;
  variant: "upcoming" | "past";
}

/** Image slot: real photo when provided, otherwise a branded gradient tile */
export function EventArt({
  event,
  sizes,
  priority = false,
}: {
  event: ClubEvent;
  sizes: string;
  priority?: boolean;
}) {
  if (event.image) {
    return (
      <Image
        src={event.image}
        alt=""
        fill
        sizes={sizes}
        className={s.cardImage}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }
  return (
    <div className={s.placeholderArt} aria-hidden="true">
      <span className={`${s.script} ${s.placeholderTitle}`}>{event.title}</span>
    </div>
  );
}

/**
 * The whole card is clickable: the title link is stretched over the card with
 * CSS, so screen readers still get one clean link per card.
 */
export default function EventCard({ event, variant }: EventCardProps) {
  const category = CATEGORY_INFO[event.category];
  const href = `/events/${event.id}`;

  if (variant === "past") {
    return (
      <article className={`${s.card} ${s.cardPast} ${s.cardLinked}`}>
        <div className={s.cardArt}>
          <EventArt
            event={event}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          />
        </div>
        <div className={s.cardBody}>
          <p className={`${s.eyebrow} ${s.cardPastMeta}`}>
            {category.label} · {formatLongDate(event.date)}
          </p>
          <h3 className={`${s.display} ${s.cardTitle}`}>
            <Link href={href} className={s.stretchedLink}>
              {event.title}
            </Link>
          </h3>
          <p className={s.cardText}>{event.summary}</p>
        </div>
      </article>
    );
  }

  const badge = dateBadge(event.date);
  const price = priceLabel(event.price);
  const time = formatTimeRange(event);

  return (
    <article className={`${s.card} ${s.cardUpcoming} ${s.cardLinked}`}>
      <div className={s.cardArt}>
        <EventArt event={event} sizes="(min-width: 640px) 340px, 82vw" />

        <div className={s.dateStamp} aria-hidden="true">
          <span className={`${s.eyebrow} ${s.dateStampTop}`}>{badge.top}</span>
          <span className={`${s.display} ${s.dateStampBottom}`}>{badge.bottom}</span>
        </div>

        <span className={`${s.eyebrow} ${s.categoryTag}`}>{category.label}</span>
      </div>

      <div className={s.cardBody}>
        <h3 className={`${s.display} ${s.cardTitle}`}>
          <Link href={href} className={s.stretchedLink}>
            {event.title}
          </Link>
        </h3>

        <dl className={s.cardMeta}>
          <dt className={s.srOnly}>When</dt>
          <dd>
            <span className={s.cardMetaStrong}>{formatLongDate(event.date)}</span>
            {time ? ` · ${time}` : null}
          </dd>
          {event.location ? (
            <>
              <dt className={s.srOnly}>Where</dt>
              <dd>{event.location}</dd>
            </>
          ) : null}
        </dl>

        <p className={s.cardText}>{event.summary}</p>

        <div className={s.cardFooter}>
          <span className={s.price}>{price ?? "Pricing soon"}</span>
          <span className={s.cardCta} aria-hidden="true">
            {event.ticketUrl ? "Book now" : "Details"} <span className={s.cardCtaArrow}>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
