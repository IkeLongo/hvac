"use client";
import { motion } from "motion/react";

// ── Props ─────────────────────────────────────────────────────────────────────

export interface RequestConfirmationProps {
  /** Customer's first name — personalises the heading. */
  firstName: string;
  /**
   * Routing priority from `BookingDecision`.
   * "high" triggers an additional urgency callout.
   */
  priority: "low" | "normal" | "high";
  /**
   * When true, adds a note that a specialist will personally review the
   * request before scheduling.
   */
  needsHumanReview: boolean;
  primaryColor: string;
}

// ── Inline icons ──────────────────────────────────────────────────────────────

function InboxIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-9 h-9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      aria-hidden="true"
      style={{ color }}
    >
      <polyline
        points="22 12 16 12 14 15 10 15 8 12 2 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-amber-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
    </svg>
  );
}

function UserCheckIcon() {
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
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" />
      <polyline
        points="16 11 18 13 22 9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── What-happens-next steps ───────────────────────────────────────────────────

interface NextStep {
  number: number;
  label: string;
}

function NextSteps({
  steps,
  primaryColor,
}: {
  steps: NextStep[];
  primaryColor: string;
}) {
  return (
    <ol className="space-y-3" aria-label="What happens next">
      {steps.map((step) => (
        <li key={step.number} className="flex items-start gap-3">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5"
            style={{ backgroundColor: primaryColor }}
            aria-hidden="true"
          >
            {step.number}
          </span>
          <span className="text-sm text-gray-600 leading-relaxed">
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Confirmation screen for leads that are **not** eligible for online booking.
 *
 * Shown after a successful API response when `bookingEligible` is false —
 * e.g. commercial jobs, urgent callbacks, or requests that need a human review.
 *
 * Renders a strong confirmation so the user does not feel abandoned, with
 * clear "what happens next" steps and an optional urgency callout when
 * `priority === "high"`.
 *
 * @example
 * ```tsx
 * <RequestConfirmation
 *   firstName={formData.firstName}
 *   priority={bookingDecision.priority}
 *   needsHumanReview={bookingDecision.needsHumanReview}
 *   primaryColor={primaryColor}
 * />
 * ```
 */
export function RequestConfirmation({
  firstName,
  priority,
  needsHumanReview,
  primaryColor,
}: RequestConfirmationProps) {
  const isUrgent = priority === "high";
  const name = firstName.trim();

  const nextSteps: NextStep[] = [
    {
      number: 1,
      label: "Your request has been received with all the details you shared.",
    },
    {
      number: 2,
      label: needsHumanReview
        ? "A specialist will personally review your request to ensure we send the right technician."
        : "A member of our team will review your request and follow up shortly.",
    },
    {
      number: 3,
      label: "We\'ll reach out to confirm your appointment and answer any questions you have.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10 w-full max-w-lg mx-auto"
      role="status"
      aria-live="polite"
    >
      <div className="space-y-6">
        {/* ── Icon + heading ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-4 pt-1">
          <div
            className="w-18 h-18 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}18` }}
          >
            <InboxIcon color={primaryColor} />
          </div>

          <div className="space-y-1.5 max-w-xs">
            <h2 className="text-2xl font-black text-gray-900 leading-tight">
              We&rsquo;ve Got It{name ? `, ${name}` : ""}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your request is in. Our team will review the details and follow
              up to confirm your appointment.
            </p>
          </div>
        </div>

        {/* ── Urgent priority callout ────────────────────────────────────── */}
        {isUrgent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.28, ease: "easeOut" }}
            className="flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3"
            role="note"
          >
            <AlertTriangleIcon />
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">
                We&rsquo;re treating this as urgent.
              </span>{" "}
              Your request is at the top of the queue and we&rsquo;ll be in
              touch as soon as possible.
            </p>
          </motion.div>
        )}

        {/* ── Human-review callout (non-urgent) ─────────────────────────── */}
        {needsHumanReview && !isUrgent && (
          <div
            className="flex items-start gap-2.5 rounded-xl border px-4 py-3"
            style={{
              backgroundColor: `${primaryColor}0a`,
              borderColor: `${primaryColor}30`,
            }}
            role="note"
          >
            <span style={{ color: primaryColor }}>
              <UserCheckIcon />
            </span>
            <p className="text-xs leading-relaxed" style={{ color: primaryColor }}>
              <span className="font-semibold">
                A specialist will personally review your request
              </span>{" "}
              before we follow up — so we send the right technician for your
              specific situation.
            </p>
          </div>
        )}

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100" />

        {/* ── What happens next ──────────────────────────────────────────── */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            What happens next
          </h3>
          <NextSteps steps={nextSteps} primaryColor={primaryColor} />
        </div>

        {/* ── Closing reassurance ─────────────────────────────────────────── */}
        <p className="text-xs text-gray-400 text-center leading-relaxed pt-1">
          Keep an eye on your phone or inbox — we&rsquo;ll be in touch soon.
          If you need anything in the meantime, don&rsquo;t hesitate to reach
          out directly.
        </p>
      </div>
    </motion.div>
  );
}
