import { useSyncExternalStore } from "react";
import { todayInMelbourne } from "./eventDates";

// Event pages are statically generated, so "today" at build time goes stale.
// This renders with the build date on the server (no hydration mismatch) and
// switches to the real current date in the browser.
const noopSubscribe = () => () => {};

export function useToday(builtOn: string): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => todayInMelbourne(),
    () => builtOn
  );
}
