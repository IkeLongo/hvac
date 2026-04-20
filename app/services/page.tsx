import type { Metadata } from "next";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { ServicesGrid } from "@/app/components/sections/ServicesGrid";
import { StatsBar } from "@/app/components/sections/StatsBar";
import { CtaSection } from "@/app/components/sections/CtaSection";

const FALLBACK_SLUG = "riverside";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: `HVAC Services in ${company.city}, TX`,
    description: `${company.name} offers professional AC repair, heating, installation, maintenance, and duct cleaning in ${company.city}, TX. Licensed & insured. Call ${company.phone}.`,
  };
}

export default async function ServicesPage() {
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title="Our HVAC Services"
        breadcrumbs={[{ label: "Services" }]}
        company={company}
      />

      {/* ── Intro ── */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.primaryColor }}
          >
            Full-Service HVAC
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
            Reliable HVAC Services in {company.city}, TX
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            {company.name} handles everything your home&apos;s heating and cooling system needs —
            from same-day emergency repairs to full system replacements. Every job is performed
            by licensed, background-checked technicians with upfront pricing and no surprise fees.
          </p>
          <a
            href="/request-service"
            className="inline-block rounded px-8 py-4 font-bold text-lg shadow transition hover:opacity-90"
            style={{ backgroundColor: company.primaryColor, color: "white" }}
          >
            Schedule Service
          </a>
        </div>
      </section>

      <ServicesGrid company={company} showSectionHeader={false} />

      <StatsBar company={company} />

      <CtaSection company={company} />

    </main>
  );
}
