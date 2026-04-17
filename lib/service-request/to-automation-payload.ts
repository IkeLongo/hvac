/**
 * Transforms a validated, normalized ServiceRequestPayload + RoutingFlags into
 * the standardized AutomationPayload used by all downstream integrations.
 *
 * This is the single point where internal API shapes become the external
 * contract. Add field mappings here; never scatter them across integrations.
 *
 * Usage:
 *   import { toAutomationPayload } from "@/lib/service-request/to-automation-payload";
 *   const automation = toAutomationPayload(payload, routing);
 *   // → ready to send to GHL, webhook, DB, etc.
 */
import type { ServiceRequestPayload, RoutingFlags } from "./types";
import type {
  AutomationPayload,
  AutomationAccess,
  AutomationContact,
  AutomationLocation,
  AutomationAntiSpam,
  AutomationRouting,
} from "./automation-payload";

// ── Sub-object builders ───────────────────────────────────────────────────────

function buildContact(p: ServiceRequestPayload): AutomationContact {
  return {
    firstName: p.firstName,
    lastName: p.lastName,
    fullName: `${p.firstName} ${p.lastName}`.trim(),
    phone: p.phone,
    email: p.email || null,
  };
}

function buildLocation(p: ServiceRequestPayload): AutomationLocation {
  const parts = [
    p.addressStreet,
    p.addressCity,
    p.addressState && p.addressZip
      ? `${p.addressState} ${p.addressZip}`
      : p.addressState || p.addressZip,
  ].filter(Boolean);

  return {
    street: p.addressStreet,
    city: p.addressCity,
    state: p.addressState,
    zip: p.addressZip,
    formatted: parts.length > 0 ? parts.join(", ") : null,
  };
}

function buildAccess(p: ServiceRequestPayload): AutomationAccess {
  return {
    someoneHome: p.someoneHome || null,
    petsAtProperty: p.petsAtProperty || null,
    hasGateCode: p.hasGateCode || null,
  };
}

function buildAntiSpam(p: ServiceRequestPayload): AutomationAntiSpam {
  return {
    formStartedAt: p.spam.formStartedAt,
    submittedAt: p.spam.submittedAt,
    elapsedMs: p.spam.elapsedMs,
    honeypotFilled: p.spam.honeypotFilled,
    isSpam: p.spam.isSpam,
    isSuspicious: p.spam.isSuspicious,
  };
}

// ── Routing derivation ────────────────────────────────────────────────────────

function buildRouting(flags: RoutingFlags): AutomationRouting {
  const { isUrgent, isCommercial, needsHumanReview, bookingEligible, spamScore } = flags;

  // Priority tier
  let priority: AutomationRouting["priority"];
  if (isUrgent && !isCommercial) {
    priority = "emergency";
  } else if (isUrgent || isCommercial) {
    priority = "high";
  } else if (needsHumanReview) {
    priority = "review";
  } else {
    priority = "standard";
  }

  // Assigned automation flow
  let assignedFlow: AutomationRouting["assignedFlow"];
  if (spamScore >= 60) {
    assignedFlow = "manual-review";
  } else if (isUrgent) {
    assignedFlow = "urgent-callback";
  } else if (isCommercial) {
    assignedFlow = "commercial-intake";
  } else if (bookingEligible) {
    assignedFlow = "residential-booking";
  } else if (needsHumanReview) {
    assignedFlow = "manual-review";
  } else {
    assignedFlow = "residential-followup";
  }

  // CRM pipeline stage
  let pipelineStage: AutomationRouting["pipelineStage"];
  if (needsHumanReview && (spamScore >= 30 || spamScore >= 60)) {
    pipelineStage = "Flagged - Review";
  } else if (isUrgent) {
    pipelineStage = "New - Urgent";
  } else if (isCommercial) {
    pipelineStage = "New - Commercial";
  } else if (bookingEligible) {
    pipelineStage = "New - Booking Eligible";
  } else {
    pipelineStage = "New - Follow Up";
  }

  return {
    priority,
    assignedFlow,
    pipelineStage,
    bookingEligible,
    needsHumanReview,
    spamScore,
    submissionQuality: flags.submissionQuality,
  };
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Convert a validated ServiceRequestPayload + RoutingFlags into the
 * standardized AutomationPayload used by all downstream integrations.
 *
 * Pure function — no side effects, no I/O.
 * Call this immediately before handing off to any webhook / CRM sender.
 */
export function toAutomationPayload(
  payload: ServiceRequestPayload,
  routing: RoutingFlags,
): AutomationPayload {
  return {
    submittedAt: new Date().toISOString(),
    source: "web-form",

    serviceCategory: payload.serviceCategory,
    serviceCategoryNote:
      payload.serviceCategory === "other" ? payload.serviceCategoryOther || null : null,

    urgency: payload.urgency,
    propertyType: payload.propertyType,

    issueType: payload.issueType || null,
    issueNote:
      payload.issueType === "other" ? payload.issueOther || null : null,

    schedulingPreference: payload.schedulingPreference,

    contact: buildContact(payload),
    location: buildLocation(payload),
    access: buildAccess(payload),
    antiSpam: buildAntiSpam(payload),
    routing: buildRouting(routing),
  };
}
