"use client";

import { useState } from "react";
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail } from "@/lib/utils/validation";

type ContactCollectionFormProps = {
  onSubmit: (data: ContactFormData) => Promise<void>;
  disabled?: boolean;
  services?: string[];
};

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
};

export function ContactCollectionForm({ onSubmit, disabled, services = [] }: ContactCollectionFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);
    await onSubmit({ name, email, phone, service });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
        ✓ Got it! We'll be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 rounded-xl border border-neutral-300 bg-white p-4 shadow-sm space-y-3">
      <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">Contact Info</p>

      <div>
        <input
          type="text"
          placeholder="Full name *"
          required
          value={name}
          disabled={disabled || submitting}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email address *"
          required
          value={email}
          disabled={disabled || submitting}
          onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
        {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
      </div>

      <div>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="Phone number *"
          required
          value={formatPhoneNumber(phone)}
          maxLength={14}
          disabled={disabled || submitting}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (raw.length <= 10) { setPhone(raw); setPhoneError(""); }
          }}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        />
        {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
      </div>

      <div>
        <select
          value={service}
          disabled={disabled || submitting}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400"
        >
          <option value="">Service Needed</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={disabled || submitting || !name || !email || !phone}
        className="w-full rounded-lg bg-green-600 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
