import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { companies } from "@/data/companies";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { CtaBanner } from "@/app/components/sections/CtaBanner";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export async function generateStaticParams() {
  const seen = new Set<string>();
  const params: { slug: string }[] = [];
  for (const company of Object.values(companies)) {
    for (const slug of company.serviceAreas) {
      if (!seen.has(slug)) {
        seen.add(slug);
        params.push({ slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany();
  const areaContent = SERVICE_AREAS[slug];
  if (!areaContent) return {};
  return {
    title: areaContent.metaTitle ?? `HVAC Service in ${areaContent.name} | ${company.name}`,
    description:
      areaContent.metaDescription ??
      `${company.name} provides HVAC repair and installation in ${areaContent.name}. Call today.`,
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompany();

  const areaContent = SERVICE_AREAS[slug];

  if (!areaContent || !company.serviceAreas.includes(slug)) notFound();

  // Build sidebar list: all other service areas for this company
  const otherAreas = company.serviceAreas.filter((s) => s !== slug);

  // Build a lookup so nearby area pills can be linked when the area exists in this company
  const areaSlugByName = new Map(
    company.serviceAreas.map((s) => [SERVICE_AREAS[s]?.name.toLowerCase() ?? s, s])
  );

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title={areaContent.headline}
        breadcrumbs={[
          { label: "Service Areas", href: "/service-areas" },
          { label: areaContent.name },
        ]}
        company={company}
      />

      {/* ── Two-column editorial layout ── */}
      <div className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_272px] gap-12 lg:gap-16 items-start">

            {/* ── Main article ── */}
            <article className="min-w-0">

              {/* Eyebrow + H1 + lead intro */}
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: company.primaryColor }}
              >
                {areaContent.name}, TX
              </p>
              <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                {areaContent.headline}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
                {areaContent.intro}
              </p>

              {/* Hero image */}
              {areaContent.heroImage?.src ? (
                <div className="relative w-full aspect-[16/9] rounded overflow-hidden bg-gray-100 mb-10">
                  <Image
                    src={areaContent.heroImage.src}
                    alt={areaContent.heroImage.alt}
                    fill
                    sizes="(min-width: 1280px) 1000px, (min-width: 768px) 100vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div
                  className="w-full aspect-[16/9] rounded mb-10 flex items-center justify-center"
                  style={{ backgroundColor: company.neutral1 }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: company.primaryColor, opacity: 0.4 }}
                  >
                    {areaContent.name} — photo coming soon
                  </span>
                </div>
              )}

              {/* Area context */}
              <div className="mb-10">
                <h2 className="text-xl font-black mb-3">About {areaContent.name}</h2>
                <p className="text-gray-500 leading-relaxed">{areaContent.areaContext}</p>
              </div>

              {/* Common problems + service highlights — two-col on md+ */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <h2 className="text-xl font-black mb-4">
                    Common HVAC Issues in {areaContent.name}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {areaContent.commonProblems.map((problem, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                          style={{ backgroundColor: company.neutral2, color: company.primaryColor }}
                        >
                          !
                        </span>
                        <span className="text-sm text-gray-700 leading-relaxed">{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black mb-4">
                    Services Available in {areaContent.name}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {areaContent.serviceHighlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                          style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                        >
                          ✓
                        </span>
                        <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Why choose us */}
              <div className="mb-10">
                <h2 className="text-xl font-black mb-4">
                  Why {areaContent.name} Homeowners Choose {company.name}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {areaContent.whyChooseUs.map((reason, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                        style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                      >
                        ✓
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby areas — linked when a matching slug exists */}
              {areaContent.nearbyAreas.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl font-black mb-4">Nearby Areas We Also Serve</h2>
                  <ul className="flex flex-wrap gap-2">
                    {areaContent.nearbyAreas.map((nearby) => {
                      const nearbySlug = areaSlugByName.get(nearby.toLowerCase());
                      return nearbySlug ? (
                        <li key={nearby}>
                          <Link
                            href={`/service-areas/${nearbySlug}`}
                            className="inline-block rounded-full border px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                            style={{ borderColor: company.neutral2 }}
                          >
                            {nearby}
                          </Link>
                        </li>
                      ) : (
                        <li key={nearby}>
                          <span
                            className="inline-block rounded-full border px-4 py-1.5 text-sm font-semibold text-gray-500"
                            style={{ borderColor: company.neutral2 }}
                          >
                            {nearby}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* FAQs — native details/summary */}
              <section>
                <h2 className="text-xl font-black mb-5">
                  HVAC FAQs for {areaContent.name} Homeowners
                </h2>
                <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded overflow-hidden">
                  {areaContent.faqs.map((faq, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition">
                        <span className="font-semibold text-sm text-gray-900">{faq.question}</span>
                        <span
                          className="text-lg font-black shrink-0 transition-transform group-open:rotate-45"
                          style={{ color: company.primaryColor }}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-2">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

            </article>

            {/* ── Sidebar ── */}
            <aside className="lg:sticky lg:top-8 flex flex-col gap-6">

              {/* CTA card */}
              <div
                className="rounded border-2 p-6"
                style={{ borderColor: company.primaryColor }}
              >
                <p className="font-black text-base mb-1">{areaContent.ctaHeading}</p>
                <p className="text-sm text-gray-500 mb-4">{areaContent.ctaText}</p>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center justify-center w-full rounded px-4 py-3 text-sm font-bold text-white mb-2 transition hover:opacity-90"
                  style={{ backgroundColor: company.primaryColor }}
                >
                  Call {company.phone}
                </a>
                <a
                  href="/request-service"
                  className="flex items-center justify-center w-full rounded border px-4 py-3 text-sm font-bold transition hover:bg-gray-50"
                  style={{ borderColor: company.primaryColor, color: company.primaryColor }}
                >
                  Schedule Online
                </a>
              </div>

              {/* Other service areas */}
              {otherAreas.length > 0 && (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: company.primaryColor }}
                  >
                    Other Service Areas
                  </p>
                  <ul className="flex flex-col">
                    {otherAreas.map((s) => {
                      const a = SERVICE_AREAS[s];
                      return (
                        <li key={s}>
                          <Link
                            href={`/service-areas/${s}`}
                            className="flex items-center gap-2.5 py-2.5 px-3 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: company.primaryColor }}
                            />
                            {a?.name ?? s}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* All services link */}
              <div
                className="rounded p-4 text-center"
                style={{ backgroundColor: company.neutral1 }}
              >
                <p className="text-xs text-gray-500 mb-2">Looking for a specific service?</p>
                <Link
                  href="/services"
                  className="text-sm font-bold underline underline-offset-2"
                  style={{ color: company.primaryColor }}
                >
                  View All HVAC Services →
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </div>

      <CtaBanner
        company={company}
        headline={areaContent.ctaHeading}
        subtext={areaContent.ctaText}
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
