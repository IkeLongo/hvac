import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { CtaBanner } from "@/app/components/sections/CtaBanner";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: `Areas We Serve in ${company.city}, TX`,
    description: `${company.name} provides HVAC repair, installation, and maintenance across ${company.city} and surrounding areas. Find your neighborhood and schedule service today.`,
  };
}

export default async function ServiceAreasPage() {
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title="Areas We Serve"
        breadcrumbs={[{ label: "Service Areas" }]}
        company={company}
      />

      {/* Intro */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.primaryColor }}
          >
            Local HVAC Coverage
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
            Serving Homeowners Across {company.city} and Beyond
          </h2>
          <p className="text-gray-500 leading-relaxed">
            {company.name} provides heating and cooling service throughout {company.city} and the
            surrounding communities. Select your area below to learn more about local service
            availability, common HVAC concerns in your neighborhood, and how we can help.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {company.serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md hover:border-transparent"
                  style={{ ["--hover-border" as string]: company.accentColor }}
                >
                  <span className="font-semibold text-gray-900 group-hover:underline">
                    {area.name}
                  </span>
                  <span
                    className="shrink-0 text-sm font-black"
                    style={{ color: company.accentColor }}
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        company={company}
        headline="Don't See Your Area?"
        subtext={`Give us a call — we may still be able to help. ${company.name} works with homeowners throughout the greater ${company.city} area.`}
        features={[
          "Fast response times",
          "Licensed & insured technicians",
          "Upfront pricing, no surprises",
          "Same-day appointments available",
        ]}
      />

    </main>
  );
}
