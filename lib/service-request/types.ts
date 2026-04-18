/**
 * Shared types for the Service Request API layer.
 *
 * These are intentionally separate from the front-end's ServiceRequestFormData:
 * - FormData is what the UI tracks (mutable, step-by-step, UI-specific)
 * - ServiceRequestPayload is the normalized, validated shape that moves across
 *   the API boundary and into downstream services (GHL, DB, webhooks, etc.)
 */

import type { SpamMetadata } from "@/lib/spam/service-request";

// ── Allowed enum values ───────────────────────────────────────────────────────

export const SERVICE_CATEGORIES = [
  "ac-repair",
  "heating-repair",
  "maintenance",
  "new-system",
  "thermostat-airflow",
  "air-quality",
  "other",
] as const;

export const URGENCY_LEVELS = [
  "urgent",
  "soon",
  "quote",
  "preventative",
] as const;

export const PROPERTY_TYPES = [
  "residential",
  "commercial",
] as const;

export const SCHEDULING_PREFERENCES = [
  "asap",
  "morning",
  "afternoon",
  "evening",
  "flexible",
] as const;

export const YES_NO_VALUES = ["yes", "no", ""] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
export type UrgencyLevel = (typeof URGENCY_LEVELS)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type SchedulingPreference = (typeof SCHEDULING_PREFERENCES)[number];
export type YesNo = "yes" | "no" | "";

// ── Normalized payload ────────────────────────────────────────────────────────

/** The normalized, server-validated representation of a service request. */
export interface ServiceRequestPayload {
  /** Service category selected by the user. */
  serviceCategory: ServiceCategory;
  /** Filled only when serviceCategory === "other". */
  serviceCategoryOther: string;
  urgency: UrgencyLevel;
  propertyType: PropertyType;
  /** The specific issue type chosen on step 4. */
  issueType: string;
  /** Filled only when issueType === "other". */
  issueOther: string;
  schedulingPreference: SchedulingPreference;
  someoneHome: YesNo;
  petsAtProperty: YesNo;
  hasGateCode: YesNo;
  firstName: string;
  lastName: string;
  /** Formatted as "(xxx) xxx-xxxx" after normalization. */
  phone: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  /** Optional — empty string when not provided. */
  email: string;
  /** Anti-spam metadata captured by the client. */
  spam: SpamMetadata;
}

// ── Routing flags ─────────────────────────────────────────────────────────────

/**
 * Computed server-side flags derived from the normalized payload.
 * Drive downstream routing: which queue, whether to auto-book, whether to flag.
 */
export interface RoutingFlags {
  /** True when urgency === "urgent". Fast-track this lead. */
  isUrgent: boolean;
  /** True when propertyType === "commercial". Route to commercial team. */
  isCommercial: boolean;
  /**
   * True when the submission has signals requiring human review before action:
   * commercial request, vague "other" categories, suspicious timing, etc.
   */
  needsHumanReview: boolean;
  /**
   * True when this submission is a good candidate for online booking.
   * False for urgent jobs (need callback), commercial (need quote), and "other"
   * service categories (need clarification).
   */
  bookingEligible: boolean;
  /**
   * 0–100 integer. Combines client-side signals (isSuspicious) with
   * server-side signals (vague inputs, improbable field combinations).
   * 0 = clean, 100 = certain spam.
   */
  spamScore: number;
  /**
   * Coarse quality signal for the submission completeness.
   * "high"   → email + full address + no ambiguous "other" fields
   * "medium" → passes validation but some optional fields missing
   * "low"    → suspicious timing or multiple vague responses
   */
  submissionQuality: "high" | "medium" | "low";
}

/**
 * The fully processed result: normalized form data + computed routing flags.
 * This is the shape passed to downstream services (GHL, DB, webhooks).
 */
export interface ProcessedServiceRequest {
  payload: ServiceRequestPayload;
  routing: RoutingFlags;
}

// ── Booking decision ──────────────────────────────────────────────────────────

/**
 * High-level booking routing decision returned in every successful API response.
 * Drives front-end confirmation messaging and downstream automation entry points.
 */
export interface BookingDecision {
  /** True when the submission can be auto-booked without human intervention. */
  bookingEligible: boolean;
  /**
   * Which calendar to book against, or null when booking is not applicable.
   * - "tune-up"             → maintenance / preventative service
   * - "standard-diagnostic" → repair, thermostat, airflow, air-quality
   */
  assignedCalendar: "tune-up" | "standard-diagnostic" | null;
  /** True when a team member should review before taking automated action. */
  needsHumanReview: boolean;
  /**
   * Dispatch priority tier.
   * - "high"   → urgent or commercial
   * - "normal" → standard residential service call
   * - "low"    → preventative / maintenance / quote with flexible timing
   */
  priority: "low" | "normal" | "high";
  /**
   * The automation flow this lead should enter.
   * - "booking"          → offer self-scheduling
   * - "urgent-callback"  → call customer within the hour
   * - "commercial-intake"→ route to commercial sales queue
   * - "human-review"     → hold for triage before acting
   * - "follow-up"        → team follows up to confirm window
   */
  assignedFlow: "booking" | "urgent-callback" | "commercial-intake" | "human-review" | "follow-up";
}

// ── API response shapes ───────────────────────────────────────────────────────

export interface ServiceRequestSuccessResponse {
  success: true;
  message: string;
  data: {
    /** Sanitized, normalized form data — safe to log and forward downstream. */
    normalizedLead: Omit<ServiceRequestPayload, "spam">;
    routing: BookingDecision;
    /** Deduplicated, kebab-case tags computed server-side for GHL and automation. */
    tags: string[];
  };
}

export interface ServiceRequestErrorResponse {
  success: false;
  code: "VALIDATION_ERROR" | "SPAM" | "BAD_REQUEST" | "INTERNAL_ERROR";
  message: string;
  /** Field-level validation errors when code === "VALIDATION_ERROR". */
  fieldErrors?: Partial<Record<string, string>>;
}

export type ServiceRequestResponse =
  | ServiceRequestSuccessResponse
  | ServiceRequestErrorResponse;
