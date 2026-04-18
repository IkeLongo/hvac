import { NextResponse } from "next/server";

import type { ServiceRequestFormData } from "@/app/components/service-request/types";
import {
  validateField,
  STEP_FIELDS,
  type ValidationErrors,
} from "@/lib/validation/service-request";
import { MIN_HUMAN_ELAPSED_MS, type SpamMetadata } from "@/lib/spam/service-request";
import { normalizeServiceRequest } from "@/lib/service-request/normalize";
import { computeRoutingFlags, computeBookingDecision } from "@/lib/service-request/routing";
import { toAutomationPayload } from "@/lib/service-request/to-automation-payload";
import { buildLeadTags } from "@/lib/service-request/tags";
import { sendToGHLWebhook } from "@/lib/ghl/webhook";
import type {
  ServiceRequestResponse,
  ServiceRequestErrorResponse,
} from "@/lib/service-request/types";

export const runtime = "nodejs";

// ── Helpers ───────────────────────────────────────────────────────────────────

function errorResponse(
  body: ServiceRequestErrorResponse,
  status: number,
): NextResponse<ServiceRequestResponse> {
  return NextResponse.json(body, { status });
}

/**
 * Run all field-level validation rules across every step.
 * Returns a flat error map; empty object means valid.
 */
function validateAllFields(data: ServiceRequestFormData): ValidationErrors {
  const errors: ValidationErrors = {};
  for (const fields of Object.values(STEP_FIELDS)) {
    for (const field of fields) {
      const err = validateField(field, data);
      if (err) errors[field] = err;
    }
  }
  return errors;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse<ServiceRequestResponse>> {
  // 1. Parse body ──────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(
      { success: false, code: "BAD_REQUEST", message: "Request body must be valid JSON." },
      400,
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse(
      { success: false, code: "BAD_REQUEST", message: "Expected a JSON object." },
      400,
    );
  }

  const { formData, spam } = body as Record<string, unknown>;

  // 2. Verify formData and spam shapes are present ─────────────────────────────
  if (!formData || typeof formData !== "object" || Array.isArray(formData)) {
    return errorResponse(
      { success: false, code: "BAD_REQUEST", message: "Missing or invalid formData." },
      400,
    );
  }

  if (!spam || typeof spam !== "object" || Array.isArray(spam)) {
    return errorResponse(
      { success: false, code: "BAD_REQUEST", message: "Missing or invalid spam metadata." },
      400,
    );
  }

  const spamMeta = spam as SpamMetadata;
  const rawFormData = formData as ServiceRequestFormData;

  // 3. Honeypot check ──────────────────────────────────────────────────────────
  // isSpam is set by the client; also re-check honeypotFilled server-side for
  // belt-and-suspenders safety (don't trust the client's own isSpam flag alone).
  if (spamMeta.isSpam === true || spamMeta.honeypotFilled === true) {
    // Silently accept with 200 to avoid tipping off the bot.
    // Log server-side so you can monitor spam volume.
    console.warn("[service-request] Honeypot triggered — discarding submission.", {
      elapsedMs: spamMeta.elapsedMs,
      submittedAt: spamMeta.submittedAt,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Request received.",
        data: { normalizedLead: null as never, routing: null as never, tags: [] },
      },
      { status: 200 },
    );
  }

  // 4. Timing check ────────────────────────────────────────────────────────────
  const isSuspicious =
    typeof spamMeta.elapsedMs === "number" &&
    spamMeta.elapsedMs < MIN_HUMAN_ELAPSED_MS;

  if (isSuspicious) {
    console.warn("[service-request] Suspiciously fast submission.", {
      elapsedMs: spamMeta.elapsedMs,
    });
    // Do NOT reject — flag for downstream review instead.
    // The normalized payload will carry spam.isSuspicious === true.
  }

  // 5. Field validation ─────────────────────────────────────────────────────────
  const fieldErrors = validateAllFields(rawFormData);
  if (Object.keys(fieldErrors).length > 0) {
    return errorResponse(
      {
        success: false,
        code: "VALIDATION_ERROR",
        message: "One or more fields are invalid.",
        fieldErrors,
      },
      422,
    );
  }

  // 6. Normalize + sanitize ─────────────────────────────────────────────────────
  let payload;
  try {
    payload = normalizeServiceRequest(rawFormData, spamMeta);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Normalization failed.";
    console.error("[service-request] Normalization error:", message);
    return errorResponse(
      { success: false, code: "BAD_REQUEST", message },
      400,
    );
  }

  // 7. Compute routing flags ─────────────────────────────────────────────────────
  const routing = computeRoutingFlags(payload);

  // 8. Compute booking decision ──────────────────────────────────────────────────
  const bookingDecision = computeBookingDecision(payload, routing);

  // 10. Generate lead tags ──────────────────────────────────────────────────
  // Tags are computed server-side from validated data so GHL workflows never
  // need to re-derive routing signals from raw form fields.
  const tags = buildLeadTags(payload, routing, bookingDecision);

  // 11. Build standardized automation payload (now includes tags) ───────────────
  const automation = toAutomationPayload(payload, routing, tags);

  console.info("[service-request] Automation payload ready.", {
    submittedAt: automation.submittedAt,
    serviceCategory: automation.serviceCategory,
    urgency: automation.urgency,
    propertyType: automation.propertyType,
    assignedFlow: automation.routing.assignedFlow,
    pipelineStage: automation.routing.pipelineStage,
    priority: automation.routing.priority,
    bookingEligible: automation.routing.bookingEligible,
    needsHumanReview: automation.routing.needsHumanReview,
    spamScore: automation.routing.spamScore,
    submissionQuality: automation.routing.submissionQuality,
    tags,
  });

  // 12. Forward to downstream services ───────────────────────────────────────
  // Send the standardized payload to the GHL inbound webhook. This creates or
  // updates a contact in GHL and triggers the configured workflow automation.
  // The call is fire-and-forget (errors are logged but don't fail the response).
  await sendToGHLWebhook(automation);

  //   Uncomment and implement these when additional integrations are ready:
  //
  //   if (bookingDecision.assignedFlow === "urgent-callback") {
  //     await sendUrgentAlert(automation);
  //   }
  //   if (bookingDecision.bookingEligible) {
  //     await createGHLBooking(automation);
  //   }

  // 13. Build response ────────────────────────────────────────────────────────────────
  const { spam: _spam, ...normalizedLead } = payload;

  const message =
    bookingDecision.assignedFlow === "urgent-callback"
      ? "Urgent request received — we'll call you within the hour."
      : bookingDecision.bookingEligible
        ? "Request received. You're eligible to book online."
        : "Request received. Our team will follow up soon to confirm your appointment.";

  return NextResponse.json(
    {
      success: true,
      message,
      data: {
        normalizedLead,
        routing: bookingDecision,
        tags,
      },
    },
    { status: 200 },
  );
}
