"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import type { Company } from "@/data/companies";

// ── Numeric value parser ──────────────────────────────────────────────────────
// Extracts a count-up target from strings like "25+", "8,000+", "100%".
// Returns null for non-numeric values like "24/7" or "Fast Response Times".

interface ParsedNumeric {
  number: number;
  prefix: string;
  suffix: string;
}

function parseNumeric(value: string): ParsedNumeric | null {
  const match = value.match(/^([^0-9]*)([0-9,]+)([^0-9,]*)$/);
  if (!match) return null;
  // Reject if the suffix contains another digit (e.g. "24/7" → suffix "/7")
  if (/\d/.test(match[3])) return null;
  const num = parseInt(match[2].replace(/,/g, ""), 10);
  if (isNaN(num) || num === 0) return null;
  return { prefix: match[1], number: num, suffix: match[3] };
}

// ── Animated value display ────────────────────────────────────────────────────

interface AnimatedValueProps {
  value: string;
  color: string;
  inView: boolean;
}

function AnimatedValue({ value, color, inView }: AnimatedValueProps) {
  const shouldReduce = useReducedMotion();
  const parsed = parseNumeric(value);

  const count = useMotionValue(0);
  const displayCount = useTransform(count, (v) => {
    const n = Math.round(v);
    return n >= 1000 ? n.toLocaleString() : String(n);
  });

  useEffect(() => {
    if (!parsed || !inView || shouldReduce) return;
    const controls = animate(count, parsed.number, {
      duration: 1.6,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, parsed, count, shouldReduce]);

  const className = "text-3xl md:text-4xl font-black tabular-nums";

  if (!parsed || shouldReduce) {
    return (
      <span className={className} style={{ color }}>
        {value}
      </span>
    );
  }

  return (
    <span className={className} style={{ color }}>
      {parsed.prefix}
      <motion.span>{displayCount}</motion.span>
      {parsed.suffix}
    </span>
  );
}

// ── StatsBar ──────────────────────────────────────────────────────────────────

interface StatsBarProps {
  company: Company;
}

export function StatsBar({ company }: StatsBarProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduce = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="bg-white border-b border-gray-200 py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {company.statsBar.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={
              shouldReduce
                ? {}
                : inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            className="flex flex-col items-center gap-1 py-6 md:py-0 md:px-8 text-center"
          >
            <AnimatedValue
              value={stat.value}
              color={company.primaryColor}
              inView={inView}
            />
            <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
