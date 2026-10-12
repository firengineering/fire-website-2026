// ---------------------------------------------------------------------------
// FiRE+ events — single source of truth for /events and /events/[id].
//
// To add an event: copy one of the objects below and fill it in.
//   - `id` becomes the URL: /events/<id>. Lowercase, hyphens, no spaces.
//   - `date` is "YYYY-MM-DD" (Melbourne local). Use `null` if it's not
//     confirmed yet — it shows as "Date TBC" under Upcoming.
//   - `start` / `end` are 24-hour "HH:MM" times. Optional.
//   - Upcoming vs Previous is worked out from `date` automatically,
//     so nothing needs moving once an event has happened.
//   - `ticketUrl` is the real ticket page (Rubric etc). The Book button only
//     appears when this is set; the booking page sends people there at the end.
//   - `image` is a path inside /public (e.g. "/events/welcome-night.jpg").
//     Leave it out and a branded placeholder is shown instead.
//
// NOTE: everything below is SAMPLE CONTENT based on the design mockups.
// Confirm titles, dates, prices and links with the events team before launch.
// ---------------------------------------------------------------------------

export type EventCategory = "social" | "industry" | "campus";

/** Prices in whole dollars. 0 means free. */
export interface EventPrice {
  member: number;
  nonMember: number;
}

export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  /** "YYYY-MM-DD", or null when the date isn't confirmed yet */
  date: string | null;
  /** 24-hour "HH:MM" */
  start?: string;
  /** 24-hour "HH:MM" */
  end?: string;
  location?: string;
  /** One or two sentences, shown on cards */
  summary: string;
  /** Longer description for the event page — one string per paragraph */
  details?: string[];
  /** Short bullet points: what to bring, dress code, accessibility, etc. */
  goodToKnow?: string[];
  /** Leave undefined if pricing isn't announced yet */
  price?: EventPrice;
  /** Where tickets are actually bought (Rubric, Humanitix, ...) */
  ticketUrl?: string;
  /** Path inside /public */
  image?: string;
}

export const CATEGORY_INFO: Record<
  EventCategory,
  { label: string; blurb: string }
> = {
  social: {
    label: "Social",
    blurb:
      "Welcome nights, pub golf, trivia and end-of-semester parties — the easiest way to meet people across every engineering and aviation discipline.",
  },
  industry: {
    label: "Industry",
    blurb:
      "Panels, networking nights and workshops with engineers who've been where you are, so you walk into placement and grad applications industry-ready.",
  },
  campus: {
    label: "Campus",
    blurb:
      "Study sessions, course-planning chats and STEM outreach volunteering, right here at RMIT. Low-key, useful, and usually with snacks.",
  },
};

export const RUBRIC_SIGNUP_URL =
  "https://campus.hellorubric.com/?tab=memberships&s=5502";
// TODO: replace with each event's own Rubric ticket link once they're published
export const RUBRIC_CLUB_URL = "https://campus.hellorubric.com/?s=5502";
export const INSTAGRAM_URL = "https://instagram.com/firengineering_";
export const LINKTREE_URL = "https://linktr.ee/firengineering";
export const CLUB_EMAIL = "firengineering@rmit.edu.au";

/** Max tickets someone can pick on the booking page */
export const MAX_TICKETS_PER_ORDER = 6;

export const EVENTS: ClubEvent[] = [
  // ----- Upcoming (sample) -----
  {
    id: "chart-your-course",
    title: "Chart Your Course",
    category: "campus",
    date: null,
    location: "RMIT City Campus",
    summary:
      "Planning electives, minors or a switch of discipline? Bring your questions and chat with students a few years ahead of you.",
    details: [
      "Choosing electives and minors can feel like guesswork. Chart Your Course pairs you with students further along in your degree so you can ask what they wish they'd picked, and what they'd skip.",
      "We'll have tables for each discipline, so drift between them as much as you like.",
    ],
    goodToKnow: [
      "Bring your course plan or progress report if you have one",
      "Open to all year levels",
    ],
  },
  {
    id: "study-and-snacks",
    title: "Study & Snacks",
    category: "campus",
    date: "2026-10-15",
    start: "16:00",
    end: "19:00",
    location: "RMIT City Campus",
    summary:
      "A relaxed exam-season study session. Bring your laptop, we'll bring the food.",
    details: [
      "Exam season is better with company. Grab a seat, get some work done, and take a break with the rest of the FiRE+ crew when you need one.",
      "Older students will be around if you want a second pair of eyes on a tricky problem.",
    ],
    goodToKnow: [
      "Bring your laptop and charger",
      "Vegetarian and vegan food available",
    ],
    price: { member: 0, nonMember: 0 },
    ticketUrl: RUBRIC_CLUB_URL,
  },
  {
    id: "industry-night-2026",
    title: "Industry Night",
    category: "industry",
    date: "2026-10-29",
    start: "18:00",
    end: "20:30",
    location: "RMIT City Campus",
    summary:
      "Hear from engineers across civil, aerospace and software, then stay for an informal networking session.",
    details: [
      "Our panel of engineers will talk through how they got their first role, what their day-to-day actually looks like, and what they look for when hiring students.",
      "After the Q&A, stick around for drinks and nibbles and a chance to talk to the panel one-on-one.",
    ],
    goodToKnow: [
      "Smart casual",
      "Bring a few questions — the panel loves them",
      "Drinks and finger food provided",
    ],
    price: { member: 0, nonMember: 5 },
    ticketUrl: RUBRIC_CLUB_URL,
  },
  {
    id: "end-of-year-social",
    title: "End of Year Social",
    category: "social",
    date: "2026-11-20",
    start: "18:00",
    location: "Melbourne CBD",
    summary:
      "Exams are done. Celebrate the year with the FiRE+ community before everyone scatters for summer.",
    details: [
      "You made it! Join us for one last night together before summer break.",
    ],
    goodToKnow: ["18+ venue — bring photo ID"],
    price: { member: 10, nonMember: 15 },
    ticketUrl: RUBRIC_CLUB_URL,
  },

  // ----- Previous (sample, from the mockups) -----
  {
    id: "pub-golf-2026",
    title: "Pub Golf",
    category: "social",
    date: "2026-09-03",
    start: "18:00",
    end: "21:00",
    location: "Melbourne CBD",
    summary:
      "Our semester two bar crawl: nine holes, questionable outfits and a lot of new friends.",
    price: { member: 10, nonMember: 15 },
  },
  {
    id: "industry-insights-2026",
    title: "Industry Insights",
    category: "industry",
    date: "2026-08-20",
    location: "RMIT City Campus",
    summary:
      "A panel of engineers shared how they got their first role and what they wish they'd known as students.",
  },
  {
    id: "eox-party-2026",
    title: "EOX Party",
    category: "social",
    date: "2026-06-12",
    location: "Melbourne CBD",
    summary: "End-of-exams party to close out semester one.",
  },
  {
    id: "welcome-night-2026",
    title: "Welcome Night",
    category: "social",
    date: "2026-03-05",
    location: "Melbourne CBD",
    summary:
      "Kicking off the year with new and returning members — our biggest night of the year.",
  },
];

export function getEventById(id: string): ClubEvent | undefined {
  return EVENTS.find((e) => e.id === id);
}
