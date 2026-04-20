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
      title: "Carlos Ramirez",
      designation: "Owner & Lead Technician",
      src: "https://assets.aceternity.com/avatars/manu.webp",
      alt: "Carlos Ramirez, Owner & Lead Technician",
      excerpt:
        "With over 15 years of experience, Carlos leads every project with a focus on honest work, reliable service, and long-term customer relationships.",
    },
    {
      title: "Michael Thompson",
      designation: "Operations Manager",
      src: "https://assets.aceternity.com/avatars/1.webp",
      alt: "Michael Thompson, Operations Manager",
      excerpt:
        "Michael ensures every job runs smoothly—from scheduling to completion—so customers get fast, organized, and stress-free service.",
    },
    {
      title: "Daniela Perez",
      designation: "HVAC Service Technician",
      src: "https://assets.aceternity.com/avatars/2.webp",
      alt: "Daniel Perez, HVAC Service Technician",
      excerpt:
        "Daniel specializes in diagnosing and repairing HVAC systems quickly and efficiently, helping homeowners stay comfortable year-round.",
    },
    {
      title: "James Carter",
      designation: "Installation Specialist",
      src: "https://assets.aceternity.com/avatars/3.webp",
      alt: "James Carter, Installation Specialist",
      excerpt:
        "James handles full system installs and replacements, ensuring every unit is set up for long-term performance and energy efficiency.",
    },
    {
      title: "Anthony Walker",
      designation: "Customer Experience Manager",
      src: "https://assets.aceternity.com/avatars/4.webp",
      alt: "Anthony Walker, Customer Experience Manager",
      excerpt:
        "Anthony works directly with customers to ensure clear communication, timely updates, and a smooth service experience from start to finish.",
    },
    {
      title: "Robert Davis",
      designation: "Field Supervisor",
      src: "https://assets.aceternity.com/avatars/5.webp",
      alt: "Robert Davis, Field Supervisor",
      excerpt:
        "Robert oversees on-site operations, ensuring every technician delivers high-quality work that meets company standards and customer expectations.",
    },
    {
      title: "Samantha Rives",
      designation: "Service Coordinator",
      src: "https://assets.aceternity.com/avatars/6.webp",
      alt: "Samantha Rives, Service Coordinator",
      excerpt:
        "Samantha keeps everything on track behind the scenes, coordinating appointments and making sure every customer is taken care of promptly.",
    },
    {
      title: "Evelyn Martinez",
      designation: "Quality Assurance Specialist",
      src: "https://assets.aceternity.com/avatars/7.webp",
      alt: "Evelyn Martinez, Quality Assurance Specialist",
      excerpt:
        "Evelyn ensures every job meets strict quality standards, following up on service work to guarantee customer satisfaction and long-term reliability.",
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
