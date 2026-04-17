"use client";
import { OptionCard } from "../OptionCard";
import type { StepProps } from "../types";

const URGENCY_OPTIONS = [
  {
    value: "urgent",
    label: "Urgent — System Not Working",
    description: "No heat/AC, water leaking, or a safety concern.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "soon",
    label: "Soon — Not an Emergency",
    description: "It's degraded but still somewhat functional.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "quote",
    label: "Just Getting a Quote",
    description: "I'd like pricing before committing.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="9" y1="13" x2="15" y2="13" strokeLinecap="round" />
        <line x1="9" y1="17" x2="12" y2="17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "preventative",
    label: "Preventative Maintenance",
    description: "Routine tune-up to keep things running well.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Step2Urgency({ data, onChange, errors, primaryColor }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">How urgent is this?</h2>
      <p className="text-gray-500 text-sm mb-6">This helps us prioritize your appointment.</p>

      <div className="flex flex-col gap-3">
        {URGENCY_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={data.urgency === opt.value}
            onSelect={() => onChange({ urgency: opt.value })}
            primaryColor={primaryColor}
          />
        ))}
      </div>

      {errors.urgency && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-500">
          {errors.urgency}
        </p>
      )}

      {data.urgency === "urgent" && (
        <div
          className="mt-4 flex items-start gap-3 rounded-xl p-4 text-sm"
          style={{ backgroundColor: "#fff7ed", borderLeft: "4px solid #f97316" }}
        >
          <svg
            className="w-4 h-4 mt-0.5 shrink-0 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
            <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
          </svg>
          <p className="text-orange-800 font-medium">
            Your request will be <strong>flagged for fast follow-up</strong>. Our team typically
            responds within 1–2 hours during business hours.
          </p>
        </div>
      )}
    </div>
  );
}
