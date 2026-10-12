import { useCallback, useEffect, useRef, useState } from "react";
import { INSTAGRAM_URL, type ClubEvent } from "@/data/events";
import EventCard from "./EventCard";
import s from "./events.module.css";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface UpcomingEventsProps {
  events: ClubEvent[];
  /** True when search / category filters are hiding some events */
  isFiltered: boolean;
  onClearFilters: () => void;
}

export default function UpcomingEvents({
  events,
  isFiltered,
  onClearFilters,
}: UpcomingEventsProps) {
  const [edges, setEdges] = useState({ start: true, end: false });
  const trackRef = useRef<HTMLUListElement>(null);

  // Enable/disable the arrow buttons based on scroll position
  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const start = track.scrollLeft <= 4;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    setEdges((prev) =>
      prev.start === start && prev.end === end ? prev : { start, end }
    );
  }, []);

  const eventKey = events.map((e) => e.id).join(",");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0 });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateEdges, eventKey]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    track.scrollBy({
      left: direction * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const showControls = events.length > 1 && !(edges.start && edges.end);

  return (
    <section
      id="upcoming"
      aria-labelledby="upcoming-heading"
      className={`${s.section} ${s.sunset} ${s.grain}`}
    >
      <div className={s.container}>
        <div className={s.sectionHead}>
          <div>
            <p className={`${s.script} ${s.sectionKicker}`}>what&apos;s coming up</p>
            <h2 id="upcoming-heading" className={`${s.display} ${s.sectionTitle}`}>
              Upcoming events…
            </h2>
          </div>

          {showControls ? (
            <div className={s.carouselControls}>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={edges.start}
                aria-label="Show previous events in the list"
                className={`${s.arrowBtn} ${s.focusRing}`}
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={edges.end}
                aria-label="Show more events"
                className={`${s.arrowBtn} ${s.focusRing}`}
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          ) : null}
        </div>

        {events.length === 0 ? (
          <div className={s.empty}>
            {isFiltered ? (
              <>
                <p className={`${s.display} ${s.emptyTitle}`}>No upcoming events match that.</p>
                <p className={s.emptyText}>Try a different search or show every type of event.</p>
                <button type="button" onClick={onClearFilters} className={`${s.btn} ${s.btnGhostDark}`}>
                  Clear filters
                </button>
              </>
            ) : (
              <>
                <p className={`${s.display} ${s.emptyTitle}`}>Nothing on the calendar just yet.</p>
                <p className={s.emptyText}>
                  New events are announced on our Instagram first — follow along so
                  you don&apos;t miss the next one.
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.btn} ${s.btnPrimary}`}
                >
                  Follow @firengineering_
                </a>
              </>
            )}
          </div>
        ) : (
          <div className={s.carousel}>
            <ul
              ref={trackRef}
              onScroll={updateEdges}
              className={s.track}
              aria-label="Upcoming events"
            >
              {events.map((event) => (
                <li key={event.id} className={s.trackItem}>
                  <EventCard event={event} variant="upcoming" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
