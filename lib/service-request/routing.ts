/**
 * Routing flag computation for processed service requests.
 *
 * Pure functions — no I/O, no side-effects, fully unit-testable.
 * All business logic that decides how a submission is routed lives here.
 */
import type { ServiceRequestPayload } from "./types";
import type { RoutingFlags, BookingDecision } from "./types";
import { MIN_HUMAN_ELAPSED_MS } from "@/lib/spam/service-request";

// ── spamScore ─────────────────────────────────────────────────────────────────

/**
 * Compute a 0–100 spam score from server-observable signals.
 * The client already evaluated honeypot + timing; this layer adds
 * content-quality signals that are only assessable after normalization.
 */
function computeSpamScore(payload: ServiceRequestPayload): number {
  let score = 0;

  // Timing suspicion forwarded from client
  if (payload.spam.isSuspicious) score += 35;

  // Extra timing check (server re-derives in case client was tampered with)
  if (
    typeof payload.spam.elapsedMs === "number" &&
    payload.spam.elapsedMs < MIN_HUMAN_ELAPSED_MS
  ) {
    score += 35;
  }

  // Vague "other" service with no follow-up text
  if (payload.serviceCategory === "other" && !payload.serviceCategoryOther) {
    score += 10;
  }

  // Vague "other" issue with no follow-up text
  if (payload.issueType === "other" && !payload.issueOther) {
    score += 10;
  }

  // Suspiciously short free-text entries (< 3 chars after trim)
  if (payload.serviceCategory === "other" && payload.serviceCategoryOther.length < 3) {
    score += 8;
  }
  if (payload.issueType === "other" && payload.issueOther.length < 3) {
    score += 8;
  }

  // Cap at 100
  return Math.min(score, 100);
}

// ── submissionQuality ─────────────────────────────────────────────────────────

/**
 * Score the completeness / specificity of the submission.
 * Higher score = more complete.
 */
function computeQualityScore(payload: ServiceRequestPayload): number {
  let score = 0;

  // Optional but valuable contact fields
  if (payload.email) score += 1;
  if (payload.addressState) score += 1;
  if (payload.addressZip) score += 1;

  // Specific scheduling (not "flexible" or "asap")
  if (payload.schedulingPreference !== "flexible" && payload.schedulingPreference !== "asap") {
    score += 1;
  }

  // Access questions answered
  if (payload.someoneHome !== "") score += 1;

  // No ambiguous "other" responses
  if (payload.serviceCategory !== "other") score += 1;
  if (payload.issueType !== "other") score += 1;

  return score;
}

function deriveSubmissionQuality(
  qualityScore: number,
  spamScore: number,
): RoutingFlags["submissionQuality"] {
  // Suspicious timing automatically downgrades quality
  if (spamScore >= 30) return "low";
  if (qualityScore >= 5) return "high";
  if (qualityScore >= 2) return "medium";
  return "low";
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Derive all routing flags from a normalized ServiceRequestPayload.
 * Call this after normalization and field validation.
 */
export function computeRoutingFlags(payload: ServiceRequestPayload): RoutingFlags {
  const isUrgent = payload.urgency === "urgent";
  const isCommercial = payload.propertyType === "commercial";
  const spamScore = computeSpamScore(payload);

  const hasVagueCategory =
    payload.serviceCategory === "other" || payload.issueType === "other";

  const needsHumanReview =
    isCommercial ||
    hasVagueCategory ||
    isUrgent ||       // urgent → human callback, not auto-routed
    spamScore >= 30;  // suspicious → flag for review before acting

  // bookingEligible: suitable for automated online booking slot assignment.
  // Requires: non-urgent, residential, known service category, not ASAP,
  // and the job type is one that can realistically be pre-scheduled.
  const bookingEligible =
    !isUrgent &&
    !isCommercial &&
    payload.serviceCategory !== "other" &&
    payload.serviceCategory !== "new-system" && // new-system needs a quote call
    payload.urgency !== "quote" &&
    payload.schedulingPreference !== "asap" &&
    spamScore < 30;

  const qualityScore = computeQualityScore(payload);
  const submissionQuality = deriveSubmissionQuality(qualityScore, spamScore);

  return {
    isUrgent,
    isCommercial,
    needsHumanReview,
    bookingEligible,
    spamScore,
    submissionQuality,
  };
}

// ── Booking decision (API response layer) ─────────────────────────────────────

/**
 * Derive the BookingDecision shape returned in the API response.
 * Translates internal RoutingFlags + payload into the simplified
 * consumer-facing shape: priority, assignedFlow, assignedCalendar.
 *
 * Pure function — no side effects.
 */
export function computeBookingDecision(
  payload: ServiceRequestPayload,
  flags: RoutingFlags,
): BookingDecision {
  // ── assignedCalendar ───────────────────────────────────────────────────────
  // Only set when booking is actually eligible; null otherwise.
  let assignedCalendar: BookingDecision["assignedCalendar"] = null;
  if (flags.bookingEligible) {
    if (payload.serviceCategory === "maintenance") {
      assignedCalendar = "tune-up";
    } else if (
      payload.serviceCategory === "ac-repair" ||
      payload.serviceCategory === "heating-repair" ||
      payload.serviceCategory === "thermostat-airflow" ||
      payload.serviceCategory === "air-quality"
    ) {
      assignedCalendar = "standard-diagnostic";
    }
    // "new-system" and "other" are already excluded from bookingEligible,
    // so no calendar fallback is needed here.
  }

  // ── priority ───────────────────────────────────────────────────────────────
  let priority: BookingDecision["priority"];
  if (flags.isUrgent || flags.isCommercial) {
    priority = "high";
  } else if (
    payload.urgency === "preventative" ||
    payload.serviceCategory === "maintenance" ||
    payload.urgency === "quote"
  ) {
    priority = "low";
  } else {
    priority = "normal";
  }

  // ── assignedFlow ───────────────────────────────────────────────────────────
  let assignedFlow: BookingDecision["assignedFlow"];
  if (flags.isUrgent) {
    assignedFlow = "urgent-callback";
  } else if (flags.isCommercial) {
    assignedFlow = "commercial-intake";
  } else if (flags.bookingEligible) {
    assignedFlow = "booking";
  } else if (flags.needsHumanReview) {
    assignedFlow = "human-review";
  } else {
    assignedFlow = "follow-up";
  }

  return {
    bookingEligible: flags.bookingEligible,
    assignedCalendar,
    needsHumanReview: flags.needsHumanReview,
    priority,
    assignedFlow,
  };
}
