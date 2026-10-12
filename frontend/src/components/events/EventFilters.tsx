import { CATEGORY_INFO, type ClubEvent, type EventCategory } from "@/data/events";
import s from "./events.module.css";

export type CategoryFilter = "all" | EventCategory;

const FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  ...(Object.keys(CATEGORY_INFO) as EventCategory[]).map((c) => ({
    value: c,
    label: CATEGORY_INFO[c].label,
  })),
];

export function matchesFilters(event: ClubEvent, category: CategoryFilter, query: string) {
  if (category !== "all" && event.category !== category) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [event.title, event.summary, event.location ?? "", CATEGORY_INFO[event.category].label]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

interface EventFiltersProps {
  category: CategoryFilter;
  query: string;
  resultCount: number;
  onCategoryChange: (c: CategoryFilter) => void;
  onQueryChange: (q: string) => void;
}

/** Search box + category chips that filter both the upcoming and previous lists */
export default function EventFilters({
  category,
  query,
  resultCount,
  onCategoryChange,
  onQueryChange,
}: EventFiltersProps) {
  const filtered = category !== "all" || query.trim() !== "";

  return (
    <div className={s.toolbar}>
      <div className={`${s.container} ${s.toolbarInner}`}>
        <div className={s.searchWrap}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={s.searchIcon}>
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <label htmlFor="event-search" className={s.srOnly}>
            Search events
          </label>
          <input
            id="event-search"
            type="search"
            placeholder="Search events, e.g. “pub golf”"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className={s.searchInput}
            autoComplete="off"
          />
        </div>

        <div role="group" aria-label="Filter events by type" className={s.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={category === f.value}
              onClick={() => onCategoryChange(f.value)}
              className={`${s.filterChip} ${s.focusRing}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className={s.resultCount} role="status" aria-live="polite">
          {filtered ? `${resultCount} event${resultCount === 1 ? "" : "s"} found` : ""}
        </p>
      </div>
    </div>
  );
}
