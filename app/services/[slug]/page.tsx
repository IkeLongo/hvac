import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { WhyChooseUs } from "@/app/components/sections/WhyChooseUs";
import { FaqSection } from "@/app/components/sections/FaqSection";
import { CtaBanner } from "@/app/components/sections/CtaBanner";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";

const services = servicesData as Service[];

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

// Per-service "signs you need this" content
const SIGNS_BY_SLUG: Record<string, string[]> = {
  "ac-repair": [
    "AC is blowing warm or room-temperature air",
    "System is running but the house won't cool down",
    "You hear unusual noises like grinding, banging, or squealing",
    "Your energy bills have spiked without explanation",
    "The unit is constantly cycling on and off",
    "There's ice on the refrigerant lines or outdoor unit",
    "You notice water pooling around the indoor unit",
  ],
  "heater-furnace-repair": [
    "Heater turns on but produces little or no heat",
    "Pilot light is out or won't stay lit",
    "You smell unusual odors, especially burning or gas",
    "System makes banging, rattling, or popping sounds",
    "Certain rooms stay cold while others are warm",
    "Thermostat is unresponsive or inaccurate",
    "Heating bills are noticeably higher than usual",
  ],
  "system-installation": [
    "Your HVAC system is 12 or more years old",
    "Repair costs are approaching or exceeding the system's value",
    "Your system requires frequent repairs throughout the season",
    "Your home has inconsistent temperatures room to room",
    "You're building a new home or addition",
    "Your current system doesn't have zoning or smart thermostat support",
    "Energy bills continue rising despite regular maintenance",
  ],
  "seasonal-maintenance": [
    "Your system hasn't been serviced in over a year",
    "Airflow from vents feels weaker than usual",
    "You notice more dust in the home than normal",
    "Your system seems to work harder to reach set temperatures",
    "Your manufacturer warranty requires annual maintenance",
    "You want to prevent unexpected breakdowns during peak season",
  ],
  "duct-cleaning-air-quality": [
    "Family members experience allergy or asthma symptoms at home",
    "You notice excessive dust collecting on surfaces after cleaning",
    "There are visible mold or debris at vent openings",
    "The home has musty or stale odors from the vents",
    "You have pets or recently completed a home renovation",
    "Your ductwork hasn't been inspected in more than 5 years",
  ],
};

export async function generateStaticParams() {
  return services
    .filter((s) => s.is_active)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug && s.is_active);
  if (!service) return {};
  const company = await getCompany();
  return {
    title: `${service.name} in ${company.city}, TX`,
    description: `${service.short_description} Licensed & insured technicians. Upfront pricing. Serving ${company.city}, TX. Call ${company.phone}.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug && s.is_active);
  if (!service) notFound();

  const company = await getCompany();
  const signs = SIGNS_BY_SLUG[slug] ?? [];

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title={service.name}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
        company={company}
      />

      {/* Service Hero */}
      <section
        className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: company.primaryColor }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.accentColor }}
          >
            {company.city}, TX — Licensed &amp; Insured
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5">
            {service.name} in {company.city}
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            {service.short_description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <a
              href="/booking"
              className="rounded px-8 py-4 text-lg font-bold shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Schedule Service
            </a>
            <a
              href={`tel:${company.phone}`}
              className="rounded border-2 border-white/50 px-8 py-4 text-lg font-bold hover:bg-white/10 transition"
            >
              Call {company.phone}
            </a>
          </div>

          {/* Trust badges */}
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-3">
            {[
              "Same-day appointments available",
              "Upfront pricing before work begins",
              "90-day labor warranty",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-white/70">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                >
                  ✓
                </span>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.primaryColor }}
          >
            What We Do
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-5 leading-snug">
            About Our {service.name} Service
          </h2>
          <p className="text-gray-500 leading-relaxed text-base">
            {service.long_description}
          </p>
          {service.pricing_notes && (
            <div className="mt-6 border border-gray-200 rounded p-5 bg-gray-50 text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-gray-800">Pricing: </span>
              {service.pricing_notes}
            </div>
          )}
        </div>
      </section>

      {/* Signs You Need This Service */}
      {signs.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: company.primaryColor }}
            >
              Watch for These
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-8 leading-snug">
              Signs You Need {service.name}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {signs.map((sign) => (
                <li
                  key={sign}
                  className="flex items-start gap-3 bg-white border border-gray-200 rounded p-4 shadow-sm"
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
                  >
                    !
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* What's Included */}
      {service.benefits.length > 0 && (
        <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: company.primaryColor }}
            >
              What You Get
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-8 leading-snug">
              What&apos;s Included
            </h2>
            <ul className="flex flex-col gap-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                  >
                    ✓
                  </span>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <WhyChooseUs company={company} />

      {/* Ideal For */}
      {service.ideal_for && (
        <section className="bg-gray-50 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: company.primaryColor }}
            >
              Is This Right for You?
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-5 leading-snug">
              Ideal For
            </h2>
            <p className="text-gray-500 leading-relaxed text-base bg-white border border-gray-200 rounded p-6 shadow-sm">
              {service.ideal_for}
            </p>
          </div>
        </section>
      )}

      <FaqSection company={company} />

      <CtaBanner
        company={company}
        headline={`Need ${service.name}?`}
        subtext="Book your service today in under 60 seconds — or give us a call right now."
        features={[
          "Same-day appointments available",
          "Licensed & insured technicians",
          "Upfront pricing, no surprises",
          "24/7 emergency service",
        ]}
      />

    </main>
  );
}
