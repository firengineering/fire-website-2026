import { INSTAGRAM_URL, LINKTREE_URL, RUBRIC_SIGNUP_URL } from "@/data/events";
import s from "./events.module.css";

export function FlameMark({ className }: { className?: string }) {
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

/** Dark "join FiRE+" band used at the bottom of the events pages */
export default function JoinCta() {
  return (
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
  );
}
