// ---------------------------------------------------------------------------
// FiRE+ events — single source of truth for the /events page.
//
// To add an event: copy one of the objects below and fill it in.
//   - `date` is "YYYY-MM-DD" (Melbourne local). Use `null` if it's not
//     confirmed yet — it will show as "Date TBC" under Upcoming.
//   - The page splits Upcoming vs Previous automatically from `date`,
//     so nothing needs to be moved once an event has happened.
//   - `image` is a path inside /public (e.g. "/events/welcome-night.jpg").
//     Leave it out and the card shows a branded placeholder instead.
//
// NOTE: everything below is SAMPLE CONTENT taken from the design mockups.
// Confirm titles, dates, prices and links with the events team before launch.
// ---------------------------------------------------------------------------

export type EventCategory = "social" | "industry" | "campus";

export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  /** "YYYY-MM-DD", or null when the date isn't confirmed yet */
  date: string | null;
  /** Free text, e.g. "6:00pm – 9:00pm" */
  time?: string;
  location?: string;
  description: string;
  /** Leave undefined if pricing isn't announced */
  price?: "Free" | { member: string; nonMember: string };
  /** Ticket / RSVP link (Rubric, Humanitix, etc.) */
  rsvpUrl?: string;
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
export const INSTAGRAM_URL = "https://instagram.com/firengineering_";
export const LINKTREE_URL = "https://linktr.ee/firengineering";

export const EVENTS: ClubEvent[] = [
  // ----- Upcoming (sample) -----
  {
    id: "chart-your-course",
    title: "Chart Your Course",
    category: "campus",
    date: null,
    location: "RMIT City Campus",
    description:
      "Planning electives, minors or a switch of discipline? Bring your questions and chat with students a few years ahead of you.",
  },
  {
    id: "study-and-snacks",
    title: "Study & Snacks",
    category: "campus",
    date: "2026-10-15",
    time: "4:00pm – 7:00pm",
    location: "RMIT City Campus",
    description:
      "A relaxed exam-season study session. Bring your laptop, we'll bring the food.",
    price: "Free",
  },
  {
    id: "industry-night-2026",
    title: "Industry Night",
    category: "industry",
    date: "2026-10-29",
    time: "6:00pm – 8:30pm",
    location: "RMIT City Campus",
    description:
      "Hear from engineers across civil, aerospace and software, then stay for an informal networking session.",
    price: { member: "Free", nonMember: "$5" },
  },
  {
    id: "end-of-year-social",
    title: "End of Year Social",
    category: "social",
    date: "2026-11-20",
    time: "6:00pm onwards",
    location: "Melbourne CBD",
    description:
      "Exams are done. Celebrate the year with the FiRE+ community before everyone scatters for summer.",
  },

  // ----- Previous (sample, from the mockups) -----
  {
    id: "pub-golf-2026",
    title: "Pub Golf",
    category: "social",
    date: "2026-09-03",
    time: "6:00pm – 9:00pm",
    location: "Melbourne CBD",
    description:
      "Our semester two bar crawl: nine holes, questionable outfits and a lot of new friends.",
    price: { member: "$10", nonMember: "$15" },
  },
  {
    id: "industry-insights-2026",
    title: "Industry Insights",
    category: "industry",
    date: "2026-08-20",
    location: "RMIT City Campus",
    description:
      "A panel of engineers shared how they got their first role and what they wish they'd known as students.",
  },
  {
    id: "eox-party-2026",
    title: "EOX Party",
    category: "social",
    date: "2026-06-12",
    location: "Melbourne CBD",
    description:
      "End-of-exams party to close out semester one.",
  },
  {
    id: "welcome-night-2026",
    title: "Welcome Night",
    category: "social",
    date: "2026-03-05",
    location: "Melbourne CBD",
    description:
      "Kicking off the year with new and returning members — our biggest night of the year.",
  },
];
