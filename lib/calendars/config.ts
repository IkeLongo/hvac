/**
 * Booking calendar configuration.
 *
 * Each entry maps a calendar slug to the metadata needed to render a booking
 * widget or redirect. Slugs match the `assignedCalendar` values produced by
 * `computeBookingDecision()` so routing → calendar is a single lookup.
 *
 * To connect real GHL calendar links, replace the placeholder `embedUrl` and
 * `bookingUrl` values with the URLs from your GHL calendar settings.
 * No other code needs to change.
 */

export interface CalendarConfig {
  /** Stable identifier — never changes even if title/slug changes. */
  id: string;
  /** URL-safe key used in routing and API responses. Must be unique. */
  slug: string;
  /** Display title shown to the customer above the booking widget. */
  title: string;
  /** Supporting copy shown below the title. */
  description: string;
  /**
   * GHL (or other provider) embeddable calendar iframe URL.
   * Set to `null` until a real URL is available; the UI should fall back to `bookingUrl`.
   */
  embedUrl: string | null;
  /**
   * Direct link to the booking page — used when embedding is unavailable
   * or the user is on a device that doesn't support the embed.
   */
  bookingUrl: string | null;
  /**
   * Set to false to temporarily disable a calendar without removing it.
   * Inactive calendars are treated as "not found" by the helper functions.
   */
  isActive: boolean;
  /**
   * The `id` attribute from the GHL embed snippet. GHL's `form_embed.js`
   * script uses this to look up the iframe and auto-resize it.
   * Omit (or set null) for non-GHL providers or if auto-resize isn't needed.
   */
  iframeId?: string | null;
}

// ── Calendar entries ──────────────────────────────────────────────────────────

const CALENDARS: CalendarConfig[] = [
  {
    id: "cal_standard_diagnostic",
    slug: "standard-diagnostic",
    title: "Schedule Your Diagnostic Visit",
    description: "Choose a time that works for your service appointment.",
    embedUrl: "https://links.rivercitycreatives.com/widget/booking/iZdA3NPwKvVB81JfPN5H",
    bookingUrl: "https://links.rivercitycreatives.com/widget/bookings/hvacinstallationservices-ad98ee43-35e8-45f3-b538-8477e531e0ba96123e",
    iframeId: "1PL3p9kdTUTLFholIRAE_1776447729016",
    isActive: true,
  },
  {
    id: "cal_tune_up",
    slug: "tune-up",
    title: "Schedule Your Tune-Up",
    description: "Pick a convenient time for your maintenance visit.",
    embedUrl: "https://links.rivercitycreatives.com/widget/booking/YQ9gq2fx9Pp4QbXUX1L8",
    bookingUrl: "https://links.rivercitycreatives.com/widget/bookings/hvacinstallationservices-ad98ee43-35e8-45f3-b538-8477e531e0ba96123e6ls03j",
    iframeId: "1PL3p9kdTUTLFholIRAE_1776447987437",
    isActive: true,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Look up a calendar by its slug.
 *
 * Returns `null` when:
 * - no calendar with that slug exists
 * - the calendar exists but `isActive === false`
 *
 * This intentional null-return lets call sites decide how to handle the
 * absence (show a fallback UI, redirect to contact page, etc.) without
 * throwing at the config layer.
 */
export function getCalendarBySlug(slug: string): CalendarConfig | null {
  const calendar = CALENDARS.find((c) => c.slug === slug);
  if (!calendar || !calendar.isActive) return null;
  return calendar;
}

/**
 * Resolve a calendar slug that may be null, inactive, or unknown into either
 * a `CalendarConfig` (booking UI can proceed) or `null` (show fallback).
 *
 * Use this as the single entry point in pages and API handlers that receive
 * an `assignedCalendar` value from `computeBookingDecision()`.
 *
 * @example
 * const calendar = resolveCalendar(bookingDecision.assignedCalendar);
 * if (!calendar) {
 *   // show "someone will follow up" message
 * } else {
 *   // render <BookingWidget calendar={calendar} />
 * }
 */
export function resolveCalendar(slug: string | null | undefined): CalendarConfig | null {
  if (!slug) return null;
  return getCalendarBySlug(slug);
}

/**
 * Return all active calendars.
 * Useful for admin UIs or sitemap generation.
 */
export function getActiveCalendars(): CalendarConfig[] {
  return CALENDARS.filter((c) => c.isActive);
}
