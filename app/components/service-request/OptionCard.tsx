"use client";
import { cn } from "@/lib/utils";
import type React from "react";

interface OptionCardProps {
  label: string;
  description?: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  primaryColor: string;
}

export function OptionCard({
  label,
  description,
  icon,
  selected,
  onSelect,
  primaryColor,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-start gap-4 w-full rounded-xl border-2 p-4 text-left transition-all duration-200",
        selected
          ? "shadow-sm"
          : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm",
      )}
      style={
        selected
          ? {
              borderColor: primaryColor,
              backgroundColor: `${primaryColor}0f`,
            }
          : undefined
      }
    >
      <div
        className={cn(
          "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
          selected ? "text-white" : "bg-gray-100 text-gray-500",
        )}
        style={selected ? { backgroundColor: primaryColor } : undefined}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "font-semibold text-sm leading-snug",
            selected ? "text-gray-900" : "text-gray-700",
          )}
        >
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </button>
  );
}
