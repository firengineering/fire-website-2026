import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { AddToCalendar, ShareButton } from "@/components/events/EventActions";
import EventCard, { EventArt } from "@/components/events/EventCard";
import EventsShell from "@/components/events/EventsShell";
import JoinCta from "@/components/events/JoinCta";
import {
  countdownLabel,
  daysBetween,
  formatLongDate,
  formatMoney,
  formatTimeRange,
  isPastEvent,
  splitEvents,
  todayInMelbourne,
} from "@/components/events/eventDates";
import { useToday } from "@/components/events/useToday";
import s from "@/components/events/events.module.css";
import {
  CATEGORY_INFO,
  EVENTS,
  INSTAGRAM_URL,
  RUBRIC_SIGNUP_URL,
  getEventById,
  type ClubEvent,
} from "@/data/events";

interface EventPageProps {
  event: ClubEvent;
  builtOn: string;
}

function MetaIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={s.metaIcon}>
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  date: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
  time: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  place: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  ticket: "M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4zM14 6v12",
};

export default function EventPage({ event, builtOn }: EventPageProps) {
  const today = useToday(builtOn);
  const past = isPastEvent(event, today);
  const time = formatTimeRange(event);
  const category = CATEGORY_INFO[event.category];
  const daysAway = event.date && !past ? daysBetween(today, event.date) : null;
  const bookable = !past && Boolean(event.ticketUrl);
  const memberSaving = event.price ? event.price.nonMember - event.price.member : 0;

  const moreEvents = splitEvents(EVENTS, today)
    .upcoming.filter((e) => e.id !== event.id)
    .slice(0, 3);

  return (
    <EventsShell>
      {/* --------------------------------------------------------- Hero */}
      <section className={`${s.detailHero} ${s.sunset} ${s.grain}`}>
        <div className={s.container}>
          <Link href="/events" className={s.backLink}>
            ← All events
          </Link>

          <div className={s.detailGrid}>
            <div className={s.detailArt}>
              <EventArt event={event} sizes="(min-width: 900px) 520px, 100vw" priority />
            </div>

            <div className={s.detailIntro}>
              <div className={s.detailTags}>
                <span className={`${s.eyebrow} ${s.tagDark}`}>{category.label}</span>
                {past ? (
                  <span className={`${s.eyebrow} ${s.tagOutline}`}>Event ended</span>
                ) : daysAway !== null ? (
                  <span className={`${s.eyebrow} ${s.tagOrange}`}>{countdownLabel(daysAway)}</span>
                ) : (
                  <span className={`${s.eyebrow} ${s.tagOutline}`}>Date TBC</span>
                )}
              </div>

              <h1 className={`${s.display} ${s.detailTitle}`}>{event.title}</h1>
              <p className={s.detailSummary}>{event.summary}</p>

              <ul className={s.metaList}>
                <li>
                  <MetaIcon d={ICONS.date} />
                  {formatLongDate(event.date)}
                </li>
                {time ? (
                  <li>
                    <MetaIcon d={ICONS.time} />
                    {time}
                  </li>
                ) : null}
                {event.location ? (
                  <li>
                    <MetaIcon d={ICONS.place} />
                    <span>
                      {event.location}{" "}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.inlineLink}
                      >
                        Map
                      </a>
                    </span>
                  </li>
                ) : null}
                {event.price ? (
                  <li>
                    <MetaIcon d={ICONS.ticket} />
                    {event.price.member === event.price.nonMember
                      ? formatMoney(event.price.member)
                      : event.price.member === 0
                        ? `Free for members · ${formatMoney(event.price.nonMember)} for non-members`
                        : `From ${formatMoney(Math.min(event.price.member, event.price.nonMember))}`}
                  </li>
                ) : null}
              </ul>

              <div className={s.detailActions}>
                {bookable ? (
                  <Link href={`/events/${event.id}/book`} className={`${s.btn} ${s.btnPrimary} ${s.btnLarge}`}>
                    Book tickets
                  </Link>
                ) : past ? (
                  <Link href="/photoGallery" className={`${s.btn} ${s.btnPrimary}`}>
                    See photos
                  </Link>
                ) : (
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.btn} ${s.btnPrimary}`}
                  >
                    Tickets soon — get notified
                  </a>
                )}
                <div className={s.detailSecondary}>
                  {!past ? <AddToCalendar event={event} /> : null}
                  <ShareButton title={event.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Details */}
      <section className={s.section}>
        <div className={`${s.container} ${s.detailBody}`}>
          <div className={s.prose}>
            {past ? (
              <p className={s.endedNote}>
                This event has already happened — thanks to everyone who came!
                Check out what&apos;s coming up next below.
              </p>
            ) : null}
            <h2 className={`${s.display} ${s.proseTitle}`}>About this event</h2>
            {(event.details ?? [event.summary]).map((para) => (
              <p key={para}>{para}</p>
            ))}

            {event.goodToKnow && event.goodToKnow.length > 0 ? (
              <>
                <h3 className={`${s.eyebrow} ${s.proseSub}`}>Good to know</h3>
                <ul className={s.checkList}>
                  {event.goodToKnow.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className={s.sideCol} aria-label="Tickets">
            <div className={s.sideCard}>
              <h2 className={`${s.eyebrow} ${s.sideTitle}`}>Tickets</h2>
              {event.price ? (
                <dl className={s.priceTable}>
                  <div>
                    <dt>FiRE+ members</dt>
                    <dd>{formatMoney(event.price.member)}</dd>
                  </div>
                  <div>
                    <dt>Non-members</dt>
                    <dd>{formatMoney(event.price.nonMember)}</dd>
                  </div>
                </dl>
              ) : (
                <p className={s.sideText}>Pricing will be announced soon.</p>
              )}

              {memberSaving > 0 && !past ? (
                <p className={s.sideText}>
                  Not a member yet?{" "}
                  <a href={RUBRIC_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={s.inlineLink}>
                    Join FiRE+
                  </a>{" "}
                  and save {formatMoney(memberSaving)} on this event.
                </p>
              ) : null}

              {bookable ? (
                <Link href={`/events/${event.id}/book`} className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`}>
                  Book tickets
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------- More events */}
      {moreEvents.length > 0 ? (
        <section aria-labelledby="more-heading" className={`${s.section} ${s.previous}`}>
          <div className={s.container}>
            <div className={s.sectionHead}>
              <div>
                <p className={`${s.script} ${s.sectionKicker}`}>while you&apos;re here</p>
                <h2 id="more-heading" className={`${s.display} ${s.sectionTitleSm}`}>
                  More coming up
                </h2>
              </div>
              <Link href="/events#upcoming" className={`${s.btn} ${s.btnGhostDark} ${s.alignStart}`}>
                All events →
              </Link>
            </div>
            <ul className={s.pastGrid}>
              {moreEvents.map((e) => (
                <li key={e.id}>
                  <EventCard event={e} variant="upcoming" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <JoinCta />
    </EventsShell>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: EVENTS.map((e) => ({ params: { id: e.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params }) => {
  const event = getEventById(String(params?.id));
  if (!event) return { notFound: true };
  // JSON round-trip drops undefined optional fields, which Next can't serialise
  return { props: { event: JSON.parse(JSON.stringify(event)), builtOn: todayInMelbourne() } };
};
