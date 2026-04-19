"use client";

import { useMemo, useState } from "react";
import type { Company } from "@/data/companies";
import { getRandomItems } from "@/lib/utils";
import faqsData from "@/lib/chat/data/faqs.json";

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs = faqsData as Faq[];

interface FaqSectionProps {
  company: Company;
}

export function FaqSection({ company }: FaqSectionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  // Select 6 FAQs once per component mount; stable across re-renders.
  const displayedFaqs = useMemo(() => getRandomItems(faqs, 6), []);

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.primaryColor }}
          >
            Questions &amp; Answers
          </p>
          <h2 className="text-3xl md:text-4xl font-black">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {displayedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-gray-200 rounded shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-black transition-transform"
                    style={{
                      backgroundColor: company.primaryColor,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
