import type { ReactNode } from "react";
import Header from "@/components/Header";
import { eventFontVariables } from "./fonts";
import s from "./events.module.css";

/** Shared wrapper for every events page: fonts, palette and the site header. */
export default function EventsShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${eventFontVariables} ${s.page}`}>
      {/* TODO (Header owner): add "events" to Header's `active` prop and a nav link to /events */}
      <Header active="social" />
      <main>{children}</main>
    </div>
  );
}
