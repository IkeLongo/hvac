"use client";
import { cn } from "@/lib/utils";
import type { StepProps } from "../types";

const ISSUE_OPTIONS_BY_CATEGORY: Record<string, { value: string; label: string }[]> = {
  "ac-repair": [
    { value: "not-cooling", label: "Not cooling" },
    { value: "blowing-warm", label: "Blowing warm air" },
    { value: "wont-turn-on", label: "Won't turn on" },
    { value: "leaking-water", label: "Leaking water" },
    { value: "strange-noise", label: "Strange noise" },
    { value: "bad-smell", label: "Bad smell" },
    { value: "other", label: "Other" },
  ],
  "heating-repair": [
    { value: "no-heat", label: "No heat" },
    { value: "weak-heat", label: "Weak heat" },
    { value: "wont-turn-on", label: "Won't turn on" },
    { value: "strange-noise", label: "Strange noise" },
    { value: "other", label: "Other" },
  ],
  maintenance: [
    { value: "seasonal-tuneup", label: "Seasonal tune-up" },
    { value: "filter-checkup", label: "Filter / check-up" },
    { value: "membership", label: "Membership maintenance" },
    { value: "other", label: "Other" },
  ],
  "new-system": [
    { value: "full-replacement", label: "Full system replacement" },
    { value: "upgrade", label: "Upgrade existing system" },
    { value: "new-install", label: "New installation" },
    { value: "other", label: "Other" },
  ],
  "thermostat-airflow": [
    { value: "thermostat-not-working", label: "Thermostat not responding" },
    { value: "uneven-temps", label: "Uneven temperatures" },
    { value: "weak-airflow", label: "Weak airflow" },
    { value: "noisy-vents", label: "Noisy vents" },
    { value: "other", label: "Other" },
  ],
  "air-quality": [
    { value: "dusty", label: "Excessive dust" },
    { value: "humidity", label: "Humidity issues" },
    { value: "odors", label: "Odors or smells" },
    { value: "purifier", label: "Air purifier / filtration" },
    { value: "other", label: "Other" },
  ],
  other: [{ value: "other", label: "Describe below" }],
};

const DEFAULT_ISSUES = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "other", label: "Other" },
];

const textareaClass =
  "block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition";

export function Step4IssueDetails({ data, onChange, onBlur, errors, primaryColor }: StepProps) {
  const options = ISSUE_OPTIONS_BY_CATEGORY[data.serviceCategory] ?? DEFAULT_ISSUES;

  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">What's going on?</h2>
      <p className="text-gray-500 text-sm mb-6">
        Pick the option that best matches your situation.
      </p>

      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const isSelected = data.issueType === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onChange({
                  issueType: opt.value,
                  issueOther: opt.value !== "other" ? "" : data.issueOther,
                })
              }
              className={cn(
                "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-[0.97]",
                isSelected
                  ? "text-white border-transparent shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
              )}
              style={isSelected ? { backgroundColor: primaryColor } : undefined}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {errors.issueType && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-500">
          {errors.issueType}
        </p>
      )}

      {data.issueType === "other" && (
        <div className="mt-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Please describe <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={4}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            value={data.issueOther}
            onChange={(e) => onChange({ issueOther: e.target.value })}
            placeholder="Describe what you're experiencing in a few words…"
            className={textareaClass}
            style={{ resize: "vertical" }}
            onBlur={() => onBlur("issueOther")}
          />
          {errors.issueOther && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-red-500">
              {errors.issueOther}
            </p>
          )}
        </div>
      )}

      {!data.serviceCategory && (
        <p className="mt-4 text-xs text-amber-600 font-medium">
          ← Go back and select a service category to see tailored options.
        </p>
      )}
    </div>
  );
}
