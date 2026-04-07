import Link from "next/link";
import type { Company } from "@/data/companies";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  company: Company;
}

export function PageHeader({ title, breadcrumbs = [], company }: PageHeaderProps) {
  const crumbs: Breadcrumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section
      className="relative py-14 px-6 text-white"
      style={{ backgroundColor: company.primaryColor }}
    >
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50">
            {crumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/30">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white/80 transition">
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: company.accentColor }}>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page title */}
        <h1 className="text-3xl md:text-4xl font-black leading-tight">{title}</h1>

        {/* Accent underline */}
        <div
          className="mt-4 h-1 w-16 rounded"
          style={{ backgroundColor: company.accentColor }}
        />
      </div>
    </section>
  );
}
