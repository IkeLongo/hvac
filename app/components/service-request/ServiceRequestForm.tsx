"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { INITIAL_FORM_DATA, type ServiceRequestFormData } from "./types";
import {
  validateStep,
  validateField,
  stepHasErrors,
  type ValidationErrors,
} from "@/lib/validation/service-request";
import {
  evaluateSpam,
  type SpamMetadata,
} from "@/lib/spam/service-request";
import { StepIndicator } from "./StepIndicator";
import { NavButtons } from "./NavButtons";
import { Step1ServiceCategory } from "./steps/Step1ServiceCategory";
import { Step2Urgency } from "./steps/Step2Urgency";
import { Step3PropertyType } from "./steps/Step3PropertyType";
import { Step4IssueDetails } from "./steps/Step4IssueDetails";
import { Step5Scheduling } from "./steps/Step5Scheduling";
import { Step6ContactInfo } from "./steps/Step6ContactInfo";
import { Step7Review } from "./steps/Step7Review";
import { BookingHandoff } from "./booking/BookingHandoff";
import { RequestConfirmation } from "./booking/RequestConfirmation";
import { resolveCalendar } from "@/lib/calendars/config";
import type { BookingDecision } from "@/lib/service-request/types";
import {
  isSuccessResponse,
  isErrorResponse,
  getRoutingDecision,
  isBookingFlow,
} from "@/lib/service-request/response-helpers";

const TOTAL_STEPS = 7;

type SubmissionStatus = "idle" | "submitting" | "submitted-booking" | "submitted-followup" | "error";

interface ServiceRequestFormProps {
  primaryColor: string;
  accentColor: string;
}

// ── Utility sub-components ────────────────────────────────────────────────────

function WarningIcon() {
  return (
    <svg
      className="w-9 h-9 text-amber-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ServiceRequestForm({ primaryColor, accentColor }: ServiceRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ServiceRequestFormData>(INITIAL_FORM_DATA);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [errors, setErrors] = useState<ValidationErrors>({});

  /** Captured once at mount; never re-assigned until reset. */
  const formStartedAt = useRef<number>(Date.now());
  /** Honeypot trap field — real users never see or fill this. */
  const [honeypot, setHoneypot] = useState("");
  const [spamMeta, setSpamMeta] = useState<SpamMetadata | null>(null);
  /** Routing decision returned by the API — null until a successful submission. */
  const [routingDecision, setRoutingDecision] = useState<BookingDecision | null>(null);

  // ── Field handlers ──────────────────────────────────────────────────────────

  function handleChange(fields: Partial<ServiceRequestFormData>) {
    setFormData((prev) => {
      const next = { ...prev, ...fields };
      const cleared: ValidationErrors = { ...errors };
      for (const key of Object.keys(fields) as (keyof ServiceRequestFormData)[]) {
        if (cleared[key] && !validateField(key, next)) {
          delete cleared[key];
        }
      }
      setErrors(cleared);
      return next;
    });
  }

  function handleBlur(field: keyof ServiceRequestFormData) {
    const err = validateField(field, formData);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) {
        next[field] = err;
      } else {
        delete next[field];
      }
      return next;
    });
  }

  // ── Submission ──────────────────────────────────────────────────────────────

  async function handleSubmit() {
    // Validate the final step before attempting to send.
    const stepErrors = validateStep(currentStep, formData);
    if (stepHasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    const meta = evaluateSpam(honeypot, formStartedAt.current, Date.now());
    setSpamMeta(meta);
    setSubmissionStatus("submitting");

    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, spam: meta }),
      });

      const json: unknown = await res.json();

      if (res.ok && isSuccessResponse(json)) {
        const routing = getRoutingDecision(json);
        setRoutingDecision(routing);
        setSubmissionStatus(
          isBookingFlow(routing, meta.isSuspicious) ? "submitted-booking" : "submitted-followup",
        );
        return;
      }

      // Server-side validation errors — surface them and let user fix.
      if (isErrorResponse(json) && json.code === "VALIDATION_ERROR" && json.fieldErrors) {
        setErrors(json.fieldErrors as ValidationErrors);
        setSubmissionStatus("idle");
        return;
      }

      // Explicit SPAM code from server (shouldn't normally surface, but handle gracefully).
      if (isErrorResponse(json) && json.code === "SPAM") {
        setSubmissionStatus("submitted-followup");
        return;
      }

      setSubmissionStatus("error");
    } catch {
      setSubmissionStatus("error");
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  function goNext() {
    if (currentStep === TOTAL_STEPS - 1) {
      void handleSubmit();
      return;
    }
    const stepErrors = validateStep(currentStep, formData);
    if (stepHasErrors(stepErrors)) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setCurrentStep((s) => s + 1);
  }

  function goBack() {
    setErrors({});
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  }

  function goToStep(step: number) {
    setErrors({});
    setDirection(step < currentStep ? -1 : 1);
    setCurrentStep(step);
  }

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(0);
    setSubmissionStatus("idle");
    setErrors({});
    setHoneypot("");
    setSpamMeta(null);
    setRoutingDecision(null);
    formStartedAt.current = Date.now();
  }

  // ── Post-submission screens ─────────────────────────────────────────────────

  if (submissionStatus === "submitted-booking") {
    const slug = routingDecision?.assignedCalendar ?? null;
    const calendar = resolveCalendar(slug);

    if (process.env.NODE_ENV !== "production" && calendar === null) {
      console.warn(
        "[BookingHandoff] bookingEligible is true but no active calendar resolved for slug:",
        slug ?? "(null)",
        "— showing calendar-unavailable fallback.",
      );
    }

    return (
      <BookingHandoff
        firstName={formData.firstName}
        bookingEligible={true}
        assignedCalendar={slug}
        calendarResolved={calendar !== null}
        calendarTitle={calendar?.title ?? "Schedule Your Visit"}
        calendarDescription={calendar?.description ?? "Choose a time that works for you."}
        embedUrl={calendar?.embedUrl}
        bookingUrl={calendar?.bookingUrl}
        iframeId={calendar?.iframeId}
        primaryColor={primaryColor}
        accentColor={accentColor}
      />
    );
  }

  if (submissionStatus === "submitted-followup") {
    return (
      <RequestConfirmation
        firstName={formData.firstName}
        priority={routingDecision?.priority ?? "normal"}
        needsHumanReview={routingDecision?.needsHumanReview ?? false}
        primaryColor={primaryColor}
      />
    );
  }

  if (submissionStatus === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 text-center max-w-lg mx-auto"
        role="alert"
        aria-live="assertive"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
          <WarningIcon />
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-2">Something Went Wrong</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We couldn&apos;t send your request. Please try again — your information is still here.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSubmissionStatus("idle")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition"
            style={{ backgroundColor: primaryColor, color: accentColor || "#ffffff" }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path
                d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  // ── Main form shell (idle + loading) ─────────────────────────────────────────

  const stepProps = {
    data: formData,
    onChange: handleChange,
    onBlur: handleBlur,
    errors,
    primaryColor,
    accentColor,
  };

  const stepContent = [
    <Step1ServiceCategory key="s1" {...stepProps} />,
    <Step2Urgency key="s2" {...stepProps} />,
    <Step3PropertyType key="s3" {...stepProps} />,
    <Step4IssueDetails key="s4" {...stepProps} />,
    <Step5Scheduling key="s5" {...stepProps} />,
    <Step6ContactInfo key="s6" {...stepProps} />,
    <Step7Review key="s7" {...stepProps} onGoToStep={goToStep} />,
  ];

  const isLoading = submissionStatus === "submitting";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10 max-w-2xl mx-auto">
      {/*
       * Honeypot trap — visually hidden, off-screen, skipped by keyboard.
       * Real users never interact with this. Bots that fill all visible
       * inputs will trigger it. Do NOT use display:none or type="hidden"
       * because some bots skip those intentionally.
       */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="trap_website">Website</label>
        <input
          id="trap_website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <StepIndicator
        current={currentStep}
        total={TOTAL_STEPS}
        primaryColor={primaryColor}
        accentColor={accentColor}
      />

      {/* Animated step content */}
      <div className="relative overflow-hidden min-h-[360px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {stepContent[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>

      <NavButtons
        onBack={goBack}
        onNext={goNext}
        isFirst={currentStep === 0}
        isLast={currentStep === TOTAL_STEPS - 1}
        isLoading={isLoading}
        primaryColor={primaryColor}
        accentColor={accentColor}
      />
    </div>
  );
}
