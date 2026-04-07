"use client";

import { useEffect, useRef } from "react";
import { FaStar, FaTimes, FaUserCircle } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import type { Testimonial } from "./TestimonialsMasonryGrid";

interface ReviewModalProps {
  testimonial: Testimonial;
  onClose: () => void;
  primaryColor?: string;
  accentColor?: string;
}

export function ReviewModal({ testimonial, onClose, primaryColor = "#0c2244", accentColor }: ReviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Trap scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="relative flex flex-col w-full max-w-lg max-h-[85vh] rounded-2xl shadow-2xl"
        style={{ backgroundColor: primaryColor, border: "1px solid rgba(255,255,255,0.15)" }}
      >
        {/* Header — fixed, never scrolls */}
        <div className="flex-shrink-0 flex items-center gap-3 px-8 pt-8 pb-5 border-b border-white/10">
          {testimonial.src ? (
            <img
              src={testimonial.src}
              alt={testimonial.name}
              width={44}
              height={44}
              className="rounded-full object-cover shrink-0"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <FaUserCircle size={44} className="text-white/30 shrink-0" />
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-white/90 truncate">{testimonial.name}</span>
            {testimonial.designation && (
              <span className="text-xs text-white/50 truncate">{testimonial.designation}</span>
            )}
            <div className="mt-1 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={12}
                  className={i < (testimonial.rating ?? 5) ? "text-yellow-400" : "text-white/20"}
                />
              ))}
            </div>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close review"
            className="ml-auto shrink-0 text-white/50 hover:text-white/90 transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <FaQuoteLeft className="mb-4 text-white/20" size={20} />
          <p className="text-base font-normal text-white/80 italic leading-relaxed">
            {testimonial.quote}
          </p>
        </div>
      </div>
    </div>
  );
}
