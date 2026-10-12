import { useState } from "react";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/events/EventCard";
import EventFilters, {
  matchesFilters,
  type CategoryFilter,
} from "@/components/events/EventFilters";
import EventsShell from "@/components/events/EventsShell";
import JoinCta from "@/components/events/JoinCta";
import NextUpBanner from "@/components/events/NextUpBanner";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import { splitEvents, todayInMelbourne } from "@/components/events/eventDates";
import { useToday } from "@/components/events/useToday";
import s from "@/components/events/events.module.css";
import {
  CATEGORY_INFO,
  EVENTS,
  RUBRIC_SIGNUP_URL,
  type EventCategory,
} from "@/data/events";

interface EventsPageProps {
  /** Date the page was built — used for the first render, then replaced by the visitor's real "today" */
  builtOn: string;
}

const CATEGORY_ORDER: EventCategory[] = ["social", "industry", "campus"];
const STATS = ["10+ events a year", "Social · Industry · Campus", "All genders welcome"];

export default function EventsPage({ builtOn }: EventsPageProps) {
  const today = useToday(builtOn);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const { upcoming, previous } = splitEvents(EVENTS, today);
  const shownUpcoming = upcoming.filter((e) => matchesFilters(e, category, query));
  const shownPrevious = previous.filter((e) => matchesFilters(e, category, query));
  const isFiltered = category !== "all" || query.trim() !== "";

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
  };

  // Clicking a category card filters the lists and jumps to them
  const showCategory = (c: EventCategory) => {
    setCategory(c);
    document.getElementById("find-events")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <EventsShell>
      {/* ------------------------------------------------------------ Hero */}
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
            Socials, industry nights and on-campus sessions for women and gender
            diverse students in engineering and aviation — and everyone who
            supports them.
          </p>

          <div className={s.heroActions}>
            <a href="#upcoming" className={`${s.btn} ${s.btnPrimary}`}>
              See what&apos;s on
            </a>
            <a
              href={RUBRIC_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.btn} ${s.btnGhostLight}`}
            >
              Become a member
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

      {/* ------------------------------------------------- Next up banner */}
      <NextUpBanner events={upcoming} today={today} />

      {/* ------------------------------------------------- Event categories */}
      <section aria-labelledby="types-heading" className={`${s.section} ${s.grain}`}>
        <div className={`${s.container} ${s.typesGrid}`}>
          <div>
            <h2 id="types-heading" className={`${s.eyebrow} ${s.typesHeading}`}>
              Three ways to get involved
            </h2>
            <p className={`${s.display} ${s.typesLead}`}>
              Something for every kind of week.
            </p>
            <ul className={s.statPills}>
              {STATS.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          </div>

          <ul className={s.typeList}>
            {CATEGORY_ORDER.map((key, i) => {
              const count = upcoming.filter((e) => e.category === key).length;
              return (
                <li key={key}>
                  <button
                    type="button"
                    className={s.typeCard}
                    onClick={() => showCategory(key)}
                  >
                    <span className={`${s.display} ${s.typeNumber}`} aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className={`${s.eyebrow} ${s.typeName}`}>
                      {CATEGORY_INFO[key].label}
                    </span>
                    <span className={s.typeBlurb}>{CATEGORY_INFO[key].blurb}</span>
                    <span className={s.typeLink}>
                      {count > 0
                        ? `${count} coming up →`
                        : "Browse past events →"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Search + filters */}
      <div id="find-events" className={s.anchorTarget}>
        <EventFilters
          category={category}
          query={query}
          resultCount={shownUpcoming.length + shownPrevious.length}
          onCategoryChange={setCategory}
          onQueryChange={setQuery}
        />
      </div>

      {/* --------------------------------------------------------- Upcoming */}
      <UpcomingEvents
        events={shownUpcoming}
        isFiltered={isFiltered}
        onClearFilters={clearFilters}
      />

      {/* --------------------------------------------------------- Previous */}
      {shownPrevious.length > 0 ? (
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
              {shownPrevious.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} variant="past" />
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

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => ({
  props: { builtOn: todayInMelbourne() },
});
