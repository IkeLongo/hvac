import type { SiteReview } from "@/lib/types/reviews";

export interface GooglePlacesReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  author_url?: string;
}

export function mapGoogleReview(
  review: GooglePlacesReview,
  index: number
): SiteReview {
  return {
    id: `google-${review.time}-${index}`,
    authorName: review.author_name,
    authorImage: review.profile_photo_url ?? undefined,
    rating: review.rating,
    text: review.text,
    source: "google",
  };
}

export function mapGoogleReviews(reviews: GooglePlacesReview[]): SiteReview[] {
  return reviews.map(mapGoogleReview);
}
