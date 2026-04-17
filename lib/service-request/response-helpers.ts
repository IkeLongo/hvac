/**
 * Client-side helpers for interpreting the /api/service-request response.
 *
 * All functions accept `unknown` so they are safe to call directly on the raw
 * `await res.json()` value without casting in the component.  They encode every
 * structural assumption about the API response shape in one place, keeping
 * React components free of inline type-narrowing noise.
 */

import type { BookingDecision } from "./types";

// ── Type guard ────────────────────────────────────────────────────────────────

/**
 * Narrow an unknown value to a successful API response object.
 * Returns true only when `json.success === true`.
 */
export function isSuccessResponse(
  json: unknown,
): json is { success: true; message: string; data: { routing: BookingDecision | null } } {
  return (
    json !== null &&
    typeof json === "object" &&
    "success" in json &&
    (json as Record<string, unknown>).success === true
  );
}

/**
 * Narrow an unknown value to an error response with a machine-readable `code`.
 */
export function isErrorResponse(
  json: unknown,
): json is { success: false; code: string; message: string; fieldErrors?: Record<string, string> } {
  return (
    json !== null &&
    typeof json === "object" &&
    "success" in json &&
    (json as Record<string, unknown>).success === false &&
    "code" in json
  );
}

// ── Routing decision extractors ───────────────────────────────────────────────

/**
 * Extract the `BookingDecision` from a successful response.
 * Returns `null` for honeypot-blocked submissions (where `data.routing` is null)
 * and for any unexpected shape.
 */
export function getRoutingDecision(json: unknown): BookingDecision | null {
  if (!isSuccessResponse(json)) return null;
  return json.data?.routing ?? null;
}

/**
 * Return the assigned calendar slug, or `null` if not set / not applicable.
 */
export function getAssignedCalendarSlug(
  routing: BookingDecision | null,
): BookingDecision["assignedCalendar"] {
  return routing?.assignedCalendar ?? null;
}

/**
 * Return the routing priority, falling back to `"normal"` when unavailable.
 */
export function getPriority(routing: BookingDecision | null): BookingDecision["priority"] {
  return routing?.priority ?? "normal";
}

/**
 * Return true when the lead should be shown the online booking calendar.
 *
 * Conditions:
 * - bookingEligible is explicitly true
 * - an assignedCalendar slug is present
 * - the client-side spam check did not flag the submission as suspicious
 */
export function isBookingFlow(
  routing: BookingDecision | null,
  isSuspicious: boolean,
): boolean {
  return (
    routing !== null &&
    routing.bookingEligible === true &&
    routing.assignedCalendar !== null &&
    !isSuspicious
  );
}

/**
 * Return true when the lead should be shown the non-booking follow-up screen.
 * This is the complement of `isBookingFlow` for a successful submission.
 */
export function isFollowupFlow(
  routing: BookingDecision | null,
  isSuspicious: boolean,
): boolean {
  return !isBookingFlow(routing, isSuspicious);
}

/**
 * Return true when the submission should be treated as needing human review,
 * falling back to `false` when routing is unavailable.
 */
export function getNeedsHumanReview(routing: BookingDecision | null): boolean {
  return routing?.needsHumanReview ?? false;
}
