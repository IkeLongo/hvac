import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { PageHeader } from "@/app/components/layout/PageHeader";
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
    title: `Areas We Serve in ${company.city}, TX`,
    description: `${company.name} provides HVAC repair, installation, and maintenance across ${company.city} and surrounding areas. Find your neighborhood and schedule service today.`,
  };
}

export default async function ServiceAreasPage() {
  const company = await getCompany();

  const areas = company.serviceAreas
    .map((slug) => ({ slug, area: SERVICE_AREAS[slug] }))
    .filter((x): x is { slug: string; area: NonNullable<typeof x.area> } => !!x.area);

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title="Areas We Serve"
        breadcrumbs={[{ label: "Service Areas" }]}
        company={company}
      />

      {/* ── Intro ── */}
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

      {/* ── Coverage map placeholder ── */}
      <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center"
            style={{ minHeight: 220, backgroundColor: company.neutral1 }}
          >
            {/* Background dot grid */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill={company.neutral2} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>

            {/* Map pin cluster (decorative) */}
            <div className="relative z-10 flex flex-col items-center gap-3 py-10 px-6 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: company.primaryColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="font-black text-lg" style={{ color: company.primaryColor }}>
                  {areas.length} Service Areas
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Covering {company.city} and the surrounding region
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-1 max-w-lg">
                {areas.slice(0, 6).map(({ slug, area }) => (
                  <span
                    key={slug}
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: company.neutral2, color: company.primaryColor }}
                  >
                    {area.name}
                  </span>
                ))}
                {areas.length > 6 && (
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: company.neutral2, color: company.primaryColor }}
                  >
                    +{areas.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Area cards grid ── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map(({ slug, area }) => (
              <li key={slug}>
                <Link
                  href={`/service-areas/${slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {area.heroImage?.src ? (
                      <Image
                        src={area.heroImage.src}
                        alt={area.heroImage.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: company.neutral1 }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 opacity-30" stroke={company.primaryColor} strokeWidth="1.5">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      </div>
                    )}
                    {/* Color overlay */}
                    {area.heroImage?.src && (
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{ backgroundColor: company.primaryColor }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-start justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <p className="font-black text-gray-900 text-base leading-snug">
                        {area.name}
                      </p>
                      {area.blurb && (
                        <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {area.blurb}
                        </p>
                      )}
                    </div>
                    <span
                      className="shrink-0 mt-0.5 text-base font-black transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: company.accentColor }}
                    >
                      →
                    </span>
                  </div>

                  {/* Bottom accent bar */}
                  <div
                    className="h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: company.accentColor }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection company={company} />

    </main>
  );
}

