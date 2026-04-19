"use client";
import { cn } from "@/lib/utils";
import { IconChevronDown, IconMenu2, IconX, IconPhone } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import type { Company } from "@/data/companies";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";

interface NavbarProps {
  company: Company;
}

// Build service dropdown links from services.json (static data, safe to import in client)
const serviceLinks = (servicesData as Service[])
  .filter((s) => s.is_active)
  .map((s) => ({ name: s.name, link: `/services/${s.slug}` }));

export function Navbar({ company }: NavbarProps) {
  return (
    <header className="relative z-50 w-full" style={{ backgroundColor: company.primaryColor }}>
      {/* Top info bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 text-xs border-b border-white/10">
        <span className="text-white/50">
          Serving {company.city} &nbsp;&amp;&nbsp; surrounding areas &nbsp;&middot;&nbsp; Licensed &amp; Insured
        </span>
        <a
          href={`mailto:${company.email}`}
          className="text-white/50 hover:text-white/80 transition"
        >
          {company.email}
        </a>
      </div>
      <DesktopNav company={company} />
      <MobileNav company={company} />
    </header>
  );
}

// ─── Desktop Nav ──────────────────────────────────────────────────────────────

const DesktopNav = ({ company }: NavbarProps) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav
      className="hidden lg:flex w-full items-center justify-between px-6 py-3"
      style={{ backgroundColor: company.primaryColor }}
    >
      <CompanyLogo company={company} />

      <Menu setActive={setActive}>
        <NavLink href="/" label="Home" />
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-3 min-w-[220px] py-1">
            {serviceLinks.map((s) => (
              <HoveredLink key={s.link} href={s.link}>
                {s.name}
              </HoveredLink>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-1">
              <HoveredLink href="/services">
                <span className="font-semibold">View All Services →</span>
              </HoveredLink>
            </div>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Service Areas">
          <div className="flex flex-col space-y-3 min-w-[220px] py-1">
            {company.serviceAreas.map((a) => (
              <HoveredLink key={a.slug} href={`/service-areas/${a.slug}`}>
                {a.name}
              </HoveredLink>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-1">
              <HoveredLink href="/service-areas">
                <span className="font-semibold">View All Areas →</span>
              </HoveredLink>
            </div>
          </div>
        </MenuItem>
        <NavLink href="/about" label="About" />
        <NavLink href="/contact" label="Contact" />
      </Menu>

      <div className="flex items-center gap-4">
        <a
          href={`tel:${company.phone}`}
          className="flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition"
        >
          <IconPhone className="w-4 h-4" />
          {company.phone}
        </a>
        <Link
          href="/request-service"
          className="rounded px-5 py-2 text-sm font-bold transition hover:opacity-90"
          style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
        >
          Book Service
        </Link>
      </div>
    </nav>
  );
};

// ─── Mobile Nav ───────────────────────────────────────────────────────────────

const MobileNav = ({ company }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [serviceAreasOpen, setServiceAreasOpen] = useState(false);

  return (
    <div className="lg:hidden w-full" style={{ backgroundColor: company.primaryColor }}>
      {/* Mobile bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <CompanyLogo company={company} />
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="text-white"
        >
          {open ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              <MobileNavLink href="/" label="Home" onClick={() => setOpen(false)} />

              {/* Services accordion */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full py-2.5 text-sm font-semibold text-white/90"
                >
                  Services
                  <IconChevronDown
                    className={cn(
                      "w-4 h-4 text-white/60 transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-3 border-l border-white/20"
                    >
                      {serviceLinks.map((s) => (
                        <MobileNavLink
                          key={s.link}
                          href={s.link}
                          label={s.name}
                          onClick={() => setOpen(false)}
                          muted
                        />
                      ))}
                      <MobileNavLink
                        href="/services"
                        label="View All Services →"
                        onClick={() => setOpen(false)}
                        muted
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Areas accordion */}
              <div>
                <button
                  onClick={() => setServiceAreasOpen(!serviceAreasOpen)}
                  className="flex items-center justify-between w-full py-2.5 text-sm font-semibold text-white/90"
                >
                  Service Areas
                  <IconChevronDown
                    className={cn(
                      "w-4 h-4 text-white/60 transition-transform",
                      serviceAreasOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {serviceAreasOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-3 border-l border-white/20"
                    >
                      {company.serviceAreas.map((a) => (
                        <MobileNavLink
                          key={a.slug}
                          href={`/service-areas/${a.slug}`}
                          label={a.name}
                          onClick={() => setOpen(false)}
                          muted
                        />
                      ))}
                      <MobileNavLink
                        href="/service-areas"
                        label="View All Areas →"
                        onClick={() => setOpen(false)}
                        muted
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink href="/about" label="About" onClick={() => setOpen(false)} />
              <MobileNavLink href="/contact" label="Contact" onClick={() => setOpen(false)} />

              <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-3">
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-white/80"
                >
                  <IconPhone className="w-4 h-4" />
                  {company.phone}
                </a>
                <Link
                  href="/request-service"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded px-5 py-3 text-sm font-bold transition hover:opacity-90"
                  style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                >
                  Book Service
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Shared sub-components ────────────────────────────────────────────────────

const CompanyLogo = ({ company }: NavbarProps) => (
  <Link href="/" className="relative h-14 w-44 shrink-0 block">
    <Image src={company.logoHorizontal} alt={`${company.name} logo`} fill className="object-contain object-left" />
  </Link>
);

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition"
  >
    {label}
  </Link>
);

const MobileNavLink = ({
  href,
  label,
  onClick,
  muted = false,
}: {
  href: string;
  label: string;
  onClick: () => void;
  muted?: boolean;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "block py-2.5 text-sm font-semibold transition",
      muted ? "text-white/60 hover:text-white/90" : "text-white/90 hover:text-white",
    )}
  >
    {label}
  </Link>
);

// ─── Animation primitives (from template) ────────────────────────────────────

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer px-3 py-2 text-sm font-semibold text-white/80 hover:text-white transition"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.2rem)] left-1/2 -translate-x-1/2 transform pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-xl bg-white shadow-xl border border-gray-100"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex items-center"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={href}
      {...rest}
      className="text-sm text-gray-700 hover:text-gray-900 hover:font-semibold transition"
    >
      {children}
    </Link>
  );
};
