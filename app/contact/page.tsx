import type { Metadata } from "next";
import { headers } from "next/headers";
import { companies } from "@/data/companies";
import { PageHeader } from "@/app/components/layout/PageHeader";
import { ContactSectionWithShader } from "@/app/components/sections/ContactSection";
import hoursData from "@/lib/chat/data/hours.json";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompany();
  return {
    title: `Contact Us`,
    description: `Get in touch with ${company.name} for HVAC repair, installation, and maintenance in ${company.city}, TX. Call ${company.phone} or send us a message — we respond fast.`,
  };
}

const hours = hoursData as { day: string; open: string; close: string }[];

export default async function ContactPage() {
  const company = await getCompany();

  const contactRows = [
    {
      label: "Phone",
      value: company.phone,
      href: `tel:${company.phone}`,
    },
    {
      label: "Email",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      label: "Address",
      value: `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`,
      href: `https://maps.google.com/?q=${encodeURIComponent(`${company.address.street}, ${company.address.city}, ${company.address.state}`)}`,
    },
  ];

  return (
    <main className="font-sans text-gray-900">

      <PageHeader
        title="Contact Us"
        breadcrumbs={[{ label: "Contact" }]}
        company={company}
      />

      {/* Intro */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.primaryColor }}
          >
            We&apos;re Here to Help
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
            Get in Touch With Our Team
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Whether you need AC repair, a new system installation, seasonal maintenance, or just
            have a question about your HVAC system — {company.name} is ready to help.
            Fill out the form below and our {company.city} team will follow up promptly.
          </p>
        </div>
      </section>

      {/* Shader + LeadForm two-column layout */}
      <ContactSectionWithShader company={company} />

      {/* Contact details + hours */}
      <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact info card */}
          <div className="border border-gray-200 rounded shadow-sm p-8 flex flex-col gap-6">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: company.primaryColor }}
              >
                Reach Us Directly
              </p>
              <h3 className="text-xl font-black">Contact Information</h3>
            </div>

            <div className="flex flex-col gap-4">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 w-9 h-9 rounded shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: company.primaryColor }}
                  >
                    {row.label === "Phone" && (
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" style={{ color: company.accentColor }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    )}
                    {row.label === "Email" && (
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" style={{ color: company.accentColor }}>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {row.label === "Address" && (
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" style={{ color: company.accentColor }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{row.label}</p>
                    <a
                      href={row.href}
                      target={row.label === "Address" ? "_blank" : undefined}
                      rel={row.label === "Address" ? "noopener noreferrer" : undefined}
                      className="text-sm font-semibold text-gray-800 hover:underline"
                      style={{ textDecorationColor: company.primaryColor }}
                    >
                      {row.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Service areas */}
            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Service Areas</p>
              <div className="flex flex-wrap gap-2">
                {company.serviceAreas.map((area) => (
                  <span
                    key={area.slug}
                    className="text-xs font-semibold px-3 py-1 rounded-full border"
                    style={{ borderColor: company.primaryColor, color: company.primaryColor }}
                  >
                    {area.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Business hours card */}
          <div className="border border-gray-200 rounded shadow-sm p-8 flex flex-col gap-6">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: company.primaryColor }}
              >
                When We&apos;re Available
              </p>
              <h3 className="text-xl font-black">Business Hours</h3>
            </div>

            <table className="w-full text-sm">
              <tbody>
                {hours.map((row) => {
                  const isClosed = row.open === "Closed";
                  return (
                    <tr key={row.day} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 pr-4 font-semibold text-gray-700">{row.day}</td>
                      <td className={`py-2.5 text-right font-medium ${isClosed ? "text-gray-400" : "text-gray-900"}`}>
                        {isClosed ? "Closed" : `${row.open} – ${row.close}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              className="rounded p-4 text-sm font-semibold"
              style={{ backgroundColor: company.primaryColor, color: company.neutral1 }}
            >
              24/7 Emergency Service Available — Call us anytime.
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Need Service Sooner?</h2>
          <p className="text-gray-500 mb-8">
            Skip the form — call us now or schedule online in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${company.phone}`}
              className="rounded px-8 py-4 text-lg font-bold shadow transition hover:opacity-90"
              style={{ backgroundColor: company.primaryColor, color: company.neutral1 }}
            >
              Call {company.phone}
            </a>
            <a
              href="/request-service"
              className="rounded border-2 px-8 py-4 text-lg font-bold transition hover:bg-gray-100"
              style={{ borderColor: company.primaryColor, color: company.primaryColor }}
            >
              Book Online
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
