"use client";
import { cn } from "@/lib/utils";

const STEP_LABELS = [
  "Service",
  "Urgency",
  "Property",
  "Details",
  "Schedule",
  "Contact",
  "Review",
];

interface StepIndicatorProps {
  current: number; // 0-indexed
  total: number;
  primaryColor: string;
  accentColor: string;
}

export function StepIndicator({ current, total, primaryColor }: StepIndicatorProps) {
  const progressPct = ((current + 1) / total) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%`, backgroundColor: primaryColor }}
        />
      </div>

      {/* Step circles + labels — tablet and up */}
      <div className="hidden sm:flex justify-between">
        {STEP_LABELS.map((label, i) => {
          const isComplete = i < current;
          const isActive = i === current;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                  isComplete || isActive
                    ? "border-transparent text-white"
                    : "border-gray-200 bg-white text-gray-400",
                )}
                style={isComplete || isActive ? { backgroundColor: primaryColor } : undefined}
              >
                {isComplete ? (
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider",
                  isActive
                    ? "text-gray-800"
                    : isComplete
                      ? "text-gray-400"
                      : "text-gray-300",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: step x of y + current label */}
      <div className="sm:hidden flex items-center justify-between text-sm">
        <span className="text-gray-400 font-medium">
          Step {current + 1} of {total}
        </span>
        <span className="font-bold text-gray-800">{STEP_LABELS[current]}</span>
      </div>
    </div>
  );
}
