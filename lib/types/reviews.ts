export type ReviewSource = "google" | "manual";

export interface SiteReview {
  id: string;
  authorName: string;
  authorImage?: string;
  rating: number;
  text: string;
  source: ReviewSource;
}
