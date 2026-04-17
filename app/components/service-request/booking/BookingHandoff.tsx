"use client";
import { motion } from "motion/react";
import { CalendarEmbed } from "./CalendarEmbed";

// ── Props ─────────────────────────────────────────────────────────────────────

export interface BookingHandoffProps {
  /** Customer's first name — used to personalise the greeting. */
  firstName: string;
  /** From `BookingDecision.bookingEligible`. When false, shows a follow-up card instead. */
  bookingEligible: boolean;
  /** From `BookingDecision.assignedCalendar` — the slug of the chosen calendar. */
  assignedCalendar: string | null;
  /** Display title for the calendar section (e.g. "Schedule Your Diagnostic Visit"). */
  calendarTitle: string;
  /** Supporting copy shown below the calendar title. */
  calendarDescription: string;
  /**
   * GHL (or other provider) iframe embed URL.
   * When provided, the calendar renders inline. Falls back to `bookingUrl`.
   */
  embedUrl?: string | null;
  /**
   * Direct booking page URL — used as an accessible fallback or primary CTA
   * when `embedUrl` is not available.
   */
  bookingUrl?: string | null;
  /**
   * Destination for the "Contact Us" CTA shown when neither `embedUrl` nor
   * `bookingUrl` are configured. Defaults to `/contact`.
   */
  contactUrl?: string;
  /**
   * Pass `false` when the calendar slug was not found or the calendar is
   * inactive. `BookingHandoff` will show a graceful "we'll follow up" fallback
   * instead of the calendar embed section.
   * Defaults to `true` (assumes calendar is available unless told otherwise).
   */
  calendarResolved?: boolean;
  /**
   * Controls how the booking UI is presented when `bookingEligible` is true:
   * - `"embed"` (default) — renders the calendar inline via `CalendarEmbed`.
   * - `"redirect"` — shows a brief confirmation and a prominent CTA button
   *   that navigates the user to `bookingUrl`.
   *
   * Use `"redirect"` when the calendar provider does not support embedding,
   * when an iframe would be too heavy for the current page, or when you want
   * a full-page scheduling experience.
   */
  bookingMode?: "embed" | "redirect";
  /**
   * The `id` attribute from the GHL embed snippet. Passed to `CalendarEmbed`
   * so GHL's `form_embed.js` can auto-resize the iframe to fit the content.
   * Sourced from `CalendarConfig.iframeId`.
   */
  iframeId?: string | null;
  primaryColor: string;
  accentColor: string;
}

// ── Inline icons ──────────────────────────────────────────────────────────────

function CircleCheckIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-9 h-9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      aria-hidden="true"
      style={{ color }}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M9 12l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneCallIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-amber-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.39 19a19.5 19.5 0 0 1-5-5 19.79 19.79 0 0 1-2.93-8.4A2 2 0 0 1 5.44 3.5h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.91 11a16 16 0 0 0 5 5l.91-.91a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 17.48v-.56Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-9 h-9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      aria-hidden="true"
      style={{ color }}
    >
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Variants ──────────────────────────────────────────────────────────────────

/**
 * Booking section rendered inside `BookingEligibleView` when
 * `bookingMode === "redirect"`.
 *
 * Shows a brief next-step prompt and a prominent CTA that navigates to
 * `bookingUrl`. Falls back to the `contactUrl` if `bookingUrl` is not
 * configured.
 */
function BookingRedirectSection({
  calendarTitle,
  calendarDescription,
  bookingUrl,
  contactUrl = "/contact",
  primaryColor,
}: Pick<
  BookingHandoffProps,
  "calendarTitle" | "calendarDescription" | "bookingUrl" | "contactUrl" | "primaryColor"
>) {
  if (bookingUrl) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 text-center space-y-5">
        <div className="space-y-1.5">
          <p className="text-base font-bold text-gray-900">{calendarTitle}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{calendarDescription}</p>
        </div>
        <a
          href={bookingUrl}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          style={{ backgroundColor: primaryColor }}
        >
          Pick a Time Now
          <ArrowRightIcon />
        </a>
        <p className="text-xs text-gray-400">
          Takes about a minute. You&rsquo;ll receive a confirmation right away.
        </p>
      </div>
    );
  }

  // bookingUrl not configured — show contact fallback
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-8 text-center space-y-3">
      <p className="text-sm text-gray-600 max-w-xs mx-auto">
        Online scheduling isn&rsquo;t available right now. Reach out directly
        and we&rsquo;ll get you booked quickly.
      </p>
      <a
        href={contactUrl}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
        style={{ backgroundColor: primaryColor }}
      >
        Contact Us
      </a>
    </div>
  );
}

/**
 * Shown when `bookingEligible` is true but the calendar config could not be
 * resolved (unknown slug, inactive calendar, or URLs not yet configured).
 * Gives the customer a confident confirmation without exposing the gap.
 */
function CalendarUnavailableView({
  firstName,
  contactUrl = "/contact",
  primaryColor,
}: Pick<BookingHandoffProps, "firstName" | "contactUrl" | "primaryColor">) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-2">
      <div
        className="w-18 h-18 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${primaryColor}18` }}
      >
        <CircleCheckIcon color={primaryColor} />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-2xl font-black text-gray-900 leading-tight">
          Request Received{firstName ? `, ${firstName}` : ""}!
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Good news — your request is in. A member of our team will reach
          out shortly to confirm your appointment time.
        </p>
      </div>

      <div className="border-t border-gray-100 w-full" />

      <div className="rounded-xl bg-gray-50 border border-gray-200 px-5 py-5 text-left w-full space-y-2 max-w-sm">
        <p className="text-sm font-semibold text-gray-800">
          What to expect
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          We&rsquo;ll review your details and follow up to lock in a time
          that works for you — no extra steps on your end.
        </p>
        <a
          href={contactUrl}
          className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-2 transition-opacity hover:opacity-70 mt-1"
          style={{ color: primaryColor }}
        >
          Need something sooner? Contact us
        </a>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-left w-full max-w-sm">
        <PhoneCallIcon />
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-semibold">Need help before we follow up?</span>{" "}
          Call or text us and we&rsquo;ll take care of you right away.
        </p>
      </div>
    </div>
  );
}

/**
 * Shown when `bookingEligible` is true.
 * Displays the personalised greeting, the calendar section, and an urgent-
 * contact fallback note.
 */
function BookingEligibleView({
  firstName,
  calendarTitle,
  calendarDescription,
  embedUrl,
  bookingUrl,
  contactUrl,
  bookingMode = "embed",
  iframeId,
  primaryColor,
}: Pick<
  BookingHandoffProps,
  | "firstName"
  | "calendarTitle"
  | "calendarDescription"
  | "embedUrl"
  | "bookingUrl"
  | "contactUrl"
  | "bookingMode"
  | "iframeId"
  | "primaryColor"
>) {
  return (
    <div className="space-y-6">
      {/* ── Confirmation header ───────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center gap-4 pt-2">
        <div
          className="w-18 h-18 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}18` }}
        >
          <CircleCheckIcon color={primaryColor} />
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h2 className="text-2xl font-black text-gray-900 leading-tight">
            Great — you&rsquo;re all set{firstName ? `, ${firstName}` : ""}!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            We received your request. Go ahead and choose a time that works
            for you — we&rsquo;ll have a technician ready.
          </p>
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100" />

      {/* ── Calendar / redirect section ────────────────────────────────── */}
      <div className="space-y-3">
        {bookingMode === "redirect" ? (
          <BookingRedirectSection
            calendarTitle={calendarTitle}
            calendarDescription={calendarDescription}
            bookingUrl={bookingUrl}
            contactUrl={contactUrl}
            primaryColor={primaryColor}
          />
        ) : (
          <>
            <div>
              <h3 className="text-base font-bold text-gray-900">{calendarTitle}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{calendarDescription}</p>
            </div>
            <CalendarEmbed
              title={calendarTitle}
              embedUrl={embedUrl}
              bookingUrl={bookingUrl}
              contactUrl={contactUrl}
              iframeId={iframeId ?? undefined}
              primaryColor={primaryColor}
            />
          </>
        )}
      </div>

      {/* ── Urgent-contact note ───────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
        <PhoneCallIcon />
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-semibold">
            Issue getting worse before your appointment?
          </span>{" "}
          Don&rsquo;t wait — reach out directly and we&rsquo;ll move you up.
        </p>
      </div>
    </div>
  );
}

/**
 * Shown when `bookingEligible` is false.
 * A softer "we'll follow up" confirmation so the customer knows their request
 * was received even though online booking isn't available for their situation.
 */
function FollowUpView({
  firstName,
  primaryColor,
}: Pick<BookingHandoffProps, "firstName" | "primaryColor">) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div
        className="w-18 h-18 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${primaryColor}18` }}
      >
        <UserIcon color={primaryColor} />
      </div>

      <div className="space-y-2 max-w-sm">
        <h2 className="text-2xl font-black text-gray-900 leading-tight">
          We&rsquo;ve Got Your Request
          {firstName ? `, ${firstName}` : ""}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your service request is in. Someone from our team will review the
          details and reach out to confirm your appointment.
        </p>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-left w-full max-w-sm">
        <PhoneCallIcon />
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-semibold">Need help before we follow up?</span>{" "}
          Call or text us and we&rsquo;ll get you sorted right away.
        </p>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Booking handoff screen shown after a successful service request submission.
 *
 * When `bookingEligible` is true, it renders a personalised confirmation and
 * the inline calendar widget (or a "open in new tab" fallback).
 * When false, it renders a softer "we'll follow up" card.
 *
 * **Not yet wired into `ServiceRequestForm`** — use this component
 * independently until integration is ready.
 *
 * @example
 * ```tsx
 * const calendar = resolveCalendar(bookingDecision.assignedCalendar);
 *
 * <BookingHandoff
 *   firstName={formData.firstName}
 *   bookingEligible={bookingDecision.bookingEligible}
 *   assignedCalendar={bookingDecision.assignedCalendar}
 *   calendarTitle={calendar?.title ?? "Schedule Your Visit"}
 *   calendarDescription={calendar?.description ?? "Choose a time that works for you."}
 *   embedUrl={calendar?.embedUrl}
 *   bookingUrl={calendar?.bookingUrl}
 *   primaryColor={primaryColor}
 *   accentColor={accentColor}
 * />
 * ```
 */
export function BookingHandoff({
  firstName,
  bookingEligible,
  calendarResolved = true,
  bookingMode = "embed",
  calendarTitle,
  calendarDescription,
  embedUrl,
  bookingUrl,
  contactUrl,
  iframeId,
  primaryColor,
  accentColor,
}: BookingHandoffProps) {
  // Determine which inner view to render:
  // 1. bookingEligible + calendar found → show embed / booking CTA
  // 2. bookingEligible + calendar missing → graceful calendar-unavailable fallback
  // 3. !bookingEligible → soft follow-up confirmation
  const view =
    bookingEligible && calendarResolved
      ? "booking"
      : bookingEligible && !calendarResolved
        ? "calendar-unavailable"
        : "followup";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10 w-full max-w-2xl mx-auto"
      role="status"
      aria-live="polite"
    >
      {view === "booking" && (
        <BookingEligibleView
          firstName={firstName}
          calendarTitle={calendarTitle}
          calendarDescription={calendarDescription}
          embedUrl={embedUrl}
          bookingUrl={bookingUrl}
          contactUrl={contactUrl}
          bookingMode={bookingMode}
          iframeId={iframeId}
          primaryColor={primaryColor}
        />
      )}
      {view === "calendar-unavailable" && (
        <CalendarUnavailableView
          firstName={firstName}
          contactUrl={contactUrl}
          primaryColor={primaryColor}
        />
      )}
      {view === "followup" && (
        <FollowUpView firstName={firstName} primaryColor={primaryColor} />
      )}
    </motion.div>
  );
}
