/**
 * Sends the standardized AutomationPayload to the GHL inbound webhook.
 *
 * The webhook URL is read from the GHL_WEBHOOK_URL environment variable so
 * it is never committed to source control. Add it to .env.local for local
 * development and to your hosting provider's environment settings for
 * production.
 *
 * Returns true when GHL accepts the payload (2xx), false otherwise.
 * Errors are logged but not re-thrown so a webhook failure never breaks the
 * API response returned to the customer.
 */

import type { AutomationPayload } from "@/lib/service-request/automation-payload";

export async function sendToGHLWebhook(
  automation: AutomationPayload,
): Promise<boolean> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL_INTAKE_ROUTER;

  if (!webhookUrl) {
    console.warn(
      "[ghl/webhook] GHL_WEBHOOK_URL_INTAKE_ROUTER is not set — skipping webhook call.",
    );
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(automation),
    });

    if (!response.ok) {
      console.error("[ghl/webhook] Webhook returned non-2xx status.", {
        status: response.status,
        statusText: response.statusText,
      });
      return false;
    }

    return true;
  } catch (err) {
    console.error("[ghl/webhook] Failed to send webhook.", {
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
}
