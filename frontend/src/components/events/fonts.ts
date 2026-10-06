import { Bricolage_Grotesque, DM_Sans, Yellowtail } from "next/font/google";

// Fonts used only on the events page. Exposed as CSS variables so they can be
// referenced from events.module.css.

export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-events-display",
  display: "swap",
});

export const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-events-body",
  display: "swap",
});

// Retro script, echoing the "FiRE+" lettering in the mockups
export const scriptFont = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-events-script",
  display: "swap",
});

export const eventFontVariables = [
  displayFont.variable,
  bodyFont.variable,
  scriptFont.variable,
].join(" ");
