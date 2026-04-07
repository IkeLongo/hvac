import { TestimonialsMasonryGrid } from "@/app/components/testimonials/TestimonialsMasonryGrid";
import { getTestimonials } from "@/lib/reviews/get-testimonials";
import type { Company } from "@/data/companies";

interface TestimonialsSectionProps {
  company: Company;
}

export async function TestimonialsSection({ company }: TestimonialsSectionProps) {
  const testimonials = await getTestimonials(company);
  return (
    <section
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: company.primaryColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.accentColor }}
          >
            What Our Customers Say
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-neutral-100 sm:text-center">
            Loved by thousands of people
          </h2>
        </div>

        <TestimonialsMasonryGrid
          testimonials={testimonials}
          primaryColor={company.primaryColor}
          accentColor={company.accentColor}
        />

        <div className="text-center mt-20">
          <a
            href="#lead-form"
            className="inline-block rounded px-8 py-4 font-bold text-lg transition hover:opacity-90"
            style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
          >
            Join Our Happy Customers
          </a>
        </div>
      </div>
    </section>
  );
}
