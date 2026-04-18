/**
 * Lead tag generation for GHL and downstream automation.
 *
 * Tags are the primary signal GHL workflows use to branch, assign, and
 * prioritize. All logic lives here — the API route and webhook caller simply
 * pass in the data they already have and forward the resulting array.
 *
 * Tag format rules (enforced by `sanitizeTag`):
 * - lowercase
 * - kebab-case (spaces and underscores → hyphens)
 * - trimmed
 * - deduplicated before returning
 *
 * To add a new rule: append a block below and add the tag string. No other
 * files need to change.
 */

import type { ServiceRequestPayload } from "./types";
import type { RoutingFlags } from "./types";
import type { BookingDecision } from "./types";

// Spam scores at or above this value are flagged for review.
// Must stay in sync with the threshold used in routing.ts.
const SPAM_REVIEW_THRESHOLD = 30;

// ── Sanitizer ─────────────────────────────────────────────────────────────────

/**
 * Normalizes a raw tag string to lowercase kebab-case.
 * Strips leading/trailing whitespace and collapses spaces/underscores to `-`.
 */
function sanitizeTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
}

// ── Builder ───────────────────────────────────────────────────────────────────

/**
 * Builds the complete, deduplicated tag array for a validated service request.
 *
 * @param payload  - Normalized, server-validated form data.
 * @param flags    - Computed routing flags (spam score, quality, booking eligibility).
 * @param decision - High-level booking decision (calendar, priority, human review).
 * @returns A sorted, deduplicated array of kebab-case tag strings.
 *
 * @example
 * const tags = buildLeadTags(payload, routingFlags, bookingDecision);
 * // → ["ac-repair", "booking-eligible", "calendar-standard-diagnostic", "hvac-lead", ...]
 */
export function buildLeadTags(
  payload: ServiceRequestPayload,
  flags: RoutingFlags,
  decision: BookingDecision,
): string[] {
  const raw: string[] = [];

  // ── Identity tags — always present ────────────────────────────────────────
  // Every submission from this form gets these three so GHL can filter by
  // source and type without relying on field-level queries.
  raw.push("hvac-lead", "website-intake", "service-request");

  // ── Urgency ───────────────────────────────────────────────────────────────
  // Maps the internal urgency enum to customer-facing dispatch signals.
  switch (payload.urgency) {
    case "urgent":
      // Fast-track dispatch; also triggers needs-dispatch so GHL workflows
      // can route to an on-call technician immediately.
      raw.push("urgent", "needs-dispatch");
      break;
    case "soon":
      // "Soon" is the standard non-urgent residential request.
      raw.push("non-urgent");
      break;
    case "quote":
      // Pricing inquiry — no dispatch needed yet.
      raw.push("quote-request");
      break;
    case "preventative":
      // Maintenance / tune-up intent; lower dispatch priority.
      raw.push("maintenance-intent");
      break;
  }

  // ── Property type ─────────────────────────────────────────────────────────
  switch (payload.propertyType) {
    case "residential":
      raw.push("residential");
      break;
    case "commercial":
      // Commercial always needs a human to scope the work before booking.
      raw.push("commercial", "needs-human-review");
      break;
  }

  // ── Service category ──────────────────────────────────────────────────────
  // Maps each service enum to one or more descriptive tags. Multi-tag entries
  // signal that additional downstream actions are needed (e.g. human review).
  switch (payload.serviceCategory) {
    case "ac-repair":
      raw.push("ac-repair");
      break;
    case "heating-repair":
      raw.push("heating-repair");
      break;
    case "maintenance":
      raw.push("maintenance");
      break;
    case "new-system":
      // New system estimates always need a human to quote scope and cost.
      raw.push("new-system-estimate", "estimate-lead", "needs-human-review");
      break;
    case "thermostat-airflow":
      raw.push("thermostat-airflow");
      break;
    case "air-quality":
      raw.push("indoor-air-quality");
      break;
    case "other":
      // Vague category — route to human before acting.
      raw.push("other-service");
      break;
  }

  // ── Booking / routing decision ────────────────────────────────────────────
  // Reflects the server's routing outcome so GHL workflows can branch
  // without re-evaluating the same logic.
  if (decision.bookingEligible) {
    raw.push("booking-eligible");
  } else {
    raw.push("manual-followup");
  }

  if (decision.needsHumanReview) {
    raw.push("needs-human-review");
  }

  if (decision.priority === "high") {
    raw.push("high-priority");
  }

  // ── Calendar assignment ───────────────────────────────────────────────────
  // Tells GHL which calendar this lead was routed to so appointment
  // confirmation workflows can reference it.
  if (decision.assignedCalendar === "standard-diagnostic") {
    raw.push("calendar-standard-diagnostic");
  } else if (decision.assignedCalendar === "tune-up") {
    raw.push("calendar-tune-up");
  }

  // ── Submission quality / spam ─────────────────────────────────────────────
  if (flags.submissionQuality === "low") {
    // Low clarity submissions need extra validation before acting.
    raw.push("low-clarity");
  }

  if (flags.spamScore >= SPAM_REVIEW_THRESHOLD) {
    // Score met or exceeded the suspicious threshold — flag for manual review.
    raw.push("spam-review");
  }

  // ── Deduplicate, sanitize, and sort ───────────────────────────────────────
  // Sorting makes the array deterministic and easy to compare in tests/logs.
  return [...new Set(raw.map(sanitizeTag))].sort();
}
