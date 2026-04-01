import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import { headers } from "next/headers";
import { getBookingOptionById, getStaticBookingOptions } from "@/lib/ghl/calendars";
import { companies } from "@/data/companies";
import { FaChevronLeft } from "react-icons/fa";

const FALLBACK_SLUG = "alamo-air";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata dynamically based on the booking option
export async function generateMetadata({ params }: BookingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const bookingOption = await getBookingOptionById(id);

  if (!bookingOption) {
    return {
      title: "Booking Not Found",
    };
  }

  return {
    title: `${bookingOption.title} - Book Now`,
    description: bookingOption.description || `Book your ${bookingOption.title} appointment.`,
  };
}

// Generate static params for all booking options (optional, for static generation)
export async function generateStaticParams() {
  const bookingOptions = await getStaticBookingOptions();
  
  return bookingOptions.map((option) => ({
    id: option.id,
  }));
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { id } = await params;
  // console.log(`[Booking] Looking up booking option with id: "${id}"`);
  const bookingOption = await getBookingOptionById(id);
  // console.log(`[Booking] Result:`, bookingOption);

  // Handle not found case
  if (!bookingOption) {
    // console.log(`[Booking] Not found, returning 404`);
    notFound();
  }

  const company = await getCompany();

  // Construct the iframe source URL
  const embedBase = process.env.NEXT_PUBLIC_GHL_EMBED_BASE || "https://links.rivercitycreatives.com/widget/booking";
  const iframeSrc = `${embedBase}/${bookingOption.embedPath}`;
  const iframeId = `ghl-booking-${bookingOption.id}`;

  return (
    <>
      {/* Load GHL embed script */}
      <Script
        src="https://links.rivercitycreatives.com/js/form_embed.js"
        strategy="lazyOnload"
      />

      <main className="font-sans text-gray-900">

        {/* TOP BAR */}
        <div
          className="hidden md:flex items-center justify-between px-8 py-2.5 text-sm border-b border-white/10"
          style={{ backgroundColor: company.primaryColor }}
        >
          <span className="text-white/60">Serving {company.city} &amp; surrounding areas &middot; Licensed &amp; Insured</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${company.phone}`} className="font-bold text-white hover:opacity-80 transition">
              {company.phone}
            </a>
            <a
              href="/#lead-form"
              className="rounded px-4 py-1.5 text-sm font-bold transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Request Service
            </a>
          </div>
        </div>

        {/* HERO HEADER */}
        <section
          className="relative py-10 px-6 text-center text-white"
          style={{ backgroundColor: company.primaryColor }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="mb-5 h-14 w-36 relative mx-auto">
              <Image src={company.logo} alt={`${company.name} logo`} fill className="object-contain" />
            </div>
            <p
              className="text-xs font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: company.accentColor }}
            >
              Schedule Your Service
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              {bookingOption.title}
            </h1>
            {bookingOption.description && (
              <p className="text-lg text-white/70 max-w-xl mx-auto">
                {bookingOption.description}
              </p>
            )}
          </div>
        </section>

        {/* CALENDAR SECTION */}
        <section className="bg-gray-50 py-10 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <div className="mb-8">
              <a
                href="/booking"
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2"
                style={{ color: company.primaryColor }}
              >
                <FaChevronLeft className="w-2.5 h-2.5" />
                Back to all booking options
              </a>
            </div>

            {/* Calendar Embed Container */}
            <div className="bg-white rounded border border-gray-200 shadow-sm p-6 md:p-8">
              <div className="w-full">
                <iframe
                  id={iframeId}
                  src={iframeSrc}
                  style={{
                    width: "100%",
                    border: "none",
                    overflow: "hidden",
                  }}
                  scrolling="no"
                  title={`Book ${bookingOption.title}`}
                  className="min-h-[600px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 px-6" style={{ backgroundColor: company.primaryColor }}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="h-10 w-28 relative">
                <Image src={company.logo} alt={company.name} fill className="object-contain" />
              </div>
              <p className="text-white/40 text-xs">
                &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
              </p>
            </div>
            <a href={`tel:${company.phone}`} className="text-white font-bold text-lg hover:opacity-80 transition">
              {company.phone}
            </a>
          </div>
        </footer>

      </main>
    </>
  );
}
