"use client";

import { useState } from "react";

interface LeadFormProps {
  primaryColor: string;
  accentColor: string;
  services: string[];
}

export function LeadForm({ primaryColor, accentColor, services }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      service: data.get("service"),
      source: "Website Contact Form - Inquiry",
      tags: ["website-lead-form"],
    };
    // console.log("[LeadForm] Submitting payload:", payload);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      // console.log("[LeadForm] Response status:", res.status);
      // console.log("[LeadForm] Response body:", resData);

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("[LeadForm] Submit error:", err);
      setStatus("error");
    }
  }

  return (
    <section id="lead-form" className="py-20 px-6 bg-gray-50">
      <div className="max-w-lg mx-auto">
        <p
          className="text-xs font-bold uppercase tracking-widest text-center mb-2"
          style={{ color: primaryColor }}
        >
          Get In Touch
        </p>
        <h2 className="text-3xl font-black text-center mb-2">Request Service</h2>
        <p className="text-gray-500 text-center mb-8">We&apos;ll contact you within minutes.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 border border-gray-200 rounded shadow-sm">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="rounded border border-gray-200 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="rounded border border-gray-200 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="rounded border border-gray-200 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
          <select name="service" className="rounded border border-gray-200 px-5 py-4 text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 min-h-[56px]">
            <option value="">Service Needed</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded py-4 text-lg font-bold transition hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: primaryColor, color: "white" }}
          >
            {status === "submitting" ? "Sending..." : "Request Free Quote \u2192"}
          </button>
          {status === "success" && (
            <p className="text-center text-sm font-semibold text-green-600">Thanks! We&apos;ll be in touch shortly.</p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-semibold text-red-600">Something went wrong. Please try again.</p>
          )}
          <p className="text-center text-xs text-gray-400">No obligation. No spam. We respect your privacy.</p>
        </form>
      </div>
    </section>
  );
}
