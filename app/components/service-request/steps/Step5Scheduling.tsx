"use client";
import { cn } from "@/lib/utils";
import type { StepProps } from "../types";

const SCHEDULE_OPTIONS = [
  { value: "asap", label: "As soon as possible", sub: "I need this done quickly" },
  { value: "morning", label: "Morning", sub: "8am – 12pm" },
  { value: "afternoon", label: "Afternoon", sub: "12pm – 5pm" },
  { value: "evening", label: "Evening", sub: "5pm – 8pm" },
  { value: "flexible", label: "Flexible", sub: "Any time works" },
];

interface YesNoFieldProps {
  label: string;
  value: "" | "yes" | "no";
  onChange: (val: "yes" | "no") => void;
  primaryColor: string;
}

function YesNoField({ label, value, onChange, primaryColor }: YesNoFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex gap-2 shrink-0">
        {(["yes", "no"] as const).map((v) => {
          const isSelected = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              className={cn(
                "px-4 py-1.5 text-sm font-semibold rounded-lg border-2 transition-all duration-150 min-w-[52px]",
                isSelected
                  ? "text-white border-transparent"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
              )}
              style={isSelected ? { backgroundColor: primaryColor } : undefined}
            >
              {v === "yes" ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Step5Scheduling({ data, onChange, errors, primaryColor }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">When works for you?</h2>
      <p className="text-gray-500 text-sm mb-6">
        Choose a time preference for your appointment.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {SCHEDULE_OPTIONS.map((opt) => {
          const isSelected = data.schedulingPreference === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ schedulingPreference: opt.value })}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl border-2 py-4 px-3 text-center transition-all duration-200 active:scale-[0.97]",
                isSelected
                  ? "shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300",
              )}
              style={
                isSelected
                  ? { borderColor: primaryColor, backgroundColor: `${primaryColor}0d` }
                  : undefined
              }
            >
              <span
                className={cn(
                  "text-sm font-bold",
                  isSelected ? "text-gray-900" : "text-gray-700",
                )}
              >
                {opt.label}
              </span>
              <span className="text-xs text-gray-400">{opt.sub}</span>
            </button>
          );
        })}
      </div>

      {errors.schedulingPreference && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-500">
          {errors.schedulingPreference}
        </p>
      )}

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">
          A few quick access questions{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </p>
        <div className="rounded-xl border border-gray-200 bg-white px-4 divide-y divide-gray-100 overflow-hidden">
          <YesNoField
            label="Will someone be home?"
            value={data.someoneHome}
            onChange={(v) => onChange({ someoneHome: v })}
            primaryColor={primaryColor}
          />
          <YesNoField
            label="Pets at property?"
            value={data.petsAtProperty}
            onChange={(v) => onChange({ petsAtProperty: v })}
            primaryColor={primaryColor}
          />
          <YesNoField
            label="Gate code or access issue?"
            value={data.hasGateCode}
            onChange={(v) => onChange({ hasGateCode: v })}
            primaryColor={primaryColor}
          />
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-5">
        We\'ll confirm your exact appointment time when we follow up.
      </p>
    </div>
  );
}
