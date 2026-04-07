import type { Company } from "@/data/companies";

interface StatsBarProps {
  company: Company;
}

export function StatsBar({ company }: StatsBarProps) {
  return (
    <section className="bg-white border-b border-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {company.statsBar.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 py-6 md:py-0 md:px-8 text-center"
          >
            <span
              className="text-3xl md:text-4xl font-black"
              style={{ color: company.primaryColor }}
            >
              {stat.value}
            </span>
            <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
