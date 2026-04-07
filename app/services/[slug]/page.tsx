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

export async function generateStaticParams() {
  const jsonSlugs = services
    .filter((s) => s.is_active)
    .map((s) => ({ slug: s.slug }));

  const categorySlugs = Object.values(companies).flatMap(
    (company) =>
      company.serviceCategories?.flatMap((cat) =>
        cat.services.map((s) => ({ slug: s.slug }))
      ) ?? []
  );

  const seen = new Set<string>();
  return [...jsonSlugs, ...categorySlugs].filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany();
  const serviceItem = company.serviceCategories
    ?.flatMap((cat) => cat.services)
    .find((s) => s.slug === slug);
  const jsonService = services.find((s) => s.slug === slug && s.is_active);
  if (!serviceItem && !jsonService) return {};
  const name = serviceItem?.name ?? jsonService!.name;
  const description = serviceItem?.description ?? jsonService!.short_description;
  return {
    title: `${name} in ${company.city}, TX`,
    description: `${description} Licensed & insured technicians. Upfront pricing. Serving ${company.city}, TX. Call ${company.phone}.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompany();

  // Resolve from serviceCategories first, fall back to JSON
  const serviceItem = company.serviceCategories
    ?.flatMap((cat) => cat.services)
    .find((s) => s.slug === slug);
  const jsonService = services.find((s) => s.slug === slug && s.is_active);

  if (!serviceItem && !jsonService) notFound();

  // Merged data — serviceItem takes priority, JSON fills gaps
  const name = serviceItem?.name ?? jsonService!.name;
  const shortDescription = serviceItem?.description ?? jsonService!.short_description;
  const longDescription = jsonService?.long_description ?? shortDescription;
  const benefits = serviceItem?.benefits ?? jsonService?.benefits ?? [];
  const process = serviceItem?.process ?? [];
  const signsYouNeed = serviceItem?.signsYouNeed ?? [];
  const pricingNote = serviceItem?.pricingNote ?? jsonService?.pricing_notes;
  const idealFor = jsonService?.ideal_for;

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title={name}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: name },
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
            {name} in {company.city}
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            {shortDescription}
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
            About Our {name} Service
          </h2>
          <p className="text-gray-500 leading-relaxed text-base">
            {longDescription}
          </p>
          {pricingNote && (
            <div className="mt-6 border border-gray-200 rounded p-5 bg-gray-50 text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-gray-800">Pricing: </span>
              {pricingNote}
            </div>
          )}
        </div>
      </section>

      {/* Our Process */}
      {process.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: company.primaryColor }}
            >
              How It Works
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-8 leading-snug">
              Our {name} Process
            </h2>
            <ol className="flex flex-col gap-4">
              {process.map((item, i) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5"
                    style={{ backgroundColor: company.primaryColor, color: "white" }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-bold text-gray-900">{item.step}: </span>
                    <span className="text-gray-500 text-sm leading-relaxed">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Signs You Need This Service */}
      {signsYouNeed.length > 0 && (
        <section className={`${process.length > 0 ? "bg-white" : "bg-gray-50"} py-16 md:py-20 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-3xl mx-auto">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: company.primaryColor }}
            >
              Watch for These
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-8 leading-snug">
              Signs You Need {name}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {signsYouNeed.map((sign) => (
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
      {benefits.length > 0 && (
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
              {benefits.map((benefit) => (
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
      {idealFor && (
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
              {idealFor}
            </p>
          </div>
        </section>
      )}

      <FaqSection company={company} />

      <CtaBanner
        company={company}
        headline={`Need ${name}?`}
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
