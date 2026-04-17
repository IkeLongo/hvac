/**
 * Normalization logic for raw service request form data.
 *
 * Converts the raw client payload into the canonical ServiceRequestPayload
 * shape: trims whitespace, coerces types, fills defaults, and strips fields
 * that are not applicable given the user's selections.
 */
import { formatPhoneNumber } from "@/lib/utils/validation";
import type { ServiceRequestFormData } from "@/app/components/service-request/types";
import type { SpamMetadata } from "@/lib/spam/service-request";
import {
  SERVICE_CATEGORIES,
  URGENCY_LEVELS,
  PROPERTY_TYPES,
  SCHEDULING_PREFERENCES,
  type ServiceRequestPayload,
} from "./types";

// ── String helpers ────────────────────────────────────────────────────────────

function trim(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isOneOf<T extends string>(val: string, allowed: readonly T[]): val is T {
  return (allowed as readonly string[]).includes(val);
}

function normalizeYesNo(v: unknown): "" | "yes" | "no" {
  if (v === "yes" || v === "no") return v;
  return "";
}

/**
 * Sanitize a free-text string:
 * 1. Strip HTML/XML tags so injected markup can't propagate to CRM or email.
 * 2. Collapse runs of whitespace into a single space.
 * 3. Remove ASCII control characters (except tab/newline).
 * 4. Truncate to maxLength to prevent payload bloat.
 */
export function sanitizeText(raw: unknown, maxLength = 500): string {
  const s = trim(raw);
  return s
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
    .replace(/\s+/g, " ")             // normalize whitespace
    .trim()
    .slice(0, maxLength);
}

/** Sanitize a short single-line field (name, city, street, etc.). */
function sanitizeLine(raw: unknown, maxLength = 100): string {
  return sanitizeText(raw, maxLength)
    .replace(/[\r\n\t]/g, " ")        // no line breaks in single-line fields
    .trim();
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Normalize raw form data + spam metadata into a ServiceRequestPayload.
 * Throws a descriptive Error if any value is so malformed it can't be coerced.
 * (Structural / type issues are caught here; field validation is done separately.)
 */
export function normalizeServiceRequest(
  raw: ServiceRequestFormData,
  spam: SpamMetadata,
): ServiceRequestPayload {
  // ── Service category ────────────────────────────────────────────────────────
  const serviceCategory = trim(raw.serviceCategory);
  if (!isOneOf(serviceCategory, SERVICE_CATEGORIES)) {
    throw new Error(`Unknown serviceCategory: "${serviceCategory}"`);
  }

  const serviceCategoryOther =
    serviceCategory === "other" ? sanitizeText(raw.serviceCategoryOther, 300) : "";

  // ── Urgency ─────────────────────────────────────────────────────────────────
  const urgency = trim(raw.urgency);
  if (!isOneOf(urgency, URGENCY_LEVELS)) {
    throw new Error(`Unknown urgency: "${urgency}"`);
  }

  // ── Property type ───────────────────────────────────────────────────────────
  const propertyType = trim(raw.propertyType);
  if (!isOneOf(propertyType, PROPERTY_TYPES)) {
    throw new Error(`Unknown propertyType: "${propertyType}"`);
  }

  // ── Issue ───────────────────────────────────────────────────────────────────
  const issueType = trim(raw.issueType);
  const issueOther = issueType === "other" ? sanitizeText(raw.issueOther, 300) : "";

  // ── Scheduling ──────────────────────────────────────────────────────────────
  const schedulingPreference = trim(raw.schedulingPreference);
  if (!isOneOf(schedulingPreference, SCHEDULING_PREFERENCES)) {
    throw new Error(`Unknown schedulingPreference: "${schedulingPreference}"`);
  }

  // ── Contact ─────────────────────────────────────────────────────────────────
  const phone = formatPhoneNumber(trim(raw.phone));

  return {
    serviceCategory,
    serviceCategoryOther,
    urgency,
    propertyType,
    issueType,
    issueOther,
    schedulingPreference,
    someoneHome: normalizeYesNo(raw.someoneHome),
    petsAtProperty: normalizeYesNo(raw.petsAtProperty),
    hasGateCode: normalizeYesNo(raw.hasGateCode),
    firstName: sanitizeLine(raw.firstName, 60),
    lastName: sanitizeLine(raw.lastName, 60),
    phone,
    addressStreet: sanitizeLine(raw.addressStreet, 120),
    addressCity: sanitizeLine(raw.addressCity, 80),
    addressState: sanitizeLine(raw.addressState, 2).toUpperCase(),
    addressZip: trim(raw.addressZip).replace(/\D/g, "").slice(0, 5),
    email: sanitizeLine(raw.email, 200).toLowerCase(),
    spam,
  };
}
