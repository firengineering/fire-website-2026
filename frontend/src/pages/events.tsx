import { useSyncExternalStore } from "react";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import EventCard from "@/components/events/EventCard";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import { splitEvents, todayInMelbourne } from "@/components/events/eventDates";
import { eventFontVariables } from "@/components/events/fonts";
import s from "@/components/events/events.module.css";
import {
  CATEGORY_INFO,
  EVENTS,
  INSTAGRAM_URL,
  LINKTREE_URL,
  RUBRIC_SIGNUP_URL,
  type EventCategory,
} from "@/data/events";

interface EventsPageProps {
  /** Date the page was built — used for the first render, then replaced by the visitor's real "today" */
  builtOn: string;
}

// The page is statically generated, so "today" at build time goes stale.
// useSyncExternalStore renders with the build date on the server (so there's no
// hydration mismatch) and switches to the real current date in the browser.
const noopSubscribe = () => () => {};
function useToday(serverValue: string) {
  return useSyncExternalStore(
    noopSubscribe,
    () => todayInMelbourne(),
    () => serverValue
  );
}

function FlameMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
      <path
        d="M32 2c3 14 16 20 20 34 5 18-6 40-20 42C16 80 6 66 8 50c1-9 6-15 10-19 0 8 3 13 8 15-3-14 2-30 6-44z"
        fill="currentColor"
      />
      <path
        d="M33 46c2 6 9 9 9 17 0 7-5 11-10 11s-10-4-10-10c0-5 3-8 6-10 0 3 1 5 3 6-1-5 0-10 2-14z"
        fill="#fbf1e7"
      />
    </svg>
  );
}

const CATEGORY_ORDER: EventCategory[] = ["social", "industry", "campus"];
const STATS = ["10+ events a year", "Social · Industry · Campus", "All genders welcome"];

export default function EventsPage({ builtOn }: EventsPageProps) {
  const today = useToday(builtOn);
  const { upcoming, previous } = splitEvents(EVENTS, today);

  return (
    <div className={`${eventFontVariables} ${s.page}`}>
      {/* TODO (Header owner): add "events" to Header's `active` prop and a nav link to /events */}
      <Header active="social" />

      <main>
        {/* ---------------------------------------------------------- Hero */}
        <section className={s.hero} aria-labelledby="events-title">
          <Image
            src="/banner-events-bg.png"
            alt=""
            width={1890}
            height={3780}
            sizes="(max-width: 1560px) 1560px, 100vw"
            loading="eager"
            fetchPriority="high"
            className={s.heroImage}
          />
          <div className={s.heroOverlay} aria-hidden="true" />

          <div className={`${s.container} ${s.heroInner}`}>
            <p className={`${s.script} ${s.heroKicker}`}>FiRE+ Engineering</p>
            <h1 id="events-title" className={`${s.display} ${s.heroTitle}`}>
              Events
            </h1>
            <p className={s.heroLede}>
              Socials, industry nights and on-campus sessions for women and
              gender diverse students in engineering and aviation — and everyone
              who supports them.
            </p>

            <div className={s.heroActions}>
              <a
                href={RUBRIC_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.btn} ${s.btnPrimary}`}
              >
                Become a member
              </a>
              <a href="#upcoming" className={`${s.btn} ${s.btnGhostLight}`}>
                See what&apos;s on
              </a>
            </div>
          </div>

          <div className={s.sticker} aria-hidden="true">
            <span className={s.script}>
              “Engage,
              <br />
              Support,
              <br />
              Empower”
            </span>
          </div>
        </section>

        {/* ---------------------------------------------------- Stat strip */}
        <div className={s.statStrip}>
          <ul className={`${s.container} ${s.statList}`}>
            {STATS.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        </div>

        {/* --------------------------------------------- Event categories */}
        <section aria-labelledby="types-heading" className={`${s.section} ${s.grain}`}>
          <div className={`${s.container} ${s.typesGrid}`}>
            <div>
              <h2 id="types-heading" className={`${s.eyebrow} ${s.typesHeading}`}>
                Three ways to get involved
              </h2>
              <p className={`${s.display} ${s.typesLead}`}>
                Something for every kind of week.
              </p>
            </div>

            <ul className={s.typeList}>
              {CATEGORY_ORDER.map((key, i) => (
                <li key={key} className={s.typeCard}>
                  <span className={`${s.display} ${s.typeNumber}`} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className={`${s.eyebrow} ${s.typeName}`}>
                    {CATEGORY_INFO[key].label}
                  </h3>
                  <p className={s.typeBlurb}>{CATEGORY_INFO[key].blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ Upcoming */}
        <UpcomingEvents events={upcoming} />

        {/* ------------------------------------------------------ Previous */}
        {previous.length > 0 ? (
          <section aria-labelledby="previous-heading" className={`${s.section} ${s.previous}`}>
            <div className={s.container}>
              <div className={s.sectionHead}>
                <div>
                  <p className={`${s.script} ${s.sectionKicker}`}>in case you missed it</p>
                  <h2 id="previous-heading" className={`${s.display} ${s.sectionTitle}`}>
                    Previous events…
                  </h2>
                </div>
                <Link
                  href="/photoGallery"
                  className={`${s.btn} ${s.btnGhostDark} ${s.alignStart}`}
                >
                  See the photo gallery →
                </Link>
              </div>

              <ul className={s.pastGrid}>
                {previous.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} variant="past" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* ----------------------------------------------------- Join CTA */}
        <section aria-labelledby="join-heading" className={`${s.join} ${s.onDark}`}>
          <div className={`${s.container} ${s.joinInner}`}>
            <FlameMark className={s.flame} />
            <div>
              <h2 id="join-heading" className={`${s.display} ${s.joinTitle}`}>
                Never miss an event.
              </h2>
              <p className={s.joinText}>
                Members get cheaper tickets to our paid events. Membership is
                through Rubric and takes about a minute.
              </p>
            </div>
            <div className={s.joinActions}>
              <a
                href={RUBRIC_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.btn} ${s.btnPrimary}`}
              >
                Join FiRE+
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.btn} ${s.btnGhostLight}`}
              >
                Follow on Instagram
              </a>
              <a
                href={LINKTREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.textLink} ${s.focusRing}`}
              >
                All our links
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => ({
  props: { builtOn: todayInMelbourne() },
});
