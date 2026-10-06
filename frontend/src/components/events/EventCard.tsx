import Image from "next/image";
import { CATEGORY_INFO, type ClubEvent } from "@/data/events";
import { dateBadge, formatLongDate } from "./eventDates";
import s from "./events.module.css";

interface EventCardProps {
  event: ClubEvent;
  variant: "upcoming" | "past";
}

function priceLabel(price: ClubEvent["price"]) {
  if (!price) return null;
  if (price === "Free") return "Free entry";
  return `Members ${price.member} · Non-members ${price.nonMember}`;
}

/** Image slot: real photo when provided, otherwise a branded gradient tile */
function EventArt({ event, sizes }: { event: ClubEvent; sizes: string }) {
  if (event.image) {
    return (
      <Image
        src={event.image}
        alt=""
        fill
        sizes={sizes}
        className={s.cardImage}
      />
    );
  }
  return (
    <div className={s.placeholderArt} aria-hidden="true">
      <span className={`${s.script} ${s.placeholderTitle}`}>{event.title}</span>
    </div>
  );
}

export default function EventCard({ event, variant }: EventCardProps) {
  const category = CATEGORY_INFO[event.category];

  if (variant === "past") {
    return (
      <article className={`${s.card} ${s.cardPast}`}>
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
          <h3 className={`${s.display} ${s.cardTitle}`}>{event.title}</h3>
          <p className={s.cardText}>{event.description}</p>
        </div>
      </article>
    );
  }

  const badge = dateBadge(event.date);
  const price = priceLabel(event.price);

  return (
    <article className={`${s.card} ${s.cardUpcoming}`}>
      <div className={s.cardArt}>
        <EventArt event={event} sizes="(min-width: 640px) 340px, 82vw" />

        <div className={s.dateStamp} aria-hidden="true">
          <span className={`${s.eyebrow} ${s.dateStampTop}`}>{badge.top}</span>
          <span className={`${s.display} ${s.dateStampBottom}`}>{badge.bottom}</span>
        </div>

        <span className={`${s.eyebrow} ${s.categoryTag}`}>{category.label}</span>
      </div>

      <div className={s.cardBody}>
        <h3 className={`${s.display} ${s.cardTitle}`}>{event.title}</h3>

        <dl className={s.cardMeta}>
          <dt className={s.srOnly}>When</dt>
          <dd>
            <span className={s.cardMetaStrong}>{formatLongDate(event.date)}</span>
            {event.time ? ` · ${event.time}` : null}
          </dd>
          {event.location ? (
            <>
              <dt className={s.srOnly}>Where</dt>
              <dd>{event.location}</dd>
            </>
          ) : null}
        </dl>

        <p className={s.cardText}>{event.description}</p>

        <div className={s.cardFooter}>
          <span className={s.price}>{price ?? "Pricing soon"}</span>
          {event.rsvpUrl ? (
            <a
              href={event.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}
            >
              Get tickets
              <span className={s.srOnly}> for {event.title} (opens in a new tab)</span>
            </a>
          ) : (
            <span className={`${s.eyebrow} ${s.soonTag}`}>Tickets soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
