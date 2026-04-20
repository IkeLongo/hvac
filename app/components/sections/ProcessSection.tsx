"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Company, CompanyProcessStep } from "@/data/companies";

// ─── Constants ────────────────────────────────────────────────────────────────

const STEP_DURATION = 7000; // ms per slide — also drives the progress bar

const FALLBACK_IMAGES = [
  {
    src: "/young-hvac-technician-millennial-has-modern-equipment.jpg",
    alt: "HVAC technician ready to help",
  },
  {
    src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
    alt: "Technician diagnosing HVAC system",
  },
  {
    src: "/overhead-of-utility-workers-maintaining-outside-ai.jpg",
    alt: "Technician reviewing job details",
  },
  {
    src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
    alt: "HVAC repair completed",
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────

interface ProcessSectionProps {
  company: Company;
}

export function ProcessSection({ company }: ProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const shouldReduceMotion = useReducedMotion();
  const steps = company.process;

  // Auto-advance — setTimeout keyed on activeIndex so the timer resets cleanly
  // on every manual or automatic slide change.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [activeIndex, steps.length]);

  function goTo(index: number) {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function goPrev() {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
  }

  function goNext() {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % steps.length);
  }

  const step = steps[activeIndex];
  const img = step.img ?? FALLBACK_IMAGES[activeIndex % FALLBACK_IMAGES.length];

  // Slide variants — direction-aware
  const xOffset = shouldReduceMotion ? 0 : 40;
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * xOffset }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -xOffset }),
  };

  return (
    <section className="bg-gray-100 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.primaryColor }}
          >
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-black">
            Simple, Stress-Free Service
          </h2>
        </div>

        {/* Carousel card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left — image */}
              <div className="relative h-56 md:h-auto md:min-h-[340px] overflow-hidden bg-gray-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={activeIndex === 0}
                />
                {/* Branded tint overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: company.primaryColor }}
                />
              </div>

              {/* Right — content */}
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-black shrink-0"
                  style={{
                    backgroundColor: company.primaryColor,
                    color: company.accentColor,
                  }}
                >
                  {step.step}
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: company.primaryColor }}
                  >
                    Step {step.step} of {steps.length}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black leading-snug mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={goPrev}
                    aria-label="Previous step"
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition hover:opacity-70 shrink-0"
                    style={{ borderColor: company.primaryColor, color: company.primaryColor }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next step"
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition hover:opacity-70 shrink-0"
                    style={{ borderColor: company.primaryColor, color: company.primaryColor }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar — remounts on every activeIndex change via key, so it
              always restarts from 0 in perfect sync with the auto-advance timer */}
          <div className="h-1 w-full bg-gray-100">
            <motion.div
              key={activeIndex}
              className="h-full"
              style={{ backgroundColor: company.primaryColor }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: STEP_DURATION / 1000,
                ease: "linear",
              }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  i === activeIndex ? company.primaryColor : company.neutral2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
