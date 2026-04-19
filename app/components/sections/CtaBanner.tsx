import type { Company } from "@/data/companies";

interface CtaBannerProps {
  company: Company;
  headline?: string;
  subtext?: string;
  features?: string[];
}

const DEFAULT_FEATURES = [
  "Fast same-day response",
  "24/7 emergency availability",
  "Flexible scheduling",
  "Upfront, honest pricing",
];

export function CtaBanner({
  company,
  headline = "We're Ready When You Need Us",
  subtext = "Don't sweat it — help is just a call away.",
  features = DEFAULT_FEATURES,
}: CtaBannerProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: company.primaryColor }}
        >
          Available Now
        </p>
        <h2 className="text-3xl md:text-4xl font-black mb-4">{headline}</h2>
        <p className="text-gray-500 mb-8">{subtext}</p>

        {features.length > 0 && (
          <ul className="inline-grid grid-cols-2 gap-x-8 gap-y-3 mb-10 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ backgroundColor: company.accentColor, color: company.primaryColor }}
                >
                  &#10003;
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${company.phone}`}
            className="rounded px-8 py-4 text-lg font-bold shadow transition hover:opacity-90"
            style={{ backgroundColor: company.primaryColor, color: "white" }}
          >
            Call {company.phone}
          </a>
          <a
            href="/request-service"
            className="rounded border-2 px-8 py-4 text-lg font-bold transition hover:bg-gray-100"
            style={{ borderColor: company.primaryColor, color: company.primaryColor }}
          >
            Request Online
          </a>
        </div>
      </div>
    </section>
  );
}
