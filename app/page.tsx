import { headers } from "next/headers";
import Image from "next/image";
import { companies } from "@/data/companies";
import { LeadForm } from "@/app/components/LeadForm";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { StatsBar } from "@/app/components/sections/StatsBar";
import { ServicesGrid } from "@/app/components/sections/ServicesGrid";
import { StorySection } from "@/app/components/sections/StorySection";
import { WhyChooseUs } from "@/app/components/sections/WhyChooseUs";
import { ProcessSection } from "@/app/components/sections/ProcessSection";
import { TestimonialsSection } from "@/app/components/sections/TestimonialsSection";
import { FaqSection } from "@/app/components/sections/FaqSection";
import { CtaBanner } from "@/app/components/sections/CtaBanner";
import { CtaSection } from "@/app/components/sections/CtaSection";

const FALLBACK_SLUG = "riverside";

async function getCompany() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  return companies[slug] ?? companies[FALLBACK_SLUG];
}

export default async function Home() {
  const company = await getCompany();

  return (
    <main className="font-sans text-gray-900">

      <HeroSection company={company} />

      <StatsBar company={company} />

      <ServicesGrid company={company} />

      <StorySection company={company} />

      <WhyChooseUs company={company} />

      {/* Image strip */}
      <div className="grid grid-cols-3 h-48 md:h-60">
        {[
          { label: "AC Repair", tint: 0.35, image: "/repairman-in-uniform-installing-the-outside-unit.jpg" },
          { label: "Heating Systems", tint: 0.45, image: "/water-heating-device-installation.jpeg" },
          { label: "Maintenance", tint: 0.35, image: "/indian-male-worker-inspecting-the-air-conditioner.jpg" },
        ].map(({ label, tint, image }) => (
          <div key={label} className="relative overflow-hidden">
            <Image src={image} alt={label} fill className="object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: company.primaryColor, opacity: tint }} />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="text-white font-black text-base md:text-lg drop-shadow-lg">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div id="lead-form">
        <LeadForm
          primaryColor={company.primaryColor}
          accentColor={company.accentColor}
          services={company.services}
        />
      </div>

      <ProcessSection company={company} />

      <TestimonialsSection company={company} />

      <FaqSection company={company} />

      <CtaSection company={company} />

    </main>
  );
}

