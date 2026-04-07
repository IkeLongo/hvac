import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany();
  const detail = company.serviceAreaDetails?.[slug];
  if (!detail) return {};
  return {
    title: detail.metaTitle ?? `HVAC Service in ${slug} | ${company.name}`,
    description:
      detail.metaDescription ??
      `${company.name} provides HVAC repair and installation in ${slug}. Call today.`,
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompany();

  // Lookup: must exist in both serviceAreas AND serviceAreaDetails
  const area = company.serviceAreas.find((a) => a.slug === slug);
  const detail = company.serviceAreaDetails?.[slug];

  if (!area || !detail) notFound();

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title={detail.headline}
        breadcrumbs={[
          { label: "Service Areas", href: "/service-areas" },
          { label: area.name },
        ]}
        company={company}
      />

      {/* Hero / Intro */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.primaryColor }}
          >
            {area.name}, TX
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
            {detail.subheadline}
          </h2>
          <p className="text-gray-500 leading-relaxed">{detail.intro}</p>
        </div>
      </section>

      {/* Area Context */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.primaryColor }}
          >
            About {area.name}
          </h3>
          <p className="text-gray-700 leading-relaxed">{detail.areaContext}</p>
        </div>
      </section>

      {/* Common Problems + Service Highlights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-lg font-black mb-4">
              Common HVAC Issues in {area.name}
            </h3>
            <ul className="flex flex-col gap-3">
              {detail.commonProblems.map((problem, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span
                    className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: company.neutral2, color: company.primaryColor }}
                  >
                    !
                  </span>
                  {problem}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4">
              Services Available in {area.name}
            </h3>
            <ul className="flex flex-col gap-3">
              {detail.serviceHighlights.map((highlight, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span
                    className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                  >
                    ✓
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-black mb-6">
            Why {area.name} Homeowners Choose {company.name}
          </h3>
          <ul className="flex flex-col gap-3">
            {detail.whyChooseUs.map((reason, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span
                  className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                >
                  ✓
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-black mb-4">Nearby Areas We Also Serve</h3>
          <ul className="flex flex-wrap gap-3">
            {detail.nearbyAreas.map((nearby, i) => (
              <li
                key={i}
                className="rounded-full border px-4 py-1.5 text-sm font-semibold text-gray-700"
                style={{ borderColor: company.neutral2 }}
              >
                {nearby}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs — native details/summary, no JS required */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: company.primaryColor }}
            >
              Questions &amp; Answers
            </p>
            <h3 className="text-2xl md:text-3xl font-black">
              HVAC FAQs for {area.name} Homeowners
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {detail.faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded shadow-sm bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition list-none">
                  <span>{faq.question}</span>
                  <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-black text-white"
                    style={{ backgroundColor: company.primaryColor }}
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-3 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        company={company}
        headline={detail.ctaHeading}
        subtext={detail.ctaText}
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
