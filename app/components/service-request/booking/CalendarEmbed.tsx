"use client";
import { useState } from "react";
import Script from "next/script";

interface CalendarEmbedProps {
  /** Display title used as the iframe accessible name. */
  title: string;
  /**
   * GHL (or other provider) iframe embed URL.
   * When present, the calendar is rendered inline.
   * When null, falls back to `bookingUrl` or the contact fallback.
   */
  embedUrl: string | null | undefined;
  /**
   * Direct link to the booking page.
   * Used as an accessible fallback below an embed, or as the primary CTA
   * when `embedUrl` is not available.
   */
  bookingUrl: string | null | undefined;
  /**
   * Destination for the "Contact Us" CTA shown when neither `embedUrl` nor
   * `bookingUrl` are configured. Defaults to `/contact`.
   */
  contactUrl?: string;
  /**
   * The `id` attribute from the GHL embed snippet (the random string on the
   * `<iframe>` tag). GHL's `form_embed.js` script uses this id to look up the
   * correct iframe and auto-resize it. Omit for non-GHL providers.
   */
  iframeId?: string;
  primaryColor: string;
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="15 3 21 3 21 9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-8 h-8 mx-auto"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
      style={{ color }}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/**
 * Renders a GHL calendar embed iframe when `embedUrl` is available,
 * or a "open in new tab" CTA card when only `bookingUrl` is provided.
 * Shows a neutral placeholder if neither URL is set yet.
 */
export function CalendarEmbed({
  title,
  embedUrl,
  bookingUrl,
  contactUrl = "/contact",
  iframeId,
  primaryColor,
}: CalendarEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  // ── Inline embed (preferred) ──────────────────────────────────────────────
  if (embedUrl) {
    return (
      <div className="space-y-3">
        {/*
         * GHL's form_embed.js listens for postMessage events from the iframe
         * and resizes it to fit the calendar content. Without this script the
         * widget renders at a fixed height and may clip the booking form.
         * strategy="lazyOnload" defers it until after the page is interactive.
         */}
        <Script
          src="https://links.rivercitycreatives.com/js/form_embed.js"
          strategy="lazyOnload"
        />
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          {/*
           * Loading overlay — always rendered but fades out after onLoad.
           * The 400ms delay gives the GHL widget time to paint its content
           * before the overlay disappears, closing the blank-screen gap.
           */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 z-10 transition-opacity duration-500 delay-400 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            aria-hidden={loaded}
          >
            {/* Three bouncing dots */}
            <div className="flex items-center gap-1.5" aria-label="Loading calendar" role="status">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full animate-bounce"
                  style={{
                    backgroundColor: primaryColor,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "0.7s",
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">Loading scheduling calendar…</p>
          </div>
          <iframe
            src={embedUrl}
            title={title}
            id={iframeId}
            className="w-full h-[580px] md:h-[660px]"
            loading="lazy"
            allow="payment"
            onLoad={() => setLoaded(true)}
            // Security: sandbox the iframe; allow-forms and allow-scripts are
            // needed for GHL booking widgets; allow-popups for confirmation pages.
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          />
        </div>

        {bookingUrl && (
          <p className="text-sm text-center text-gray-500">
            Calendar not loading?{" "}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 transition-opacity hover:opacity-70"
              style={{ color: primaryColor }}
            >
              Open in a new tab
            </a>
          </p>
        )}
      </div>
    );
  }

  // ── Fallback: direct link CTA card ────────────────────────────────────────
  if (bookingUrl) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center">
        <CalendarIcon color={primaryColor} />
        <p className="mt-3 mb-5 text-sm text-gray-600 max-w-xs mx-auto">
          Our scheduling page opens in a new tab. It only takes a minute to
          pick a time.
        </p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          style={{ backgroundColor: primaryColor }}
        >
          Choose a Time
          <ExternalLinkIcon />
        </a>
      </div>
    );
  }

  // ── Fallback: no scheduling URLs configured ───────────────────────────────
  // Shown in dev/staging before real GHL URLs are set, or if the calendar is
  // temporarily unavailable. Gives the user a concrete next step.
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-10 text-center">
      <CalendarIcon color={primaryColor} />
      <p className="mt-3 mb-1.5 text-sm font-semibold text-gray-700">
        Online scheduling isn&rsquo;t available right now.
      </p>
      <p className="mb-6 text-sm text-gray-500 max-w-xs mx-auto">
        No worries — reach out directly and we&rsquo;ll get you scheduled
        quickly.
      </p>
      <a
        href={contactUrl}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
        style={{ backgroundColor: primaryColor }}
      >
        Contact Us
      </a>
    </div>
  );
}
