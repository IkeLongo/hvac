"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Company } from "@/data/companies";

interface TeamSectionProps {
  company: Company;
}

export function TeamSectionWithLightBackground({ company }: TeamSectionProps) {
  const { teamMembers } = company;
  const defaultTeam = [
    {
      title: "Manu Arora",
      designation: "Founder & CEO",
      src: "https://assets.aceternity.com/avatars/manu.webp",
      alt: "Manu Arora, Founder & CEO",
      excerpt:
        "Builder of digital products and founder at Aceternity, Manu focuses on product innovation and cross-disciplinary leadership.",
    },
    {
      title: "John Doe",
      designation: "Co-Founder & CTO",
      src: "https://assets.aceternity.com/avatars/1.webp",
      alt: "John Doe, Co-Founder & CTO",
      excerpt:
        "Architects scalable infrastructures and leads our technology vision, with a passion for mentoring the engineering team.",
    },
    {
      title: "Glennfiddich Doe",
      designation: "Software Engineer",
      src: "https://assets.aceternity.com/avatars/2.webp",
      alt: "Glennfiddich Doe, Software Engineer",
      excerpt:
        "Specializes in frontend frameworks and UI systems—Glennfiddich crafts seamless and accessible user interfaces.",
    },
    {
      title: "Jameson Beam",
      designation: "Designer",
      src: "https://assets.aceternity.com/avatars/3.webp",
      alt: "Jameson Beam, Designer",
      excerpt:
        "Designs clear, elegant digital experiences, blending visual storytelling with empathetic user research.",
    },
    {
      title: "Johnny Walker",
      designation: "Marketing Manager",
      src: "https://assets.aceternity.com/avatars/4.webp",
      alt: "Johnny Walker, Marketing Manager",
      excerpt:
        "Drives brand growth through creative campaigns and analytics, always seeking meaningful community engagement.",
    },
    {
      title: "Jack Daniels",
      designation: "HR & Management",
      src: "https://assets.aceternity.com/avatars/5.webp",
      alt: "Jack Daniels, HR & Management",
      excerpt:
        "Fosters company culture and supports team wellbeing, ensuring seamless operations and professional development.",
    },
    {
      title: "Samantha Rives",
      designation: "Product Manager",
      src: "https://assets.aceternity.com/avatars/6.webp",
      alt: "Samantha Rives, Product Manager",
      excerpt:
        "Bridges vision and execution, keeping projects on track and fostering collaboration across all disciplines.",
    },
    {
      title: "Evelyn Martinez",
      designation: "QA Lead",
      src: "https://assets.aceternity.com/avatars/7.webp",
      alt: "Evelyn Martinez, QA Lead",
      excerpt:
        "Ensures every release meets rigorous quality standards, blending keen attention to detail with a love for process improvement.",
    },
  ];

  const team =
    teamMembers && teamMembers.length > 0
      ? teamMembers.map((m) => ({
          title: m.name,
          designation: m.title,
          src: m.imageSrc ?? "https://assets.aceternity.com/avatars/1.webp",
          alt: m.alt ?? m.name,
          excerpt: m.description,
        }))
      : defaultTeam;

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.primaryColor }}
          >
            Meet the Team
          </p>
          <h2 className="text-3xl md:text-4xl font-black">
            The People Behind {company.name}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-gray-500 leading-relaxed">
            The technicians and staff who show up for your home every day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.title + "first-team-section"}
              className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.src}
                  alt={member.alt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-5 border-t border-gray-100">
                <p className="font-black text-base text-gray-900">
                  {member.title}
                </p>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mt-1"
                  style={{ color: company.primaryColor }}
                >
                  {member.designation}
                </p>
                <Separator className="my-3 text-gray-200" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  {member.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "h-3 w-full shrink-0 overflow-visible text-neutral-300 dark:text-neutral-700",
        className,
      )}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="0.2 10"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
