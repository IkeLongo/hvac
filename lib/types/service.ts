/** Matches the shape of lib/chat/data/services.json */
export type Service = {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  starting_price: number;
  pricing_notes: string;
  ideal_for: string;
  benefits: string[];
  route_path: string;
  is_active: boolean;
  imageSrc?: string;
  imageAlt?: string;
};
