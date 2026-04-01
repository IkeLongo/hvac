import servicesData from "@/lib/chat/data/services.json";
import faqsData from "@/lib/chat/data/faqs.json";
import routesData from "@/lib/chat/data/routes.json";
import recommendationsData from "@/lib/chat/data/recommendations.json";

export type ChatServiceRow = {
  id: number;
  name: string;
  short_description: string;
  long_description: string | null;
  starting_price: number | null;
  pricing_notes: string | null;
  timeline_notes: string | null;
  ideal_for: string | null;
  cta_text: string | null;
  route_id: number | null;
  route_label: string | null;
  route_path: string | null;
  route_full_url: string | null;
};

export type ChatFaqRow = {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  related_service_id: number | null;
};

export type ChatRecommendationRow = {
  id: number;
  trigger_phrase: string;
  problem_summary: string | null;
  recommendation_reason: string | null;
  priority: number;
  service_id: number;
  service_name: string;
  short_description: string;
  starting_price: number | null;
  pricing_notes: string | null;
  cta_text: string | null;
  route_label: string | null;
  route_path: string | null;
  route_full_url: string | null;
};

export type ChatRouteRow = {
  id: number;
  label: string;
  path: string;
  full_url: string | null;
  purpose: string | null;
};

// Typed casts of the imported JSON
const services = servicesData as (ChatServiceRow & { is_active: boolean; sort_order: number })[];
const faqs = faqsData as (ChatFaqRow & { is_active?: boolean })[];
const routes = routesData as (ChatRouteRow & { is_active: boolean })[];

type RawRecommendation = {
  id: number;
  trigger_phrase: string;
  problem_summary: string | null;
  recommendation: string | null;
  recommended_service_id: number;
};

const recommendations = recommendationsData as RawRecommendation[];

function contains(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export async function getActiveServices(): Promise<ChatServiceRow[]> {
  return services
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
}

export async function searchFaqs(userMessage: string): Promise<ChatFaqRow[]> {
  return faqs
    .filter(
      (f) =>
        contains(f.question, userMessage) ||
        contains(f.answer, userMessage) ||
        (f.category !== null && contains(f.category, userMessage))
    )
    .slice(0, 5);
}

export async function searchRoutes(userMessage: string): Promise<ChatRouteRow[]> {
  return routes
    .filter(
      (r) =>
        r.is_active &&
        (contains(r.label, userMessage) ||
          (r.purpose !== null && contains(r.purpose, userMessage)) ||
          contains(r.path, userMessage))
    )
    .slice(0, 5);
}

export async function matchRecommendations(
  userMessage: string
): Promise<ChatRecommendationRow[]> {
  const msg = userMessage.toLowerCase();

  const matched = recommendations
    .filter(
      (rec) =>
        msg.includes(rec.trigger_phrase.toLowerCase()) ||
        rec.trigger_phrase.toLowerCase().includes(msg)
    )
    .slice(0, 3);

  return matched.flatMap((rec): ChatRecommendationRow[] => {
    const service = services.find(
      (s) => s.id === rec.recommended_service_id && s.is_active
    );
    if (!service) return [];

    return [
      {
        id: rec.id,
        trigger_phrase: rec.trigger_phrase,
        problem_summary: rec.problem_summary,
        recommendation_reason: rec.recommendation,
        priority: 0,
        service_id: service.id,
        service_name: service.name,
        short_description: service.short_description,
        starting_price: service.starting_price,
        pricing_notes: service.pricing_notes,
        cta_text: service.cta_text,
        route_label: service.route_label,
        route_path: service.route_path,
        route_full_url: service.route_full_url,
      },
    ];
  });
}

export async function searchServices(userMessage: string): Promise<ChatServiceRow[]> {
  return services
    .filter(
      (s) =>
        s.is_active &&
        (contains(s.name, userMessage) ||
          contains(s.short_description, userMessage) ||
          (s.long_description !== null && contains(s.long_description, userMessage)) ||
          (s.ideal_for !== null && contains(s.ideal_for, userMessage)) ||
          (s.pricing_notes !== null && contains(s.pricing_notes, userMessage)))
    )
    .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name))
    .slice(0, 5);
}