
import { NextResponse } from 'next/server';


export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		console.log("[LEAD API] Received request body:", body);
		
		const { name, email, phone, service, source, tags } = body;

		// 3) Trigger GoHighLevel workflow through webhook
    let ghlWebhookSuccess = false;
    let ghlWebhookError: string | null = null;

    try {
      const webhookPayload = {
        name,
        email,
        phone: phone || "",
        service: service || "",
        source: source || "Website Contact Form - Inquiry",
        status: "new",
        tags: tags ?? ["website-lead-form"],
      };
      const webhookUrl = process.env.GHL_WEBHOOK_URL_CONTACT_FORM;
      if (!webhookUrl) {
        throw new Error("GHL_WEBHOOK_URL_CONTACT_FORM is not set");
      }
      console.log("[LEAD API] Sending to GHL webhook:", webhookPayload);
      
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
        cache: "no-store",
      });

      if (!webhookRes.ok) {
        const text = await webhookRes.text();
        throw new Error(`Webhook failed: ${webhookRes.status} ${text}`);
      }

      ghlWebhookSuccess = true;
    } catch (err: any) {
      console.error("GHL Webhook Error:", err);
      ghlWebhookError = err?.message || "Unknown webhook error";
    }

		return NextResponse.json({
			message: 'Contact received and confirmation email sent.',
			ghlWebhookSuccess,
      ghlWebhookError,
		});
	} catch (error: any) {
		console.error('Contact Lead Error:', error);
		return NextResponse.json(
			{ message: 'An error occurred while processing your contact.' },
			{ status: 500 }
		);
	}
}
