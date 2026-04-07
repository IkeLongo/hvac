"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
import { ReviewModal } from "./ReviewModal";
import { dummyTestimonials } from "./testimonials-data";

const TRUNCATE_MAX = 220;

function truncateReview(text: string, max: number): { display: string; isTruncated: boolean } {
  if (text.length <= max) return { display: text, isTruncated: false };
  const cut = text.lastIndexOf(" ", max);
  return { display: text.slice(0, cut > 0 ? cut : max) + "…", isTruncated: true };
}

export function TestimonialsMasonryGrid({
  testimonials: reviewsProp,
  primaryColor,
  accentColor,
}: {
  testimonials?: Testimonial[];
  primaryColor?: string;
  accentColor?: string;
} = {}) {
  const data = reviewsProp ?? dummyTestimonials;
  const [selected, setSelected] = useState<Testimonial | null>(null);

  const first = data.slice(0, 3);
  const second = data.slice(3, 6);
  const third = data.slice(6, 9);
  const fourth = data.slice(9, 12);

  const grid = [first, second, third, fourth];
  return (
    <div className="">
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 items-start gap-4 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {grid.map((testimonialsCol, index) => (
          <div
            key={`testimonials-col-${index}`}
            className="grid items-start gap-4"
          >
            {testimonialsCol.map((testimonial) => {
              const { display, isTruncated } = truncateReview(testimonial.quote, TRUNCATE_MAX);
              return (
                <Card
                  key={`testimonial-${testimonial.src}-${index}`}
                  onClick={() => setSelected(testimonial)}
                  clickable
                >
                  <Quote>
                    {display}
                    {isTruncated && (
                      <button
                        className="ml-1 text-xs font-semibold not-italic text-white/50 hover:text-white/80 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setSelected(testimonial); }}
                        aria-label="Read full review"
                      >
                        Read more
                      </button>
                    )}
                  </Quote>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={12}
                        className={i < (testimonial.rating ?? 5) ? "text-yellow-400" : "text-white/20"}
                      />
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-2">
                    {testimonial.src ? (
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.removeAttribute("hidden");
                        }}
                      />
                    ) : (
                      <FaUserCircle size={40} className="text-white/30 shrink-0" />
                    )}
                    <div className="flex flex-col">
                      <QuoteDescription>{testimonial.name}</QuoteDescription>
                      <QuoteDescription className="text-[10px]">
                        {testimonial.designation}
                      </QuoteDescription>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>

      {selected && (
        <ReviewModal
          testimonial={selected}
          onClose={() => setSelected(null)}
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
      )}
    </div>
  );
}
export const Card = ({
  className,
  children,
  onClick,
  clickable,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative rounded-xl border border-white/20 bg-white/10 p-8",
        clickable && "cursor-pointer hover:bg-white/15 transition-colors",
        className,
      )}
    >
      <FaQuoteLeft className="absolute top-2 left-2 text-white/30" />
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "relative py-2 text-base font-normal text-white/80 italic",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "max-w-sm text-xs font-normal text-white/60",
        className,
      )}
    >
      {children}
    </p>
  );
};

export interface Testimonial {
  src?: string;
  quote: string;
  name: string;
  designation?: string;
  rating?: number;
}
