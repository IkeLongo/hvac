import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { getGhlCalendars } from "@/lib/ghl/calendars";
import { companies } from "@/data/companies";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule your HVAC service appointment online. Choose from AC repair, heating, installation, maintenance, and more. Same-day and next-day availability.",
};

export default async function BookingPage() {
  // console.log("[BookingPage] Fetching GHL calendars...");
  const bookingOptions = await getGhlCalendars();
  // console.log(`[BookingPage] Got ${bookingOptions?.length ?? 0} booking options:`, bookingOptions);
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">

      {/* TOP BAR */}
      {/* <div
        className="hidden md:flex items-center justify-between px-8 py-2.5 text-sm border-b border-white/10"
        style={{ backgroundColor: company.primaryColor }}
      >
        <span className="text-white/60">Serving {company.city} &amp; surrounding areas &middot; Licensed &amp; Insured</span>
        <div className="flex items-center gap-5">
          <a href={`tel:${company.phone}`} className="font-bold text-white hover:opacity-80 transition">
            {company.phone}
          </a>
          <a
            href="/#lead-form"
            className="rounded px-4 py-1.5 text-sm font-bold transition hover:opacity-90"
            style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
          >
            Request Service
          </a>
        </div>
      </div> */}

      {/* HERO HEADER */}
      <section
        className="relative py-20 px-6 text-center text-white"
        style={{ backgroundColor: company.primaryColor }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <a href="/" className="mb-5 h-14 w-36 relative mx-auto block">
            <Image src={company.logo} alt={`${company.name} logo`} fill className="object-contain" />
          </a>
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: company.accentColor }}
          >
            Schedule Your Service
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Choose the service that fits your needs and schedule a time that works for you.
          </p>
        </div>
      </section>

      {/* BOOKING OPTIONS */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: company.primaryColor }}>
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Available Booking Options</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Select a service below to schedule your appointment online.</p>
          </div>

          {/* Booking Options Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookingOptions?.map((option) => (
              <Link
                key={option.id}
                href={`/booking/${option.id}`}
                className="group block"
              >
                <div className="bg-white rounded border border-gray-200 p-7 h-full flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300 hover:border-gray-300">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded"
                    style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black group-hover:opacity-80 transition-colors">
                    {option.title}
                  </h3>
                  {option.description && (
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">
                      {option.description}
                    </p>
                  )}
                  <span
                    className="text-sm font-bold inline-flex items-center gap-1 transition-all group-hover:gap-2"
                    style={{ color: company.primaryColor }}
                  >
                    Book Now &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {(!bookingOptions || bookingOptions.length === 0) && (
            <div className="text-center py-12 bg-white rounded border border-gray-200 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mx-auto mb-4 text-gray-300" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              <p className="text-gray-500 text-lg font-semibold">
                No booking options are currently available.
              </p>
              <p className="text-gray-400 text-sm mt-1">Please check back later or call us directly.</p>
              <a
                href={`tel:${company.phone}`}
                className="inline-block mt-6 rounded px-7 py-3.5 font-bold transition hover:opacity-90 text-white"
                style={{ backgroundColor: company.primaryColor }}
              >
                Call {company.phone}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6" style={{ backgroundColor: company.primaryColor }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: company.accentColor }}>
            Need Help Choosing?
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Give us a call and we&apos;ll help you figure out the best option for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${company.phone}`}
              className="rounded px-8 py-4 text-lg font-bold shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Call {company.phone}
            </a>
            <a
              href="/#lead-form"
              className="rounded border-2 border-white/50 px-8 py-4 text-lg font-bold hover:bg-white/10 transition"
            >
              Request Service Online
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ backgroundColor: company.primaryColor }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="/" className="h-10 w-28 relative block">
              <Image src={company.logo} alt={company.name} fill className="object-contain" />
            </a>
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
          </div>
          <a href={`tel:${company.phone}`} className="text-white font-bold text-lg hover:opacity-80 transition">
            {company.phone}
          </a>
        </div>
      </footer>

    </main>
  );
}
