import type { Metadata } from "next";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { ServiceRequestForm } from "@/app/components/service-request/ServiceRequestForm";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: "Request Service",
    description: `Submit a service request to ${company.name}. Tell us what you need and we'll schedule a visit.`,
  };
}

export default async function RequestServicePage() {
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">
      {/* Header */}
      <section
        className="py-16 px-6 text-center text-white"
        style={{ backgroundColor: company.primaryColor }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: company.accentColor }}
          >
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3">
            Request Service
          </h1>
          <p className="text-white/70 text-lg">
            Answer a few quick questions and we&apos;ll get you scheduled fast.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-gray-50 py-14 px-4">
        <ServiceRequestForm
          primaryColor={company.primaryColor}
          accentColor={company.accentColor}
        />
      </section>
    </main>
  );
}
