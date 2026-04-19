import Link from "next/link";
import Image from "next/image";
import { type JSX } from "react";
import { cn } from "@/lib/utils";
import type { Company, ServiceItem } from "@/data/companies";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";

const SERVICE_ICONS: Record<string, JSX.Element> = {
  "ac-repair": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  ),
  "heater-furnace-repair": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1-7h-2V7h2v2z" />
      <path d="M8.5 8.5c.5-1 1.5-2 3.5-2s3 1 3.5 2c.5 1 0 2-.5 2.5-.5.5-1 1-1 2" />
    </svg>
  ),
  "system-installation": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "seasonal-maintenance": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  "duct-cleaning-air-quality": (
    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M8 12h8M7 9l2 3-2 3M17 9l-2 3 2 3" />
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const activeServices = (servicesData as Service[]).filter((s) => s.is_active);

/** Normalised shape used for rendering — works for both ServiceItem and Service */
interface CardData {
  slug: string;
  name: string;
  description: string;
  isFeatured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

interface ServiceCardProps {
  card: CardData;
  company: Company;
}

function ServiceCard({ card, company }: ServiceCardProps) {
  const hasImage = !!card.imageSrc;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded flex flex-col shadow-sm",
        card.isFeatured ? "border-2" : "border border-gray-200",
        !hasImage && "bg-white",
      )}
      style={card.isFeatured ? { borderColor: company.primaryColor } : undefined}
    >
      {/* Background image + overlay */}
      {hasImage && (
        <>
          <Image
            src={card.imageSrc!}
            alt={card.imageAlt ?? card.name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: company.primaryColor, opacity: 0.82 }}
          />
        </>
      )}

      {/* Featured badge */}
      {card.isFeatured && (
        <span
          className="absolute top-4 right-4 z-10 text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{
            backgroundColor: hasImage ? company.accentColor : company.primaryColor,
            color: hasImage ? company.primaryColor : "white",
          }}
        >
          Popular
        </span>
      )}

      {/* Card content */}
      <div className="relative z-10 p-7 flex flex-col gap-4 flex-1">
        <div
          className="w-14 h-14 flex items-center justify-center rounded shrink-0"
          style={{
            backgroundColor: hasImage ? company.accentColor : company.primaryColor,
            color: hasImage ? company.primaryColor : company.accentColor,
          }}
        >
          {SERVICE_ICONS[card.slug] ?? FALLBACK_ICON}
        </div>
        <h4 className={cn("text-xl font-black", hasImage ? "text-white" : "text-gray-900")}>
          {card.name}
        </h4>
        <p
          className={cn(
            "text-sm leading-relaxed flex-1",
            hasImage ? "text-white/80" : "text-gray-500",
          )}
        >
          {card.description}
        </p>
        <Link
          href={`/services/${card.slug}`}
          className="text-sm font-bold inline-flex items-center gap-1 transition-all hover:gap-2"
          style={{ color: hasImage ? company.accentColor : company.primaryColor }}
        >
          Learn More &rarr;
        </Link>
      </div>
    </div>
  );
}

interface ServicesGridProps {
  company: Company;
}

export function ServicesGrid({ company }: ServicesGridProps) {
  const hasCategories =
    company.serviceCategories && company.serviceCategories.length > 0;

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.primaryColor }}
          >
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3">How Can We Help?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From emergency repairs to scheduled maintenance, we handle it all.
          </p>
        </div>

        {hasCategories ? (
          <div className="flex flex-col gap-14">
            {company.serviceCategories!.map((category) => (
              <div key={category.slug}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: company.primaryColor }}
                  />
                  <h3 className="text-2xl font-black">{category.name}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service: ServiceItem) => (
                    <ServiceCard
                      key={service.slug}
                      card={{
                        slug: service.slug,
                        name: service.name,
                        description: service.description,
                        isFeatured: service.isFeatured,
                        imageSrc: service.imageSrc,
                        imageAlt: service.imageAlt,
                      }}
                      company={company}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map((service) => (
              <ServiceCard
                key={service.slug}
                card={{
                  slug: service.slug,
                  name: service.name,
                  description: service.short_description,
                  imageSrc: service.imageSrc,
                  imageAlt: service.imageAlt,
                }}
                company={company}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

