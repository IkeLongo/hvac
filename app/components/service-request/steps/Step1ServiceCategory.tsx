"use client";
import { OptionCard } from "../OptionCard";
import type { StepProps } from "../types";

const SERVICE_OPTIONS = [
  {
    value: "ac-repair",
    label: "AC Repair",
    description: "AC not cooling, blowing warm air, or unit issues.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    value: "heating-repair",
    label: "Heating Repair",
    description: "Heater or furnace isn't working properly.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2c0 4-4 4-4 8a4 4 0 0 0 8 0c0-4-4-4-4-8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 14v4M9 18h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "maintenance",
    label: "Maintenance / Tune-Up",
    description: "Routine service or seasonal check-up.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "new-system",
    label: "New System Estimate",
    description: "Get pricing on a new AC or heating system.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "thermostat-airflow",
    label: "Thermostat / Airflow Issue",
    description: "Temperature control or airflow problems.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "air-quality",
    label: "Indoor Air Quality",
    description: "Purifiers, filtration, or ventilation.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "other",
    label: "Other",
    description: "Something else or not sure what I need.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const inputClass =
  "block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition";

export function Step1ServiceCategory({ data, onChange, onBlur, errors, primaryColor }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">What do you need help with?</h2>
      <p className="text-gray-500 text-sm mb-6">
        Choose the service that best describes your situation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            icon={opt.icon}
            selected={data.serviceCategory === opt.value}
            onSelect={() => onChange({ serviceCategory: opt.value, serviceCategoryOther: "" })}
            primaryColor={primaryColor}
          />
        ))}
      </div>

      {errors.serviceCategory && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-500">
          {errors.serviceCategory}
        </p>
      )}

      {data.serviceCategory === "other" && (
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Briefly describe what you need <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            value={data.serviceCategoryOther}
            onChange={(e) => onChange({ serviceCategoryOther: e.target.value })}
            placeholder="e.g. Smart thermostat installation, duct cleaning…"
            className={inputClass}
            onBlur={() => onBlur("serviceCategoryOther")}
          />
          {errors.serviceCategoryOther && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-red-500">
              {errors.serviceCategoryOther}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
