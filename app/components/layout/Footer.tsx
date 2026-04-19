import Image from "next/image";
import Link from "next/link";
import { FaYelp } from "react-icons/fa";
import type { Company } from "@/data/companies";
import type { Service } from "@/lib/types/service";
import servicesData from "@/lib/chat/data/services.json";

interface FooterProps {
  company: Company;
}

const activeServices = (servicesData as Service[]).filter((s) => s.is_active);

export function Footer({ company }: FooterProps) {
  return (
    <footer style={{ backgroundColor: company.primaryColor }}>
      {/* Main footer columns */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 — Logo + tagline + social */}
        <div className="flex flex-col gap-5">
          <div className="relative h-16 w-48">
            <Image src={company.logoHorizontal} alt={company.name} fill className="object-contain object-left" />
          </div>
          <p className="text-white/55 text-sm leading-relaxed">{company.tagline}</p>
          <div className="flex items-center gap-4">
            {company.social.facebook && (
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/40 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            )}
            {company.social.instagram && (
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            )}
            {company.social.yelp && (
              <a
                href={company.social.yelp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yelp"
                className="text-white/40 hover:text-white transition"
              >
                <FaYelp className="w-5 h-5" />
              </a>
            )}
            {company.social.birdeye && (
              <a
                href={company.social.birdeye}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BirdEye"
                className="text-white/40 hover:text-white transition flex items-center"
                style={{ lineHeight: 0 }}
              >
                <Image src="/bird-eye-logo.svg" alt="BirdEye" width={20} height={20} className="w-5 h-5 object-contain" />
              </a>
            )}
          </div>
        </div>

        {/* Column 2 — Services */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest">Services</h3>
          <ul className="flex flex-col gap-2.5">
            {activeServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-white/55 text-sm hover:text-white transition"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Service Areas */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest">Service Areas</h3>
          <ul className="flex flex-col gap-2.5">
            {company.serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="text-white/55 text-sm hover:text-white transition"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact + quick links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest">Contact Us</h3>
          <div className="flex flex-col gap-2 text-sm text-white/55">
            <p>{company.address.street}</p>
            <p>{company.address.city}, {company.address.state} {company.address.zip}</p>
            <a href={`tel:${company.phone}`} className="hover:text-white transition font-semibold text-white/80 mt-1">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-white transition">
              {company.email}
            </a>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Link href="/" className="text-white/55 text-sm hover:text-white transition">Home</Link>
            <Link href="/about" className="text-white/55 text-sm hover:text-white transition">About Us</Link>
            <Link href="/contact" className="text-white/55 text-sm hover:text-white transition">Contact</Link>
            <Link href="/booking" className="text-white/55 text-sm hover:text-white transition">Book Service</Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex flex-col items-start gap-3 text-xs text-white/35">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${company.phone}`}
              className="font-semibold text-white/55 hover:text-white transition"
            >
              {company.phone}
            </a>
            <Link
              href="/request-service"
              className="rounded px-4 py-1.5 text-xs font-bold transition hover:opacity-90"
              style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
            >
              Book Now
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white/60 transition">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white/60 transition">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
