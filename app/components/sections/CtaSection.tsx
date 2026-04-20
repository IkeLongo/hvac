"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  animate,
  stagger,
} from "motion/react";

import { BsStarFill } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import type { Company, CompanyCtaTestimonial } from "@/data/companies";

// ─── Fallback content ────────────────────────────────────────────────────────

const DEFAULT_TITLE = "Need HVAC Service?\nWe’ve Got You Covered.";

const DEFAULT_DESCRIPTION =
  "From emergency repairs to full system installs, our licensed technicians are ready to help. Book your service in under 60 seconds or give us a call.";

const DEFAULT_TESTIMONIAL_DESCRIPTION =
  "Trusted by homeowners across San Antonio";

const DEFAULT_TESTIMONIALS: CompanyCtaTestimonial[] = [
  {
    name: "Michael Torres",
    designation: "Homeowner – AC Repair",
    imageSrc:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "David Ramirez",
    designation: "Property Manager – HVAC Maintenance",
    imageSrc:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Ashley Martinez",
    designation: "Homeowner – System Replacement",
    imageSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Lauren Brooks",
    designation: "Homeowner – Routine Maintenance",
    imageSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
  },
  {
    name: "Jason Miller",
    designation: "Small Business Owner – Commercial HVAC",
    imageSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sofia Hernandez",
    designation: "Homeowner – Emergency AC Service",
    imageSrc:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

interface CtaSectionProps {
  company: Company;
}

export function CtaSection({ company }: CtaSectionProps) {
  const cta = company.ctaSection;

  // Resolve content — company data wins, fallback to defaults
  const title = cta?.title ?? DEFAULT_TITLE;
  const description = cta?.description ?? DEFAULT_DESCRIPTION;
  const testimonialDescription =
    cta?.testimonialDescription ?? DEFAULT_TESTIMONIAL_DESCRIPTION;
  const testimonials = cta?.testimonials ?? DEFAULT_TESTIMONIALS;

  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: company.neutral1 }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between px-4 md:flex-row md:px-8 gap-10">
        <div className="flex flex-col">
          <motion.h2
            className="mx-auto max-w-xl text-center text-xl font-black md:mx-0 md:text-left md:text-3xl"
            style={{ color: company.primaryColor }}
          >
            {title.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < title.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.h2>
          <p className="mx-auto mt-6 max-w-md text-center text-sm text-gray-600 md:mx-0 md:text-left md:text-base">
            {description}
          </p>
          <FeaturedAvatars
            testimonials={testimonials}
            testimonialDescription={testimonialDescription}
            primaryColor={company.primaryColor}
            accentColor={company.accentColor}
            textClassName="lg:text-left text-center"
            className="items-center justify-start lg:justify-start"
            containerClassName="md:items-start"
            showStars
          />
        </div>
        <a
          href="/request-service"
          className="group flex shrink-0 items-center space-x-2 rounded-lg px-6 py-3 text-base font-bold text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] transition hover:opacity-90"
          style={{
            background: `linear-gradient(to bottom, ${company.accentColor2}, ${company.primaryColor})`,
          }}
        >
          <span>Book a Service</span>
          <HiArrowRight className="mt-0.5 h-3 w-3 stroke-[1px] transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

// ─── FeaturedAvatars sub-component ───────────────────────────────────────────

interface FeaturedAvatarsProps {
  testimonials: CompanyCtaTestimonial[];
  testimonialDescription: string;
  primaryColor: string;
  accentColor: string;
  textClassName?: string;
  className?: string;
  showStars?: boolean;
  containerClassName?: string;
}

export function FeaturedAvatars({
  testimonials,
  testimonialDescription,
  primaryColor,
  accentColor,
  textClassName,
  className,
  showStars = false,
  containerClassName,
}: FeaturedAvatarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  useEffect(() => {
    animate(
      ".cta-avatar-container",
      { scale: [1.1, 1, 0.9, 1], opacity: [0, 1] },
      { duration: 0.4, delay: stagger(0.1) },
    );
  }, []);

  return (
    <div
      className={cn(
        "mt-10 mb-10 flex flex-col items-center",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "mb-2 flex flex-col items-center justify-center sm:flex-row",
          className,
        )}
      >
        <div className="mb-4 flex flex-row items-center sm:mb-0">
          {testimonials.map((t, idx) => (
            <div
              className="group relative -mr-4"
              key={t.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 160, damping: 20 },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{ translateX, whiteSpace: "nowrap" }}
                    className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl"
                    // Tooltip uses company primaryColor as background
                    // (inline style keeps it dynamic)
                  >
                    {/* Bottom edge accent lines using brand colors */}
                    <div
                      className="absolute inset-x-0 -bottom-px z-30 mx-auto h-[2px] w-[20%]"
                      style={{
                        background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                      }}
                    />
                    <div
                      className="absolute inset-x-0 -bottom-px z-30 mx-auto h-[2px] w-[70%]"
                      style={{
                        background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-md"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{t.name}</span>
                      <span
                        className="rounded-sm px-1 py-0.5 text-xs"
                        style={{ backgroundColor: `${primaryColor}cc`, color: "#fff" }}
                      >
                        {t.designation}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="cta-avatar-container">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    rotate: `${Math.random() * 15 - 5}deg`,
                    scale: 1,
                    opacity: 1,
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl border-2"
                  style={{ borderColor: "whitesmoke" }}
                >
                  <Image
                    onMouseMove={handleMouseMove}
                    height={56}
                    width={56}
                    sizes="56px"
                    src={t.imageSrc}
                    alt={t.alt ?? t.name}
                    className="h-14 w-14 object-cover object-top"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {showStars && (
          <div className="ml-6 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <BsStarFill
                key={i}
                className="mx-1 h-4 w-4 text-yellow-400"
              />
            ))}
          </div>
        )}
      </div>
      <p className={cn("relative z-40 text-left text-sm text-gray-500", textClassName)}>
        {testimonialDescription}
      </p>
    </div>
  );
}
