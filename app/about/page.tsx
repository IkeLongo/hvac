import type { Metadata } from "next";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { StorySection } from "@/app/components/sections/StorySection";
import { StatsBar } from "@/app/components/sections/StatsBar";
import { WhyChooseUs } from "@/app/components/sections/WhyChooseUs";
import { ProcessSection } from "@/app/components/sections/ProcessSection";
import { TestimonialsSection } from "@/app/components/sections/TestimonialsSection";
import { FaqSection } from "@/app/components/sections/FaqSection";
import { CtaBanner } from "@/app/components/sections/CtaBanner";
import { TeamSectionWithLightBackground } from "../components/sections/TeamSection";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: `About ${company.name}`,
    description: `${company.about.body.slice(0, 155)}…`,
  };
}

export default async function AboutPage() {
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">

      {/* 1. Page Header */}
      <PageHeader
        title="About Us"
        breadcrumbs={[{ label: "About" }]}
        company={company}
      />

      {/* 2. Mission hook — small accent strip above StorySection */}
      {/* <section className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg sm:text-xl font-black text-gray-900 max-w-2xl leading-snug">
            Reliable HVAC Service Backed by{" "}
            <span style={{ color: company.primaryColor }}>Local Experience.</span>
          </p>
          <a
            href={`tel:${company.phone}`}
            className="shrink-0 inline-flex items-center gap-2 rounded px-6 py-3 font-bold text-sm shadow transition hover:opacity-90"
            style={{ backgroundColor: company.primaryColor, color: "white" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {company.phone}
          </a>
        </div>
      </section> */}
      <TeamSectionWithLightBackground company={company} />

      {/* 4. Stats — trust metrics */}
      <StatsBar company={company} />

      {/* 3. Story — who we are, body copy, years badge */}
      <StorySection company={company} />

      {/* 5. Core commitments — 3 cards derived from company data */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: company.primaryColor }}
            >
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-black">
              Our Promise to Every Customer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Local expertise */}
            <div className="rounded border border-gray-100 shadow-sm p-7 flex flex-col gap-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: company.primaryColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" style={{ color: company.accentColor }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="font-black text-lg">Rooted in {company.city}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We live and work in the same community we serve. That means faster response times, genuine accountability, and a real stake in your neighborhood.
              </p>
            </div>

            {/* Transparent pricing */}
            <div className="rounded border border-gray-100 shadow-sm p-7 flex flex-col gap-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: company.primaryColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" style={{ color: company.accentColor }}>
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="font-black text-lg">No Surprises on the Bill</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every job starts with a written quote you approve. The price we quote is the price you pay — no hidden labor padding, no last-minute add-ons.
              </p>
            </div>

            {/* Qualified team */}
            <div className="rounded border border-gray-100 shadow-sm p-7 flex flex-col gap-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: company.primaryColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" style={{ color: company.accentColor }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="font-black text-lg">Certified, Background-Checked</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every technician is NATE-certified, fully licensed, and background-checked. When we send someone to your home, we&apos;d send them to ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <WhyChooseUs company={company} />

      {/* 7. Process */}
      <ProcessSection company={company} />

      {/* 8. Credentials strip */}
      <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-center text-xs font-bold uppercase tracking-widest mb-7"
            style={{ color: company.primaryColor }}
          >
            Credentials &amp; Certifications
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {company.certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold"
                style={{ borderColor: company.primaryColor, color: company.primaryColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <TestimonialsSection company={company} />

      {/* 10. FAQs */}
      <FaqSection company={company} />

      {/* 11. Closing CTA */}
      <CtaBanner
        company={company}
        headline="Ready to Work With a Team You Can Trust?"
        subtext={`${company.name} has been keeping ${company.city} homes comfortable for ${company.about.yearsExperience}+ years. Schedule your service today.`}
        features={[
          "Licensed & insured technicians",
          "Same-day availability",
          "Written quote before any work",
          "Satisfaction guaranteed",
        ]}
      />

    </main>
  );
}
