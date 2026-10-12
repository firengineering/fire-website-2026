import { useEffect, useRef, useState } from "react";
import type { ClubEvent } from "@/data/events";
import { canAddToCalendar, downloadICS, googleCalendarUrl } from "./calendar";
import s from "./events.module.css";

// Only called from event handlers / client-only UI, so server markup is unaffected
function currentUrl() {
  return typeof window === "undefined" ? "" : window.location.href.split("#")[0];
}

/** "Add to calendar" with Google and .ics (Apple / Outlook) options */
export function AddToCalendar({ event }: { event: ClubEvent }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!canAddToCalendar(event)) return null;

  return (
    <div ref={wrapRef} className={s.menuWrap}>
      <button
        type="button"
        className={`${s.btn} ${s.btnGhostDark} ${s.btnSmall}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <CalendarIcon /> Add to calendar
      </button>
      {open ? (
        <div className={s.menu}>
          <a
            className={s.menuItem}
            href={googleCalendarUrl(event, currentUrl())}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Google Calendar
          </a>
          <button
            type="button"
            className={s.menuItem}
            onClick={() => {
              downloadICS(event, currentUrl());
              setOpen(false);
            }}
          >
            Apple / Outlook (.ics)
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Uses the phone's share sheet when available, otherwise copies the link */
export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const t = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(t);
  }, [status]);

  const share = async () => {
    const url = currentUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: `FiRE+ · ${title}`, url });
        return;
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return; // user closed the sheet
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${s.btn} ${s.btnGhostDark} ${s.btnSmall}`}
        onClick={share}
      >
        <ShareIcon /> {status === "copied" ? "Link copied!" : "Share"}
      </button>
      <span className={s.srOnly} role="status" aria-live="polite">
        {status === "copied" ? "Link copied to clipboard" : status === "failed" ? "Couldn't copy the link" : ""}
      </span>
    </>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}
