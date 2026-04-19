/**
 * GHL routing decision engine for HVAC service request intake.
 *
 * `determineRouting()` is the single source of truth for:
 *   - which tags to apply in GHL
 *   - which pipeline stage the opportunity should land in
 *   - what fields to write to the GHL opportunity record
 *
 * Design principles:
 * - Early returns keep each branch self-contained and easy to trace
 * - Only the six permitted tags below are ever emitted — nothing else
 * - No conditional nesting beyond one level
 * - To add a new rule: insert a new early-return block with a comment
 */

import type { ServiceRequestPayload } from "./types";

// ── Allowed tags ──────────────────────────────────────────────────────────────
// This is the exhaustive list. No tag outside this union will ever be returned.

export type LeadTag =
  | "website-intake"
  | "booking-eligible"
  | "needs-human-review"
  | "urgent"
  | "estimate-lead"
  | "commercial";

// ── Output types ──────────────────────────────────────────────────────────────

/** Fields written to the GHL opportunity record. */
export interface RoutingOpportunity {
  serviceCategory: string;
  issueType: string;
  urgencyLevel: string;
  propertyType: string;
  /** Free-text description from the customer (maps to `issueOther`). */
  issueNote: string;
}

/** Complete GHL routing decision returned by `determineRouting()`. */
export interface RoutingOutput {
  /** Tags applied to the GHL contact — limited to `LeadTag`. */
  tags: LeadTag[];
  /** Pipeline stage name the opportunity is placed in. */
  targetStage: string;
  /** Opportunity record fields. */
  opportunity: RoutingOpportunity;
}

// ── Routing engine ────────────────────────────────────────────────────────────

/**
 * Determines GHL tags, pipeline stage, and opportunity fields for a validated
 * service request. Uses early returns so each routing branch is isolated.
 *
 * Decision order:
 *   A. Base tag   — website-intake is always added
 *   B. Commercial — propertyType === "commercial"
 *   C. Urgent     — urgency === "urgent"
 *   D. Estimate   — urgency === "quote" || serviceCategory === "new-system"
 *   E. Booking    — residential, non-urgent, non-quote, known issue type
 *   F. Fallback   — anything that didn't match above
 *
 * @example
 * const ghlRouting = determineRouting(payload);
 * // → { tags: ["booking-eligible", "website-intake"], targetStage: "New Request", ... }
 */
export function determineRouting(payload: ServiceRequestPayload): RoutingOutput {
  const { serviceCategory, issueType, urgency, propertyType, issueOther } = payload;

  // Opportunity fields are identical regardless of which branch is taken.
  const opportunity: RoutingOpportunity = {
    serviceCategory,
    issueType: issueType || "",
    urgencyLevel: urgency,
    propertyType,
    issueNote: issueOther || "",
  };

  // A. Base tag — present on every submission from this form.
  const base: LeadTag[] = ["website-intake"];

  // B. COMMERCIAL ─────────────────────────────────────────────────────────────
  // Commercial jobs always need a human to scope the work before booking.
  if (propertyType === "commercial") {
    return {
      tags: [...base, "commercial", "needs-human-review"],
      targetStage: "New Request",
      opportunity,
    };
  }

  // C. URGENT ─────────────────────────────────────────────────────────────────
  // Urgent residential requests skip the booking queue and go straight to
  // dispatch. A human must call the customer within the hour.
  if (urgency === "urgent") {
    return {
      tags: [...base, "urgent", "needs-human-review"],
      targetStage: "Urgent - Dispatch",
      opportunity,
    };
  }

  // D. ESTIMATE ───────────────────────────────────────────────────────────────
  // Pricing inquiries and new-system requests need a quote before scheduling.
  // "new-system" uses the internal enum value (form value: "new-system").
  const isEstimate = urgency === "quote" || serviceCategory === "new-system";
  if (isEstimate) {
    return {
      tags: [...base, "estimate-lead", "needs-human-review"],
      targetStage: "Estimate Needed",
      opportunity,
    };
  }

  // E. BOOKING ELIGIBLE ───────────────────────────────────────────────────────
  // A residential request is self-schedulable when we have enough detail to
  // route it to the right calendar without human triage. "other" issue type
  // means we don't have enough detail yet.
  const isKnownIssue = !!issueType && issueType !== "other";
  // Note: urgency === "urgent", urgency === "quote", and serviceCategory === "new-system"
  // are all already eliminated by the early returns above (branches C and D).
  const isBookingEligible = propertyType === "residential" && isKnownIssue;

  if (isBookingEligible) {
    return {
      tags: [...base, "booking-eligible"],
      targetStage: "New Request",
      opportunity,
    };
  }

  // F. FALLBACK ────────────────────────────────────────────────────────────────
  // Catches anything that didn't cleanly match above — vague issue type,
  // unexpected field combinations, etc. A human reviews before acting.
  return {
    tags: [...base, "needs-human-review"],
    targetStage: "New Request",
    opportunity,
  };
}
