"use client";
import { cn } from "@/lib/utils";

interface NavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isLoading?: boolean;
  primaryColor: string;
  accentColor: string;
}

export function NavButtons({
  onBack,
  onNext,
  isFirst,
  isLast,
  isLoading = false,
  primaryColor,
  accentColor,
}: NavButtonsProps) {
  return (
    <div
      className={cn(
        "flex items-center mt-8 gap-3",
        isFirst ? "justify-end" : "justify-between",
      )}
    >
      {!isFirst && (
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition disabled:opacity-40 disabled:pointer-events-none"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition disabled:opacity-70 disabled:pointer-events-none"
        style={{ backgroundColor: primaryColor, color: accentColor || "#ffffff" }}
      >
        {isLoading && isLast ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            {isLast ? "Submit Request" : "Continue"}
            {!isLast && (
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </>
        )}
      </button>
    </div>
  );
}
