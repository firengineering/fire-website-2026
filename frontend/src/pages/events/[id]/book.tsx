import { useEffect, useRef, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { EventArt } from "@/components/events/EventCard";
import EventsShell from "@/components/events/EventsShell";
import {
  formatLongDate,
  formatMoney,
  formatTimeRange,
  isPastEvent,
  todayInMelbourne,
} from "@/components/events/eventDates";
import { useToday } from "@/components/events/useToday";
import s from "@/components/events/events.module.css";
import {
  EVENTS,
  MAX_TICKETS_PER_ORDER,
  RUBRIC_SIGNUP_URL,
  getEventById,
  type ClubEvent,
} from "@/data/events";

// ---------------------------------------------------------------------------
// Booking flow: pick tickets -> review -> hand off to the real ticket page.
// Payment and attendee details happen on the ticketing site (Rubric), so
// nothing personal is collected or stored here.
// ---------------------------------------------------------------------------

interface BookPageProps {
  event: ClubEvent;
  builtOn: string;
}

type Step = "tickets" | "review" | "redirect";
type TicketType = "member" | "nonMember";

const STEPS: { id: Step; label: string }[] = [
  { id: "tickets", label: "Tickets" },
  { id: "review", label: "Review" },
  { id: "redirect", label: "Pay on Rubric" },
];

const REDIRECT_SECONDS = 4;

export default function BookPage({ event, builtOn }: BookPageProps) {
  const today = useToday(builtOn);
  const [step, setStep] = useState<Step>("tickets");
  const [ticketType, setTicketType] = useState<TicketType>("member");
  const [quantity, setQuantity] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  const price = event.price ?? { member: 0, nonMember: 0 };
  const isFree = price.member === 0 && price.nonMember === 0;
  const samePrice = price.member === price.nonMember;
  const effectiveType: TicketType = samePrice ? "member" : ticketType;
  const unitPrice = price[effectiveType];
  const total = unitPrice * quantity;
  const time = formatTimeRange(event);
  const bookable = !isPastEvent(event, today) && Boolean(event.ticketUrl);

  // Move focus to the new step's heading so keyboard / screen reader users follow along
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  // Countdown, then send them to the ticket page
  useEffect(() => {
    if (step !== "redirect") return;
    const timer = setInterval(() => {
      setSecondsLeft((n) => Math.max(0, n - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (step === "redirect" && secondsLeft === 0 && event.ticketUrl) {
      window.location.assign(event.ticketUrl);
    }
  }, [step, secondsLeft, event.ticketUrl]);

  const goToRedirect = () => {
    setSecondsLeft(REDIRECT_SECONDS);
    setStep("redirect");
  };

  const ticketLabel = isFree
    ? "Free entry"
    : samePrice
      ? "General admission"
      : effectiveType === "member"
        ? "FiRE+ member"
        : "Non-member";

  if (!bookable) {
    return (
      <EventsShell>
        <section className={`${s.section} ${s.sunset} ${s.grain}`}>
          <div className={`${s.container} ${s.bookNarrow}`}>
            <Link href={`/events/${event.id}`} className={s.backLink}>
              ← Back to {event.title}
            </Link>
            <div className={s.bookPanel}>
              <h1 className={`${s.display} ${s.bookTitle}`}>Booking isn&apos;t open</h1>
              <p className={s.bookText}>
                {isPastEvent(event, today)
                  ? "This event has already happened."
                  : "Tickets for this event haven't been released yet. Follow us on Instagram to hear the moment they drop."}
              </p>
              <Link href="/events#upcoming" className={`${s.btn} ${s.btnPrimary}`}>
                See upcoming events
              </Link>
            </div>
          </div>
        </section>
      </EventsShell>
    );
  }

  const currentIndex = STEPS.findIndex((st) => st.id === step);

  return (
    <EventsShell>
      <section className={`${s.section} ${s.sunset} ${s.grain} ${s.bookSection}`}>
        <div className={`${s.container} ${s.bookLayout}`}>
          <div>
            <Link href={`/events/${event.id}`} className={s.backLink}>
              ← Back to event
            </Link>

            {/* Progress */}
            <ol className={s.stepper} aria-label="Booking progress">
              {STEPS.map((st, i) => (
                <li
                  key={st.id}
                  className={i < currentIndex ? s.stepDone : i === currentIndex ? s.stepCurrent : s.stepTodo}
                  aria-current={i === currentIndex ? "step" : undefined}
                >
                  <span className={s.stepDot}>{i < currentIndex ? "✓" : i + 1}</span>
                  <span className={s.stepLabel}>{st.label}</span>
                </li>
              ))}
            </ol>

            <div className={s.bookPanel}>
              {/* ------------------------------------------- Step 1: tickets */}
              {step === "tickets" ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("review");
                  }}
                >
                  <h1 ref={headingRef} tabIndex={-1} className={`${s.display} ${s.bookTitle}`}>
                    Choose your tickets
                  </h1>

                  {!samePrice ? (
                    <fieldset className={s.fieldset}>
                      <legend className={`${s.eyebrow} ${s.legend}`}>Ticket type</legend>
                      <div className={s.optionGrid}>
                        {(["member", "nonMember"] as TicketType[]).map((type) => (
                          <label
                            key={type}
                            className={`${s.optionCard} ${ticketType === type ? s.optionCardActive : ""}`}
                          >
                            <input
                              type="radio"
                              name="ticketType"
                              value={type}
                              checked={ticketType === type}
                              onChange={() => setTicketType(type)}
                              className={s.srOnly}
                            />
                            <span className={s.optionName}>
                              {type === "member" ? "FiRE+ member" : "Non-member"}
                            </span>
                            <span className={`${s.display} ${s.optionPrice}`}>
                              {formatMoney(price[type])}
                            </span>
                            <span className={s.optionHint}>
                              {type === "member"
                                ? "Use the account linked to your membership"
                                : "Anyone is welcome"}
                            </span>
                          </label>
                        ))}
                      </div>
                      {ticketType === "nonMember" ? (
                        <p className={s.hintBox}>
                          {price.member === 0 ? "Members get in free." : `Members pay ${formatMoney(price.member)}.`}{" "}
                          <a href={RUBRIC_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={s.inlineLink}>
                            Join FiRE+ on Rubric
                          </a>{" "}
                          (opens in a new tab), then come back and pick the member ticket.
                        </p>
                      ) : null}
                    </fieldset>
                  ) : null}

                  <fieldset className={s.fieldset}>
                    <legend className={`${s.eyebrow} ${s.legend}`}>How many?</legend>
                    <div className={s.qtyRow}>
                      <button
                        type="button"
                        className={s.qtyBtn}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Remove a ticket"
                      >
                        −
                      </button>
                      <output className={`${s.display} ${s.qtyValue}`} aria-live="polite">
                        {quantity}
                      </output>
                      <button
                        type="button"
                        className={s.qtyBtn}
                        onClick={() => setQuantity((q) => Math.min(MAX_TICKETS_PER_ORDER, q + 1))}
                        disabled={quantity >= MAX_TICKETS_PER_ORDER}
                        aria-label="Add a ticket"
                      >
                        +
                      </button>
                      <span className={s.qtyNote}>Max {MAX_TICKETS_PER_ORDER} per booking</span>
                    </div>
                  </fieldset>

                  <div className={s.bookFooter}>
                    <p className={s.totalLine}>
                      Total <strong className={s.display}>{formatMoney(total)}</strong>
                    </p>
                    <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLarge}`}>
                      Continue
                    </button>
                  </div>
                </form>
              ) : null}

              {/* -------------------------------------------- Step 2: review */}
              {step === "review" ? (
                <div>
                  <h1 ref={headingRef} tabIndex={-1} className={`${s.display} ${s.bookTitle}`}>
                    Check your booking
                  </h1>

                  <dl className={s.reviewList}>
                    <div>
                      <dt>Event</dt>
                      <dd>{event.title}</dd>
                    </div>
                    <div>
                      <dt>When</dt>
                      <dd>
                        {formatLongDate(event.date)}
                        {time ? `, ${time}` : ""}
                      </dd>
                    </div>
                    {event.location ? (
                      <div>
                        <dt>Where</dt>
                        <dd>{event.location}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt>Tickets</dt>
                      <dd>
                        {quantity} × {ticketLabel} ({formatMoney(unitPrice)})
                      </dd>
                    </div>
                    <div className={s.reviewTotal}>
                      <dt>Total</dt>
                      <dd>{formatMoney(total)}</dd>
                    </div>
                  </dl>

                  <p className={s.hintBox}>
                    <strong>Last step:</strong> we&apos;ll send you to Rubric, our
                    ticketing partner, to enter your details{isFree ? "" : " and pay"}. Pick
                    the same ticket type and quantity there to lock in your spot.
                  </p>

                  <div className={s.bookFooter}>
                    <button
                      type="button"
                      className={`${s.btn} ${s.btnGhostDark}`}
                      onClick={() => setStep("tickets")}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className={`${s.btn} ${s.btnPrimary} ${s.btnLarge}`}
                      onClick={goToRedirect}
                    >
                      {isFree ? "Continue to RSVP" : "Continue to payment"}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* ------------------------------------------ Step 3: redirect */}
              {step === "redirect" ? (
                <div className={s.redirectBox}>
                  <div className={s.spinner} aria-hidden="true" />
                  <h1 ref={headingRef} tabIndex={-1} className={`${s.display} ${s.bookTitle}`}>
                    Taking you to Rubric…
                  </h1>
                  <p className={s.bookText} aria-live="polite">
                    {secondsLeft > 0
                      ? `Redirecting in ${secondsLeft} second${secondsLeft === 1 ? "" : "s"}.`
                      : "Redirecting now."}{" "}
                    Remember: {quantity} × {ticketLabel}.
                  </p>
                  <div className={s.bookFooter}>
                    <button
                      type="button"
                      className={`${s.btn} ${s.btnGhostDark}`}
                      onClick={() => setStep("review")}
                    >
                      Cancel
                    </button>
                    <a href={event.ticketUrl} className={`${s.btn} ${s.btnPrimary}`}>
                      Go now
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Order summary */}
          <aside className={s.summaryCard} aria-label="Order summary">
            <div className={s.summaryArt}>
              <EventArt event={event} sizes="360px" />
            </div>
            <div className={s.summaryBody}>
              <p className={`${s.eyebrow} ${s.summaryKicker}`}>Your booking</p>
              <p className={`${s.display} ${s.summaryTitle}`}>{event.title}</p>
              <p className={s.summaryMeta}>
                {formatLongDate(event.date)}
                {time ? <><br />{time}</> : null}
                {event.location ? <><br />{event.location}</> : null}
              </p>
              <div className={s.summaryTotal}>
                <span>
                  {quantity} × {ticketLabel}
                </span>
                <strong>{formatMoney(total)}</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </EventsShell>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: EVENTS.map((e) => ({ params: { id: e.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BookPageProps> = async ({ params }) => {
  const event = getEventById(String(params?.id));
  if (!event) return { notFound: true };
  // JSON round-trip drops undefined optional fields, which Next can't serialise
  return { props: { event: JSON.parse(JSON.stringify(event)), builtOn: todayInMelbourne() } };
};
