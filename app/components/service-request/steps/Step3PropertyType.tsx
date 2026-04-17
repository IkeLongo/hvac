"use client";
import { cn } from "@/lib/utils";
import type { StepProps } from "../types";

const PROPERTY_OPTIONS = [
  {
    value: "residential",
    label: "Residential",
    description: "Home, condo, apartment, or townhome.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "commercial",
    label: "Commercial",
    description: "Office, retail, restaurant, or business property.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" rx="1" />
        <path d="M8 3v18M16 3v18M2 9h20M2 15h20" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Step3PropertyType({ data, onChange, errors, primaryColor }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">What kind of property?</h2>
      <p className="text-gray-500 text-sm mb-8">Tell us where the service will be performed.</p>

      <div className="grid grid-cols-2 gap-4">
        {PROPERTY_OPTIONS.map((opt) => {
          const isSelected = data.propertyType === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ propertyType: opt.value })}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-10 px-4 text-center transition-all duration-200 active:scale-[0.97]",
                isSelected
                  ? "shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",
              )}
              style={
                isSelected
                  ? { borderColor: primaryColor, backgroundColor: `${primaryColor}0d` }
                  : undefined
              }
            >
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                  isSelected ? "text-white" : "bg-gray-100 text-gray-500",
                )}
                style={isSelected ? { backgroundColor: primaryColor } : undefined}
              >
                {opt.icon}
              </div>
              <div>
                <p
                  className={cn(
                    "text-base font-bold",
                    isSelected ? "text-gray-900" : "text-gray-700",
                  )}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {errors.propertyType && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-500">
          {errors.propertyType}
        </p>
      )}
    </div>
  );
}
