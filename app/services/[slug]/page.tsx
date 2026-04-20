import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { companies } from "@/data/companies";
import { SERVICE_CATEGORIES } from "@/public/services/services";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { FaqSection } from "@/app/components/sections/FaqSection";
import { CtaSection } from "@/app/components/sections/CtaSection";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";
import servicePages from "@/lib/data/service-pages";

const services = servicesData as Service[];

const FALLBACK_IMAGES = {
  primary: "/overhead-of-utility-workers-maintaining-outside-ai.jpg",
  secondary: "/hvac-service-repairman.png",
};

const FALLBACK_SLUG = "riverside";

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
      company.serviceCategories?.flatMap((catSlug) =>
        SERVICE_CATEGORIES[catSlug]?.services.map((s) => ({ slug: s.slug })) ?? []
      ) ?? []
  );

  // Include slugs that only exist in the editorial content data
  const contentSlugs = Object.keys(servicePages).map((slug) => ({ slug }));

  const seen = new Set<string>();
  return [...jsonSlugs, ...categorySlugs, ...contentSlugs].filter(({ slug }) => {
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
  const pageContent = servicePages[slug];
  const serviceItem = company.serviceCategories
    ?.flatMap((catSlug) => SERVICE_CATEGORIES[catSlug]?.services ?? [])
    .find((s) => s.slug === slug);
  const jsonService = services.find((s) => s.slug === slug && s.is_active);
  if (!pageContent && !serviceItem && !jsonService) return {};
  const name =
    pageContent?.pageTitle ?? serviceItem?.name ?? jsonService!.name;
  const description =
    pageContent?.pageIntro ??
    serviceItem?.description ??
    jsonService?.short_description ??
    "";
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

  const pageContent = servicePages[slug];
  const serviceItem = company.serviceCategories
    ?.flatMap((catSlug) => SERVICE_CATEGORIES[catSlug]?.services ?? [])
    .find((s) => s.slug === slug);
  const jsonService = services.find((s) => s.slug === slug && s.is_active);

  if (!pageContent && !serviceItem && !jsonService) notFound();

  // ── Resolve display values: content data wins, JSON/company fills gaps ──
  const name =
    pageContent?.pageTitle ?? serviceItem?.name ?? jsonService!.name;

  const pageEyebrow = pageContent?.pageEyebrow;
  const pageIntro =
    pageContent?.pageIntro ??
    serviceItem?.description ??
    jsonService?.short_description;

  const introParagraphs = pageContent?.introParagraphs ?? [];
  const sectionOneTitle = pageContent?.sectionOneTitle;
  const sectionOneBody = pageContent?.sectionOneBody;

  // Inline images: prefer content data, fall back to generic images
  const img0 = pageContent?.inlineImages?.[0] ?? {
    src: FALLBACK_IMAGES.primary,
    alt: `${name} service`,
  };
  const img1 = pageContent?.inlineImages?.[1] ?? {
    src: FALLBACK_IMAGES.secondary,
    alt: `${name} technician`,
  };

  const sectionTwoBody = pageContent?.sectionTwoBody;
  const bulletListTitle = pageContent?.bulletListTitle;
  const bulletItems = pageContent?.bulletItems ?? [];
  const sectionThreeTitle = pageContent?.sectionThreeTitle;
  const sectionThreeBody = pageContent?.sectionThreeBody;
  const faqItems = pageContent?.faqItems ?? [];
  const hasServiceFaqs = faqItems.length > 0;

  // Build sidebar list: all services for this company except the current one
  const sidebarServices: { slug: string; name: string }[] = [];
  const seen = new Set<string>([slug]);
  if (company.serviceCategories && company.serviceCategories.length > 0) {
    for (const catSlug of company.serviceCategories) {
      for (const s of SERVICE_CATEGORIES[catSlug]?.services ?? []) {
        if (!seen.has(s.slug)) {
          sidebarServices.push({ slug: s.slug, name: s.name });
          seen.add(s.slug);
        }
      }
    }
  } else {
    for (const s of services.filter((s) => s.is_active)) {
      if (!seen.has(s.slug)) {
        sidebarServices.push({ slug: s.slug, name: s.name });
        seen.add(s.slug);
      }
    }
  }

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

      {/* ── Two-column editorial layout ── */}
      <div className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_272px] gap-12 lg:gap-16 items-start">

            {/* ── Main content article ── */}
            <article className="min-w-0">

              {/* 1 ── Eyebrow + H1 + Intro ── */}
              {pageEyebrow && (
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: company.primaryColor }}
                >
                  {pageEyebrow}
                </p>
              )}

              <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                {name}
              </h1>

              {/* 2 ── Page intro (lead sentence) ── */}
              {pageIntro && (
                <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
                  {pageIntro}
                </p>
              )}

              {/* 3 ── Intro paragraphs ── */}
              {introParagraphs.length > 0 && (
                <div className="flex flex-col gap-4 mb-10 text-gray-500 leading-relaxed">
                  {introParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {/* 4 ── Section one: title + body ── */}
              {(sectionOneTitle || sectionOneBody) && (
                <div className="mb-8">
                  {sectionOneTitle && (
                    <h2 className="text-xl font-black mb-3">{sectionOneTitle}</h2>
                  )}
                  {sectionOneBody && (
                    <p className="text-gray-500 leading-relaxed">{sectionOneBody}</p>
                  )}
                </div>
              )}

              {/* 5 ── Two inline images ── */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="relative aspect-[4/3] rounded overflow-hidden bg-gray-100">
                  <Image
                    src={img0.src}
                    alt={img0.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative aspect-[4/3] rounded overflow-hidden bg-gray-100">
                  <Image
                    src={img1.src}
                    alt={img1.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* 6 ── Section two body ── */}
              {sectionTwoBody && (
                <p className="text-gray-500 leading-relaxed mb-10">{sectionTwoBody}</p>
              )}

              {/* 7 ── Bullet list ── */}
              {bulletItems.length > 0 && (
                <div className="mb-10">
                  {bulletListTitle && (
                    <h2 className="text-xl font-black mb-4">{bulletListTitle}</h2>
                  )}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bulletItems.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                          style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                        >
                          ✓
                        </span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 8 ── Section three: title + body ── */}
              {(sectionThreeTitle || sectionThreeBody) && (
                <div className="mb-10">
                  {sectionThreeTitle && (
                    <h2 className="text-xl font-black mb-3">{sectionThreeTitle}</h2>
                  )}
                  {sectionThreeBody && (
                    <p className="text-gray-500 leading-relaxed">{sectionThreeBody}</p>
                  )}
                </div>
              )}

              {/* 9 ── Inline FAQs (service-specific) ── */}
              {hasServiceFaqs && (
                <section className="mt-2">
                  <h2 className="text-xl font-black mb-5">Frequently Asked Questions</h2>
                  <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded overflow-hidden">
                    {faqItems.map((faq) => (
                      <details key={faq.question} className="group">
                        <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition">
                          <span className="font-semibold text-sm text-gray-900">
                            {faq.question}
                          </span>
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
              )}

            </article>

            {/* ── Sidebar ── */}
            <aside className="lg:sticky lg:top-8 flex flex-col gap-6">

              {/* Quick CTA */}
              <div
                className="rounded border-2 p-6"
                style={{ borderColor: company.primaryColor }}
              >
                <p className="font-black text-base mb-1">
                  {pageContent?.sidebarTitle ?? "Ready to Book?"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {pageContent?.sidebarDescription ??
                    "Call now or schedule online \u2014 we\u2019ll take it from here."}
                </p>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center justify-center w-full rounded px-4 py-3 text-sm font-bold text-white mb-2 transition hover:opacity-90"
                  style={{ backgroundColor: company.primaryColor }}
                >
                  Call {company.phone}
                </a>
                <a
                  href={pageContent?.ctaHref ?? "/request-service"}
                  className="flex items-center justify-center w-full rounded border px-4 py-3 text-sm font-bold transition hover:bg-gray-50"
                  style={{ borderColor: company.primaryColor, color: company.primaryColor }}
                >
                  {pageContent?.ctaButtonLabel ?? "Schedule Online"}
                </a>
              </div>

              {/* Other services */}
              {sidebarServices.length > 0 && (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: company.primaryColor }}
                  >
                    Other Services
                  </p>
                  <ul className="flex flex-col">
                    {sidebarServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-2.5 py-2.5 px-3 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: company.primaryColor }}
                          />
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* Global FAQ section — only shown when no service-specific FAQs exist */}
      {!hasServiceFaqs && <FaqSection company={company} />}

      <CtaSection company={company} />

    </main>
  );
}
