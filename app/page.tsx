import { headers } from "next/headers";
import Image from "next/image";
import { companies } from "@/data/companies";
import { TestimonialsMasonryGrid } from "@/app/components/testimonials/TestimonialsMasonryGrid";
import { LeadForm } from "@/app/components/LeadForm";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export default async function Home() {
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">

      {/* TOP BAR */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-2 px-4 md:px-8 py-3 md:py-2.5 text-sm border-b border-white/10"
        style={{ backgroundColor: company.primaryColor }}
      >
        <span className="text-white/60 text-center md:text-left">Serving {company.city} &amp; surrounding areas &middot; Licensed &amp; Insured</span>
        <div className="flex items-center gap-4">
          <a href={`tel:${company.phone}`} className="font-bold text-white hover:opacity-80 transition">
            {company.phone}
          </a>
          <a
            href="#lead-form"
            className="rounded px-4 py-1.5 text-sm font-bold transition hover:opacity-90"
            style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
          >
            Request Service
          </a>
        </div>
      </div>

      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-28 text-white text-center"
        style={{ backgroundColor: company.primaryColor }}
      >
        <Image
          src="/san-antonio-city-drawing.png"
          alt="San Antonio skyline"
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: company.primaryColor, opacity: 0.83 }} />

        <div className="mb-5 h-32 w-48 relative z-10">
          <Image src={company.logo} alt={`${company.name} logo`} fill className="object-contain" />
        </div>

        <p
          className="relative z-10 text-xs font-bold uppercase tracking-[0.18em] mb-3"
          style={{ color: company.accentColor }}
        >
          {company.city}, TX &nbsp;&middot;&nbsp; Est. 1996
        </p>

        <h1 className="relative z-10 text-4xl md:text-5xl font-black leading-tight mb-4 max-w-3xl">
          Reliable Heating &amp; Cooling Services<br className="hidden md:block" /> in {company.city}
        </h1>

        <p className="relative z-10 text-lg text-white/70 mb-8 max-w-xl">
          Serving homeowners with fast, honest, and professional HVAC solutions.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3 mb-8">
          <a
            href={`tel:${company.phone}`}
            className="rounded px-8 py-4 text-lg font-bold shadow-lg transition hover:opacity-90"
            style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
          >
            Call Now: {company.phone}
          </a>
          <a
            href="/booking"
            className="rounded border-2 border-white/50 px-8 py-4 text-lg font-bold hover:bg-white/10 transition"
          >
            Request Service Online
          </a>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-black/30 backdrop-blur-sm rounded px-6 py-4">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-yellow-400 text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <span className="text-white/90 text-sm font-semibold">4.9 <span className="text-white/55 font-normal">(320 reviews)</span></span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/25" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <Image src="/yelp.svg" alt="Yelp" width={20} height={20} />
              <span className="text-yellow-400 text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            </div>
            <span className="text-white/90 text-sm font-semibold">4.8 <span className="text-white/55 font-normal">(180 reviews)</span></span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-200 py-7 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
              label: "Serving Since 1996",
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              label: "Licensed & Insured",
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
              label: "24/7 Emergency Service",
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/></svg>,
              label: "5,000+ Happy Customers",
            },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded"
                style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
              >
                {icon}
              </div>
              <span className="text-sm font-bold text-gray-800 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: company.primaryColor }}>
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-3">How Can We Help?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From emergency repairs to scheduled maintenance, we handle it all.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
                title: "Heating",
                desc: "Furnace repair, heat pump installation, and winterization. Keep your family warm no matter how cold it gets.",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
                title: "Cooling",
                desc: "AC repair, replacement, and new system installation. Stay cool all summer with our certified technicians.",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
                title: "Maintenance",
                desc: "Scheduled tune-ups, filter replacements, and system checks. Prevent breakdowns before they happen.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded border border-gray-200 p-7 flex flex-col gap-4 shadow-sm"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded"
                  style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
                >
                  {icon}
                </div>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                <a
                  href="/booking"
                  className="text-sm font-bold inline-flex items-center gap-1 transition-all hover:gap-2"
                  style={{ color: company.primaryColor }}
                >
                  Request Service &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / AUTHORITY */}
      <section className="py-20 px-6" style={{ backgroundColor: company.primaryColor }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 md:h-96 rounded overflow-hidden shadow-lg">
            <Image
              src="/overhead-of-utility-workers-maintaining-outside-ai.jpg"
              alt="Our team serving the area"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: company.accentColor }}>
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
              A Tradition of<br />Trusted Service
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Since 1996, {company.name} has been the go-to HVAC company for homeowners across {company.city}. We&apos;re family-owned, locally operated, and we treat every home like it&apos;s our own.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Over 25 years of experience, thousands of satisfied customers, and a reputation built on honest pricing and quality workmanship &mdash; that&apos;s the {company.name} difference.
            </p>
            <a
              href="/booking"
              className="inline-block rounded px-7 py-3.5 font-bold transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: company.primaryColor }}>
              Why {company.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-black">Built on Trust. Driven by Results.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                title: "24/7 Emergency Service",
                desc: "AC break down at midnight? No problem. Our on-call technicians are available around the clock, every day of the year.",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                title: "Licensed Professionals",
                desc: "Every technician is fully licensed, background-checked, and trained on the latest HVAC systems and brands.",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
                title: "Customer-First Approach",
                desc: "We explain every repair before we do it and will never upsell you on parts or services you don't need.",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
                title: "Financing Available",
                desc: "No need to wait. Flexible payment options make it easy to get the system you need today &mdash; no surprises.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-5 p-7 border border-gray-100 rounded shadow-sm">
                <div
                  className="w-12 h-12 shrink-0 flex items-center justify-center rounded"
                  style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="font-black text-lg mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE STRIP */}
      <div className="grid grid-cols-3 h-48 md:h-60">
        {[
          { label: "AC Repair", tint: 0.35, image: "/repairman-in-uniform-installing-the-outside-unit.jpg" },
          { label: "Heating Systems", tint: 0.45, image: "/water-heating-device-installation.jpeg" },
          { label: "Maintenance", tint: 0.35, image: "/indian-male-worker-inspecting-the-air-conditioner.jpg" },
        ].map(({ label, tint, image }) => (
          <div key={label} className="relative overflow-hidden">
            <Image src={image} alt={label} fill className="object-cover" />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: company.primaryColor, opacity: tint }}
            />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="text-white font-black text-base md:text-lg drop-shadow-lg">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LEAD FORM */}
      <LeadForm
        primaryColor={company.primaryColor}
        accentColor={company.accentColor}
        services={company.services}
      />

      {/* TESTIMONIALS */}
      <section className="py-20 px-6" style={{ backgroundColor: company.primaryColor }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: company.accentColor }}>
              What Our Customers Say
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-neutral-100 sm:text-center">
              Loved by thousands of people
            </h2>
          </div>
          <TestimonialsMasonryGrid />
          <div className="text-center mt-20">
            <a
              href="#lead-form"
              className="inline-block rounded px-8 py-4 font-bold text-lg transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Join Our Happy Customers
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="py-20 px-6" style={{ backgroundColor: company.primaryColor }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: company.accentColor }}>
              Customer Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Over 5,000 Five-Star Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Maria G.", quote: "They showed up in under an hour and fixed my AC perfectly. Lifesavers in the Texas heat!" },
              { name: "James R.", quote: "Fair pricing and super professional. I&apos;ve used them twice now. Won&apos;t go anywhere else." },
              { name: "Sandra L.", quote: "Booked online, tech arrived same day. Couldn&apos;t be easier. Highly recommend." },
            ].map(({ name, quote }) => (
              <div
                key={name}
                className="bg-white/10 border border-white/20 rounded p-6 text-white"
              >
                <p className="text-yellow-400 text-sm mb-3">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                <p className="text-white/80 italic text-sm leading-relaxed mb-4">&quot;{quote}&quot;</p>
                <p className="font-bold text-sm">&mdash; {name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="#lead-form"
              className="inline-block rounded px-8 py-4 font-bold text-lg transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Join Our Happy Customers
            </a>
          </div>
        </div>
      </section> */}

      {/* SERVICE DETAIL */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: company.primaryColor }}>
              Local Experts
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
              AC &amp; Heater Repair<br />in {company.city}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Whether your air conditioner stopped blowing cold or your heater won&apos;t kick on, {company.name} has seen it all. Our {company.city} technicians are trained on every major brand and get most repairs done same-day.
            </p>
            <ul className="space-y-2 mb-8">
              {company.services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                  >
                    &#10003;
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <a
              href="/booking"
              className="inline-block rounded px-7 py-3.5 font-bold transition hover:opacity-90"
              style={{ backgroundColor: company.primaryColor, color: "white" }}
            >
              Book a Technician
            </a>
          </div>
          <div className="relative h-72 md:h-96 rounded overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src="/young-hvac-technician-millennial-has-modern-equipment.jpg"
              alt={`HVAC service in ${company.city}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: company.primaryColor }}>
            Available Now
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            We&apos;re Ready When You Need Us
          </h2>
          <p className="text-gray-500 mb-8">Don&apos;t sweat it &mdash; help is just a call away.</p>
          <ul className="inline-flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {[
              "Fast same-day response",
              "24/7 emergency availability",
              "Flexible scheduling",
              "Upfront, honest pricing",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                >
                  &#10003;
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${company.phone}`}
              className="rounded px-8 py-4 text-lg font-bold shadow transition hover:opacity-90"
              style={{ backgroundColor: company.primaryColor, color: "white" }}
            >
              Call {company.phone}
            </a>
            <a
              href="#lead-form"
              className="rounded border-2 px-8 py-4 text-lg font-bold transition hover:bg-gray-100"
              style={{ borderColor: company.primaryColor, color: company.primaryColor }}
            >
              Request Online
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ backgroundColor: company.primaryColor }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="h-10 w-28 relative">
              <Image src={company.logo} alt={company.name} fill className="object-contain" />
            </div>
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <a href={`tel:${company.phone}`} className="text-white font-bold text-lg hover:opacity-80 transition">
              {company.phone}
            </a>
            <a
              href="#"
              className="text-xs font-bold rounded px-4 py-2 transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Leave a Review
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/50 hover:text-white transition" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition" aria-label="Instagram">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="text-white/50 hover:text-white transition" aria-label="Google Reviews">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING CTA */}
      {/* <a
        href="/booking"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded px-6 py-4 text-sm font-bold shadow-2xl transition hover:scale-105"
        style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
      >
        Get Instant Quote
      </a> */}

    </main>
  );
}
