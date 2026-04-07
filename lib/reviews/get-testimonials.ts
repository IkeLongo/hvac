import type { Company } from "@/data/companies";
import type { Testimonial } from "@/app/components/testimonials/TestimonialsMasonryGrid";
import { fetchGoogleReviews } from "./google-places";
import { dummyTestimonials } from "@/app/components/testimonials/testimonials-data";

function siteReviewToTestimonial(review: Awaited<ReturnType<typeof fetchGoogleReviews>>[number]): Testimonial {
  return {
    name: review.authorName,
    quote: review.text,
    src: review.authorImage,
    designation: "Verified Google Review",
    rating: review.rating,
  };
}

export async function getTestimonials(company: Company): Promise<Testimonial[]> {
  console.log("[get-testimonials] company.googlePlaceId:", company.googlePlaceId ?? "(not set)");

  if (company.googlePlaceId) {
    try {
      const reviews = await fetchGoogleReviews(company.googlePlaceId);
      console.log("[get-testimonials] mapped reviews count:", reviews.length);

      if (reviews.length > 0) {
        const googleTestimonials = reviews.map(siteReviewToTestimonial);
        // Fill the rest of the grid with dummy reviews that don't duplicate a real reviewer name
        const googleNames = new Set(googleTestimonials.map((r) => r.name));
        const filler = dummyTestimonials.filter((d) => !googleNames.has(d.name));
        const merged = [...googleTestimonials, ...filler];
        console.log("[get-testimonials] merged total (google + filler):", merged.length);
        return merged;
      }

      console.log("[get-testimonials] 0 reviews returned — falling back to dummy data");
    } catch (err) {
      console.error("[get-testimonials] fetch failed — falling back to dummy data. Error:", err);
    }
  } else {
    console.log("[get-testimonials] no googlePlaceId — using dummy data");
  }

  return dummyTestimonials;
}
