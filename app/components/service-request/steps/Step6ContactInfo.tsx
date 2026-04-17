"use client";
import { cn } from "@/lib/utils";
import type { StepProps } from "../types";

const baseInputClass =
  "block w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

function inputClass(hasError: boolean) {
  return cn(
    baseInputClass,
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-gray-200 focus:ring-offset-1",
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm font-medium text-red-500">
      {message}
    </p>
  );
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length > 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length > 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return digits;
}

export function Step6ContactInfo({ data, onChange, onBlur, errors }: StepProps) {
  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">How can we reach you?</h2>
      <p className="text-gray-500 text-sm mb-6">We&apos;ll use this to confirm your appointment.</p>

      <div className="flex flex-col gap-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>
              First name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              autoComplete="given-name"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              onBlur={() => onBlur("firstName")}
              placeholder="Jane"
              className={inputClass(!!errors.firstName)}
            />
            <FieldError message={errors.firstName} />
          </div>
          <div>
            <label className={labelClass}>
              Last name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              autoComplete="family-name"
              value={data.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              onBlur={() => onBlur("lastName")}
              placeholder="Smith"
              className={inputClass(!!errors.lastName)}
            />
            <FieldError message={errors.lastName} />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>
            Phone number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            value={data.phone}
            onChange={(e) => onChange({ phone: formatPhone(e.target.value) })}
            onBlur={() => onBlur("phone")}
            placeholder="(210) 555-0100"
            className={inputClass(!!errors.phone)}
          />
          <FieldError message={errors.phone} />
        </div>

        {/* Street address */}
        <div>
          <label className={labelClass}>
            Street address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            autoComplete="street-address"
            value={data.addressStreet}
            onChange={(e) => onChange({ addressStreet: e.target.value })}
            onBlur={() => onBlur("addressStreet")}
            placeholder="123 Main St"
            className={inputClass(!!errors.addressStreet)}
          />
          <FieldError message={errors.addressStreet} />
        </div>

        {/* City / State / ZIP row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_80px_100px]">
          <div>
            <label className={labelClass}>
              City <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              autoComplete="address-level2"
              value={data.addressCity}
              onChange={(e) => onChange({ addressCity: e.target.value })}
              onBlur={() => onBlur("addressCity")}
              placeholder="San Antonio"
              className={inputClass(!!errors.addressCity)}
            />
            <FieldError message={errors.addressCity} />
          </div>
          <div>
            <label className={labelClass}>State</label>
            <input
              type="text"
              autoComplete="address-level1"
              maxLength={2}
              value={data.addressState}
              onChange={(e) => onChange({ addressState: e.target.value.toUpperCase() })}
              placeholder="TX"
              className={inputClass(false)}
            />
          </div>
          <div>
            <label className={labelClass}>ZIP</label>
            <input
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={5}
              value={data.addressZip}
              onChange={(e) => onChange({ addressZip: e.target.value.replace(/\D/g, "") })}
              placeholder="78201"
              className={inputClass(false)}
            />
          </div>
        </div>

        {/* Email — optional */}
        <div>
          <label className={labelClass}>
            Email{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            onBlur={() => onBlur("email")}
            placeholder="jane@example.com"
            className={inputClass(!!errors.email)}
          />
          <FieldError message={errors.email} />
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Your information is only used to confirm your appointment. We do not sell or share your data.
      </p>
    </div>
  );
}
