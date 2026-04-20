import Link from "next/link";
import Image from "next/image";
import type { Company } from "@/data/companies";
import type { ServiceItem } from "@/public/services/services";
import { SERVICE_CATEGORIES } from "@/public/services/services";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";

const activeServices = (servicesData as Service[]).filter((s) => s.is_active);

/** Normalised shape used for rendering — works for both ServiceItem and Service */
interface CardData {
  slug: string;
  name: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface ServiceCardProps {
  card: CardData;
  company: Company;
}

function ServiceCard({ card, company }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${card.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-gray-100">
        {card.imageSrc ? (
          <Image
            src={card.imageSrc}
            alt={card.imageAlt ?? card.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: company.neutral1 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-10 h-10 opacity-30"
              stroke={company.primaryColor}
              strokeWidth="1.5"
            >
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 10 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </div>
        )}
        {card.imageSrc && (
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundColor: company.primaryColor }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="font-black text-gray-900 text-base leading-snug">{card.name}</p>
          {card.description && (
            <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
        <span
          className="shrink-0 mt-0.5 text-base font-black transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: company.accentColor }}
        >
          &rarr;
        </span>
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-0.5 w-0 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: company.accentColor }}
      />
    </Link>
  );
}

interface ServicesGridProps {
  company: Company;
  /** Show the "What We Do / How Can We Help?" section heading. Default: true */
  showSectionHeader?: boolean;
}

export function ServicesGrid({ company, showSectionHeader = true }: ServicesGridProps) {
  const hasCategories =
    company.serviceCategories && company.serviceCategories.length > 0;

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {showSectionHeader && (
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
        )}

        {hasCategories ? (
          <div className="flex flex-col gap-14">
            {company.serviceCategories!.map((catSlug) => {
              const category = SERVICE_CATEGORIES[catSlug];
              if (!category) return null;
              return (
                <div key={category.slug}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: company.primaryColor }}
                    />
                    <h3 className="text-2xl font-black">{category.name}</h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.services.map((service: ServiceItem) => (
                      <li key={service.slug}>
                        <ServiceCard
                          card={{
                            slug: service.slug,
                            name: service.name,
                            description: service.description,
                            imageSrc: service.imageSrc,
                            imageAlt: service.imageAlt,
                          }}
                          company={company}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeServices.map((service) => (
              <li key={service.slug}>
                <ServiceCard
                  card={{
                    slug: service.slug,
                    name: service.name,
                    description: service.short_description,
                    imageSrc: service.imageSrc,
                    imageAlt: service.imageAlt,
                  }}
                  company={company}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

