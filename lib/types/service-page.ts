export type ServicePageImage = {
  src: string;
  alt: string;
};

export type ServicePageFaq = {
  question: string;
  answer: string;
};

/**
 * Editorial content shape for a service detail page.
 * Drives the main column flow: intro → section one → images → section two
 * → bullet list → section three → FAQs.
 *
 * All fields are optional except `slug` and `pageTitle` so pages can be
 * populated incrementally — the layout falls back gracefully when fields
 * are absent.
 */
export type ServicePageContent = {
  /** Matches the URL slug (e.g. "ac-repair") */
  slug: string;

  /** H1 shown at the top of the main column */
  pageTitle: string;

  /** Small label above the title (e.g. "San Antonio, TX") */
  pageEyebrow?: string;

  /** One-sentence summary shown directly under the title */
  pageIntro?: string;

  /** 1–2 short opening paragraphs */
  introParagraphs?: string[];

  // ── Section one ──────────────────────────────────────────────────────────
  sectionOneTitle?: string;
  sectionOneBody?: string;

  // ── Inline images (pair) ─────────────────────────────────────────────────
  inlineImages?: [ServicePageImage, ServicePageImage];

  // ── Section two ──────────────────────────────────────────────────────────
  sectionTwoBody?: string;

  // ── Bullet list ──────────────────────────────────────────────────────────
  bulletListTitle?: string;
  bulletItems?: string[];

  // ── Section three ────────────────────────────────────────────────────────
  sectionThreeTitle?: string;
  sectionThreeBody?: string;

  // ── FAQs ─────────────────────────────────────────────────────────────────
  faqItems?: ServicePageFaq[];

  // ── Sidebar overrides ────────────────────────────────────────────────────
  /** Heading shown above the sidebar CTA card */
  sidebarTitle?: string;
  /** Supporting copy inside the sidebar CTA card */
  sidebarDescription?: string;

  // ── Sidebar / bottom CTA ─────────────────────────────────────────────────
  ctaTitle?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaHref?: string;
};
