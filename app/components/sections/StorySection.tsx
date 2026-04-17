import Image from "next/image";
import type { Company } from "@/data/companies";

interface StorySectionProps {
  company: Company;
}

export function StorySection({ company }: StorySectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: company.primaryColor }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative h-72 md:h-96 rounded overflow-hidden shadow-lg">
          <Image
            src="/overhead-of-utility-workers-maintaining-outside-ai.jpg"
            alt="Our team serving the area"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="text-white">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: company.accentColor }}
          >
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
            {company.about.headline}
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            {company.about.body}
          </p>
          <div className="flex flex-col max-w-sm md:max-w-md md:flex-row gap-3 mt-2">
            {company.about.yearsExperience > 0 && (
              <div
                className="flex items-center justify-center gap-3 rounded px-5 py-3.5"
                style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
              >
                <span className="text-3xl font-black">{company.about.yearsExperience}+</span>
                <span className="text-sm font-bold leading-tight">Years of<br />Trusted Service</span>
              </div>
            )}
            <a
              href="/booking"
              className="flex items-center justify-center rounded px-7 py-3.5 font-bold border-2 border-white/40 text-white hover:bg-white/10 transition"
            >
              Schedule a Visit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
