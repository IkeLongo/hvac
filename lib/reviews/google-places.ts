import type { SiteReview } from "@/lib/types/reviews";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

interface NewPlacesReview {
  name: string;
  rating: number;
  text?: { text: string; languageCode: string };
  authorAttribution?: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime?: string;
}

interface NewPlacesDetailsResponse {
  reviews?: NewPlacesReview[];
  error?: { code: number; message: string; status: string };
}

export async function fetchGoogleReviews(placeId: string): Promise<SiteReview[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  console.log("[google-places] placeId:", placeId);
  console.log("[google-places] API key present:", !!apiKey);

  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set");
  }

  const url = `${PLACES_API_BASE}/${placeId}`;

  console.log("[google-places] requesting:", url, "(key redacted)");

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "reviews",
    },
    next: { revalidate: 3600 },
  });

  console.log("[google-places] HTTP status:", response.status);

  if (!response.ok) {
    const body = await response.text();
    console.log("[google-places] error body:", body);
    throw new Error(`Google Places API (New) request failed: ${response.status}`);
  }

  const data: NewPlacesDetailsResponse = await response.json();

  if (data.error) {
    console.log("[google-places] API error:", data.error.status, "-", data.error.message);
    throw new Error(`Google Places API (New) error: ${data.error.status} — ${data.error.message}`);
  }

  const reviews = data.reviews ?? [];
  console.log("[google-places] total reviews returned:", reviews.length);

  const fiveStarReviews = reviews.filter((r) => r.rating === 5);
  console.log("[google-places] 5-star reviews:", fiveStarReviews.length);

  return fiveStarReviews.map((r, index): SiteReview => {
    const photoUri = r.authorAttribution?.photoUri;
    console.log(`[google-places] review[${index}] author: ${r.authorAttribution?.displayName}, photoUri: ${photoUri ?? "(none)"}`);
    return {
      id: `google-${placeId}-${index}`,
      authorName: r.authorAttribution?.displayName ?? "Anonymous",
      authorImage: photoUri || undefined,
      rating: r.rating,
      text: r.text?.text ?? "",
      source: "google",
    };
  });
}

