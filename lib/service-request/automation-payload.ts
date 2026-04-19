/**
 * Standardized internal payload for downstream automation systems.
 *
 * This shape is the single handoff contract between the API route and any
 * external integration: GHL pipelines, webhooks, CRMs, booking APIs, etc.
 *
 * Design goals:
 * - Self-describing keys (no raw enum codes — human-readable labels alongside)
 * - Flat objects for sub-domains (contact, location, access) so they map
 *   directly to CRM field sets without extra transformation at the edge
 * - All optional fields are explicitly typed as `string | null` so downstream
 *   consumers know to check rather than assume presence
 * - Immutable (no setters, no class instance) — plain object, easy to
 *   serialize, log, or forward as-is
 */

import type {
  ServiceRequestPayload,
  RoutingFlags,
  ServiceCategory,
  UrgencyLevel,
  PropertyType,
  SchedulingPreference,
} from "./types";
import type { LeadTag, RoutingOpportunity } from "./determine-routing";

// ── Sub-objects ───────────────────────────────────────────────────────────────

/** Primary contact details for this submission. */
export interface AutomationContact {
  firstName: string;
  lastName: string;
  /** Full name — convenience concat of first + last. */
  fullName: string;
  /** Formatted "(xxx) xxx-xxxx". Always present (required field). */
  phone: string;
  /** Lowercase email, or null when not provided. */
  email: string | null;
}

/** Service address provided by the customer. */
export interface AutomationLocation {
  street: string;
  city: string;
  state: string;
  zip: string;
  /** Single-line formatted address — convenient for CRM single-field inputs. */
  formatted: string | null;
}

/** On-site access logistics. */
export interface AutomationAccess {
  /** "yes" | "no" | null (not answered). */
  someoneHome: "yes" | "no" | null;
  /** "yes" | "no" | null (not answered). */
  petsAtProperty: "yes" | "no" | null;
  /** "yes" | "no" | null (not answered). */
  hasGateCode: "yes" | "no" | null;
}

/** Anti-spam signals forwarded for audit and downstream trust scoring. */
export interface AutomationAntiSpam {
  /** Unix ms timestamp when the form was first loaded. */
  formStartedAt: number;
  /** Unix ms timestamp when Submit was clicked. */
  submittedAt: number;
  /** Elapsed time in milliseconds between form load and submission. */
  elapsedMs: number;
  /** True = honeypot was triggered (high-confidence bot). */
  honeypotFilled: boolean;
  /** True = submission is high-confidence spam (honeypot or combined signals). */
  isSpam: boolean;
  /** True = submission was unusually fast but not conclusively spam. */
  isSuspicious: boolean;
}

/**
 * Routing decisions derived server-side. Drive CRM pipeline assignment,
 * SLA tiers, booking flow eligibility, and escalation rules.
 */
export interface AutomationRouting {
  /**
   * Human-readable priority tier for SLA and dispatch ordering.
   * - "emergency"  → urgency=urgent, dispatch same hour
   * - "high"       → urgent or commercial
   * - "standard"   → normal residential flow
   * - "review"     → flagged for human triage before action
   */
  priority: "emergency" | "high" | "standard" | "review";

  /**
   * The automation flow / sequence this submission should enter.
   * - "urgent-callback"      → call customer within the hour
   * - "commercial-intake"    → route to commercial sales queue
   * - "residential-booking"  → offer self-scheduling link
   * - "residential-followup" → team follows up to confirm window
   * - "manual-review"        → hold for human before taking action
   */
  assignedFlow:
    | "urgent-callback"
    | "commercial-intake"
    | "residential-booking"
    | "residential-followup"
    | "manual-review";

  /**
   * Suggested CRM pipeline stage name.
   * These map to GHL (or equivalent) pipeline stage labels.
   */
  pipelineStage:
    | "New - Urgent"
    | "New - Commercial"
    | "New - Booking Eligible"
    | "New - Follow Up"
    | "Flagged - Review";

  /** True when this submission is a good candidate for automated booking. */
  bookingEligible: boolean;

  /** True when a human should review before taking automated action. */
  needsHumanReview: boolean;

  /** 0–100 spam score. 0 = clean, ≥30 = suspicious, ≥60 = likely spam. */
  spamScore: number;

  /** Coarse quality signal: "high" | "medium" | "low". */
  submissionQuality: "high" | "medium" | "low";
}

// ── Top-level payload ─────────────────────────────────────────────────────────

/**
 * The single, standardized payload handed off to any downstream automation.
 *
 * All fields use readable strings rather than raw enum codes so that
 * webhook payloads, CRM custom fields, and log entries are self-documenting
 * without a lookup table.
 */
export interface AutomationPayload {
  /**
   * ISO 8601 UTC timestamp generated at the moment the API route processes
   * the request. Suitable for "submitted_at" fields in any downstream system.
   */
  submittedAt: string;

  /** Always "web-form" for submissions from this form. Ready for multi-source expansion. */
  source: "web-form";

  /** Raw enum value, e.g. "ac-repair". */
  serviceCategory: ServiceCategory;
  /**
   * Free-text description when serviceCategory === "other".
   * null otherwise.
   */
  serviceCategoryNote: string | null;

  /** Raw urgency enum, e.g. "urgent" | "soon" | "quote" | "preventative". */
  urgency: UrgencyLevel;

  /** Raw property type enum: "residential" | "commercial". */
  propertyType: PropertyType;

  /**
   * Specific issue type key chosen on step 4, e.g. "no-cool", "no-heat".
   * null when step 4 was skipped or not applicable.
   */
  issueType: string | null;

  /**
   * Free-text issue description when issueType === "other".
   * null otherwise.
   */
  issueNote: string | null;

  /** Scheduling window preference. */
  schedulingPreference: SchedulingPreference;

  contact: AutomationContact;
  location: AutomationLocation;
  access: AutomationAccess;
  antiSpam: AutomationAntiSpam;

  /**
   * Internal routing signals (priority, spam score, quality).
   * Kept for logging and debugging; not the primary GHL routing mechanism.
   */
  routing: AutomationRouting;

  /**
   * GHL pipeline stage this lead should be placed in.
   * Set by `determineRouting()` — one of the pre-defined stage names.
   */
  targetStage: string;

  /**
   * Fields written to the GHL opportunity record.
   * Sourced from `determineRouting()` so the webhook always carries the
   * structured data GHL needs to populate custom fields.
   */
  opportunity: RoutingOpportunity;

  /**
   * Tags applied to the GHL contact.
   * Constrained to `LeadTag` — no other values are permitted.
   */
  tags: LeadTag[];
}
