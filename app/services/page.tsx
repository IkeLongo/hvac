import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { SERVICE_CATEGORIES } from "@/public/services/services";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { StatsBar } from "@/app/components/sections/StatsBar";
import { CtaBanner } from "@/app/components/sections/CtaBanner";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";

const activeServices = (servicesData as Service[]).filter((s) => s.is_active);

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

  // Build category groups: use company service categories if available, else fall back to JSON
  const categoryGroups: { name: string; services: { slug: string; name: string; description: string; imageSrc?: string; imageAlt?: string }[] }[] =
    company.serviceCategories && company.serviceCategories.length > 0
      ? company.serviceCategories
          .map((catSlug) => SERVICE_CATEGORIES[catSlug])
          .filter(Boolean)
          .map((cat) => ({
            name: cat.name,
            services: cat.services.map((s) => ({
              slug: s.slug,
              name: s.name,
              description: s.description,
              imageSrc: s.imageSrc,
              imageAlt: s.imageAlt,
            })),
          }))
      : [{ name: "Our Services", services: activeServices.map((s) => ({ slug: s.slug, name: s.name, description: s.short_description ?? "", imageSrc: s.imageSrc, imageAlt: s.imageAlt })) }];

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

      {/* ── Service card grid, grouped by category ── */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col gap-14">
          {categoryGroups.map((group) => (
            <div key={group.name}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: company.primaryColor }} />
                <h2 className="text-2xl font-black">{group.name}</h2>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden bg-gray-100">
                        {service.imageSrc ? (
                          <Image
                            src={service.imageSrc}
                            alt={service.imageAlt ?? service.name}
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
                              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                            </svg>
                          </div>
                        )}
                        {service.imageSrc && (
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
                            {service.name}
                          </p>
                          {service.description && (
                            <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
                              {service.description}
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
          ))}
        </div>
      </section>

      <StatsBar company={company} />

      <CtaBanner
        company={company}
        headline="Need Help With Your HVAC System?"
        subtext="Schedule your service today in under 60 seconds — or give us a call."
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
