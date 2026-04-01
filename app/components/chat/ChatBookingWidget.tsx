"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { BookingOption } from "@/lib/ghl/calendars";

const GHL_EMBED_BASE =
  process.env.NEXT_PUBLIC_GHL_EMBED_BASE ||
  "https://links.rivercitycreatives.com/widget/booking";

type ChatBookingWidgetProps = {
  onConfirm: () => Promise<void>;
  disabled?: boolean;
};

export function ChatBookingWidget({ onConfirm, disabled }: ChatBookingWidgetProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [step, setStep] = useState<"select" | "calendar">("select");
  const [options, setOptions] = useState<BookingOption[]>([]);
  const [selected, setSelected] = useState<BookingOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Fetch booking options from the API
  useEffect(() => {
    fetch("/api/chatbot/booking-options")
      .then((res) => res.json())
      .then((data: BookingOption[]) => setOptions(data))
      .catch(() => setOptions([]))
      .finally(() => setLoading(false));
  }, []);

  // Resize iframe when GHL posts updated height
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.data &&
        typeof e.data === "object" &&
        e.data.height &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${e.data.height}px`;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (confirmed) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        ✓ Your appointment is booked! We&apos;ll see you soon.
      </div>
    );
  }

  // Step 1: Select a service
  if (step === "select") {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-4 pt-3 pb-2">
          Choose a Service to Book
        </p>

        <div className="px-4 pb-4 space-y-2">
          {loading && (
            <p className="text-sm text-neutral-400 py-2">Loading options…</p>
          )}
          {!loading && options.length === 0 && (
            <p className="text-sm text-neutral-500 py-2">
              No booking options available right now. Please call us directly.
            </p>
          )}
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                setSelected(option);
                setStep("calendar");
              }}
              className="w-full text-left rounded-lg border border-neutral-200 px-4 py-3 text-sm hover:border-neutral-400 hover:bg-neutral-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-semibold text-neutral-800 block">{option.title}</span>
              {option.description && (
                <span className="text-neutral-500 text-xs mt-0.5 block line-clamp-2">{option.description}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Show calendar embed for the selected service
  const iframeSrc = `${GHL_EMBED_BASE}/${selected!.embedPath}`;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-neutral-100">
        <button
          type="button"
          onClick={() => { setSelected(null); setStep("select"); }}
          className="text-xs text-neutral-400 hover:text-neutral-600 transition"
          aria-label="Back to service selection"
        >
          ← Back
        </button>
        <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide flex-1">
          {selected!.title}
        </p>
      </div>

      <div className="w-full overflow-y-auto" style={{ maxHeight: "420px" }}>
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title={`Book ${selected!.title}`}
          style={{
            width: "100%",
            border: "none",
            minHeight: "400px",
            display: "block",
          }}
          scrolling="yes"
        />
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      </div>

      <div className="px-4 pb-3 pt-2 border-t border-neutral-100">
        <button
          type="button"
          disabled={disabled || confirming}
          onClick={async () => {
            setConfirming(true);
            await onConfirm();
            setConfirmed(true);
            setConfirming(false);
          }}
          className="w-full rounded-lg bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {confirming ? "Confirming…" : "I've Booked My Appointment ✓"}
        </button>
      </div>
    </div>
  );
}
